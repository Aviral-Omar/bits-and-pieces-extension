/* global browser, chrome*/

import React, { useEffect, useState } from 'react';
import { Stack, TextField, Button } from '@mui/material';

import { handleLink } from '../LinkPage/linkData';

const WifiLogin = () => {
	const [credentials, setCredentials] = useState({ username: '', password: '' });

	useEffect(() => {
		const getCredentials = async () => {
			try {
				//Firefox
				const temp = await browser.storage.sync.get(['wifi']);
				if (JSON.stringify(temp) !== '{}') {
					setCredentials(temp.wifi);
				}
			} catch {
				// Chrome
				await chrome.storage.sync.get(['wifi'], temp => {
					if (JSON.stringify(temp) !== '{}') {
						setCredentials(temp.wifi);
					}
				});
			}
		};
		getCredentials();
	}, []);

	const updateLoginCredentials = async credentials => {
		try {
			await browser.storage.sync.set({ wifi: credentials });
		} catch {
			await chrome.storage.sync.set({ wifi: credentials });
		}
	};

	const handleUsername = event => {
		setCredentials({ ...credentials, username: event.target.value });
		updateLoginCredentials({ ...credentials, username: event.target.value });
	};

	const handlePassword = event => {
		setCredentials({ ...credentials, password: event.target.value });
		updateLoginCredentials({ ...credentials, password: event.target.value });
	};

	const handleSubmit = async () => {
		handleLink(
			{
				name: 'Wifi Login',
				url: 'https://fw.bits-pilani.ac.in:8090/httpclient.html',
			},
			credentials,
		);
	};

	return (
		//Height 16 px less than container

		<Stack
			spacing={1}
			alignItems="start"
			justifyContent="start"
			margin="auto"
			sx={{ height: 568 }}
		>
			<TextField
				id="username"
				label="Username"
				value={credentials?.username}
				variant="filled"
				onInput={handleUsername}
			/>
			<TextField
				id="password"
				label="Password"
				value={credentials?.password}
				variant="filled"
				onInput={handlePassword}
			/>
			<Button variant="contained" onClick={handleSubmit}>
				Login to BITS Wifi
			</Button>
		</Stack>
	);
};

export default WifiLogin;
