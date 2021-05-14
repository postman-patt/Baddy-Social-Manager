import mongoose from 'mongoose'

mongoose.set('bufferTimeoutMS', 20000)

//Using mongoose to connect to the database as MongoDB Atlas
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })

    console.log(`MongDB Connected: ${conn.connection.host}`.cyan.underline.bold)
  } catch (err) {
    console.log(`Error: ${err.message}`.red)
    process.exit(1)
  }
}

export default connectDB
