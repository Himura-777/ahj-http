/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor() {}

  static createTicketElement(ticket) {
    const ticketEl = document.createElement('div');
    ticketEl.className = 'ticket';
    ticketEl.dataset.id = ticket.id;

    ticketEl.innerHTML = `
      <div class="ticket-main">
        <input type="checkbox" class="ticket-status" ${ticket.status ? 'checked' : ''}>
        <span class="ticket-name">${ticket.name}</span>
        <span class="ticket-date">${new Date(ticket.created).toLocaleString()}</span>
        <button class="ticket-edit">✎</button>
        <button class="ticket-delete">×</button>
      </div>
      <div class="ticket-description hidden">${ticket.description || 'Нет описания'}</div>
    `;

    return ticketEl;
  }
}
