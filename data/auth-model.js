const db = require('./dbConfig');

module.exports = {
    newAccount,
    findAll,
    findById,
    filterBy,
    IsValid
}

function findAll(){
    return db('accounts').select('id','username');
}

function filterBy(filter){
    return db('accounts').where(filter);
}

async function newAccount(user){
    try{
        const [id] = await db('accounts').insert(user,'id');
        return findById(id);
    }catch(err){
        throw err.message;
    }
}

function findById(id){
    return db('accounts').where({id}).first();
}

function IsValid(credentials){
    return Boolean(credentials.username && credentials.password && typeof credentials.password === 'string');
}