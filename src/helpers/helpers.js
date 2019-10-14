import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyNoMoney = () =>
  toast('На счету недостаточно средств для проведения операции!');

const notifyNotSum = () => toast('Введите сумму для проведения операции!');

const notifyIncorrectInput = () => toast('Сумма не должна быть отрицательной!');

export { notifyNoMoney, notifyNotSum, notifyIncorrectInput };
