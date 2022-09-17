
const model = require("../models/expenseMode")


async function create_Categories(req, res){
    let body = req.body
    const Create = new model.Categories(body);
 
    await Create.save(function(err){
        if (!err) return res.json(Create);
        return res.status(400).json({ message : `Error while creating categories ${err}`});
    });
 }

const get_Categories = async(req,res) =>{

     const getData = await model.Categories.find()

     let filter = await getData.map(v => Object.assign({}, { type: v.type, color: v.color}));

     return res.status(200).send({msg: "sucessfully" , data:filter});
}


async function create_Transaction(req, res){
    if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let { name, type, amount } = req.body;

    const create = await new model.Transaction(
        {
            name,
            type,
            amount,
            date: new Date()
        }
    );

    create.save(function(err){
        if(!err) return res.json(create);
        return res.status(400).json({ message : `Erro while creating transaction ${err}`});
    });

}


async function get_Transaction(req, res){
    let data = await model.Transaction.find({});
    return res.json(data);
}

async function delete_Transaction(req, res){
    if (!req.body) res.status(400).json({ message: "Request body not Found"});
    await model.Transaction.deleteOne(req.body, function(err){
        if(!err) res.json("Record Deleted...!");
    }).clone().catch(function(err){ res.json("Error while deleting Transaction Record")});
}

async function get_Labels(req, res){

    model.Transaction.aggregate([
        {
            $lookup : {
                from: "categories",
                localField: 'type',
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Looup Collection Error");
    })

}


module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}