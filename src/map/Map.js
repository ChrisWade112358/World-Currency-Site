import React, { useRef, useEffect, useContext, useState } from "react";
import './Map.css'
import mapboxgl from "mapbox-gl";
import { MapContext } from '../store/MapContext';
import findCountryIndex from '../store/FindCountryIndex';
import MapSidebar from "./mapSidebar/MapSidebar";




mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const MapboxGLMap = () => {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const lng = -32.87393;
  const lat = 43.6439;
  const zoom = 2;
  const maxZoom = 10;


  //Country Data State

  const countryData = useContext(MapContext);
  const sidebarData = useRef()

  
  
  
  
  
  useEffect(() => { 
        if (map.current) return;
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/chriswade112358/ckpro4ivq05yh17sec15y3js0",
        center: [lng, lat],
        zoom: zoom,
        minZoom: zoom,
        maxZoom: maxZoom,
        });
        let hoveredCountryId = null;

        map.current.on("style.load", function () {
        map.current.addLayer({
            id: "country-fills",
            type: "fill",
            source: "composite",
            "source-layer": "country_boundaries",
            layout: {},
            paint: {
            "fill-color": "#079432",
            "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                0.33,
                0.0,
            ],
            },
        });

        map.current.on("mousemove", "country-fills", function (e) {
            const cfeatures = map.current.queryRenderedFeatures(e.point, {
            layers: ["country-boundaries"],
            });
            if (hoveredCountryId) {
                map.current.setFeatureState(
                {
                    source: "composite",
                    sourceLayer: "country_boundaries",
                    id: hoveredCountryId,
                },
                {
                    hover: false,
                }
                );
            }
            hoveredCountryId = cfeatures[0].id;
            map.current.setFeatureState(
                {
                source: "composite",
                sourceLayer: "country_boundaries",
                id: hoveredCountryId,
                },
                { hover: true }
            );
            
        });

        map.current.on("mouseleave", "country-fills", function () {
            if (hoveredCountryId) {
            map.current.setFeatureState(
                {
                source: "composite",
                sourceLayer: "country_boundaries",
                id: hoveredCountryId,
                },
                { hover: false }
            );
            }
            hoveredCountryId = null;
        });

        map.current.on("click", function (e) {
            const features = map.current.queryRenderedFeatures(e.point, {
            layers: ["country-boundaries"],
            });
            
            if (features[0]) {
                let countryIndex = findCountryIndex(features[0].properties.iso_3166_1_alpha_3, countryData[0]);
                 sibebarData = countryData[0][countryIndex]
                console.log(sidebarData)
                    
            }
             
        });
    });
  });
  return (
    <div>
        {sidebarData.current ? <MapSidebar data={sidebarData} /> | console.log("didn't work")}
        <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapboxGLMap;
