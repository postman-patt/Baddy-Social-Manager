import mongoose from 'mongoose'
import User from './models/User.js'
import Session from './models/Session.js'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import users from './data/users.js'

dotenv.config({ path: './config/config.env' })

connectDB()

const importData = async () => {
  try {
    await Session.deleteMany()

    const users = await User.find()

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

    await Session.insertMany(sessions)
    //Import/insert users
    //Make admin user as part of the user for every produc

    console.log('Data Imported!'.green.inverse)

    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    //Delete all entries
    await Session.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

//Assigning arguments to script

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
