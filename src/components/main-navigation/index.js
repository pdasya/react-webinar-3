import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function MainNavigation({ mainLabel }) {
  return (
    <Link to="/" className="MainNavigation">
      {mainLabel}
    </Link>
  );
}

MainNavigation.propTypes = {
  mainLabel: PropTypes.string.isRequired,
};

export default MainNavigation;
