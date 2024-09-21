import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function ModalLayout({ visible, setVisible, children }) {
  const cn = bem('ModalLayout');

  return (
    <div className={visible ? `ModalLayout active` : cn()} onClick={() => setVisible(false)}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default React.memo(ModalLayout);
