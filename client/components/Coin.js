import React from "react";
import Svg, { Path, Rect } from "react-native-svg";
import Theme from "../Theme";

export default function Coin() {
  return (
    <Svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M24.7398 13.0717C24.7398 19.4574 19.5426 24.6435 13.1199 24.6435C6.69721 24.6435 1.5 19.4574 1.5 13.0717C1.5 6.68604 6.69721 1.5 13.1199 1.5C19.5426 1.5 24.7398 6.68604 24.7398 13.0717Z"
        fill={Theme.colors.primary}
        stroke={Theme.colors.primary}
        stroke-width="3"
      />
      <Rect
        x="8.5"
        y="8.5"
        width="9"
        height="9"
        rx="2.5"
        fill={Theme.colors.primary}
        stroke="white"
        stroke-width="3"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
