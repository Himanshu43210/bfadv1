import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Show the "Scroll To Top" button when the user scrolls down 100px from the top
    const isTop = window.scrollY > 100;
    setIsVisible(isTop);
  };

  const scrollToTop = () => {
    // Scroll to the top of the page when the button is clicked
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`scroll-to-top ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <AiOutlineArrowUp />
    </div>
  );
};
