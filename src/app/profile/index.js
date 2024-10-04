import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import AuthBlock from '../../containers/auth-block';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileInfo from '../../components/profile-info';
import PrivateRoute from '../../containers/private-route';

/**
 * Страница профиля
 */
function Profile() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.user.fetchUserProfile();
  }, []);

  const select = useSelector(state => ({
    profile: state.user.userInfo,
    error: state.user.fetchError,
    waiting: state.user.isLoading,
    username: state.auth.username,
  }));

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/auth');
    }
  }, [select.username]);

  return (
    <PrivateRoute redirectTo="/auth" inverse={false}>
      <PageLayout>
        <AuthBlock />
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <ProfileInfo profile={select.profile} />
      </PageLayout>
    </PrivateRoute>
  );
}

export default memo(Profile);
