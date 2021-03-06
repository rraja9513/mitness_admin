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
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
let Category=require('../models/category.model');
router.route('/').post((req, res) => {
  Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
  Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/add',upload.single('image'),(req,res,next)=>{
    const cname= req.body.cname;
    const image=req.file.path;
    const  caloriesburnt = req.body. caloriesburnt;
    const newCategory=new Category({
        cname,
        image,
        caloriesburnt,
    })
    newCategory.save()
    .then(()=>res.json('Category Added'))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.post('/update/:id',upload.single('image'),(req,res,next)=>{
    Category.findById(req.params.id)
      .then(category => {
        category.cname = req.body.cname;
        category.image = req.file.path;
        category.caloriesburnt = req.body.caloriesburnt;
  
        category.save()
          .then(() => res.json('Category updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
      .then(() => res.json('Category deactivated.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/delete').post(async(req,res)=>{
    const ids=req.body.arrayids;
    await Category.deleteMany({_id:{$in:ids}})
    res.status(200).json({ message: 'Deleted Successfully'});
  })
module.exports=router;