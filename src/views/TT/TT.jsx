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
} from '@mui/material';

const TimeTable = () => {
	const [tt, setTT] = useState([]);
	const [tableData, setTD] = useState([]);

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	useEffect(() => {
		const td = new Array(12);
		for (let i = 0; i < 12; i++) {
			td[i] = new Array(6).fill(undefined);
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
			const temp = await browser.storage.local.get('tt');
			setTT(JSON.stringify(temp) === '{}' ? [] : temp.tt);
		};
		getTT();
	}, []);

	const getTime = index => {
		return index < 5 ? `${index + 7}:00 AM` : index > 5 ? `${index - 5}:00 PM` : `12:00 PM`;
	};

	return tableData?.length ? (
		<TableContainer component={Paper} sx={{ maxWidth: 680, maxHeight: 568 }}>
			<Table size="small" stickyHeader style={{ width: 'auto', tableLayout: 'auto' }}>
				<TableHead>
					<TableRow>
						<TableCell>
							<Box sx={{ width: 64 }}></Box>
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
									<TableCell
										sx={{
											backgroundColor:
												slot.type === 'L'
													? 'text.secondary'
													: slot.type === 'P'
													? 'success.main'
													: 'warning.main',
										}}
										key={`${day} ${time}`}
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
								) : (
									<TableCell key={`${day} ${time}`}></TableCell>
								);
							})}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : (
		<Box></Box>
	);
};

export default TimeTable;
