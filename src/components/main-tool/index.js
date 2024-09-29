import PropTypes from 'prop-types';
import { memo } from 'react';
import MainNavigation from '../main-navigation';
import './style.css';

function MainTool({ children, mainLabel }) {
  return (
    <div className="MainTool">
      <MainNavigation mainLabel={mainLabel} />
      {children}
    </div>
  );
}

MainTool.propTypes = {
  children: PropTypes.node,
  mainLabel: PropTypes.string.isRequired,
};

export default memo(MainTool);
