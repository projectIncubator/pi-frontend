import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function Overview({ project }) {
  return (
    <div>
      <Header title={project.title} isAdmin status="ongoing" />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          efficitur eget nisi sit amet gravida. Phasellus eu blandit libero, a
          blandit est. Nullam vestibulum eget magna vel luctus. Morbi ac
          accumsan felis, in congue lacus. Aliquam faucibus, est et mollis
          euismod, lacus lorem consectetur velit, id bibendum nisl ex id neque.
          Cras porta justo non ipsum tincidunt, ac maximus neque bibendum. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Sed nibh tortor, placerat non suscipit eget, luctus id
          urna. Phasellus nisl magna, maximus sed nunc eget, venenatis
          sollicitudin diam. Sed metus orci, porttitor quis faucibus vel,
          tincidunt at tortor. Vivamus euismod suscipit leo, eu venenatis sem
          vehicula sit amet. Suspendisse convallis eget quam ac egestas.
        </p>
      ))}
    </div>
  );
}

Overview.propTypes = {
  project: PropTypes.object.isRequired
};
