/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() {}

  static createForm(ticket = null) {
    const form = document.createElement('form');
    form.className = 'ticket-form';

    form.innerHTML = `
      <h3>${ticket ? 'Изменить тикет' : 'Добавить тикет'}</h3>
      <label>
        Краткое описание:
        <input type="text" name="name" value="${ticket?.name || ''}" required>
      </label>
      <label>
        Подробное описание:
        <textarea name="description">${ticket?.description || ''}</textarea>
      </label>
      <div class="form-buttons">
        <button type="button" class="cancel-btn">Отмена</button>
        <button type="submit">${ticket ? 'Обновить' : 'Добавить'}</button>
      </div>
    `;

    return form;
  }
}
