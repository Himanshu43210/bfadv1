import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useLocation } from "react-router-dom";
export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  const handleScroll = () => {
    // Show the "Scroll To Top" button when the user scrolls down 100px from the top
    const isTop = window.scrollY > 500;
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

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  }, [pathname]);

  return (
    <div
      className={`btn scroll-to-top ${isVisible ? "show-scroll-to-top" : ""}`}
      onClick={scrollToTop}
    >
      <AiOutlineArrowUp />
    </div>
  );
};
