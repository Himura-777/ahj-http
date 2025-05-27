/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
// export default class TicketService {
//   list(callback) {}
//
//   get(id, callback) {}
//
//   create(data, callback) {}
//
//   update(id, data, callback) {}
//
//   delete(id, callback) {}
// }

export default class TicketService {
  constructor(baseUrl = 'http://localhost:7070') {
    this.baseUrl = baseUrl;
  }

  async list() {
    const response = await fetch(`${this.baseUrl}/?method=allTickets`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  async get(id) {
    const response = await fetch(`${this.baseUrl}/?method=ticketById&id=${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  async create(data) {
    const response = await fetch(`${this.baseUrl}/?method=createTicket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  async update(id, data) {
    const response = await fetch(`${this.baseUrl}/?method=updateById&id=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }

  async delete(id) {
    const response = await fetch(`${this.baseUrl}/?method=deleteById&id=${id}`);
    if (response.status !== 204) throw new Error(`HTTP error! status: ${response.status}`);
  }
}
