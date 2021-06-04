import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import SidebarItemHeader from '../../components/SidebarItemHeader';
import { members as membersMock } from '../../../../mocks';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.875rem'
  }
}));

export default function Membership({ projectId, content }) {
  const classes = useStyles();
  const { header } = content;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getMembers = (projectId) => {
      return membersMock[projectId];
    };

    setMembers(getMembers(projectId));
  }, [projectId]);

  return (
    <div>
      {header && <SidebarItemHeader header={header + ` - ${members.length}`} />}
      {members.map((member) => {
        return (
          <Typography key={member.id} className={classes.root} variant="body2">
            {member.first_name} {member.last_name}
          </Typography>
        );
      })}
    </div>
  );
}

Membership.propTypes = {
  projectId: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired
};
