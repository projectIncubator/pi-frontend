import React from 'react';
import Header from '../components/Header';

function About(props) {
  console.log(props);

  return (
    <div>
      <Header title="About" isAdmin />
    </div>
  );
}

export default About;
