const express = require('express');

const router = express.Router();


/* DB Models*/
Category = require('../model/category')
Article = require('../model/article')


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

router.get('/articles/add', (req, res) =>
{
    res.render('manage/add_article', {title: 'Create Article'});
});

router.get('/categories/add', (req, res) =>
{
    res.render('manage/add_category', {title: 'Create Category'});
});

router.get('/articles/edit/:id', (req, res) =>
{
    res.render('manage/edit_article', {title: 'Edit Article'});
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