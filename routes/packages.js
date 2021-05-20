const router=require('express').Router();
const multer=require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);  
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100
  },
  fileFilter: fileFilter
});
let Package=require('../models/package.model');
router.route('/').get((req,res)=>{
Package.find()
.then(packages=>res.json(packages))
.catch(err => res.status(400).json('Error: ' + err));
});
router.route('/search').post((req, res) => {
  Package.find({packagename : req.body.packagename})
    .then(packages => res.json(packages))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/add',upload.single('video'),(req,res,next)=>{
    const packagename= req.body.packagename;
    const category=req.body.category;
    const video = req.file.path;
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