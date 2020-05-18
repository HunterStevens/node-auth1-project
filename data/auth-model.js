const db = require('./dbConfig');

module.exports = {
    newAccount,
    findAll,
    findById,
    filterBy,
    IsValid
}

function findAll(){
    return db('users').select('id','username');
}

function filterBy(filter){
    return db('users').where(filter);
}

async function newAccount(user){
    try{
        const [id] = await db('users').insert(user,'id');
        return findById(id);
    }catch(err){
        throw err;
    }
}

function findById(id){
    return db('user').where({id}).first();
}

function IsValid(account){
    return Boolean(account.username && account.password && typeof user.password === 'string');
}