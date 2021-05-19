const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const packageSchema=new Schema(
    {
       packagename:{
           type:String,
       },
       category:{
           type:String,
       },
       video:{
           type:String,
       },
       price:{
           type:String,
       },
       subscribers:{
        type:String,
    },
    },
    {
        timestamps:true,
    }
);
const Package=mongoose.model('Package',packageSchema);
module.exports=Package;