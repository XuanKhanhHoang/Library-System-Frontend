"use client";
import { getWebViewLinkFromWebContentLink } from "@/utils/handleImage";
import Slider from "react-slick";
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ right: "10px" }} onClick={onClick} />
  );
}
function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ left: "10px" }} onClick={onClick} />
  );
}
export default function ImageSlider({ data }: { data?: string[] }) {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  if (data?.length == 1) data.push(data[0]);
  return (
    <div className="w-4/12 px-4">
      <Slider {...settings} centerPadding="5px">
        {data && data.length > 0
          ? data.map((item, index) => {
              return (
                <img
                  src={getWebViewLinkFromWebContentLink(item)}
                  key={index}
                  alt="image"
                />
              );
            })
          : ["/utcLogo.png", "/utcLogo.png"].map((item, index) => {
              return <img src={item} key={index} alt="image" />;
            })}
      </Slider>
    </div>
  );
}
