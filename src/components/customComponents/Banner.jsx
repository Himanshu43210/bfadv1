import { FILTER } from "../newComponents/HeaderComp";
import RenderComponent from "./ComponentRenderer";
import SearchBar from "./SearchBar";

export default function Banner({ component }) {
  return (
    <>
      <article
        key={component.name}
        className={`banner ${component.className}`}
        style={{ backgroundImage: `url(${component.bgImage})` }}
      >
        <h1 className={`banner_text ${component.textClass}`}>
          {component.text}
          <br />
          {component.spanText && (
            <span className="banner_subtext">{component.spanText}</span>
          )}
        </h1>
        {/* <div className="md:hidden mt-6">
          <RenderComponent jsonToRender={FILTER} />
        </div> */}
      </article>
    </>
  );
}
