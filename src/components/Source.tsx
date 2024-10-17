import React, { ReactElement, useEffect, useState } from "react";
import { Map as MapboxMap, SourceSpecification } from "mapbox-gl";

type Props = {
  id: string;
  url: string;
  layer: string;
  children?: ReactElement<LayerProps>;
  map?: MapboxMap;
};

interface LayerProps {
  id: string;
  sourceId: string;
  sourceLayer: string;
  map: MapboxMap;
}

const Source = ({ id, url, layer, children, map }: Props) => {
  const [source, setSource] = useState<SourceSpecification>();

  useEffect(() => {
    let s = map?.getSource(id);
    if (!s) {
      // @ts-ignore
      s = map.addSource(id, { type: "vector", url });
    }
    // @ts-ignore
    setSource(s);
  }, []);

  return (
    <>
      {source &&
        children &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              sourceId: id,
              sourceLayer: layer,
              map,
            });
          }
        })}
    </>
  );
};

export default Source;
