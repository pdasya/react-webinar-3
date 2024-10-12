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
  loadAll: productId => {
    return async (dispatch, getState, services) => {
      // Сброс текущего состояния и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${productId}`,
        });
        // Комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        // Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  /**
   * Добавление нового комментария
   * @return {Function}
   */
  createComment: (username, commentText, id, type) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/create-comment-start' });

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({
            text: commentText,
            parent: { _id: id, _type: type },
          }),
        });

        const {
          _id,
          text,
          dateCreate,
          isDeleted,
          parent: { _id: parentId, _type: parentType },
        } = res.data.result;

        const data = {
          _id,
          text,
          dateCreate,
          isDeleted,
          author: {
            profile: { name: username },
          },
          parent: { _id: parentId, _type: parentType },
        };

        dispatch({
          type: 'comments/create-comment-success',
          payload: { data },
        });
      } catch (e) {
        dispatch({ type: 'comments/create-comment-error' });
      }
    };
  },
};
