import React, { createContext, useEffect, useState } from "react";

// Dados
import db from "../../data";

const mapContext = createContext(undefined);

function MapProvider({ children }) {
	const [popupContent, setPopupContent] = useState([]);
	const [map, setMap] = useState(null);
	const [lngLat, setLngLat] = useState({ lng: null, lat: null });
	const [data, setData] = useState(db);

	const Provider = mapContext.Provider;

	// useEffect(() => {
	// 	console.log(data);
	// }, [data]);

	return (
		<Provider
			value={{
				popupContent,
				setPopupContent,
				map,
				setMap,
				lngLat,
				setLngLat,
				data,
				setData,
			}}
		>
			{children}
		</Provider>
	);
}

export { MapProvider, mapContext };
