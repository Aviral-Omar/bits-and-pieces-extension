/*global browser, chrome */
import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';

import GroupCard from './GroupCard';

const Contacts = () => {
	const [contactData, setData] = useState([]);

	useEffect(() => {
		const changeData = async () => {
			try {
				const temp = await browser.storage.sync.get(['contactData']);
				setData(JSON.stringify(temp) === '{}' ? [] : temp.contactData);
			} catch {
				await chrome.storage.sync.get(['contactData'], temp => {
					setData(JSON.stringify(temp) === '{}' ? [] : temp.contactData);
				});
			}
		};
		changeData();
	}, []);

	const jsonData = JSON.stringify(contactData);
	//Height 16 px less than container

	return jsonData === '[]' ? (
		<Box />
	) : (
		<Grid
			container
			sx={{
				height: 568,
			}}
			spacing={2}
			alignContent="flex-start"
			justifyContent="flex-start"
			alignItems="flex-start"
		>
			{contactData.map(group => (
				<GroupCard groupData={group} key={group.title} />
			))}
		</Grid>
	);
};

export default Contacts;
