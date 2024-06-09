const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../../exceptions/InputError');

const {
    hashPassword, verifyPassword
} = require('../encrypt');

const addUser = async (id, username, password) => {


    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    /*
        1) is Unique Username?
        2) Create User
    */

    // 1)

    const usersCollection = fs.collection('users');

    const result = await usersCollection.where('username', '==', username).get();
    const users = [];
    result.forEach(user=>{
        users.push(user.data());
    })

    if(users.length > 0){
        throw new InputError('Username already exist!');
    }
    // 2)
    const usersDoc = usersCollection.doc(id);

    const createdAt = new Date().toISOString();
    const hashedPassword = await hashPassword(password);

    const data = {
        id: id,
        username: username,
        password: hashedPassword,
        createdAt: createdAt,
        updatedAt: createdAt,
    }

    await usersDoc.set(data);

    return true;
    
}

module.exports = addUser;