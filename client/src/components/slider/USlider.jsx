import { useRef } from "react";
import Carousel from "react-elastic-carousel";
import "./uslider.css";

const USlider = () => {

  let carouselRef = useRef(null);
  return (
  <div>
      <button onClick={() => carouselRef.slidePrev()}>Prev</button>
      <button onClick={() => carouselRef.slideNext()}>Next</button>
      <hr />
      <Carousel
      ref={ref => (carouselRef = ref)}
      pagination={false}
      itemsToShow={1}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
      </Carousel>
  </div>
  );
};

export default USlider;
