import mongoose from 'mongoose'
const url = "mongodb://localhost:27017/cryptoData"
const connectDB = async ()=>{
 try{
       const conn = await mongoose.connect(url)
        console.log("connection successful") 
 }catch(error){
    console.log("Error in MongoDB Connection"+error)
 }
}

export default connectDB