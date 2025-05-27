import '../css/style.css';
import HelpDesk from './HelpDesk.js';
import TicketService from './TicketService.js';

const root = document.getElementById('root');

const ticketService = new TicketService();
const app = new HelpDesk(root, ticketService);

app.init();
