const express = require("express")
const bodyparser = require ("body-parser")
const path = require("path")
const mongoose = require ("mongoose")
const date = require (__dirname +'/date.js')

const app = express()

// =========================================================
const localurl = "mongodb://localhost:27017/ToDoListDB"
const cloudurl = "mongodb+srv://ahmedjokar08:JBX08059@cluster0.5lfjd8y.mongodb.net/ToDoList"
// =========================================================

app.use("/views",express.static(path.join(__dirname+"/views")))
app.use(bodyparser.urlencoded({extended:true}))
app.set("view engine",'ejs')
mongoose.connect(cloudurl,{useNewUrlParser : true}).then(()=>console.log("DB Connected"))

const itemschema = {
    name : String
}
const Item = mongoose.model('item',itemschema)



app.get("/",(req,res)=>{
    const day = date.date()

    Item.find()
    .then((FoundItems)=>{ 
        res.render("index",{theday:day , newlistitem:FoundItems})
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post("/",(req,res)=>{
    const newitem = req.body.newitem
    const newfromhtml = new Item({
        name : newitem
    })
    newfromhtml.save().then(()=>{console.log("item Created Successfully")})
    res.redirect("/")
})

app.post("/delete",(req,res)=>{

    const itemid = req.body.checkbox

    Item.findByIdAndRemove(itemid)
    .then(()=>{
        console.log ("item Deleted Successfully")
        res.redirect("/")
    })
    .catch((err)=>{console.log(err)})
})

const port = 4000
app.listen(process.env.PORT || port ,()=>{

    console.log(`Listening On Port : ${port}`)
})