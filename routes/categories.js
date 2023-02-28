const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

Category = require('../model/category')


/* ----- Views -----  */
router.get('/', (req, res) => {
    Category.getCategories()
    .then((categories) => {
        res.render('categories/categories', {
            title: 'Categories',
            categories
        });
    }, (err) => {
        res.send("Error: Failed to retrieve categories.");
    });
});

router.get('/:id', (req, res) => {
    Category.getCategoryById(req.params.id)
    .then((category) => {
        res.render('categories/category', {
            title: "Category",
            category: category
        });
    }, (err) => {
        res.send("Error: Failed to retrieve category.");
    })
});


/* ----- Posts ----- */
router.post('/add', 
body('title').notEmpty().withMessage("Title is Required"),
(req, res) => {
    let category = new Category();
    category.title = req.body.title;
    category.description = req.body.description;

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.render('manage/add_category', {
            errors: errors.array(),
            title: "Create Category",
            category
        })
    }
    else{


        Category.addCategory(category)
        .then((result) => {
            console.log("Adding category:", category);
            res.redirect('/manage/categories');
        }, (err) => {
            res.send("Error: Failed to create category.");
        });
    }
})

router.post('/edit/:id',
body('title').notEmpty().withMessage("Title is Required"),
(req, res) => {
    const id = req.params.id;
    const category = {
        title: req.body.title,
        description: req.body.description
    }
    
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.render('manage/edit_category', {
            title: 'Edit Category',
            category,
            errors: errors.array()
        });
    }

    Category.updateCategory(id, category)
    .then((result) => {
        console.log("Updating category:", id, category, "\nres:", result);
        res.redirect('/manage/categories');
    }, (err) => {
        res.send("Error: Failed to edit category.");
    });
})


/* ----- Delete ----- */
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log("TEST")
    
    Category.deleteCategory(id)
    .then((result) => {
        console.log("Deleting category:", id, "\nres:", result);
        res.sendStatus(200);
    });
})

module.exports = router;
