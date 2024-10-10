import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentActions from '../../store-redux/comments/actions';
import CommentsList from '../../components/comments-list';
import buildCommentTree from '../../utils/build-comment-tree';
import useSelector from '../../hooks/use-selector';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  const params = useParams();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentActions.loadAll(params.id)); // Загрузка всех комментариев
  }, [params.id]);

  const select = useSelectorRedux(
    state => ({
      article: state.article.data,
      comments: buildCommentTree(state.comments.comments),
      waitingArticle: state.article.waiting,
      waitingComments: state.comments.waiting,
    }),
    shallowequal,
  );

  const oldSelect = useSelector(state => ({
    isLoggedIn: state.session.exists,
    username: state.session.user?.profile?.name,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Создание нового комментария
    addComment: useCallback(
      text => {
        dispatch(commentActions.createComment(select.username, text, params.id, 'article'));
        dispatch(commentActions.loadAll(params.id));
      },
      [dispatch, select.username, commentActions],
    ),
    addResponse: useCallback(
      (text, commentId) => {
        dispatch(commentActions.createComment(select.username, text, commentId, 'comment'));
        dispatch(commentActions.loadAll(params.id));
      },
      [dispatch, select.username, commentActions],
    ),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waitingArticle || select.waitingComments}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        <CommentsList
          comments={select.comments}
          isLoggedIn={oldSelect.isLoggedIn}
          onCommentSubmit={callbacks.addComment}
          onResponseSubmit={callbacks.addResponse}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
