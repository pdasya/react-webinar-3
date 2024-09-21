import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      cart: initState.cart || [],
      totalItems: 0,
      totalPrice: 0,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Подсчет общего количества товаров и общей суммы
   */
  updateCartTotals() {
    const totalItems = this.state.cart.length;
    const totalPrice = this.state.cart.reduce((sum, item) => sum + item.count * item.price, 0);

    this.setState({
      ...this.state,
      totalItems,
      totalPrice,
    });
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItemToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    if (!item) {
      console.error(`Товар с кодом ${code} не найден.`);
      return;
    }

    const existingItem = this.state.cart.find(cartItem => cartItem.code === code);

    if (existingItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cartItem =>
          cartItem.code === code ? { ...cartItem, count: cartItem.count + 1 } : cartItem,
        ),
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, count: 1 }],
      });
    }

    this.updateCartTotals();
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code),
    });

    this.updateCartTotals();
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
