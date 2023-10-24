import PropTypes from "prop-types";
import React from "react";
import { RocketLaunch } from "./RocketLaunch";
import "../styles/style.css";

interface Props {
  hasLeftIcon: boolean;
  hasText: boolean;
  text: string;
  property1:
    | "primary-filled"
    | "secondary-outlined"
    | "primary-outlined"
    | "tertiary-filled"
    | "tertiary-outlined"
    | "secondary-filled";
  style: any;
}

export const Button = ({
  hasLeftIcon = true,
  hasText = true,
  text = "Button",
  property1,
  style,
}: Props): JSX.Element => {
  return (
    <div className={`button ${property1}`} style={style}>
      {hasLeftIcon && (
        <RocketLaunch
          color={
            ["primary-outlined", "secondary-outlined", "tertiary-outlined"].includes(property1) ? "#A259FF" : "white"
          }
          style={{
            height: "20px",
            minWidth: "20px",
            position: "relative",
          }}
        />
      )}

      {hasText && <div className="text-wrapper">{text}</div>}
    </div>
  );
};

Button.propTypes = {
  hasLeftIcon: PropTypes.bool,
  hasText: PropTypes.bool,
  text: PropTypes.string,
  property1: PropTypes.oneOf([
    "primary-filled",
    "secondary-outlined",
    "primary-outlined",
    "tertiary-filled",
    "tertiary-outlined",
    "secondary-filled",
  ]),
};