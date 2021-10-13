import React, { useState } from "react";
import {
  FullscreenControl,
  InteractiveMap,
  LayerProps,
  NavigationControl,
  StaticMap,
  ViewportProps
} from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./BackdropMap.module.css";
import DeckGL, { H3HexagonLayer, ArcLayer, GeoJsonLayer, ScatterplotLayer/*IconLayer, iconAtlas, iconMapping*/ } from "deck.gl";
// import { MbxHomeControl } from "rmg-component-lib";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
//const AIR_PORTS =
//  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";
//const AIR_PORTS = require('../../data.json'); // 112400
//const AIR_PORTS = require('../../data_half.json'); // 50176
//const AIR_PORTS = require('../../data_quarter.json'); // 25068
const AIR_PORTS = require('../../data_small.json'); // 882
//const AIR_PORTS = require('./ne_10m_airports.json');
console.log(AIR_PORTS);
const HEX_DATA =
  "https://raw.githubusercontent.com/chriszrc/foss4g-2021-react-mapbox/main/deck-layers-map/public/data/hex_radio_coverage.json";
// "https://raw.githubusercontent.com/visgl/deck.gl-data/45e6a163f8d14e6ff50f4e01b3089643529c136f/website/sf.h3cells.json";

export type Viewport = Omit<ViewportProps, "width" | "height"> &
  Partial<{
    width: number | string;
    height: number | string;
  }>;

const BackdropMap = () => {
  const [viewport, setViewport] = useState<Viewport>({
    width: "100vw",
    height: "100vh",
    latitude: 35.565919029,
    longitude: -120.523254422,
    zoom: 17
  });
  //console.log(AIR_PORTS)
  const layers = [
    new GeoJsonLayer({ //https://deck.gl/docs/api-reference/layers/geojson-layer
      id: "Airports",
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 0.5,
      getPointRadius: (f: any) => 160 - f.properties["plant-vvi_mean"],
      getFillColor: [0, 188, 212, 100],
      getLineColor: [0, 188, 0, 255],
      getLineWidth: 0.25,
      stroked:true,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick: (info: any) =>
        // eslint-disable-next-line
        info.object &&
        alert(
          `${info.object.properties.plant_id} (${info.object.properties["plant-vvi_mean"]}) ${info.object.geometry.coordinates[0]}, ${info.object.geometry.coordinates[1]}`
        )
    }),
    /*new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: AIR_PORTS,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: (d:any) => d.object.geometry.coordinates,
      getRadius: 5, //(d:any) => Math.sqrt(d.exits),
      getFillColor: (d:any) => [255, 140, 0],
      getLineColor: (d:any) => [0, 0, 0]
    }),*/
    /*new IconLayer({ // FAILED TO WORK
      id: 'icon-layer',
      data: AIR_PORTS,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping:  {
        marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
      },
      getIcon: (d:any) => 'marker',
  
      sizeScale: 15,
      getPosition: (d:any) => d.object.geometry.coordinates,
      getSize: 5, //(d:any) => 5,
      getColor: [200, 0, 80, 180] //(d:any) => [Math.sqrt(d.object.properties["plant-vvi_mean"]), 140, 0]
    })*/
    /*new ArcLayer<any, {}>({
      id: "Arcs",
      data: AIR_PORTS,
      //NOTE good place to talk about generics in typescript
      dataTransform: (d: any) =>
        d.features.filter((f: any) => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: (f: any) => [-0.4531566, 51.4709959], // London
      getTargetPosition: (f: any) => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1,
      getHeight: 0,
      greatCircle: true
    }),
    new H3HexagonLayer({
      id: "H3 Radio Sources",
      data: HEX_DATA,
      pickable: true,
      wireframe: false,
      filled: true,
      extruded: true,
      elevationScale: 10000,
      getHexagon: (d: any) => d.hex,
      getFillColor: (d: any) => [255, (1 - d.count / 50) * 255, 0],
      getElevation: (d: any) => d.count,
      opacity: 0.4
    })*/
  ];

  return (
    <div className={styles.BackdropMap} data-testid="BackdropMap">
      <InteractiveMap
        mapStyle={
          "https://api.maptiler.com/maps/darkmatter/style.json?key=KPAes9JewZwTvw7aTuuq"
        }
        {...viewport}
        onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
      >
        <DeckGL initialViewState={viewport} layers={layers}></DeckGL>
        <div className={styles.navContainer}>
          <NavigationControl
            className="navigation-control"
            // style="navStyle"
          />
          <FullscreenControl style={{ top: -12 }} />
          {/*<MbxHomeControl
            //World bounds
            boundsExtent={[
              [-180, -40],
              [180, 70]
            ]}
            viewport={viewport}
            onViewportChange={(nextViewport: Viewport) => {
              console.log(nextViewport);
              setViewport({ ...viewport, ...nextViewport });
            }}
          />*/}
        </div>
      </InteractiveMap>
    </div>
  );
};

export default BackdropMap;
