import React, { useState } from 'react';

import { Box } from '@mui/material';

import Sidebar from './components/Sidebar';
import LinkPage from './views/LinkPage/LinkPage';
import TimeTable from './views/TT/TT';

const App = () => {
	const [currentView, setView] = useState('tt');

	return (
		<div className="App">
			<Box sx={{ display: 'flex' }}>
				<Sidebar setView={setView}></Sidebar>
				<Box component="main" sx={{ p: 2 }}>
					{currentView === 'links' ? <LinkPage /> : <TimeTable />}
				</Box>
			</Box>
		</div>
	);
};

export default App;
