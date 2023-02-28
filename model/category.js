const mongoose = require('mongoose');


// Category Schema
const categorySchema = mongoose.Schema({
    title: { type: String },
    description: { type: String }
});

const Category = module.exports = mongoose.model('Category', categorySchema);


/* ----- Queries ----- */

// get `limit` categories
module.exports.getCategories = (limit) => {
    return new Promise((resolve, reject) => {
        Category.find((err, categories) => {
            if(err) 
                reject(err);
            else
                resolve(categories);
        }).limit(limit).sort([['title', 'ascending']]);
    });
}

// get category by _id
module.exports.getCategoryById = (_id) => {
    return new Promise((resolve, reject) => {
        Category.findOne({_id: _id}, (err, category) => {
            if(err) 
                reject(err);
            else
                resolve(category);
        });
    });
}

// add a new category
module.exports.addCategory = (category) => {
    return new Promise((resolve, reject) => {
        Category.create(category, (err, res) => {
            if(err) 
                reject(err);
            else
                resolve(res);
        });
    });
}

// Update a category
module.exports.updateCategory = (_id, category) => {
    return new Promise((resolve, reject) => {
        Category.updateOne({_id: _id}, category, (err, res) => {
            if(err) 
                reject(err);
            else
                resolve(res);
        });
    });
}

// Delete a category
module.exports.deleteCategory = (_id) => {
    return new Promise((resolve, reject) => {
        Category.deleteOne({_id: _id}, (err, res) => {
        if(err) 
            reject(err);
        else
            resolve(res);
        });
    });
}