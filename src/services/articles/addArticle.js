const { Firestore } = require('@google-cloud/firestore');
const crypto = require('crypto');
const path = require('path');

const {
    uploadImage, createBucket
} = require('./storage-utils');

const addArticle = async (id, image, title, content) => {
    
    // Extract Values from Parameters
    const { filename: imagename, path: imagepath } = image;
    const createdAt = new Date().toISOString();

    /*
        1) Input Image Exist?
        - IF Exists: Upload Image to Storage Bucket
        2) Save to Firestore Articles Collection
    */

    // 1)

    let fileExt, image_src_path

    if(!imagename){
        const default_image_path = path.join(__dirname, 'temp/default_article_image.png');
        image_src_path = default_image_path;
        fileExt = default_image_path.split('.')[2];
    }else{
        image_src_path = imagepath;
        fileExt = imagename.split('.')[1];
    }

    const newImageName = `articles-${crypto.randomBytes(6).toString('hex')}.${fileExt}`;
    const image_dest_path = `${newImageName}`;

    await createBucket();
    await uploadImage(image_src_path, image_dest_path);

    const image_url = `${process.env.SAVED_ARTICLES_IMG_URL}${newImageName}`;

    // 2)

    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    const articlesCollection = fs.collection('articles');
    const articleDoc = articlesCollection.doc(id);

    const data = {
        id: id,
        title: title,
        content: content,
        createdAt: createdAt,
        image_url: image_url,
    }

    await articleDoc.set(data);

    return true;
    
}

module.exports = addArticle;