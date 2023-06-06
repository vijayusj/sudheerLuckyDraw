import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
useNavigate;

const Auth = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  // const [error, setError] = useState('');
  const [show, setShow] = useState();
  // console.log(input);
  const handler = (e) => {
    if (!input.trim().length) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
      return;
    }

    localStorage.setItem('user', input.split(' ')[0]);
    navigate('/');
  };
  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (user) navigate('/');
  // }, []);
  return (
    <div className="auth-cont">
      <div className="sub">
        <h2>
          Enter Your Name <span>👇🏻</span>
        </h2>

        <div className="det">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key && e.key == 'Enter') {
                handler();
              }
            }}
            required
          />
          <span type="submit" onClick={handler}>
            ➡️
          </span>
        </div>
        <h3 className={show ? 'show' : ''}>Please Enter Your Great Name</h3>
      </div>
    </div>
  );
};

export default Auth;
