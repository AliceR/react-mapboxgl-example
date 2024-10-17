import React, { useLayoutEffect, useState, useRef, ReactElement } from "react";
import mapbox, { Map as MapboxMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  children?: ReactElement<LayerProps>;
}

interface LayerProps {
  map?: MapboxMap;
}

export default function Map({ children }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapboxMap>();

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const m = new mapbox.Map({
      accessToken:
        "pk.eyJ1IjoiYWxpY2VhdGQyZCIsImEiOiJja3UybDBzZjQwZ2xjMzFvNjdtNmlocGpuIn0.jwmGRapCKJECUnrnmtA-fw",
      container: ref.current,
      style: "mapbox://styles/mapbox/light-v9",
    });

    m.flyTo({ center: [13.29, 52.51], zoom: 9 });

    m.on("load", () => {
      setMap(m);
      if (process.env.NODE_ENV === "development") {
        // makes map accessible in console for debugging
        // @ts-ignore
        window.map = m;
      }
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="map" ref={ref} role="figure" aria-label="Interactive map.">
      {map &&
        children &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              map,
            });
          }
        })}
    </div>
  );
}
