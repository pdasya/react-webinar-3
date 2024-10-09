export default {
  /**
   * Загрузка комментария по ID
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего комментария и установка признака ожидания загрузки
      dispatch({ type: 'comment/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments/${id}?fields=*`,
        });
        // Комментарий загружен успешно
        dispatch({ type: 'comment/load-success', payload: { data: res.data.result } });
      } catch (e) {
        // Ошибка загрузки
        dispatch({ type: 'comment/load-error' });
      }
    };
  },

  /**
   * Загрузка всех комментариев
   * @return {Function}
   */
  loadAll: () => {
    return async (dispatch, getState, services) => {
      // Сброс текущего состояния и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=670260bb7dd498df5525e5ed`,
        });
        // Комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        // Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
};
