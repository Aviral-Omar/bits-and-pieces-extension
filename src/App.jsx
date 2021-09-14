/*global browser*/
import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Container, Row } from 'react-bootstrap';

const getLink = name => {
	switch (name) {
		case 'AUGSD':
			return 'https://academic.bits-pilani.ac.in/Student_Login.aspx';
		case 'Nalanda AWS':
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
		case 'Nalanda AWS':
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

const LinkButton = props => {
	const { children } = props;
	return (
		<Button variant="light" onClick={() => handleLink(children)}>
			{children}
		</Button>
	);
};

LinkButton.propTypes = {
	children: PropTypes.string,
};

const App = () => (
	<div className="App">
		<Container>
			<Row>
				<ButtonGroup>
					<LinkButton>AUGSD</LinkButton>
					<LinkButton>Nalanda AWS</LinkButton>
					<LinkButton>ERP</LinkButton>
					<LinkButton>Notice Board</LinkButton>
					<LinkButton>SWD</LinkButton>
					<LinkButton>Library</LinkButton>
					<LinkButton>PSD</LinkButton>
				</ButtonGroup>
			</Row>
			<Row>
				<ButtonGroup>
					<LinkButton>SU</LinkButton>
					<LinkButton>Sports Union</LinkButton>
					<LinkButton>SAC</LinkButton>
					<LinkButton>EPC</LinkButton>
					<LinkButton>EC</LinkButton>
					<LinkButton>Time Table Generator</LinkButton>
				</ButtonGroup>
			</Row>
		</Container>
	</div>
);

export default App;
