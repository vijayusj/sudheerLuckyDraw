import { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context/context';
const Timer = ({ cname, target }) => {
  const [time, setTime] = useState('');
  const [comp, setComp] = useState(false);
  const { got, buzzer, dune, game } = useGlobalContext();
  const music = useRef({
    got: false,
    buz: false,
  });
  // console.log(cname);
  // let gg = new Date().toLocaleDateString();
  // setTime(new Date().toLocaleTimeString());
  useEffect(() => {
    // const target = new Date().setHours(13, 40, 0);

    const interval = setInterval(() => {
      // new Date().setHours(h, m, s)
      const diff = target - new Date();
      // console.log(diff);
      if (diff < 0) {
        buzzer(false);
        setTime('Completed');
        setComp(true);
        if (cname === 'currentTimer') {
          game(true);
        }
        clearInterval(interval);
        return;
      }

      const { hours, minutes, seconds } = getRem(diff);

      if (!music.current.got && hours < 1 && minutes < 3 && seconds < 30) {
        // console.log('pp');
        music.current.got = true;
        // music.current.audio.play();
        got(true);

        setTimeout(() => {
          got(false);
          // console.log('i called');
        }, 100000);
      }
      if (hours < 1 && minutes < 1 && seconds < 11 && !music.current.buz) {
        music.current.buz = true;

        // console.log('cc');
        buzzer(true);
      }

      const formattedTime = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
      ].join(':');
      setTime(formattedTime);
      // setTime(new Date(diff).toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRem = (diff) => {
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { hours, minutes, seconds };
  };
  // console.log(cname, target);

  return <div className={comp ? 'timer comp' : 'timer'}>{time}</div>;
};

export default Timer;
