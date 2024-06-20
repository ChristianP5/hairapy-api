const { Firestore } = require('@google-cloud/firestore');
const crypto = require('crypto');

const InputError = require('../../exceptions/InputError');

const { createBucket, uploadImage, removeImage } = require('./storage-utils');

const editArticle = async (id, title, content, image) => {
  // Extrace Values from Parameters
  const { filename: input_imagename, path: input_imagepath } = image;

  /*
     1) Check Article Exists
     2) Check if New Image Exists
        - IF Exist, remove Old Image and add New Image
        - IF Not, keep Old Image
     3) Update Firestore
    */

  // 1)
  const fs = new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.FIRESTORE_ID,
  });

  const articlesCollection = fs.collection('articles');
  const articleDoc = articlesCollection.doc(id);

  const result = await articleDoc.get();
  const article = result.data();

  if (!article) {
    throw new InputError(`Article with id=${id} not found!`);
  }

  // 2)

  let article_image_url = article.image_url;
  if (input_imagename) {
    // Delete Old Image
    const article_image_path = article_image_url.replace(process.env.SAVED_ARTICLES_IMG_URL, '');
    await removeImage(article_image_path);

    // Create New Image
    const fileExt = input_imagename.split('.')[1];
    const newImageName = `articles-${crypto.randomBytes(6).toString('hex')}.${fileExt}`;
    const image_dest_path = `${newImageName}`;

    await createBucket();
    await uploadImage(input_imagepath, image_dest_path);

    article_image_url = `${process.env.SAVED_ARTICLES_IMG_URL}${newImageName}`;
  }

  const data = {
    title,
    content,
    createdAt: article.createdAt,
    image_url: article_image_url,
  };

  await articleDoc.update(data);

  return true;
};

module.exports = editArticle;
