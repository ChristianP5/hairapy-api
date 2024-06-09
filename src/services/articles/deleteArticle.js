const { Firestore } = require('@google-cloud/firestore');

const InputError = require('../../exceptions/InputError')

const { removeImage } = require('./storage-utils');
const deleteArticle = async (id) => {
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

    // Delete Article Image from Cloud Storage
    const article_image_url = article.image_url;
    const article_image_path = article_image_url.replace(process.env.SAVED_ARTICLES_IMG_URL, "");
    await removeImage(article_image_path)

    // Delete Article
    await articleDoc.delete();

    return true;
    
}

module.exports = deleteArticle;