const router=require('express').Router();
let Video=require('../models/video.model');
router.route('/').get((req,res)=>{
Video.find()
.then(videos=>res.json(videos))
.catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req,res)=>{
    const exercisename= req.body.exercisename;
    const vname=req.body.vname;
    const exerciseduration = req.body.exerciseduration;
    const exerciseprice = req.body.exerciseprice;
    const access = req.body.access;
    const status= req.body.status;
    const newVideo=new Video({
        exercisename,
        vname,
        exerciseduration,
        exerciseprice,
        access,
        status,
    })
    newVideo.save()
    .then(()=>res.json('Video Added'))
    .catch(err=>res.status(400).json('Error:'+err));
});
module.exports=router;