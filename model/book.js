const mongoose = require('mongoose'); 

const { Schema } = mongoose;


const booksSchema = new Schema({
    title: {
        type: 'string',
        trim: true,
        required: true,
    }, 
    authour: {
        type: 'string',
        trim: true,
        required: true
    } 
    // Description: {
    //     type: "string",
    //     trim: true,
    // }, 
    // PublishedYear: {
    // //     type: Number,
    // }
    
}, {timestamps: true, versionKey: false})

const books = mongoose.model("books", booksSchema);
module.exports = books; 

// const Book = mongoose.model('Book', bookSchema);

// module.exports = Book;
