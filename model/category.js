const mongoose = require('mongoose');


// Category Schema
const categorySchema = mongoose.Schema({
    title: { type: String },
    description: { type: String }
});

const Category = module.exports = mongoose.model('Category', categorySchema);


/* ----- Queries ----- */

// get `limit` categories
module.exports.getCategories = (callback, limit) => {
    Category.find(callback).limit(limit).sort([['title', 'ascending']]);
}

// get category by _id
module.exports.getCategoryById = (callback, _id) => {
    Category.findOne({_id: _id}, callback);
}