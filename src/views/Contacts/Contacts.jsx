import React from 'react';
import { Grid } from '@mui/material';

import contactData from './contactData';
import GroupCard from './GroupCard';

const Contacts = () => {
	//Height 16 px less than container

	return (
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
