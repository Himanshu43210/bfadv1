import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { LINKEDIN_ICON } from "../utils/Const";

export default function Footer({ component }) {
  return (
    <footer className="footerdiv">
      <div className="footerlogo">
        <a className="footerlink">
          <a href={component.HomeLinks.url}>
            <img
              src="https://www.builderfloor.com/assets/imgs/template/BUILDER.png"
              alt=""
              width="80px"
              height="90px"
            />
          </a>
        </a>
      </div>
      <hr />
      <div className="footerlowerdiv">
        <div className="footer-social-icon">
          {component.social_media.map((social, index) => {
            const SocialIcon =
              social.name === LINKEDIN_ICON ? LinkedInIcon : InstagramIcon;
            return (
              <a key={index} href={social.url}>
                <SocialIcon />
              </a>
            );
          })}
        </div>
        <div className="footer-copyright">
          <p className="copyright">{component.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
