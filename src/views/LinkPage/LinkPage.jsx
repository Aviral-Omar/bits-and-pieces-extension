/*global browser*/
import React from 'react';
import { Grid, Button } from '@mui/material';

const getLink = name => {
	switch (name) {
		case 'AUGSD':
			return 'https://academic.bits-pilani.ac.in/Student_Login.aspx';
		case 'Nalanda':
			return 'https://nalanda-aws.bits-pilani.ac.in/my/';
		case 'ERP':
			return 'https://sis.erp.bits-pilani.ac.in/psc/sisprd/EMPLOYEE/SA/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL';
		case 'Notice Board':
			return 'https://onboard.bits-pilani.ac.in/ucp.php?mode=login&login=external&oauth_service=google';
		case 'SWD':
			return 'http://swd.bits-pilani.ac.in/Login.aspx';
		case 'Library':
			return 'http://library.bits-pilani.ac.in/login.php';
		case 'PSD':
			return 'http://psd.bits-pilani.ac.in/Login.aspx';
		case 'SU':
			return 'https://su-bitspilani.org/index.html';
		case 'Sports Union':
			return 'https://bits-sports.org/landing.html';
		case 'SAC':
			return 'https://sacbitspilani.wordpress.com/';
		case 'EPC':
			return 'https://epcbits.com/';
		case 'EC':
			return 'https://bitselections.wordpress.com/';
		case 'Time Table Generator':
			return 'https://timetable.bits-dvm.org/pilani.html';
	}
};

const getScript = name => {
	switch (name) {
		case 'AUGSD':
			return 'augsd';
		case 'Nalanda':
			return 'nalanda';
		case 'Time Table Generator':
			return 'ttgen';
	}
};

const makeActive = name => {
	switch (name) {
		case 'AUGSD':
			return false;
		default:
			return true;
	}
};

const createTab = async name => {
	const tab = await browser.tabs.create({
		url: getLink(name),
		active: makeActive(name),
	});
	return tab.id;
};

const automate = async (tabId, name) => {
	browser.webNavigation.onCompleted.addListener(
		async () => {
			try {
				await browser.tabs.executeScript(tabId, {
					file: `/content_scripts/${getScript(name)}.js`,
				});
			} catch (error) {
				console.error(error);
			}
		},
		{
			url: [
				{ urlMatches: 'https://academic.bits-pilani.ac.in/Student_Login.aspx' },
				{ urlMatches: 'https://nalanda-aws.bits-pilani.ac.in/login/index.php' },
			],
		},
	);
};

const handleLink = async name => {
	const tabId = await createTab(name);
	automate(tabId, name);
};

const LinkPage = () => {
	const links = [
		'AUGSD',
		'Nalanda',
		'ERP',
		'Notice Board',
		'SWD',
		'Library',
		'PSD',
		'SU',
		'Sports Union',
		'SAC',
		'EPC',
		'EC',
		'Time Table Generator',
	];

	return (
		<Grid container spacing={2}>
			{links.map(name => (
				<Grid item key={name} sm={3}>
					<Button variant="text" onClick={() => handleLink(name)} sx={{ width: 1 }}>
						{name}
					</Button>
				</Grid>
			))}
		</Grid>
	);
};

export default LinkPage;
