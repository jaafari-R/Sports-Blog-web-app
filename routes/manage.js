const express = require('express');

const router = express.Router();


/* ----- DB Models ----- */
Category = require('../model/category')
Article = require('../model/article')


/* Article Management */
router.get('/articles', (req, res) => {

    Article.getArticles()
    .then((articles) => {
        res.render('manage/manage_articles', {
            title: "Manage Articles",
            articles: articles
        });
    }, (err) => {
        res.send("Error: Failed to retrieve articles");
    });
});

router.get('/articles/add', (req, res) =>
{
    Category.getCategories()
    .then((categories) => {
        res.render('manage/add_article', {
            title: 'Create Article',
            categories
        });            
    }, (err) => {
        res.send("Error: Failed to add article");
    });
});

router.get('/articles/edit/:id', (req, res) =>
{
    const id = req.params.id;

    Article.getArticleById(id)
    .then((article) => { 
        Category.getCategories()
        .then((categories) => {
            res.render('manage/edit_article', {
                title: 'Create Article',
                categories,
                article
            });    
        }, (err) => {
            res.send("Error: Failed to retrieve categories.");
        });
    }, (err) => {
        res.send("Error: Failed to retrieve article data.");
    });
});


/* ----- Category Management ----- */
router.get('/categories', (req, res) => {
    Category.getCategories()
    .then((categories) => {
        res.render('manage/manage_categories', {
            title: 'Manage Categories',
            categories
        });
    }, (err) => {
        res.send("Error: Failed to retrieve categories.");
    });
});

router.get('/categories/add', (req, res) =>
{
    res.render('manage/add_category', {title: 'Create Category'});
});


router.get('/categories/edit/:id', (req, res) =>
{
    const id = req.params.id;

    Category.getCategoryById(id)
    .then((category) => {
        res.render('manage/edit_category', {
            title: 'Edit Category',
            category
        });
    }, (err) => {
        res.send("Error: Failed to retrieve category.");
    });
});

module.exports = router;