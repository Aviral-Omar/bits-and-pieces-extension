import React, { useState } from 'react';

import { Box, ButtonGroup, Drawer, IconButton } from '@mui/material';
import { Event, Link } from '@mui/icons-material';

import LinkPage from './views/LinkPage/LinkPage';

const App = () => {
	const [currentView, setView] = useState('links');

	return (
		<div className="App">
			<Box sx={{ display: 'flex' }}>
				<Drawer
					variant="permanent"
					open
					sx={{
						py: 2,
						width: 64,
						'.MuiDrawer-paper': {
							py: 2,
							width: 64,
						},
					}}
				>
					<ButtonGroup orientation="vertical" size="large">
						<IconButton onMouseEnter={() => setView('tt')}>
							<Event />
						</IconButton>
						<IconButton onMouseEnter={() => setView('links')}>
							<Link />
						</IconButton>
					</ButtonGroup>
				</Drawer>
				<Box component="main" sx={{ p: 2 }}>
					{currentView === 'links' ? <LinkPage /> : <Box />}
				</Box>
			</Box>
		</div>
	);
};

export default App;
