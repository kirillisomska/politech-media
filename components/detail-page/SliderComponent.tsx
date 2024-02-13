"use client";
import type { Slide } from "@prisma/client";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type PropTypes = {
  slider: Slide[];
};

const SliderComponent = ({ slider }: PropTypes) => {
  return (
    <div className="w-full mx-auto max-w-[1280px] mt-8">
      <Slider infinite={true} dots={true} slidesToScroll={1} slidesToShow={1} autoplay={true} cssEase="linear" autoplaySpeed={6000} speed={2000} pauseOnHover={true}>
        {slider.map((slide) => (
          <div key={slide.id} className="focus:outline-none flex-col items-center">
            <Image src={slide.imageUrl} alt={slide.text} width={1280} height={720} className="max-h-[500px] object-contain"/>
            <hr className="w-[10%] h-[1px] mx-auto my-2 bg-gray-400 border-0 rounded" />
            <p className="text-center max-w-[500px] mx-auto">{slide.text}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
