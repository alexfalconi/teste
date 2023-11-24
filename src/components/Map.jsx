import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";

import { mapContext } from "../context/mapContext";
import Popup from "./Popup";
import PopupContent from "./PopupContent";

const StyledContainer = styled.div`
	width: 100%;
	height: 100vh;
`;

const Map = () => {
	const [content, setContent] = useState([]);
	const [popupLngLat, setPopupLngLat] = useState(null);
	const { setMap, map, data } = useContext(mapContext);
	const mapContainer = useRef(null);

	function onPopupClose() {
		setContent([]);
		setPopupLngLat(null);
	}

	useEffect(() => {
		mapboxgl.accessToken =
			"pk.eyJ1IjoiYWxleGZhbGNvbmkiLCJhIjoiY2xwYm1ud2Z2MGZvczJtcGI0cmRhcWU2eCJ9.zkioZ6zIeNMu-Py8WvHrQQ";

		const initializeMap = ({ setMap, mapContainer }) => {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v11",
				center: [-49.4647564, -20.8166338],
				zoom: 6,
			});

			map.on("load", () => {
				setMap(map);

				map.resize();
			});

			map.on("load", () => {
				map.addSource("geojson-layer", {
					type: "geojson",
					data,
				});

				// Adiciona backgroud da area
				map.addLayer({
					id: "geojson-layer",
					type: "fill",
					source: "geojson-layer",
					layout: {},
					paint: {
						"fill-color": "#000",
						"fill-opacity": 0.3,
					},
				});

				// Adiciona border da area
				map.addLayer({
					id: "outline",
					type: "line",
					source: "geojson-layer",
					layout: {},
					paint: {
						"line-color": "#000",
						"line-width": 2,
					},
				});

				map.on("click", "geojson-layer", (e) => {
					const labels = e.features.map((feature, i) => (
						<PopupContent
							key={i}
							label={feature.properties.nome}
							area={feature.properties.area}
						/>
					));

					setContent(labels);
					setPopupLngLat(e.lngLat);
				});
			});
		};

		if (!map) initializeMap({ setMap, mapContainer });
	}, [map, setMap, data]);

	// Atualiza o mapa quando o estado 'data' for alterado
	useEffect(() => {
		if (map && data) {
			map.getSource("geojson-layer").setData(data);
		}
	}, [map, data]);

	return (
		<>
			{popupLngLat && (
				<Popup lngLat={popupLngLat} onClose={onPopupClose}>
					{content}
				</Popup>
			)}
			<StyledContainer ref={(el) => (mapContainer.current = el)} />
		</>
	);
};

export default Map;
