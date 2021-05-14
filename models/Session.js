import mongoose from 'mongoose'

const SessionSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
  },
  time: {
    type: String,
    required: [true, 'Please add a date'],
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  totalCosts: {
    type: Number,
  },
  notes: {
    type: String,
  },
})

const Session = mongoose.model('Session', SessionSchema)
export default Session

//Mongoose Scheme is simply a noSQL statement used to select documents within MongoDB
