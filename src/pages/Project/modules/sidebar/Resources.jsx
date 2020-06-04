import React from 'react';
import PropTypes from 'prop-types';
import { Link, Typography } from '@material-ui/core';

import { SidebarHeader } from '../../components';

export default function Resources({ content, header }) {
  return (
    <div>
      {header && <SidebarHeader text={header} />}
      {content.map((item, index) => {
        return (
          <Typography variant="body2">
            <Link key={index} href={item.link} color="inherit">
              {item.text}
            </Link>
          </Typography>
        );
      })}
    </div>
  );
}

Resources.propTypes = {
  content: PropTypes.array.isRequired,
  header: PropTypes.string
};
