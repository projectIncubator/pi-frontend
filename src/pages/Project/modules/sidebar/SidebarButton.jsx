import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import SidebarHeader from '../../components/SidebarHeader';

export default function SidebarButton({ content, ...props }) {
  const { text, header } = content;

  return (
    <div>
      {header && <SidebarHeader header={header} />}
      <Button {...props}>{text}</Button>
    </div>
  );
}

SidebarButton.propTypes = {
  content: PropTypes.object.isRequired
};
