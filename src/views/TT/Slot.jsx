/* global browser*/
import React from 'react';
import { TableCell, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const createTab = async link => await browser.tabs.create({ url: link });

const Slot = props => {
	const { slot, link, day, index } = props;
	let clicks = [];
	let timeout;

	const clickHandler = event => {
		event.preventDefault();
		clicks.push(new Date().getTime());
		window.clearTimeout(timeout);
		timeout = window.setTimeout(() => {
			if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 300) {
				console.log('Double click');
			} else {
				createTab(link);
			}
		}, 250);
	};

	return (
		<TableCell
			sx={{
				backgroundColor:
					slot.type === 'L'
						? 'text.secondary'
						: slot.type === 'P'
						? 'success.main'
						: 'warning.main',
				cursor: 'pointer',
			}}
			onClick={clickHandler}
			key={`${day} ${index}`}
		>
			<Typography
				variant="body2"
				align="center"
				sx={{ color: 'white' }}
			>{`${slot.name}`}</Typography>
			<Typography
				variant="body2"
				align="center"
				sx={{ color: 'white' }}
			>{`${slot.type}${slot.section}`}</Typography>
		</TableCell>
	);
};

Slot.propTypes = {
	slot: PropTypes.object,
	link: PropTypes.string,
	day: PropTypes.number,
	index: PropTypes.number,
};

export default Slot;
