const express = require ('express');
const { Mongoose } = require('mongoose');
const connectDB = require('./config/db')

const app = express()

// Connect to db
connectDB();

// Use express bodyParser
app.use(express.json())


// Use routes
app.use('/api/user' ,require('./routes/api/userRoute'))
app.use('/api/auth' ,require('./routes/api/authRoute'))


const PORT =  process.env.PORT || 5000 ;


app.listen(PORT, () => console.log(`Server running at ${PORT}`))
