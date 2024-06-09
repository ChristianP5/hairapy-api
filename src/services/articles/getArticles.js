const { Firestore } = require('@google-cloud/firestore');

const getArticles = async () => {
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    const articlesCollection = fs.collection('articles');
    
    const result = await articlesCollection.get();

    let articles = [];
    result.forEach(article => {
        articles.push(article.data());
    });

    return articles;
    
}

module.exports = getArticles;