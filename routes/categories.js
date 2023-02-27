const express = require('express');

const router = express.Router();

Category = require('../model/category')

router.get('/', (req, res) => {
    Category.getCategories((err, categories) => {
        res.render('categories/categories', {
            title: 'Categories',
            categories: categories
        });
    })
});

router.get('/:id', (req, res) => {
    Category.getCategoryById((err, category) => {
        res.render('categories/category', {
            title: "Category",
            category: category
        });
    }, req.params.id)
});

module.exports = router;
