import React, { useState } from 'react';

import { Box, Container } from '@mui/material';

import Sidebar from './components/Sidebar';
import LinkPage from './views/LinkPage/LinkPage';
import TimeTable from './views/TT/TT';
import About from './views/About/About';
import Contacts from './views/Contacts/Contacts';

const App = () => {
	const [currentView, setView] = useState('tt');

	return (
		<div className="App">
			<Box sx={{ display: 'flex', overflowX: 'hidden' }}>
				<Sidebar setView={setView}></Sidebar>
				<Container
					component="main"
					sx={{
						p: 2,
						flexGrow: 1,
						overflow: 'hidden',
						height: 600,
					}}
				>
					{currentView === 'links' ? (
						<LinkPage />
					) : currentView == 'tt' ? (
						<TimeTable />
					) : currentView == 'contacts' ? (
						<Contacts />
					) : (
						<About />
					)}
				</Container>
			</Box>
		</div>
	);
};

export default App;
