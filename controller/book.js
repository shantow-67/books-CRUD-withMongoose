// const express = require('express');

const books = require("../model/book"); 


exports.getallbooks = async (req, res) => {
    try {
    const book = await books.find();
    res.json(book);
        
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
        console.log(error);
    }
}

exports.getbookbyid = async (req, res) => {
  try {
    const book = await books.findById(req.params.id);
    if(!book){
        res.status(404).json({ error: "Requested book not found"});
    }else{
        res.json(book);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"});
    console.log(error);
  }
}

exports.createbooklist = async (req, res) => {
    try {
     const {title, authour} = req.body; 

     if(!title){
        return res.json({ msg: "Please input the valid data"})
     }; 
     if(!authour){
        return res.json({ msg : "Please input the valid data"})
     }

     //check if book name is already there

    const existingbookTitle = await books.findOne({title}); 
    if(existingbookTitle) {
        return res.json({ Error: "Book already exists"})
    }

    //Create a new book

    const book = await new books({
        title,
        authour
    }).save();
        

    //Send Response 
    res.json({
        books: {
            title: book.title,
            author: book.authour
            // Description: book.Description,
            // PublishedYear: book.PublishedYear
        }
    })

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
        console.log(error);
    }
}

exports.updatebook = async (req, res) => {
    try {
        const book = await books.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!book){
            return res.status(404).json({ error: 'Book not found' });
        }else{
            res.json({book})
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
        console.log(error);
    }
}

exports.deletebook = async (req, res) => {
    try {
        const book = await books.findByIdAndDelete(req.params.id);
        if(!book){
            return res.status(404).json({ error: "Book not found"});
        }else{
            res.status(204).json({book});
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
        console.log(error);
    }
}
