const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title: {type: String},
    subtitle: {type: String},
    category_id: {type: mongoose.Types.ObjectId},
    body: {type: String},
    author: {type: String},
    created_at: {type: Date, defailt: Date.now},
    comments: [{
        comment_subject: {type: String},
        comment_body: {type: String},
        comment_author: {type: String},
        comment_email: {type: String},
        comment_date: {type: Date, defailt: Date.now}        
    }]
})

const Article = module.exports = mongoose.model('Article', articleSchema);


module.exports.getArticles = (limit) => {
    return new Promise((resolve, reject) => {
        Article.find((err, articles) => {
            if(err)
                reject(err);
            else
                resolve(articles);
        }).limit(limit).sort([['title', 'ascending']]);
    });
}

module.exports.getArticleById = (_id) => {
    return new Promise((resolve, reject) => {
        Article.findOne({_id: _id}, (err, article) => {
            if(err)
                reject(err);
            else
                resolve(article);
        });
    });
}

module.exports.addArticle = (article) => {
    return new Promise((resolve, reject) => {
        Article.create(article, (err, res) => {
            if(err)
                reject(err);
            else
                resolve(res);
        });
    });
}

module.exports.updateArticle = (_id, article) => {
    return new Promise((resolve, reject) => {
        Article.updateOne({_id: _id}, article, (err, res) => {
            if(err)
                reject(err);
            else
                resolve(res);
        });
    });
}

module.exports.deleteArticle = (_id) => {
    return new Promise((resolve, reject) => {
        Article.deleteOne({_id: _id}, (err, res) => {
            if(err)
                reject(err);
            else
                resolve(res);
        });
    });
}
