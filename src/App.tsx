import { useState } from "react";
import "./App.css";
import OpacitySlider from "./components/OpacitySlider.tsx";
import Map from "./components/Map";
import Source from "./components/Source.tsx";
import Layer from "./components/Layer.tsx.ts";

function App() {
  const [sliderValue, setSliderValue] = useState<number>(0.5);

  return (
    <>
      <div className="App-header">
        <h2>React + Mapbox GL = &lt;3</h2>
      </div>
      <Map>
        <Source
          id="meine-daten"
          url={"mapbox://aliceatd2d.1skjaazb"}
          layer="railwayLines-2es0gk"
          // map={null}
        >
          <Layer
            id="line-layer"
            paint={{
              "line-color": "purple",
            }}
            sliderValue={sliderValue}
          />
        </Source>
      </Map>
      <OpacitySlider
        setSliderValue={setSliderValue}
        sliderValue={sliderValue}
      />
    </>
  );
}

export default App;
