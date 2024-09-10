/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const initializedList = (initState.list || []).map(item => ({
      ...item,
      timesClicked: item.timesClicked || 0,
    }));

    this.state = {
      ...initState,
      list: initializedList,
      nextCode: initState.nextCode || initializedList.length + 1,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  addNewCode() {
    const nextCode = this.state.nextCode;
    this.setState({
      ...this.state,
      nextCode: nextCode + 1,
    });
    return nextCode;
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
   * Добавление новой записи
   */
  addItem() {
    const itemNew = {
      code: this.addNewCode(),
      title: 'Новая запись',
      selected: false,
      timesClicked: 0,
    }
    this.setState({
      ...this.state,
      list: [...this.state.list, itemNew],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
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
      list: this.state.list.map(item => ({
        ...item,
        selected: item.code === code ? !item.selected : false,
        timesClicked: (item.code === code && !item.selected) ? (item.timesClicked || 0) + 1 : item.timesClicked,
      })),
    });
  }
}

export default Store;
