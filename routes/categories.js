const router=require('express').Router();
const multer=require('multer');
const upload=multer({dest:'uploads/'});
let Category=require('../models/category.model');
router.route('/').get((req, res) => {
  Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/add',upload.single('image'),(req,res,next)=>{
  console.log(req.file);
    const cname= req.body.cname;
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
router.route('/update/:id').post((req, res) => {
    Category.findById(req.params.id)
      .then(category => {
        category.cname = req.body.cname;
        category.image = req.body.image;
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
module.exports=router;