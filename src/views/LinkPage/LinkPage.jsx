import React from 'react';
import { Grid, Button, Box, Typography, Divider } from '@mui/material';

import { handleLink, linkData } from './linkData';

const LinkPage = () => {
	return (
		<Box sx={{ height: 568 }}>
			{linkData.map(group => (
				<Box key={group.title} sx={{ mb: 2 }}>
					<Typography variant="h6" align="center" sx={{ mb: 1 }}>
						{`${group.title}`}
					</Typography>
					<Divider sx={{ my: 1 }} />
					<Grid
						container
						spacing={2}
						alignContent="flex-start"
						justifyContent="flex-start"
						alignItems="flex-start"
					>
						{group.links.map(name => (
							<Grid item key={name} sm={3}>
								<Button
									variant="text"
									onClick={() => handleLink(name)}
									sx={{ width: 1 }}
								>
									{name}
								</Button>
							</Grid>
						))}
					</Grid>
				</Box>
			))}
		</Box>
	);
};

export default LinkPage;
