/*global browser*/
import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableHead,
	TableContainer,
	TableRow,
	TableCell,
	Paper,
	Box,
	Typography,
	Tooltip,
} from '@mui/material';
import { Help } from '@mui/icons-material';

import HelpPage from './HelpPage';
import Slot from './Slot';

const TimeTable = () => {
	const [tt, setTT] = useState([]);
	const [tableData, setTD] = useState([]);
	const [linkData, setLD] = useState([]);

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const help = `Double Click slot to add or modify link.\nSingle Click to redirect.\nWhen using multiple Google accounts, login with your BITS Email first.`;

	useEffect(() => {
		const td = new Array(12);
		for (let i = 0; i < 12; i++) {
			td[i] = new Array(6).fill(null);
		}

		tt.forEach(course => {
			course.lecture.slots.forEach(slot => {
				const time = slot % 20;
				const day = Math.floor(slot / 20);
				td[time][day] = {
					id: course.course_no,
					name: course.course_title,
					type: 'L',
					section: course.lecture.sec,
				};
			});
			course.practical.slots.forEach(slot => {
				const time = slot % 20;
				const day = Math.floor(slot / 20);
				td[time][day] = {
					id: course.course_no,
					name: course.course_title,
					type: 'P',
					section: course.practical.sec,
				};
			});
			course.tutorial.slots.forEach(slot => {
				const time = slot % 20;
				const day = Math.floor(slot / 20);
				td[time][day] = {
					id: course.course_no,
					name: course.course_title,
					type: 'T',
					section: course.tutorial.sec,
				};
			});
			course.misc.slots.forEach(slot => {
				const time = slot % 20;
				const day = Math.floor(slot / 20);
				td[time][day] = {
					id: course.course_no,
					name: course.course_title,
					type: 'M',
					section: course.misc.sec,
				};
			});
		});
		setTD(td);
	}, [tt]);

	useEffect(() => {
		const getTT = async () => {
			const temp = await browser.storage.local.get(['tt', 'linkData']);
			setTT(JSON.stringify(temp) === '{}' ? [] : temp.tt);
			setLD(JSON.stringify(temp) === '{}' ? [] : temp.linkData);
		};
		getTT();
	}, []);

	const getTime = index => {
		return index < 5 ? `${index + 7}:00 AM` : index > 5 ? `${index - 5}:00 PM` : `12:00 PM`;
	};

	return tt?.length ? (
		<TableContainer component={Paper} sx={{ maxWidth: 680, maxHeight: 568 }}>
			<Table size="small" stickyHeader style={{ width: 'auto', tableLayout: 'auto' }}>
				<TableHead>
					<TableRow>
						<TableCell align="center">
							<Tooltip title={help} arrow>
								<Box sx={{ width: 64 }}>
									<Help />
								</Box>
							</Tooltip>
						</TableCell>
						{days.map(day => (
							<TableCell align="center" key={day}>
								<Box sx={{ width: 120 }}>
									<Typography variant="button" align="center">
										{day}
									</Typography>
								</Box>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData.map((time, index) => (
						<TableRow key={index}>
							<TableCell>
								<Typography variant="subtitle2" align="center">
									{getTime(index + 1)}
								</Typography>
							</TableCell>
							{time.map((slot, day) => {
								return slot ? (
									<Slot
										slot={slot}
										link={linkData[index]?.[day]}
										day={day}
										index={index}
									/>
								) : (
									<TableCell key={`${day} ${index}`}></TableCell>
								);
							})}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : (
		<HelpPage />
	);
};

export default TimeTable;
