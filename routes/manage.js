const express = require('express');

const router = express.Router();

router.get('/articles', (req, res) => {
    res.render('manage/manage_articles', {title: "Manage Articles"});
});

router.get('/categories', (req, res) => {
    res.render('manage/manage_categories', {title: "Manage Categories"});
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
    res.render('manage/edit_category', {title: 'Edit Category'});
});

module.exports = router;
