const mongoose = require('mongoose');

const connectToDb=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/project');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectToDb();