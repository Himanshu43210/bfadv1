import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram.js";
import LinkedInIcon from "@mui/icons-material/LinkedIn.js";
import { INSTAGRAM_ICON, LINKEDIN_ICON } from "../utils/Const.js";

export default function Footer() {
  const social_media = [
    {
      name: INSTAGRAM_ICON,
      url: "https://www.instagram.com/",
    },
    {
      name: LINKEDIN_ICON,
      url: "https://www.linkedin.com/",
    },
  ];

  return (
    <footer className="footerdiv">
      <div className="footerlogo">
        <a className="footerlink" href={"/"}>
          <img
            src="/BUILDER.png"
            alt=""
            width="80px"
            height="90px"
          />
        </a>
      </div>
      <hr />
      <hr />
      <div className="footerlowerdiv">
        <div className="footer-social-icon">
          {social_media.map((social, index) => {
            const SocialIcon =
              social.name === LINKEDIN_ICON ? LinkedInIcon : InstagramIcon;
            return (
              <a key={index} href={social.url} className="btn footer_social_btn" target="blank">
                <SocialIcon />
              </a>
            );
          })}
        </div>
        <div className="footer-copyright">
          <p className="copyright">© Builder Floor Official 2022</p>
        </div>
      </div>
    </footer>
  );
}
