import React, { useState } from 'react';
import { Typography, Grid, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';

const Contact = props => {
	const [hover, setHover] = useState(false);
	const { contact } = props;

	return (
		<ListItem onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			<ListItemText
				primary={hover ? contact.number : contact.position}
				secondary={hover ? '' : contact.name}
			/>
		</ListItem>
	);
};

const GroupCard = props => {
	const [expanded, setExpanded] = useState(false);

	const { groupData } = props;
	return (
		<Grid item sm={6} onClick={() => setExpanded(!expanded)}>
			<Paper
				sx={{
					p: 1,
					textAlign: 'center',
					height: expanded ? 400 : 40,
					overflowY: expanded ? 'scroll' : 'hidden',
					cursor: 'pointer',
					transition: 'height 0.3s',
				}}
			>
				<Typography variant="h5" align="center">
					{groupData.title}
				</Typography>
				{expanded ? <Divider sx={{ my: 1 }} /> : <Box />}
				{expanded ? (
					<List>
						{groupData.contacts.map(contact => (
							<Contact key={contact.position} contact={contact} />
						))}
					</List>
				) : (
					<Box />
				)}
			</Paper>
		</Grid>
	);
};

Contact.propTypes = {
	contact: PropTypes.object,
};

GroupCard.propTypes = {
	groupData: PropTypes.array,
};

export default GroupCard;
