import React from 'react';
import PropTypes from 'prop-types';

import SidebarHeader from '../../components/SidebarHeader';

export default function Resources({ text, content, header }) {
  return <div>{header && <SidebarHeader text={header} />}</div>;
}

Resources.propTypes = {
  text: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  header: PropTypes.string
};
