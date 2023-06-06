import React, { useState } from 'react';
import Particle from '../components/Particle';
import im from '/slider2/sw3.jpg';
const Spin = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="spin-cont">
      <img src={im} alt="spin" />
    </div>
  );
};

export default Spin;
