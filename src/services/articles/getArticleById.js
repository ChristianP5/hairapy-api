const { Firestore } = require('@google-cloud/firestore');

const InputError = require('../../exceptions/InputError')
const getArticleById = async (id) => {
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    const articlesCollection = fs.collection('articles');
    const articleDoc = articlesCollection.doc(id);
    
    const result = await articleDoc.get();
    const article = result.data();

    if(!article){
        throw new InputError(`Article with id=${id} not found!`);
    }

    return article;
    
}

module.exports = getArticleById;