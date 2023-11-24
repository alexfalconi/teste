// Context
import { MapProvider } from "./context/mapContext";

// Components
import Map from "./components/Map";
import Filter from "./components/Filter";

function App() {
	return (
		<MapProvider>
			<div className="app">
				<Filter />
				<Map />
			</div>
		</MapProvider>
	);
}

export default App;
