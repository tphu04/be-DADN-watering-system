const prisma = require('../../../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailChecker = require('mailchecker');

async function findByUsername(username) {
    return await prisma.user.findUnique({
        where: {
            username: username
        }
    });
}

async function findByEmail(email) {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    });
}   

async function createUser(fullname, username, password, email, phone, address) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: {
            fullname,
            username,
            password: hashedPassword,
            email,
            phone,
            address,
            role: 'USER'
        }
    });
}

async function checkMailExist(email) {
    return mailChecker.isValid(email);
}

async function checkPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    };
    
    // Token expires in 24 hours
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

async function changePassword(id, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.update({
        where: {
            id: id
        },
        data: {
            password: hashedPassword
        }
    });
}

async function decodeJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    findByUsername,
    findByEmail,
    createUser,
    checkMailExist,
    checkPassword,
    generateToken,
    changePassword,
    decodeJWT
};