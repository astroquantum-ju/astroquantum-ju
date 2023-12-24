const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 5500;

app.set("/Astro_folder");
app.set("view-engine", "html");
app.use("/static", express.static("static"));
app.use("/images", express.static("images"));

app.use(express.urlencoded());

app.get("/", (req,res)=>{
    res.status(200).sendFile(__dirname + "/Log_In_Form.html");
});

app.listen(port, ()=>{
    console.log("http://localhost:5500");
});

const mongoose = require('mongoose');
const server = "hossainfarshid:JUITfh-891@clusterfarshid.vcl5snh.mongodb.net";
const database = "AstroQuantum_Club";

const connect = async()=>{
    try{
        await mongoose.connect(`mongodb+srv://${server}/${database}`);
        console.log("Connection Successful");
    }
    catch(err){
        console.log("Connection Failed");
    }
}

connect();


var Schema = mongoose.Schema({
    name:String,
    year:String,
    branch:String,
    phone: Number,
    email:String,
    study:String,
    password:String
});
const Collection1 = mongoose.model("collection_1", Schema);

app.post("/backend_hello", async (req, res)=>{
    var data = new Collection1(req.body);
    data.save().then(()=>{
        res.status(200).sendFile(__dirname + "/Log_In_Form.html");
        // res.send("The data has been saved. Please exit the website.")
    }).catch(()=>{
        res.send("OOPs, The data has not been saved. Please try again"); 
    });
});


app.post("/backend2.js", async (req,res)=>{
    var data = req.body;

    async function output(data, res){
        const mail = await Collection1.find({email: data.email});
        try{
            const value = await mail[0].email;
            const pass = await mail[0].password;
            if(value){
                if(pass == data.password){
                    res.send("You have already registered before. Please contact the admin if you want to reenter");
                }
                else{
                    res.send("Wrong Password");
                }
            }
        }
        catch(err){
            res.status(200).sendFile(__dirname + "/static/FormPage.html");
        }
    }

    output(data, res);
});

app.post("/backend.js", async(req,res)=>{
    var data = req.body;
    async function output(data, res){
        const mail = await Collection1.find({email: data.email});
        try{
            const value = await mail[0].email;
            const pass = await mail[0].password;
            if(value){
                if(pass == data.password){
                   res.status(200).sendFile(__dirname + "/static/index.html"); 
                }
                else{
                    res.send("Wrong Password");
                }
            }
        }
        catch(err){
            res.send("You have not yet registered. Please register");
        }
    }

    output(data, res);
})

