import React from 'react';
import { Typography, Box, Link } from '@mui/material';

const HelpPage = () => (
	<Box>
		<Typography variant="h5">Create your Time Table</Typography>
		<Typography variant="subtitle1">
			To get started, head on to{' '}
			<Link href="https://timetable.bits-dvm.org/pilani.html" target="_blank">
				Time Table Generator by DVM
			</Link>
			.
		</Typography>
		<Typography variant="subtitle1">
			Select your preferred courses and generate a time table.
		</Typography>
		<Typography variant="subtitle1">
			In the generated time table page, click on Add to BITS and Pieces Button next to the
			Print as PDF button.
		</Typography>
		<Typography variant="subtitle1">
			That&apos;s it! Your time table is successfully added. Go ahead and add links to it by
			double clicking on the desired slot.
		</Typography>
	</Box>
);

export default HelpPage;
