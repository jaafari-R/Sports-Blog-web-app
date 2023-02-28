const express = require('express');

const router = express.Router();


/* ----- DB Models ----- */
Category = require('../model/category')
Article = require('../model/article')


/* Article Management */
router.get('/articles', (req, res) => {
    Article.getArticles(undefined, (err, articles) => {
        if(err)
        {
            console.log(err);
            res.send("Error: Failer to retrieve articles")
        }
        else {
            res.render('manage/manage_articles', {
                title: "Manage Articles",
                articles: articles
            });
        }
    });
});

router.get('/articles/add', (req, res) =>
{
    Category.getCategories((err, categories) => {
        if(err) {
            console.log(err)
            res.send("Error: Failed to create categories.")
        }
        else {
            res.render('manage/add_article', {
                title: 'Create Article',
                categories
            });            
        }
    });
});

router.get('/articles/edit/:id', (req, res) =>
{
    res.render('manage/edit_article', {title: 'Edit Article'});
});


/* ----- Category Management ----- */
router.get('/categories', (req, res) => {
    Category.getCategories((err, categories) => {
        if(err) {
            console.log(err)
            res.send("Error: Failed to create categories.")
        }
        res.render('manage/manage_categories', {
            title: 'Manage Categories',
            categories: categories
        });
    })
});

router.get('/categories/add', (req, res) =>
{
    res.render('manage/add_category', {title: 'Create Category'});
});


router.get('/categories/edit/:id', (req, res) =>
{
    Category.getCategoryById((err, category) => {
        if(err) {
            res.send("Error: Failed to retrieve category.");
        }
        else {
            res.render('manage/edit_category', {
                title: 'Edit Category',
                category
            });
        }
    }, req.params.id)
});

module.exports = router;