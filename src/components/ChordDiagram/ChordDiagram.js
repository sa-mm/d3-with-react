import React from "react";
import { chord, ribbon } from "d3-chord";
// import { formatPrefix } from "d3-format";
import { descending, range } from "d3-array";
import { arc } from "d3-shape";
import { scaleOrdinal } from "d3-scale";
import { rgb } from "d3-color";

const ChordDiagram = props => {
  const { data, vb, margin, height, width } = props;
  const outerRadius = Math.min(width, height) * 0.5 - 40;
  const innerRadius = outerRadius - 30;

  // const formatValue = formatPrefix(",.0", 1e3);

  const d3Chord = chord()
    .padAngle(0.05)
    .sortSubgroups(descending);

  const chords = d3Chord(data);

  const d3Arc = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const d3Ribbon = ribbon().radius(innerRadius);

  const color = scaleOrdinal()
    .domain(range(4))
    .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

  return (
    <div>
      <svg viewBox={`0 0 ${vb.width} ${vb.height}`}>
        <g transform={`translate(${margin.right},${margin.left})`}>
          <g transform={`translate(${width / 2},${height / 2})`}>
            {chords.groups.map((group, idx) => {
              return (
                <g key={`group-index-${idx}`}>
                  <path
                    fill={color(idx)}
                    stroke={rgb(color(idx)).darker()}
                    d={d3Arc(group)}
                  />
                </g>
              );
            })}
            <g fillOpacity="0.67">
              {chords.map((chord, idx) => {
                return (
                  <path
                    key={`chord-idx-${idx}`}
                    fill={color(chord.target.index)}
                    stroke={rgb(color(chord.target.index)).darker()}
                    d={d3Ribbon({ source: chord.source, target: chord.target })}
                  />
                );
              })}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ChordDiagram;
