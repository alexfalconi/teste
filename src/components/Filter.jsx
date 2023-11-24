// Styles
import "./Filter.scss";

import React, { useContext, useEffect, useState } from "react";
import { mapContext } from "../context/mapContext";

// Icons
import { IoIosAddCircle } from "react-icons/io";
import { IoMdRemoveCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

const Filter = () => {
	const { data, setData } = useContext(mapContext);
	const [dataCurrent] = useState(data);
	const [filterOpen, setFilterOpen] = useState(false);

	// Remove a area do mapa
	const handleRemoveItem = (item) => {
		const newData = data.features.filter((feature) => feature !== item);
		setData({ ...data, features: newData });
	};

	// Adiciona a area novamente no mapa
	const handleAddItem = (item) => {
		const newData = [...data.features, item];
		setData({ ...data, features: newData });
	};

	// Remove todos os filtros
	const handleRemoveFilter = () => {
		setData(dataCurrent);
	};

	// Verifica se o item está removido
	const isItemRemoved = (item) => {
		return !data.features.includes(item);
	};

	return (
		<div className={`filter ${filterOpen ? "is-open" : ""}`}>
			<div className="filter-toogle" onClick={() => setFilterOpen(!filterOpen)}>
				<FaArrowRight />
			</div>

			<h2>Filtrar áreas</h2>

			<div className="filter-scroll">
				<ul>
					{dataCurrent.features.map((item, i) => (
						<li key={i} className={isItemRemoved(item) ? "disabled" : ""}>
							{item.properties.nome}
							<div className="filter-buttons">
								{isItemRemoved(item) ? (
									<button className="add" onClick={() => handleAddItem(item)}>
										<IoIosAddCircle />
									</button>
								) : (
									<button
										className="remove"
										onClick={() => handleRemoveItem(item)}
									>
										<IoMdRemoveCircle />
									</button>
								)}
							</div>
						</li>
					))}
				</ul>
			</div>

			{data.features.length !== dataCurrent.features.length && (
				<div className="filter-bottom">
					<button className="btn" onClick={handleRemoveFilter}>
						remover filtro
					</button>
				</div>
			)}
		</div>
	);
};

export default Filter;
