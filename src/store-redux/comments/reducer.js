// Начальное состояние
export const initialState = {
  data: {}, // данные одного комментария
  comments: [], // массив для всех комментариев
  count: 0, // количество всех комментариев
  waiting: false, // признак ожидания загрузки
  error: null, // текст ошибки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comment/load-start':
      return { ...state, data: {}, waiting: true, error: null };

    case 'comment/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comment/load-error':
      return { ...state, data: {}, waiting: false, error: 'Ошибка загрузки комментария' };

    case 'comments/load-start':
      return { ...state, comments: [], count: 0, waiting: true, error: null };

    case 'comments/load-success':
      return {
        ...state,
        comments: action.payload.data.items,
        count: action.payload.data.count,
        waiting: false,
      };

    case 'comments/load-error':
      return {
        ...state,
        comments: [],
        count: 0,
        waiting: false,
        error: 'Ошибка загрузки комментариев',
      };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
