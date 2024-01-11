import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

function User() {

  const [ activeIndex,setActiveIndex ] = useState(0);
  const [ animating, setAnimating ] = useState(false);

  const items = [
    {
      url: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    }
  ]

  const next = () => {
    if(animating) return;
    const nextIndex = activeIndex === items.length -1 ? 0 : activeIndex + 1;

    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, key) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={key}
      >
        <div className='row d-flex justify-content-center'>
          <div className='col-10 col-md-8 d-flex align-items-center'>
            <video src={item.url} />
          </div>
          <div className='col-10 col-md-4 d-flex align-items-center'>
            <div className='row d-flex justify-content-center'>
              <div className='col-10 col-md-3 d-flex align-items-center'>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={500}
                height={300}
              />
              </div>
            </div>
          </div>
        </div>
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-10 col-md-3 d-flex align-items-center'>
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
             />
            {slides}
            <CarouselControl
              direction='prev'
              directionText='Previous'
              onClickHandler={previous}
             />
            <CarouselControl
              direction='next'
              directionText='Next'
              onClickHandler={next}
             />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default User