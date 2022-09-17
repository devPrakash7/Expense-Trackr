
const express = require("express");
const router = express.Router();
const Controller = require("../controller/ExpenseColltroller");


router.route('/api/categories')
    .post(Controller.create_Categories)
   .get(Controller.get_Categories)

router.route('/api/transaction')
    .post(Controller.create_Transaction)
   .get(Controller.get_Transaction)
    .delete(Controller.delete_Transaction)

router.route('/api/labels')
    .get(Controller.get_Labels)
    


module.exports = router;