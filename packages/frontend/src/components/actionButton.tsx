import React from "react";
import "../styling/actionButton.sass";

export interface ActionButtonProps {
  imagePath: string;
  text: string;
  action: CallableFunction;
  style?: ActionButtonStyling;
}

export interface ActionButtonStyling {
  backgroundColor?: string;
  color?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  cursor?: string;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: "row" | "column";
}

export const defaultActionButtonStyling: ActionButtonStyling = {
  backgroundColor: "black",
  color: "white",
  padding: "0 10px",
  border: "1px solid white",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
};

const ActionButton: React.FC<ActionButtonProps> = ({
  imagePath,
  text,
  action,
  style,
}) => {
  const buttonStyle = { ...defaultActionButtonStyling, ...(style || {}) }; // Merge default and provided styles

  return (
    <button
      style={buttonStyle}
      className="actionButton"
      onClick={() => {
        action(true);
      }}>
      <img className="actionImage" src={imagePath} alt="Action Button" />
      <p className="actionText">{text}</p>
    </button>
  );
};

export default ActionButton;
