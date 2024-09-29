import PropTypes from 'prop-types';
import { memo } from 'react';
import MainNavigation from '../main-navigation';
import './style.css';

function MainTool({ children }) {
  return (
    <div className="MainTool">
      <MainNavigation to="/" />
      {children}
    </div>
  );
}

MainTool.propTypes = {
  children: PropTypes.node,
};

export default memo(MainTool);
