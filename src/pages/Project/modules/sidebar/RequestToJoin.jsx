import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import SidebarHeader from '../../components/SidebarHeader';

export default function RequestToJoin({ content }) {
  const { header } = content;

  return (
    <div>
      {header && <SidebarHeader header={header} />}
      <Button>Request to Join</Button>
    </div>
  );
}

RequestToJoin.propTypes = {
  content: PropTypes.object.isRequired
};
