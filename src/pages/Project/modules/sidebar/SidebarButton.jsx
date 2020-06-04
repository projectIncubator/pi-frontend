import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

export default function SidebarButton({ text, header, ...props }) {
  return (
    <div>
      {header && <Typography variant="h6">{header}</Typography>}
      <Button {...props}>{text}</Button>
    </div>
  );
}

SidebarButton.propTypes = {
  text: PropTypes.string.isRequired,
  header: PropTypes.string
};
