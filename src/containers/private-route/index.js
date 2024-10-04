import { useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

/**
 * Контейнер для проверки сессии пользователя и управления маршрутами
 */
function PrivateRoute({ children, redirectTo = '/auth', inverse = false }) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if ((inverse && isAuthenticated) || (!inverse && !isAuthenticated)) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, inverse, redirectTo]);

  // Если это приватный маршрут (не для авторизации) и пользователь авторизован, рендерим содержимое
  if (!inverse && isAuthenticated) return children;

  // Если это публичный маршрут (страница авторизации), и пользователь не авторизован, рендерим содержимое
  if (inverse && !isAuthenticated) return children;

  return null; // Если пользователь не авторизован или переадресован, ничего не рендерим
}

export default memo(PrivateRoute);
