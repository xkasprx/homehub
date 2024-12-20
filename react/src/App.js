import './App.css';
import Home from './pages/Home';
import Chores from './pages/Chores';
import Meals from './pages/Meals';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';

function App() {
	useEffect(() => {
		let refreshInterval = 1000 * 60 * 60;

		setInterval(function() {
			window.location.reload(true);
		}, refreshInterval);

		let handleContextMenu = (event) => {
			event.preventDefault();
		};

		document.addEventListener('contextmenu', handleContextMenu);
		
		let handleMouseDown = (event) => {
			if (event.detail > 1) {
				event.preventDefault();
			}
		};

		let handleSelectStart = (event) => {
			event.preventDefault();
		};

		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('selectstart', handleSelectStart);
		
		return () => {
			document.removeEventListener('contextmenu', handleContextMenu);
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('selectstart', handleSelectStart);
		};
	}, []);
	
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/chores" element={<Chores />} />
					<Route path="/meals" element={<Meals />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
