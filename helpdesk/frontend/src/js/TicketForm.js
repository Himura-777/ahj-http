/**
 *  Класс для создания формы создания нового тикета
 * */
// export default class TicketForm {
//   static createForm(ticket = null) {
//     const form = document.createElement('form');
//     form.className = 'ticket-form';
//
//     form.innerHTML = `
//       <h3>${ticket ? 'Изменить тикет' : 'Добавить тикет'}</h3>
//       <label>
//         Краткое описание:
//         <input type="text" name="name" value="${ticket?.name || ''}" required>
//       </label>
//       <label>
//         Подробное описание:
//         <textarea name="description">${ticket?.description || ''}</textarea>
//       </label>
//       <div class="form-buttons">
//         <button type="button" class="cancel-btn">Отмена</button>
//         <button type="submit">${ticket ? 'Обновить' : 'Добавить'}</button>
//       </div>
//     `;
//
//     const nameInput = form.querySelector('input[name="name"]');
//     const submitBtn = form.querySelector('.submit-btn');
//     const errorMsg = form.querySelector('.error-message');
//
//     if (nameInput && submitBtn && errorMsg) {
//       nameInput.addEventListener('input', () => {
//         const isValid = nameInput.value.trim().length > 0;
//         submitBtn.disabled = !isValid;
//         errorMsg.textContent = isValid ? '' : 'Краткое описание обязательно';
//       });
//
//       submitBtn.disabled = nameInput.value.trim().length === 0;
//     } else {
//       console.error('Не удалось найти элементы формы для валидации');
//     }
//
//     return form;
//   }
// }

export default class TicketForm {
  static createForm(ticket = null) {
    const form = document.createElement('form');
    form.className = 'ticket-form';

    form.innerHTML = `
      <h3>${ticket ? 'Изменить тикет' : 'Добавить тикет'}</h3>
      <label>
        Краткое описание*:
        <input type="text" name="name" value="${ticket?.name || ''}" required>
      </label>
      <label>
        Подробное описание:
        <textarea name="description">${ticket?.description || ''}</textarea>
      </label>
      <div class="form-buttons">
        <button type="button" class="cancel-btn">Отмена</button>
        <button type="submit" class="submit-btn" ${!ticket?.name ? 'disabled' : ''}>
          ${ticket ? 'Обновить' : 'Добавить'}
        </button>
      </div>
      <div class="form-error"></div>
    `;

    const nameInput = form.querySelector('input[name="name"]');
    const submitBtn = form.querySelector('.submit-btn');
    const errorEl = form.querySelector('.form-error');

    const validate = () => {
      const name = nameInput.value.trim();
      const isValid = name.length > 0;

      submitBtn.disabled = !isValid;
      errorEl.textContent = isValid ? '' : 'Название не может быть пустым';
      return isValid;
    };

    nameInput.addEventListener('input', validate);
    validate();

    return form;
  }
}
