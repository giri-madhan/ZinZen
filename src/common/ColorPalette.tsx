import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { darkModeState } from "@src/store";
import { colorPalleteList } from "@src/utils";
import { ColorPaletteProps } from "@src/Interfaces/ICommon";

const ColorPalette: React.FC<ColorPaletteProps> = ({ colorIndex, setColorIndex }) => {
  const darkModeStatus = useRecoilValue(darkModeState);
  const [open, setOpen] = useState(false);
  return !open ? (
    <button
      type="button"
      className="form-tag"
      onClick={() => setOpen(true)}
      style={{ color: "black", backgroundColor: colorPalleteList[colorIndex], margin: "1em 0 0.5em 0" }}
    >
      Change Color
    </button>
  ) : (
    <div className={`colorPallette${darkModeStatus ? "-dark" : ""}`}>
      {
        colorPalleteList.map((color, index) => (
          <button
            type="button"
            key={`color-${color}`}
            style={{ backgroundColor: color }}
            className="color"
            onClick={() => { setOpen(false); setColorIndex(index); }}
          > { colorIndex === index ? "✔" : ""}
          </button>
        ))
      }
    </div>
  );
};

export default ColorPalette;
