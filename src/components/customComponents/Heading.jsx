import React from "react";

export default function Heading({ component }) {
  const name = component.name;
  const tag = component.tag;
  const className = component.className;
  const text = component.text;
  const Tag = tag || "h1";
  return (
    <Tag key={name} className={className}>
      {text}
    </Tag>
  );
}
