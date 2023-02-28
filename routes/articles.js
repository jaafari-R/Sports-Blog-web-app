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

    Article.addArticle(article, (err, result) => {
        if(err)
        {
            console.log(err);
            res.send("Error: Failed to add article :(");
        }
        else {
            console.log("Adding article:", result)
            res.redirect('/manage/articles');
        }
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

    Article.updateArticle(id, article, (err, result) => {
        if(err)
        {
            console.log(err);
            res.send("Error: Failed to add article :(");
        }
        else {
            console.log("Adding article:", result)
            res.redirect('/manage/articles');
        }
    }); 
});

/* ----- Delete ----- */

module.exports = router;
