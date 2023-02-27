// DB name: sports-blog
// use mongo shell command `mongosh HOST_IP/sports-blog mongodb_init.js `
// HOST_IP is the ip of the host at which the mongodb server is installed

db.createCollection('categories')
db.createCollection('articles')

db.categories.insertOne({title: 'Baseball', description: 'Baseball articles'})

db.categories.insertOne({title: 'Basketball', description: 'Basketball articles'})

db.categories.insertOne({title: 'Football', description: 'Football articles'})
