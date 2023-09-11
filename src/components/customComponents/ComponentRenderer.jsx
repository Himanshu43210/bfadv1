import React from "react";
import ComponentSelector from "./ComponentSelector";

export default function RenderComponent({ jsonToRender }) {
  const renderComponent = (componentList) => {
    return componentList?.map((component) => {
      return (
        <div className={component?.className}>
          <ComponentSelector key={component.name} component={component} />
        </div>
      );
    });
  };
  return renderComponent(jsonToRender.children);
}
