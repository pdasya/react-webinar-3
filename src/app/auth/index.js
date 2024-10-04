import { memo, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import AuthBlock from '../../containers/auth-block';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import AuthForm from '../../components/auth-form';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function Auth() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));

  useEffect(() => {
    if (select.isAuthenticated) {
      navigate('/profile');
    }
  }, [select.isAuthenticated]);

  console.log(select.isAuthentificated);

  return (
    <PageLayout>
      <AuthBlock />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <AuthForm />
    </PageLayout>
  );
}

export default memo(Auth);
