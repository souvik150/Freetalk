import express from 'express'
import {json, urlencoded} from 'body-parser';
import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express()

app.use(urlencoded({
    extended: false
}))

app.use(json())

const start = async () => {
    if(!process.env.MONGO_URI) throw new Error('MONGO_URI is expected')

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.info('Connected to DB sucessfully')
    }
    catch(err){
        throw new Error(`DB Error!`)
    }

    app.listen(8080, () => console.info('Server is running on port 8080 '))
}

start()


