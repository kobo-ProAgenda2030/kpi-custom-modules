import React from "react";

export const CustomIcon = ({
  onClick,
  icon,
}: {
  onClick?: () => void;
  icon: JSX.Element;
}) => {
  return (
    <div
      style={{
        width: 45,
        height: 45,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: 30,
        color: "white",
      }}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};
