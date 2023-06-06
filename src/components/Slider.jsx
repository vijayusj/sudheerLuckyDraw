import { useState, useEffect } from 'react';
// import { slides } from '../utils/slides';
const Slider = ({ slides, cname, height, width, dir } = props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [nextSlide, setNextSlide] = useState(slideIndex + 1);
  // console.log(cname, height);
  let row = dir === 'row';
  useEffect(() => {
    const mainEle = document.querySelector(cname);
    const ele = mainEle.querySelector('.slides');
    // console.log(ele);
    let nxtSlide = slideIndex === slides.length - 1 ? 0 : slideIndex + 1;
    const move = setTimeout(() => {
      // console.log(ele.offsetWidth, ele.getBoundingClientRect().width);
      if (dir === 'row') {
        ele.style.transform = `translateX(
          -${nxtSlide * (ele.getBoundingClientRect().width + 10)}px
        )`;
      } else {
        ele.style.transform = `translateY(
          -${nxtSlide * (ele.getBoundingClientRect().height + 10)}px
        )`;
      }
      setSlideIndex(nxtSlide);
    }, 2500);
    return () => clearTimeout(move);
  }, [slideIndex]);

  const handler = (index) => {
    const mainEle = document.querySelector(cname);
    const ele = mainEle.querySelector('.slides');
    setSlideIndex(index);
    if (dir === 'row') {
      ele.style.transform = `translateX(
        -${index * (ele.getBoundingClientRect().width + 10)}px
      )`;
    } else {
      ele.style.transform = `translateY(-${
        index * (ele.getBoundingClientRect().height + 10)
      }px)`;
    }
  };
  return (
    <div className="slider" style={{ height: `${height}`, width: `${width}` }}>
      <div
        className="slides"
        style={{ flexDirection: `${row ? 'row' : 'column'}` }}
      >
        {slides.map(({ src }, index) => {
          return (
            <img
              key={index}
              src={src}
              alt="slide"
              style={{ objectFit: `${row ? 'cover' : 'contain'}` }}
            />
          );
        })}
      </div>

      <div
        className="dots"
        style={{
          flexDirection: `${row ? 'row' : 'column'}`,
          left: `${row ? '50%' : '10%'}`,
        }}
      >
        {Array.from({ length: 5 }).map((item, index) => {
          return (
            <div
              key={index}
              className={slideIndex === index ? 'dot active' : 'dot'}
              onClick={() => handler(index)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
