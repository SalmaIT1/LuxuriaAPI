const mongoose =require("mongoose")
const categorieSchema=mongoose.Schema({
name:{ type: String, unique:true },
image:{ type: String, required: false }
})
module.exports=mongoose.model('categorie',categorieSchema)
