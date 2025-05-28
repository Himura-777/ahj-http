export default class ConfirmModal {
  static create(message) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    modal.innerHTML = `
      <div class="confirm-modal">
        <h3>Удаление тикета</h3>
        <p>${message}</p>
        <div class="modal-buttons">
          <button class="cancel-btn">Отмена</button>
          <button class="confirm-btn danger">Удалить</button>
        </div>
      </div>
    `;

    document.body.append(modal);

    return new Promise((resolve) => {
      modal.querySelector('.confirm-btn').addEventListener('click', () => {
        modal.remove();
        resolve(true);
      });

      modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
        resolve(false);
      });
    });
  }
}
