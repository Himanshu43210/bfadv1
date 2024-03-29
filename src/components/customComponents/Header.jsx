import React from "react";

export default function Header({ component, isMobile }) {
  return (
    <div className="logodiv">
      {!isMobile ? (
        <a className="headerlink" href={component.url}>
          <img src={component.image} alt="" width="40px" height="50px" />
          {component.title}
        </a>
      ) : (
        <></>
      )}
    </div>
  );
}
