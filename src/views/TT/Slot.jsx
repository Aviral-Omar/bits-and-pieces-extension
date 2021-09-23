/* global browser*/
import React, { useState, useRef, useEffect } from 'react';
import {
	TableCell,
	Typography,
	Popover,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

const createTab = async url => {
	if (url) await browser.tabs.create({ url });
};

const Slot = props => {
	//TODO Add validation, hints, automate gmeet, add settings
	const [anchorEl, setAnchorEl] = useState(null);
	const cell = useRef(null);

	const { slot, slotLink, day, index, changePlatform, changeLink } = props;

	const [link, setLink] = useState(slotLink);

	let clicks = [];
	let timeout;
	const open = Boolean(anchorEl);
	const id = open ? 'popover' : undefined;

	const handleSelect = event => {
		setLink({ ...link, platform: event.target.value });
		changePlatform(day, index, event.target.value);
	};

	const handleLink = event => {
		setLink({ ...link, url: event.target.value });
		changeLink(day, index, event.target.value);
	};

	const openPopover = target => {
		setAnchorEl(target);
	};

	const handleClose = () => setAnchorEl(null);

	const clickHandler = event => {
		event.preventDefault();
		if (open) {
			return;
		}
		clicks.push(new Date().getTime());
		window.clearTimeout(timeout);
		timeout = window.setTimeout(() => {
			if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 300) {
				openPopover(cell.current);
			} else {
				createTab(link?.url);
			}
		}, 250);
	};

	useEffect(() => {
		setLink(slotLink);
	}, [slotLink]);

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
			ref={cell}
		>
			<Box>
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
			</Box>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
			>
				<Box sx={{ p: 1 }}>
					<FormControl fullWidth>
						<InputLabel id="platform-select-label">Platform</InputLabel>
						<Select
							labelId="platform-select-label"
							id="platform-select"
							value={link?.platform}
							label="Age"
							onChange={handleSelect}
							sx={{ mb: 1 }}
						>
							<MenuItem value="Google Meet">Google Meet</MenuItem>
							<MenuItem value="Microsoft Teams">Microsoft Teams</MenuItem>
						</Select>
						<TextField
							id="url"
							label="URL"
							value={link?.url}
							variant="filled"
							size="small"
							onChange={handleLink}
						/>
					</FormControl>
				</Box>
			</Popover>
		</TableCell>
	);
};

Slot.propTypes = {
	slot: PropTypes.object,
	slotLink: PropTypes.object,
	day: PropTypes.number,
	index: PropTypes.number,
	changePlatform: PropTypes.func,
	changeLink: PropTypes.func,
};

export default Slot;
