const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../../exceptions/InputError');

const {
    hashPassword, verifyPassword
} = require('../encrypt');

const editUser = async (id, username, password) => {
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    /*
        1) Does user Exist?
        2) Does user Change Name?
            - IF YES, is new name Unique?
        3) Update User
    */

    // 1)
    const usersCollection = fs.collection('users');
    const userDoc = usersCollection.doc(id);
    
    const result = await userDoc.get();
    const user = result.data();

    if(!user){
        throw new InputError(`User with id=${id} not found!`);
    }

    // 2)
    const old_username = user.username;
    let final_username = old_username;

    if(old_username !== username){
        const second_result = await usersCollection
        .where('username', '==', username).get();

        let second_result_arr = [];
        second_result.forEach(user => {
            second_result_arr.push(user.data());
        })

        if(second_result_arr.length > 0){
            throw new InputError('Username already exists!');
        }

        final_username = username;
        
    }

    // 3)
    
    const updatedAt = new Date().toISOString()
    const hashedPassword = await hashPassword(password);
    
    const data = {
        ...user,
        username: final_username,
        password: hashedPassword,
        updatedAt: updatedAt,
    }

    await userDoc.update(data);

    return true;
    
}

module.exports = editUser;