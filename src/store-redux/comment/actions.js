export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comment/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments/${id}?fields=*`,
        });
        // Товар загружен успешно
        dispatch({ type: 'comment/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comment/load-error' });
      }
    };
  },
};
