const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();


/* ----- DB Models ----- */
Article = require('../model/article')
Category = require('../model/category')


/* ----- Views ----- */
router.get('/', (req, res) => {
    res.render('articles/articles', {title: "Articles"});
});

router.get('/show/:id', (req, res) => {
    res.render('articles/article', {title: "Article"});
});


/* ----- Posts ----- */
router.post('/add', 
body('title').notEmpty().withMessage("Title is Required"),
body('category_id').notEmpty().withMessage("Category is Required"),
body('author').notEmpty().withMessage("Author is Required"),
(req, res) => {

    const article = new Article()
    article.title = req.body.title;
    article.subtitle = req.body.subtitle;
    article.category_id = req.body.category_id;
    article.body = req.body.body;
    article.author = req.body.author;
    article.comments = [];

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        Category.getCategories()
        .then((categories) => {
            return res.render('manage/add_article', {
                errors: errors.array(),
                title: 'Create Article',
                categories,
                article
            });            
        }, (err) => {
            return res.send("Error: Failed to add article");
        });
    }
    else
    {
        Article.addArticle(article)
        .then((result) => {
            console.log("Adding article:", result);
            req.flash('success', 'Article Created');
            res.redirect('/manage/articles');
        }, (err) => {
            req.flash('error', 'Article Creation Failed');
            res.send("Error: Failed to add article :(");
        });
    } 
});

router.post('/edit/:id',
body('title').notEmpty().withMessage("Title is Required"),
body('category_id').notEmpty().withMessage("Category is Required"),
body('author').notEmpty().withMessage("Author is Required"),
(req, res) => {
    
    const id = req.params.id;
    const article = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        category_id: req.body.category_id,
        body: req.body.body,
        author: req.body.author,
        comments: []
    }

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        Category.getCategories()
        .then((categories) => {
            res.render('manage/edit_article', {
                errors: errors.array(),
                title: 'Create Article',
                categories,
                article
            });    
        }, (err) => {
            res.send("Error: Failed to retrieve categories.");
        });
    }
    else
    {
        Article.updateArticle(id, article)
        .then((result) => {
            console.log("Adding article:", result)
            req.flash('success', 'Article Edited');
            res.redirect('/manage/articles');
        }, (err) => {
            req.flash('error', 'Edit Article Failed');
            res.send("Error: Failed to add article :(");
        });
    }
});

/* ----- Delete ----- */
router.delete('/delete/:id', (req, res) => {
    id = req.params.id;

    Article.deleteArticle(id)
    .then((result) => {
        res.sendStatus(200);
    }, (err) => {
        res.send("Error: Failed to delete article :(");
    });
});

module.exports = router;
