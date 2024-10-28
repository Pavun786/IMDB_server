const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const dbConnection = require("./Db_Connection/dbConnection")
const actorRoute = require("./Routes/actorRoutes")
const movieRoute = require("./Routes/movieRoutes")
const producerRoute = require("./Routes/producerRoutes")
const authRoute = require("./Routes/userRoutes")
dotenv.config()

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors({
    origin : "*"
}))

dbConnection()

app.use("/actor",actorRoute)
app.use("/movie",movieRoute)
app.use("/producer",producerRoute)
app.use("/auth",authRoute)


app.get("/",(req,res)=>{
    res.send("Welcome to IMDB App")
})

app.listen(port,()=>{
    console.log(`The server un on port ${port}`)
})