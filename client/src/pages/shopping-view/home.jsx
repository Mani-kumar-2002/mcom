import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Static banners
  const banners = [bannerOne, bannerTwo, bannerThree];

  useEffect(() => {
    // Automatic slide change every 5 seconds
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {banners.map((banner, index) => (
          <img
            src={banner}
            key={index}
            alt={`Banner ${index + 1}`}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + banners.length) % banners.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default ShoppingHome;
