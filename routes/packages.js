const router=require('express').Router();
let Package=require('../models/package.model');
router.route('/').get((req,res)=>{
Package.find()
.then(packages=>res.json(packages))
.catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req,res)=>{
    const packagename= req.body.packagename;
    const category=req.body.category;
    const video = req.body.video;
    const price = req.body.price;
    const subscribers = req.body.subscribers;
    const newPackage=new Package({
    packagename,
    category,
    video,
    price,
    subscribers
    })
    newPackage.save()
    .then(()=>res.json('Package Added'))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/:id').delete((req, res) => {
    Package.findByIdAndDelete(req.params.id)
      .then(() => res.json('Package deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports=router;