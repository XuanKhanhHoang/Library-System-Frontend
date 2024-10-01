import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SectionSliderProductCard from "../../components/Slider/SliderBookCard";
import { PRODUCTS, SPORT_PRODUCTS } from "../../data/data";
export default function Home() {
  return (
    <main>
      <SectionSliderProductCard
        data={[
          PRODUCTS[4],
          SPORT_PRODUCTS[5],
          PRODUCTS[7],
          SPORT_PRODUCTS[1],
          PRODUCTS[6],
        ]}
      />
    </main>
  );
}
