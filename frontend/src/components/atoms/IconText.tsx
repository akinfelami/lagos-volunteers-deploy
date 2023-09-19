import React from "react";

interface IconTextProps {
  icon: any;
  text: string;
}

/**
 * A IconText component is a small line of text prefaced by an icon
 */
const IconText = ({ icon, text }: IconTextProps) => {
  return (
    <>
      <div className="flex items-center">
        <div className="flex-left p-1">{icon}</div>
        <div className="flex-left">{text}</div>
      </div>
    </>
  );
};

export default IconText;
