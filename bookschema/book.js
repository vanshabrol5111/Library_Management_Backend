const mongoose=require("mongoose");
const bookSchema=new mongoose.Schema({



title:{
    type:String,
},

author:{
    type:String,
},
isBorrowed :{
    type : Boolean, 
    default:false
}

})
module.exports=mongoose.model("BooksData",bookSchema);
