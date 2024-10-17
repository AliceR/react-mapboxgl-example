import { Dispatch } from "react";
import Slider from "@mui/material/Slider";

interface Props {
  sliderValue: number;
  setSliderValue: Dispatch<number>;
}

const OpacitySlider = ({ sliderValue, setSliderValue }: Props) => (
  <div className="slider-container">
    <p>Opacity: </p>
    <Slider
      defaultValue={0.5}
      value={sliderValue}
      step={0.1}
      min={0}
      max={1}
      //@ts-ignore
      onChange={(_event, value) => setSliderValue(value)}
      style={{ width: "60vh" }}
    />
    <p>{sliderValue}</p>
  </div>
);

export default OpacitySlider;
