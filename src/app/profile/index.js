import { memo, useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import AuthPanel from '../../containers/auth-panel';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
/**
 * Страница профиля
 */
function Profile() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.user.getProfile();
  }, []);

  const select = useSelector(state => ({
    profile: state.user.data,
    error: state.user.error,
    waiting: state.user.waiting,
    username: state.auth.username,
  }));

  const callbacks = {
    setUsername: useCallback(username => store.actions.auth.setUsername(username), [store]),
    logOutHandler: useCallback(async () => {
      await store.actions.auth.logout();
      navigate('/login');
    }, [store]),
  };

  useEffect(() => {
    if (select.profile.username) callbacks.setUsername(select.profile.username);
  }, [select.profile.username]);

  useEffect(() => {
    if (select.error) {
      callbacks.logOutHandler();
    }
  }, [select.error]);

  return (
    <PageLayout>
      <AuthPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <div>Страница профиля работает</div>
    </PageLayout>
  );
}

export default memo(Profile);
