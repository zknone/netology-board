const User = require('../models/usermodel')

const UserModule ={
    async create(data) {
        try {
            const newUser = new User(data)
            await newUser.save()
            return newUser
        }
        catch (error) {
            console.error('Error:', error)
            throw error;
        }
    },

    async findByEmail(email) {
        try {
            const foundUser = await User.find({
                email
            })
            return foundUser;
        } catch (error) {
            console.error('Error:', error)
            throw error;
        }
    }
}

module.exports = UserModule;