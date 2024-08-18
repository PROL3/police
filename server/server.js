const express = require("express")

require("dotenv").config()

require("./db/connect")
 
const cors = require("cors")  

const UserRouter=require("./routes/UserRouter")

const app = express();

app.use(cors()); 

app.use(express.json())
 
app.use(UserRouter);
 

const port = process.env.PORT || 3000
app.listen(port, () => console.log("server is running on port " +"http://localhost:"+ port))

