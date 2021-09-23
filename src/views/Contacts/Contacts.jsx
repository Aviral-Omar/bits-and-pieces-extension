import React from 'react';
import { Grid } from '@mui/material';

import contactData from './contactData';
import GroupCard from './GroupCard';

const Contacts = () => {
	return (
		<Grid
			container
			sx={{
				height: 568,
				overflowY: 'scroll',
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
