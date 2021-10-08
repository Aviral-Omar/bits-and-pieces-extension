const contactData = [
  {
    title: "Student Union",
    contacts: [
      {
        position: "President",
        name: "Harsh Shukla",
        number: "7390967807",
      },
      {
        position: "Acting General Secretary",
        name: "Pranav Shanmukh Yellayi",
        number: "8305191706",
      },
      {
        position: "2018 Batch Representative",
        name: "Aman Manish Garg",
        number: "9755459845",
      },
      // {
      // 	position: '2018 Batch Representative',
      // 	name: 'Nitin H Govind',
      // 	number: '-',
      // },
      {
        position: "2019 Batch Representative",
        name: "Pranav Shanmukh Yellayi",
        number: "8305191706",
      },
      {
        position: "2019 Batch Representative",
        name: "Aditi Sharma",
        number: "9602571441",
      },
      {
        position: "2020 Batch Representative",
        name: "Yash Anil Saboo",
        number: "9534065076",
      },
      {
        position: "2020 Batch Representative",
        name: "Naman Gupta",
        number: "8791629985",
      },
    ],
  },
  {
    title: "Administration",
    contacts: [
      {
        position: "Chief Warden",
        name: "Dr. Navin Singh",
        number: "9694096457 / 9887321072",
      },
      {
        position: "Associate Dean, AUGSD",
        name: "Dr. Suresh Gupta",
        number: "9772974342",
      },
      {
        position: "Associate Dean, SWD",
        name: "Dr. Srikanta Routroy",
        number: "9694096456",
      },
      {
        position: "SWD Fee Related Issues",
        name: "Shrawan Kumar",
        number: "9875192068",
      },
    ],
  },
  {
    title: "Outlets",
    contacts: [
      {
        position: "S9",
        name: "Stationary",
        number: "7737536184",
      },
      {
        position: "Javed Habib",
        name: "Salon",
        number: "7737005119	",
      },
      {
        position: "Laundromat - CVR",
        name: "Laundry",
        number: "9660914563",
      },
      {
        position: "Laundromat - Malviya",
        name: "Laundry",
        number: "9116662704",
      },
      {
        position: "Cycle Repair - Library",
        name: "Ram Ji",
        number: "9929154632",
      },
      {
        position: "Laptop Repair",
        name: "Akshay",
        number: "8104632295",
      },
      {
        position: "Roongta House",
        name: "Book Store",
        number: "9694840027",
      },
      {
        position: "Ashu Book House",
        name: "Book Store",
        number: "8769591021 / 8502016963",
      },
    ],
  },
  {
    title: "SAC",
    contacts: [
      {
        position: "Chowki",
        name: "Vidyadhar",
        number: "7231066148",
      },
    ],
  },
  {
    title: "Meera Bhawan",
    contacts: [
      {
        position: "Superintendent",
        name: "Ms. Ritu",
        number: "9694096468",
      },
      {
        position: "Superintendent",
        name: "Dr. Indu Saini",
        number: "8426890244",
      },
      {
        position: "Non-Residential Warden",
        name: "Dr. Meetha V. Shenoy",
        number: "-",
      },
      {
        position: "Warden",
        name: "Dr. Surekha Bhanot",
        number: "9694096461",
      },
      {
        position: "Warden",
        name: "Dr. Rakhee",
        number: "9414424442",
      },
    ],
  },
  {
    title: "SR Bhawan",
    contacts: [
      {
        position: "Chowki",
        name: "Hawa Singh",
        number: "9252066689",
      },
      {
        position: "Chowki",
        name: "Omveer Singh",
        number: "8769366142",
      },
      {
        position: "Superintendent",
        name: "Mr. Mahavir Singh",
        number: "9694096464",
      },
      {
        position: "Warden",
        name: "Dr. Krishna M",
        number: "8619086290",
      },
    ],
  },
  {
    title: "Krishna Bhawan",
    contacts: [
      {
        position: "Chowki",
        name: "Mahender Singh",
        number: "9929038631",
      },
      {
        position: "Superintendent",
        name: "Harbans Lal Chouhan",
        number: "9785644053 / 9602735216",
      },
      {
        position: "Warden",
        name: "Dr. Arun Kumar Jalan",
        number: "9414082757",
      },
    ],
  },
  {
    title: "Gandhi Bhawan",
    contacts: [
      {
        position: "Chowki",
        name: "Mr. Vinod Kumar",
        number: "9928441374",
      },
      {
        position: "Superintendent",
        name: "Mr. Sanjay Tomar",
        number: "9694096485 / 9672344399",
      },
      {
        position: "Non-Residential Warden",
        name: "Dr. Devendra Singh",
        number: "9414935853",
      },
      {
        position: "Warden",
        name: "Dr. Kamlesh Tiwari",
        number: "9694096452",
      },
    ],
  },
  {
    title: "Ram Bhawan",
    contacts: [
      {
        position: "Chowki",
        name: "Mr. Karan Singh",
        number: "9829661910",
      },
      {
        position: "Superintendent",
        name: "Mr. Mahaveer Singh",
        number: "9799005281",
      },
      {
        position: "Non-Residential Warden",
        name: "Dr. Murali Manohar Pandey",
        number: "9950952634",
      },
      {
        position: "Warden",
        name: "Dr. Dipendu Bhunia",
        number: "9694096490",
      },
    ],
  },
  {
    title: "Budh Bhawan",
    contacts: [
      {
        position: "Chowki",
        name: "Raghubeer Singh",
        number: "9829630775",
      },
      {
        position: "Superintendent",
        name: "Sammar Singh",
        number: "9694096474",
      },
      {
        position: "Warden",
        name: "Dr. Sharad Shrivastava",
        number: "9494096472 / 9351150986",
      },
    ],
  },
  {
    title: "Shankar Bhawan",
    contacts: [
      {
        position: "Chowki",
        name: "Mr. Vikram Singh",
        number: "8769640715",
      },
      {
        position: "Superintendent",
        name: "Mr. Rajendra Bhatt",
        number: "7568998155",
      },
      {
        position: "Non-Residential Warden",
        name: "Dr. Harikrishnan Gopinadhan Nair",
        number: "-",
      },
      {
        position: "Warden",
        name: "Dr. Kumar Sankar Bhattacharya",
        number: "7737266378",
      },
    ],
  },
  // {
  // 	title: 'Vyas Bhawan',
  // 	contacts: [
  // 		{
  // 			position: 'Chowki',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 		{
  // 			position: 'Superintendent',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 		{
  // 			position: 'Warden',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 	],
  // },
  {
    title: "Malviya-A Bhawan",
    contacts: [
      {
        position: "Chowki",
        name: "Mr. Babulal",
        number: "9928327924",
      },
      {
        position: "Superintendent",
        name: "Mr. Rohitaswa Rathore",
        number: "9694096465",
      },
      {
        position: "Warden",
        name: "Dr. Trilok Mathur",
        number: "9694096460",
      },
    ],
  },
  {
    title: "Vishwakarma Bhawan",
    contacts: [
      {
        position: "Chowki",
        name: "Mr. Bhagu Khan",
        number: "9929110686",
      },
      {
        position: "Superintendent",
        name: "Mr. Samunder Singh",
        number: "9694096473 / 9991196473",
      },
      {
        position: "Warden",
        name: "Dr. Krishnendra Shekhawat",
        number: "9468839182",
      },
    ],
  },
  {
    title: "Bhagirath Bhawan",
    contacts: [
      {
        position: "Chowki",
        name: "Mr. Dalip Singh",
        number: "8107353882",
      },
      {
        position: "Superintendent",
        name: "Mr. Samunder Singh",
        number: "9694096473 / 9991196473",
      },
    ],
  },
  // {
  // 	title: 'Rana Pratap Bhawan',
  // 	contacts: [
  // 		{
  // 			position: 'Chowki',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 		{
  // 			position: 'Superintendent',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 		{
  // 			position: 'Warden',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 	],
  // },
  // {
  // 	title: 'Ashok Bhawan',
  // 	contacts: [
  // 		{
  // 			position: 'Chowki',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 		{
  // 			position: 'Superintendent',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 		{
  // 			position: 'Warden',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 	],
  // },
  // {
  // 	title: 'CV Raman Bhawan',
  // 	contacts: [
  // 		{
  // 			position: 'Chowki',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 		{
  // 			position: 'Superintendent',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 		{
  // 			position: 'Warden',
  // 			name: '-',
  // 			number: '-',
  // 		},
  // 	],
  // },
];

export default contactData;
