import mongoose from "mongoose";

const connectToDB=()=>{
    const url=process.env.MONGO_URL;
    console.log(url)
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log("Connected to DB")).catch((err)=>console.log(err))
}

export default connectToDB;