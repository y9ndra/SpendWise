const express = require("express");
const Expense = require("../models/expense.js");

const addExpense = async (req, res)=>{
    try{
        const {title, amount,category} = req.body;

        const newExpense = await Expense.create({
            title,
            amount,
            category,
            userId:req.user.userId
        });

        res.status(201).json({message : "Expense Added", expense: newExpense})
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

const viewExpense = async (req,res)=>{
    try{

        let {page = 1, limit = 10} = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page-1) *limit;
        const userId = req.user.userId;
        let filter = {userId};


        const expenses = await Expense.find(filter)
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit);

        const total = await Expense.countDocuments(filter);

        res.status(200).json({totalrecords : total,
            currentpage : page,
            totalpages : Math.ceil(total/limit),
            expenses
        });
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
};

const deleteExpense = async (req,res)=>{
    try{
        const{id} = req.params;

        const expense = await Expense.findOneAndDelete({
            _id : id,
            userId: req.user.userId
        })

        if(!expense){
            return res.status(404).json({error:"Expense not Found"});
        }

        res.status(200).json({
            message:"Expense deleted"
        });

    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }
};



const category = async (req,res) =>{
    try{
    const userId = req.user.userId; 
    
    let filter = {userId};

    if(req.query.category){
        filter.category = { $regex: req.query.category, $options: "i" };
    }

    const expenses = (await Expense.find(filter).sort({createdAt:-1}));

    res.status(200).json(expenses)
}
catch(err){
    res.status(500).json({error:err.message});
}
};


module.exports = {addExpense,viewExpense,deleteExpense,category};