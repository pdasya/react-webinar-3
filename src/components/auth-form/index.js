import { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Input from '../input';
import Spinner from '../spinner';
import './style.css';
import useTranslate from '../../hooks/use-translate';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const cn = bem('AuthForm');

  const { t } = useTranslate();

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    login: state.auth.loginValue,
    password: state.auth.passwordValue,
    error: state.auth.authError,
    waiting: state.auth.isAuthenticating,
  }));

  const callbacks = {
    onSubmitForm: useCallback(async () => {
      await store.actions.auth.auth();
      if (store.getState().auth.isAuthenticated) {
        navigate('/');
      }
    }, [store, navigate]),
    onChangeLogin: useCallback(value => store.actions.auth.setLoginValue(value), [store]),
    onChangePassword: useCallback(value => store.actions.auth.setPasswordValue(value), [store]),
  };

  useEffect(() => {
    return () => {
      store.actions.auth.resetForm();
    };
  }, [store]);

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('login.title')}</div>
      <form
        onSubmit={e => {
          e.preventDefault();
          callbacks.onSubmitForm();
        }}
      >
        <Spinner active={select.waiting}>
          <div className={cn('input')}>
            <label htmlFor="username">{t('login.username')}</label>
            <Input
              id="username"
              value={select.login}
              onChange={callbacks.onChangeLogin}
              label={t('login.username')}
            />
          </div>
          <div className={cn('input')}>
            <label htmlFor="username">{t('login.password')}</label>
            <Input
              id="password"
              type="password"
              value={select.password}
              onChange={callbacks.onChangePassword}
              label={t('login.password')}
            />
          </div>
          <div className={cn('row', { errors: true })}>{select.error}</div>
          <div className={cn('row')}>
            <button type="submit">{t('getIn')}</button>
          </div>
        </Spinner>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  t: PropTypes.func,
};

export default memo(AuthForm);
