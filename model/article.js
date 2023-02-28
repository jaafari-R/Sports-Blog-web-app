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

module.exports.getArticles = (limit, callback) => {
    Article.find(callback).limit(limit).sort([['title', 'ascending']]);
}

module.exports.getArticleById = (_id, callback) => {
    return new Promise((resolve, reject) => {
        Article.findOne({_id: _id}, (err, article) => {
            if(err)
                reject(err);
            else
                resolve(article);
        });
    });
}

module.exports.addArticle = (article, callback) => {
    Article.create(article, callback);
}

module.exports.updateArticle = (_id, article, callback) => {
    Article.updateOne({_id: _id}, article, callback);
}

module.exports.deleteArticle = (_id, callback) => {
    Article.deleteOne({_id: _id}, callback);
}
