import React, { useState } from 'react';

import { Box, Container } from '@mui/material';

import Sidebar from './components/Sidebar';
import LinkPage from './views/LinkPage/LinkPage';
import TimeTable from './views/TT/TT';
import About from './views/About/About';
import Contacts from './views/Contacts/Contacts';
import WifiLogin from './views/WifiLogin/WifiLogin';

const App = () => {
	const [currentView, setView] = useState('wifi');

	return (
		<div className="App">
			<Box sx={{ display: 'flex', overflowX: 'hidden' }}>
				<Sidebar setView={setView}></Sidebar>
				<Container
					component="main"
					sx={{
						p: 2,
						flexGrow: 1,
						height: 584,
						boxSizing: 'border-box',
					}}
				>
					{currentView === 'wifi' ? (
						<WifiLogin />
					) : currentView === 'links' ? (
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
