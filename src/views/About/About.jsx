import React from 'react';
import { Avatar, Stack, Typography, IconButton } from '@mui/material';
import { LinkedIn, GitHub } from '@mui/icons-material';

import avatar from './dp2sq.jpg';

const About = () => (
	//Height 16 px less than container

	<Stack
		spacing={1}
		alignItems="center"
		justifyContent="center"
		margin="auto"
		sx={{ height: 568 }}
	>
		<Avatar src={avatar} sx={{ width: 96, height: 96 }} />
		<Typography variant="h4" align="center">
			Aviral Omar
		</Typography>
		<Typography variant="h5" align="center">
			2019B3A70411P
		</Typography>
		<Typography variant="h6" align="center">
			f20190411@pilani.bits-pilani.ac.in
		</Typography>
		<Stack spacing={2} direction="row">
			<IconButton href="https://github.com/Aviral-Omar/">
				<LinkedIn />
			</IconButton>
			<IconButton href="https://www.linkedin.com/in/aviral-omar-881244197/">
				<GitHub />
			</IconButton>
		</Stack>
	</Stack>
);

export default About;
