import { useState, useEffect, useRef, useMemo } from 'react';
import Timer from '../components/Timer';
import { BsFillLightbulbFill } from 'react-icons/bs';
import Particle from '../components/Particle';
import { useGlobalContext } from '../context/context';
import bell from '/bell.mp3';
import fs from '/fs.mp3';
// import { FontAwesomeIcon } from 'react-fontawesome';
const lights = Array.from({ length: 4 }).map((i, index) => {
  const ran = ['ic-green ic', 'ic-blue ic', 'ic-yellow ic'];
  return (
    <li key={index}>
      <BsFillLightbulbFill
        className={ran[Math.floor(Math.random() * ran.length)]}
      />
    </li>
  );
});

const data = [
  'Vijay',
  'sudheer',
  'harsha',
  'yasin',
  'sasi',
  'ramoji',
  'althaf',
  'krishna',
  'madhu',
  'ravi',
  'venky',
  'basha',
  'chiru',
  'ntr',
  'ram charan',
  'vijay',
  'sudheer',
  'harsha',
  'yasin',
  'sasi',
  'ramoji',
  'althaf',
  'krishna',
  'madhu',
  'ravi',
  'venky',
  'basha',
  'chiru',
  'ntr',
  'ram charan',
];

// let balance = 500;

const LuckyDraw = () => {
  const [winner, setWinner] = useState(-1);
  const [play, setPlay] = useState(false);
  const [show, setShow] = useState(false);
  const [bal, setBal] = useState(600);
  const { dune, game, game_status } = useGlobalContext();
  const user = localStorage.getItem('user') || 'Jonathan';

  const track = useRef({
    crackers: new Audio(fs),
    bell: new Audio(bell),
  });

  const d = new Date();

  const mt = new Date().setMinutes(d.getMinutes() + 3);
  const opt = {
    cname: 'currentTimer',
    target: mt,
  };
  const currentDate = new Date();
  const dayName = currentDate.toLocaleDateString('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
  });
  // console.log('start');

  // console.log('vinay');

  const upcoming = Array.from({ length: 6 }).map((item, index) => {
    return `${index + 1}pm`;
  });

  // let random = data.length;
  const handler = () => {
    const bulbCont = document.querySelector('.big-draw');

    const bulbs = bulbCont.querySelectorAll('.ic');
    // console.log(bulbCont);
    bulbs.forEach((bulb, index) => {
      bulb.classList.remove('ic');
      bulb.style.animationDelay =
        index < 10 ? `0.${index * 1}s` : `1.${index % 10}s`;
    });

    setPlay(true);

    dune(true);

    setTimeout(() => {
      setPlay(false);

      setShow(true);
      dune(false);
      track.current.crackers.play();
    }, 41800);

    setTimeout(() => {
      setShow(false);
      track.current.crackers.pause();
      bulbs.forEach((bulb) => bulb.classList.add('ic'));
      game(false);
    }, 92000);
  };
  // console.log('oo');
  const handleBet = (e) => {
    e.preventDefault();
    const mainEle = e.target;
    //check bet is already placed
    const betSpam = mainEle.classList.contains('active');
    if (betSpam) return;
    /////
    const balEle = document.querySelector('.curbal');
    const parent = e.target.parentElement.parentElement;
    const ele = parent.querySelector('.bet-slip');
    const uncheck = parent.querySelector('.uncheck');
    const isTrue = ele.classList.contains('bet-active');
    // console.log(isTrue);

    // setBet(!bet);
    if (isTrue) {
      let temp_Bal = bal - 100;
      if (temp_Bal < 0) {
        ele.classList.toggle('bet-active');
        return;
      }
      setBal(temp_Bal);
      track.current.bell.currentTime = 0;
      track.current.bell.play();
      uncheck.classList.add('check');
      mainEle.classList.add('active');
      balEle.classList.add('act-bal');
      setTimeout(() => {
        balEle.classList.remove('act-bal');
      }, 250);
    }

    ele.classList.toggle('bet-active');
  };

  const handleCurrentBet = (e) => {
    const ele = e.target;
    const placed = ele.classList.contains('placed');
    const pop = e.target.parentElement.querySelector('.pop');
    const active = pop.classList.contains('pop-active');

    if (placed) return;
    // const active = ele.classList.contains('active');
    const balEle = document.querySelector('.curbal');
    // console.log(balEle);

    if (active) {
      let temp_Bal = bal - 100;
      if (temp_Bal < 0) {
        ele.classList.toggle('pop-active');
        return;
      }
      const win = Math.floor(data.length / 2);
      data[win] = user;
      setWinner(win);
      track.current.bell.play();
      setBal(temp_Bal);
      ele.classList.add('placed');
      balEle.classList.add('act-bal');
      setTimeout(() => {
        balEle.classList.remove('act-bal');
      }, 250);
    }
    // ele.classList.toggle('active');
    pop.classList.toggle('pop-active');
    // console.log('uu');
  };
  useEffect(() => {
    if (play) {
      const vijay = setInterval(() => {
        let random = Math.floor(Math.random() * data.length);
        setWinner(random);
      }, 1000);
      return () => clearInterval(vijay);
    }
  }, [play, winner]);
  useEffect(() => {
    if (game_status) {
      // console.log('lets play');
      handler();
    }
  }, [game_status]);

  return (
    <div className="luckyDraw-cont">
      <div className="head">
        <div className="upcoming">
          <div className="title">UpComing Events </div>
          {upcoming.map((item, index) => {
            const currentTime = new Date();
            currentTime.setHours(currentTime.getHours() + 1 + index, 0, 0);
            const updatedHour = currentTime.getHours();

            let opt = {
              cname: `tl${index}`,
              target: currentTime,
            };
            // console.log(opt.target);
            return (
              <div key={index} className="event">
                <div className="uncheck">✅</div>
                <div className="det">
                  <div className="time">
                    <span>{dayName}</span>

                    <span style={{ marginLeft: '20%' }}>
                      {updatedHour % 12 == 0 ? 12 : updatedHour % 12}
                    </span>
                    <span>{updatedHour > 12 ? 'pm' : 'am'}</span>
                  </div>
                  <div className={`tl${index}`}>
                    <Timer {...opt} />
                  </div>
                  <div className="bet" onClick={handleBet}>
                    BET
                  </div>
                </div>
                <div className="bet-slip">
                  <div className="input">
                    <span>⛔&#8377;100</span>
                    {/* <input type="number" /> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="middle">
          <div className="text">
            <h2>
              {' '}
              <span>🧑🏻‍✈️</span>
              {user}
            </h2>
            <p>
              Balance:&#8377;<span className="curbal">{bal}</span>
            </p>
          </div>
          <div className="current">
            <h4>
              Current <span>👀</span>
            </h4>
            <div className="placer">
              <div className="bet curr" onClick={handleCurrentBet}>
                Bet
              </div>
              <div className="pop">⛔&#8377;100</div>
            </div>
          </div>
          <Timer {...opt} />
        </div>
        <div className="image">
          <img src="/lucky.png" alt="" />
        </div>
      </div>
      <div className="big-draw">
        {/* <audio ref={track} src={dune} /> */}
        <ul className="l-horz lights-top">{lights}</ul>
        <div className="l-vert lights-left">{lights}</div>
        <ul className="l-horz lights-bottom">{lights}</ul>
        <div className="l-vert lights-right">{lights}</div>
        <div className="draw">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className={index === winner ? 'item active' : 'item'}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className={show ? 'winner looser' : 'looser'}>
          <h4>congratulations</h4>
          <h3>{data[winner]}</h3>
          <h5>You won &#8377;3000</h5>
        </div>
        {show && <Particle />}
      </div>

      {/* <div className="btn">
        <button className="draw-btn" onClick={handler}>
          Draw
        </button>
      </div> */}
    </div>
  );
};

export default LuckyDraw;
