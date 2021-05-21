const sessions = [
  {
    host: users[0]._id,
    location: 'Altona North Badminton Center',
    date: Date('12-05-2021'),
    time: '7:30pm - 10:30pm',
    players: [users[0]._id, users[1]._id, users[2]._id],
    totalCosts: '100',
    notes: '3 tubes of shuttles available',
  },
  {
    host: users[0]._id,
    location: 'Old Altona Badminton Center',
    date: Date('17-05-2021'),
    time: '7:30pm - 10:30pm',
    players: [users[0]._id, users[2]._id],
    totalCosts: '50',
    notes: '3 tubes of shuttles available',
  },
  {
    host: users[0]._id,
    location: 'Ravenhall Badminton Center',
    date: Date('13-05-2021'),
    time: '8:30pm - 10:30pm',
    players: [users[2]._id],
    totalCosts: '112',
    notes: '',
  },
]
