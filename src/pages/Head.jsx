import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Slider from '../components/Slider';
import { slider1, slider2, slider3 } from '../utils/sliders';
const Head = () => {
  const opts = ['circket', 'luckyDraw', 'spin', 'login'];
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const opt1 = {
    slides: slider1,
    cname: '.s1',
    height: '84vh',
    width: '70vw',

    dir: 'row',
  };
  const opt2 = {
    slides: slider2,
    cname: '.s2',
    height: '40vh',
    width: '30vw',

    dir: 'column',
  };
  const opt3 = {
    slides: slider3,
    cname: '.s3',
    height: '40vh',
    width: '30vw',

    dir: 'column',
  };
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);
  return (
    <div
      className="head
    "
    >
      <div className="nav">
        <div className="logo">
          <img src="logo.svg" alt="logo" />
        </div>
        <div className="options">
          <ul className="list">
            {opts.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={item}
                    className={({ isActive }) =>
                      isActive ? 'item isActive' : ' item'
                    }
                  >
                    {item}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="rem">
        <div className="s1">
          <Slider {...opt1} />
        </div>
        <div className="twins">
          <div className="s2">
            <Slider {...opt2} />
          </div>
          <div className="s3">
            <Slider {...opt3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
