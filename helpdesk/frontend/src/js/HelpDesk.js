/**
 *  Основной класс приложения
 * */
import TicketView from './TicketView';
import TicketForm from './TicketForm';
import ConfirmModal from './ConfirmModal';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Container is not HTML element');
    }
    this.container = container;
    this.ticketService = ticketService;
    this.tickets = [];
  }

  init() {
    this.renderLayout();
    this.loadTickets();
    this.bindEvents();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="helpdesk">
        <header>
          <h1>HelpDesk</h1>
          <button class="add-ticket">Добавить тикет</button>
        </header>
        <div class="tickets-list"></div>
      </div>
    `;
  }

  async loadTickets() {
    try {
      this.tickets = await this.ticketService.list();
      this.renderTickets();
    } catch (error) {
      console.error('Error loading tickets:', error);
      this.container.querySelector('.tickets-list').innerHTML = `
        <div class="error">Ошибка загрузки: ${error.message}</div>
      `;
    }
  }

  renderTickets() {
    const list = this.container.querySelector('.tickets-list');
    list.innerHTML = this.tickets.length === 0 ? '<div class="empty">Нет тикетов</div>' : '';

    this.tickets.forEach((ticket) => {
      const ticketEl = TicketView.createTicketElement(ticket);
      list.append(ticketEl);
    });
  }

  bindEvents() {
    this.container.addEventListener('click', async (e) => {
      const ticketEl = e.target.closest('.ticket');
      const ticketId = ticketEl?.dataset.id;

      if (e.target.classList.contains('add-ticket')) {
        this.showTicketForm();
      } else if (e.target.classList.contains('ticket-status')) {
        await this.toggleStatus(ticketId);
      } else if (e.target.classList.contains('ticket-name')) {
        this.toggleDescription(ticketEl);
      } else if (e.target.classList.contains('ticket-edit')) {
        await this.showEditForm(ticketId);
      } else if (e.target.classList.contains('ticket-delete')) {
        await this.deleteTicket(ticketId);
      }
    });
  }

  async toggleStatus(id) {
    const ticket = this.tickets.find((t) => t.id === id);
    if (!ticket) return;

    try {
      await this.ticketService.update(id, {
        ...ticket,
        status: !ticket.status,
      });
      this.loadTickets();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  }

  toggleDescription(ticketEl) {
    const descEl = ticketEl.querySelector('.ticket-description');
    descEl.classList.toggle('hidden');
  }

  async showEditForm(id) {
    try {
      const ticket = await this.ticketService.get(id);
      this.showTicketForm(ticket);
    } catch (error) {
      console.error('Error loading ticket:', error);
    }
  }

  // showTicketForm(ticket = null) {
  //   const form = TicketForm.createForm(ticket);
  //   this.container.append(form);
  //
  //   form.addEventListener('submit', async (e) => {
  //     e.preventDefault();
  //     const formData = new FormData(form);
  //     const data = {
  //       name: formData.get('name'),
  //       description: formData.get('description'),
  //     };
  //
  //     try {
  //       if (ticket) {
  //         await this.ticketService.update(ticket.id, data);
  //       } else {
  //         await this.ticketService.create(data);
  //       }
  //       form.remove();
  //       this.loadTickets();
  //     } catch (error) {
  //       console.error('Error saving ticket:', error);
  //     }
  //   });
  //
  //   form.querySelector('.cancel-btn').addEventListener('click', () => {
  //     form.remove();
  //   });
  // }

  showTicketForm(ticket = null) {
    const form = TicketForm.createForm(ticket);
    this.container.append(form);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"]');
      const descInput = form.querySelector('textarea[name="description"]');

      // Удаляем пробелы в начале и конце
      const name = nameInput.value.trim();
      const description = descInput.value.trim();

      if (!name) {
        form.querySelector('.form-error').textContent = 'Название обязательно';
        return;
      }

      try {
        if (ticket) {
          await this.ticketService.update(ticket.id, { name, description });
        } else {
          await this.ticketService.create({ name, description });
        }
        form.remove();
        this.loadTickets();
      } catch (error) {
        form.querySelector('.form-error').textContent = `Ошибка: ${error.message}`;
      }
    });

    form.querySelector('.cancel-btn').addEventListener('click', () => {
      form.remove();
    });
  }

  async deleteTicket(id) {
    const ticket = this.tickets.find((t) => t.id === id);
    if (!ticket) return;

    const isConfirmed = await ConfirmModal.create(
      `Вы уверены, что хотите удалить тикет "${ticket.name}"? Это действие необратимо.`,
    );

    if (!isConfirmed) return;

    try {
      await this.ticketService.delete(id);
      this.loadTickets();
    } catch (error) {
      this.showError(`Ошибка при удалении: ${error.message}`);
    }
  }
}
