/*global browser, chrome*/
import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Typography, Divider } from '@mui/material';

import { handleLink } from './linkData';

const LinkPage = () => {
	//TODO close popup on click
	const [links, setData] = useState([]);

	useEffect(() => {
		const changeData = async () => {
			try {
				const temp = await browser.storage.sync.get(['links']);
				setData(JSON.stringify(temp) === '{}' ? [] : temp.links);
			} catch {
				await chrome.storage.sync.get(['links'], temp => {
					setData(JSON.stringify(temp) === '{}' ? [] : temp.links);
				});
			}
		};
		changeData();
	}, []);

	const jsonData = JSON.stringify(links);

	//Height 16 px less than container
	return jsonData === '[]' ? (
		<Box />
	) : (
		<Box sx={{ height: 568 }}>
			{links.map(group => (
				<Box key={group.title} sx={{ mb: 2 }}>
					<Typography variant="h6" align="center" sx={{ mb: 1 }}>
						{`${group.title}`}
					</Typography>
					<Divider sx={{ my: 1 }} />
					<Grid
						container
						spacing={2}
						alignContent="flex-start"
						justifyContent="flex-start"
						alignItems="flex-start"
					>
						{group.links.map(link => (
							<Grid item key={link.name} sm={3}>
								<Button
									variant="text"
									onClick={() => handleLink(link)}
									sx={{ width: 1 }}
								>
									{link.name}
								</Button>
							</Grid>
						))}
					</Grid>
				</Box>
			))}
		</Box>
	);
};

export default LinkPage;
