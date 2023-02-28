const express = require('express');

const router = express.Router();


/* ----- DB Models ----- */
Article = require('../model/article')


/* ----- Views ----- */
router.get('/', (req, res) => {
    res.render('articles/articles', {title: "Articles"});
});

router.get('/show/:id', (req, res) => {
    res.render('articles/article', {title: "Article"});
});


/* ----- Posts ----- */
router.post('/add', (req, res) => {
    const article = new Article()
    article.title = req.body.title;
    article.subtitle = req.body.subtitle;
    article.category_id = req.body.category_id;
    article.body = req.body.body;
    article.author = req.body.author;
    article.comments = [];

    Article.addArticle(article)
    .then((result) => {
        console.log("Adding article:", result);
        res.redirect('/manage/articles');
    }, (err) => {
        res.send("Error: Failed to add article :(");
    }); 
});

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const article = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        category_id: req.body.category_id,
        body: req.body.body,
        author: req.body.author,
        comments: []
    }

    Article.updateArticle(id, article)
    .then((result) => {
        console.log("Adding article:", result)
        res.redirect('/manage/articles');
    }, (err) => {
        res.send("Error: Failed to add article :(");
    });
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
