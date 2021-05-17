const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const categorySchema=new Schema(
    {
       cname:{
           type:String,
       },
       image:{
           type:String,
       },
       caloriesburnt:{
           type:String,
       },
    },
    {
        timestamps:true,
    }
);
const Category=mongoose.model('Category',categorySchema);
module.exports=Category;