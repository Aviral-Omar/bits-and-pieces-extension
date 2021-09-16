// /*global browser*/
// import React, { useState, useEffect } from 'react';

// import { Table, Container, Row } from 'react-bootstrap';

// import './index.css';

// const TimeTable = () => {
// 	const [tt, setTT] = useState([]);
// 	const [tableData, setTD] = useState([]);

// 	useEffect(() => {
// 		const td = new Array(12);
// 		for (let i = 0; i < 12; i++) {
// 			td[i] = new Array(6).fill(undefined);
// 		}

// 		tt.forEach(course => {
// 			course.lecture.slots.forEach(slot => {
// 				const time = slot % 20;
// 				const day = Math.floor(slot / 20);
// 				td[time][day] = {
// 					id: course.course_no,
// 					name: course.course_title,
// 					type: 'L',
// 					section: course.lecture.sec,
// 				};
// 			});
// 			course.practical.slots.forEach(slot => {
// 				const time = slot % 20;
// 				const day = Math.floor(slot / 20);
// 				td[time][day] = {
// 					id: course.course_no,
// 					name: course.course_title,
// 					type: 'P',
// 					section: course.practical.sec,
// 				};
// 			});
// 			course.tutorial.slots.forEach(slot => {
// 				const time = slot % 20;
// 				const day = Math.floor(slot / 20);
// 				td[time][day] = {
// 					id: course.course_no,
// 					name: course.course_title,
// 					type: 'T',
// 					section: course.tutorial.sec,
// 				};
// 			});
// 			course.misc.slots.forEach(slot => {
// 				const time = slot % 20;
// 				const day = Math.floor(slot / 20);
// 				td[time][day] = {
// 					id: course.course_no,
// 					name: course.course_title,
// 					type: 'M',
// 					section: course.misc.sec,
// 				};
// 			});
// 		});
// 		setTD(td);
// 	}, [tt]);

// 	useEffect(() => {
// 		const getTT = async () => {
// 			const temp = await browser.storage.local.get('tt');
// 			setTT(temp.tt);
// 		};
// 		getTT();
// 	}, []);

// 	const getTime = index => {
// 		return index < 5
// 			? `${index + 7}:00 - ${index + 7}:50 AM`
// 			: index > 5
// 			? `${index - 5}:00 - ${index - 5}:50 PM`
// 			: `12:00 - 12:50 AM`;
// 	};

// 	// return tableData?.length ? (
// 	// 	<Container>
// 	// 		<Row>
// 	// 			<h3 className="text-center">Time Table</h3>
// 	// 		</Row>
// 	// 		<Row>
// 	// 			<Table className="m-0" size="sm" bordered responsive>
// 	// 				<thead>
// 	// 					<tr>
// 	// 						<th></th>
// 	// 						<th>Monday</th>
// 	// 						<th>Tuesday</th>
// 	// 						<th>Wednesday</th>
// 	// 						<th>Thursday</th>
// 	// 						<th>Friday</th>
// 	// 						<th>Saturday</th>
// 	// 					</tr>
// 	// 				</thead>
// 	// 				<tbody>
// 	// 					{tableData.map((time, index) => (
// 	// 						<tr key={index}>
// 	// 							<td>{getTime(index + 1)}</td>
// 	// 							{time.map((slot, day) => {
// 	// 								return slot ? (
// 	// 									<td key={`${day} ${time}`}>
// 	// 										<h6 className="text-center m-0">
// 	// 											<small>{`${slot.name}`}</small>
// 	// 										</h6>
// 	// 										<h6 className="text-center m-0">
// 	// 											<small>{`${slot.type}${slot.section}`}</small>
// 	// 										</h6>
// 	// 									</td>
// 	// 								) : (
// 	// 									<td key={`${day} ${time}`}></td>
// 	// 								);
// 	// 							})}
// 	// 						</tr>
// 	// 					))}
// 	// 				</tbody>
// 	// 			</Table>
// 	// 		</Row>
// 	// 	</Container>
// 	// ) : (
// 	// 	<Container></Container>
// 	// );
// };

// export default TimeTable;
