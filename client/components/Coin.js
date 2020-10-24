import React from "react";
import Svg, { Path, Rect } from "react-native-svg"


export default function Coin() {
  return (
    <Svg
      width="27"
      height="27"
      fill="none"
      viewBox="0 0 27 27"
    >
      <Path
        fill="#FFE75C"
        stroke="#D1B200"
        strokeWidth="3"
        d="M24.74 13.072c0 6.385-5.197 11.572-11.62 11.572-6.423 0-11.62-5.187-11.62-11.572C1.5 6.686 6.697 1.5 13.12 1.5c6.423 0 11.62 5.186 11.62 11.572z"
      ></Path>
      <Path
        fill="#373737"
        stroke="#D1B200"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M9.105 9.136H17.105V17.136H9.105z"
      ></Path>
    </Svg>
  );
}