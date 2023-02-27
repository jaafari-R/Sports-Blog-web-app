const express = require('express');

const router = express.Router();

Category = require('../model/category')


/* ----- Views -----  */
router.get('/', (req, res) => {
    Category.getCategories((err, categories) => {
        if(err) {
            console.log(err)
            res.send("Error: Failed to create categories.")
        }
        res.render('categories/categories', {
            title: 'Categories',
            categories: categories
        });
    })
});

router.get('/:id', (req, res) => {
    Category.getCategoryById((err, category) => {
        if(err) {
            console.log(err)
            res.send("Failed to retrieve category!")
        }
        else {
            res.render('categories/category', {
                title: "Category",
                category: category
            });
        }
    }, req.params.id)
});


/* ----- Posts ----- */
router.post('/add', (req, res) => {
    let category = new Category();
    category.title = req.body.title;
    category.description = req.body.description;

    Category.addCategory(category, (err, category) => {
        if(err) {
            console.log(err)
            res.send("Error: Failed to create category.")
        }
        else {
            console.log(category);
            res.redirect('/manage/categories');
        }
    })
})

module.exports = router;
