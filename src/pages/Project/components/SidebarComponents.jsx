import React from 'react';
import PropTypes from 'prop-types';
import { SidebarButton, Membership, Resources, Text } from '../modules/sidebar';

export default function SidebarComponents({ component, project }) {
  switch (component.type) {
    case 'button':
      return <SidebarButton {...component} />;
    case 'membership':
      return <Membership {...component} projectId={project.id} />;
    case 'resources':
      return <Resources {...component} />;
    case 'text':
      return <Text {...component} />;
    default:
      return <></>;
  }
}

SidebarComponents.propTypes = {
  component: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};
