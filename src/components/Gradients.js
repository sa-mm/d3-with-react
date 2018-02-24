import React from "react";

export const SaintPetersburgGradient = () => (
  <linearGradient id="SaintPetersburgGradient" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0%" stopColor="#c3cfe2" />
    <stop offset="100%" stopColor="#f5f7fa" />
  </linearGradient>
);

export const LemonGate = () => (
  <linearGradient id="LemonGate" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0%" stopColor="#96fbc4 " />
    <stop offset="100%" stopColor="#f9f586  " />
  </linearGradient>
);

export const PhoenixStart = () => (
  <linearGradient id="PhoenixStart">
    <stop offset="0%" stopColor="#f83600 " />
    <stop offset="100%" stopColor="#f9d423" />
  </linearGradient>
);

export const SkyGradient = () => (
  <linearGradient id="SkyGradient">
    <stop offset="0%" stopColor="lightblue" stopOpacity=".5">
      <animate
        attributeName="stop-color"
        values="lightblue;blue;red;red;black;red;red;purple;lightblue"
        dur="14s"
        repeatCount="indefinite"
      />
    </stop>
    <stop offset="100%" stopColor="lightblue" stopOpacity=".5">
      <animate
        attributeName="stop-color"
        values="lightblue;orange;purple;purple;black;purple;purple;blue;lightblue"
        dur="14s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="offset"
        values=".95;.80;.60;.40;.20;0;.20;.40;.60;.80;.95"
        dur="14s"
        repeatCount="indefinite"
      />
    </stop>
  </linearGradient>
);

export const SnowAgain = () => (
  <linearGradient id="SnowAgain" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0%" stopColor="#e6e9f0  " />
    <stop offset="100%" stopColor="#eef1f5" />
  </linearGradient>
);
