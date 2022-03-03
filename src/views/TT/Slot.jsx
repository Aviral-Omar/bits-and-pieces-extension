/* global browser, chrome*/
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

const Slot = props => {
	//TODO Automate gmeet, add settings
	const [anchorEl, setAnchorEl] = useState(null);
	const [error, setError] = useState(false);
	const cell = useRef(null);

	const { slot, slotLink, day, index, changePlatform, changeLink } = props;
	const [link, setLink] = useState(slotLink);

	let clicks = [];
	let timeout;
	const open = Boolean(anchorEl);
	const id = open ? 'popover' : undefined;

	const linkHandler = tabId => {
		try {
			browser.webNavigation.onCompleted.addListener(
				async () => {
					try {
						await browser.tabs.executeScript(tabId, {
							file: `/content_scripts/meet.js`,
						});
						browser.tabs.update(tabId, { active: true });
					} catch (error) {
						console.error(error);
					}
				},
				{
					url: [{ urlContains: 'https://meet.google.com' }],
				},
			);
		} catch {
			chrome.webNavigation.onCompleted.addListener(
				async () => {
					try {
						chrome.tabs.executeScript(tabId, {
							file: `/content_scripts/meet.js`,
						});
						chrome.tabs.update(tabId, { active: true });
					} catch (error) {
						console.error(error);
					}
				},
				{
					url: [{ urlContains: 'https://meet.google.com' }],
				},
			);
		}
	};

	const createTab = async () => {
		let tab;
		if (link?.url) {
			try {
				tab = await browser.tabs.create({
					url:
						link.platform === 'gmeet'
							? `https://meet.google.com/${link.url}`
							: link.url,
					active: false,
				});
				if (link.platform === 'gmeet') linkHandler(tab.id);
			} catch {
				await chrome.tabs.create(
					{
						url:
							link.platform === 'gmeet'
								? `https://meet.google.com/${link.url}`
								: link.url,
						active: false,
					},
					tab => {
						if (link.platform === 'gmeet') {
							linkHandler(tab.id);
						}
					},
				);
			}
		}
	};

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
			} else if (!error) {
				createTab();
			}
		}, 250);
	};

	const validateUrl = () => {
		if (link?.platform === 'gmeet') {
			if (link.url.search(/^[a-z]{3}-[a-z]{4}-[a-z]{3}$/) && link.url.search(/^[a-z]{10}$/)) {
				return setError(true);
			}
		}
		setError(false);
	};

	useEffect(() => {
		setLink(slotLink);
	}, [slotLink]);

	useEffect(() => {
		validateUrl();
	}, [link]);

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
							<MenuItem value="gmeet">Google Meet</MenuItem>
							<MenuItem value="teams">Microsoft Teams</MenuItem>
						</Select>
						<TextField
							id="url"
							label="URL"
							value={link?.url}
							variant="filled"
							size="small"
							onInput={handleLink}
							helperText={
								link?.platform == 'gmeet'
									? 'Enter meeting code'
									: 'Enter channel link'
							}
							error={error}
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
