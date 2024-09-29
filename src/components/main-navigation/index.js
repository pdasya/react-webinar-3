import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useLocale from '../../locale/use-locale';
import './style.css';

function MainNavigation() {
  const { translate } = useLocale();

  return (
    <Link to="/" className="MainNavigation">
      {translate('main-page')}
    </Link>
  );
}

MainNavigation.propTypes = {
  translate: PropTypes.func,
};

export default MainNavigation;
