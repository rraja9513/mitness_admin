const router=require('express').Router();
let Faq=require('../models/faq.model');
router.route('/').get((req, res) => {
    Faq.find()
      .then(faqs => res.json(faqs))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Faq.findById(req.params.id)
      .then(faq => res.json(faq))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const question= req.body.question;
    const answer=req.body.answer;
    const newFaq=new Faq({
        question,
        answer
    })
    newFaq.save()
    .then(()=>res.json('FAQ Added'))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/update/:id').post((req,res)=>{
    Faq.findById(req.params.id)
    .then(faq => {
      faq.question = req.body.question;
      faq.answer = req.body.answer;

      faq.save()
        .then(() => res.json('FAQ updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    Faq.findByIdAndDelete(req.params.id)
      .then(() => res.json('FAQ Deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  module.exports=router;