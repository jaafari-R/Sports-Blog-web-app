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

    Category.addCategory(category)
    .then((result) => {
        console.log("Adding category:", category);
        res.redirect('/manage/categories');
    }, (err) => {
        res.send("Error: Failed to create category.");
    });
})

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const category = {
        title: req.body.title,
        description: req.body.description
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
