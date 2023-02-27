const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('articles/articles', {title: "Articles"});
});

router.get('/show/:id', (req, res) => {
    res.render('articles/article', {title: "Article"});
});

module.exports = router;
