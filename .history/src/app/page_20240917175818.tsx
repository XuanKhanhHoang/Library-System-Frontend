export default function Home() {
  return (
    <main>
      <div className="relative w-full">
        <div className="relative swiper multiple-slide-carousel swiper-container">
          <div className="mb-16 swiper-wrapper">
            <div className="swiper-slide">
              <div className="flex items-center justify-center bg-indigo-50 rounded-2xl h-96">
                <span className="text-2xl font-semibold text-indigo-600">
                  Slide 1{" "}
                </span>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="flex items-center justify-center bg-indigo-50 rounded-2xl h-96">
                <span className="text-2xl font-semibold text-indigo-600">
                  Slide 2{" "}
                </span>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="flex items-center justify-center bg-indigo-50 rounded-2xl h-96">
                <span className="text-2xl font-semibold text-indigo-600">
                  Slide 3{" "}
                </span>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="flex items-center justify-center bg-indigo-50 rounded-2xl h-96">
                <span className="text-2xl font-semibold text-indigo-600">
                  Slide 4{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="absolute left-0 right-0 flex items-center justify-center m-auto w-fit bottom-12">
            <button
              id="slider-button-left"
              className="swiper-button-prev group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full  hover:bg-indigo-600 !-translate-x-16"
              data-carousel-prev
            >
              <svg
                className="w-5 h-5 text-indigo-600 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              id="slider-button-right"
              className="swiper-button-next group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full hover:bg-indigo-600 !translate-x-16"
              data-carousel-next
            >
              <svg
                className="w-5 h-5 text-indigo-600 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
