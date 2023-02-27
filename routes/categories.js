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
            console.log("Adding category:", category)
            res.redirect('/manage/categories');
        }
    })
})

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const update = {
        title: req.body.title,
        description: req.body.description
    }

    Category.updateCategory(id, update, (err, res) => {
        if(err) {
            console.log(err)
            res.send("Error: Failed to edit category.")
        }
        else {
            console.log("Updating category:", id, update, "\nres:", res)
            res.redirect('/manage/categories');
        }
    })
})


/* ----- Delete ----- */
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log("TEST")
    
    Category.deleteCategory(id, (err, result) => {
        console.log("Deleting category:", id, "\nres:", result);
        res.sendStatus(200);
    })
})

module.exports = router;
