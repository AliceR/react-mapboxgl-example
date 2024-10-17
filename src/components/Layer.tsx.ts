import { useEffect, useState } from "react";
import { Map as MapboxMap, PaintSpecification } from "mapbox-gl";
import merge from "lodash.merge";

type Props = {
  id: string;
  sliderValue: number;
  paint: PaintSpecification;
  sourceLayer?: string;
  sourceId?: string;
  map?: MapboxMap;
};

const Layer = ({
  id,
  sourceLayer,
  sourceId,
  paint,
  sliderValue,
  map,
}: Props) => {
  const [layer, setLayer] = useState(null);

  useEffect(() => {
    let l = map?.getLayer(id);
    if (!l) {
      //@ts-ignore
      l = map?.addLayer({
        id,
        source: sourceId,
        "source-layer": sourceLayer,
        type: "line",
        paint: merge(paint, {
          "line-opacity": sliderValue,
        }),
      });
    }

    // @ts-ignore
    setLayer(l);

    return () => {
      if (layer) map?.removeLayer(`${id}-layer`);
    };
  }, []);

  useEffect(() => {
    map?.setPaintProperty(id, "line-opacity", sliderValue);
  }, [sliderValue]);

  return null;
};

export default Layer;
