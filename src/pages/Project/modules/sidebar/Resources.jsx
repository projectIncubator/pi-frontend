import React from 'react';
import PropTypes from 'prop-types';
import { Link, Typography } from '@material-ui/core';

import { SidebarHeader } from '../../components';

export default function Resources({ content }) {
  const { header } = content;
  return (
    <div>
      {header && <SidebarHeader header={header} />}
      {content.resources.map((item, index) => {
        if (item.link) {
          return (
            <Typography key={index} variant="body2">
              <Link href={item.link} color="inherit">
                {item.text || item.type}
              </Link>
            </Typography>
          );
        }
      })}
    </div>
  );
}

Resources.propTypes = {
  content: PropTypes.object.isRequired
};
