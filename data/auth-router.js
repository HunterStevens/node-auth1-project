const router = require('express').Router();
const bcrypt = require('bcryptjs');
const account = require('./auth-model');

function authorized(req,res,next){
    if(req.session && req.session.loggedIn){
        next();
    }else{res.status(404).json({well:'YOU SHALL NOT PASS!'});}
}

router.post('/register', (req,res) =>{
    const creds = req.body;

    if(account.IsValid(creds)){
        const rounds = process.env.BCRYPT_ROUNDS || 10;
        const hash = bcrypt.hashSync(creds.password, rounds);
        creds.password = hash;

        account.newAccount(creds).then(user =>{
            res.status(200).json({data:user});
        })
        .catch(err =>{
            res.status(500).json({message:err.message});
        })
    }
    else{
        res.status(404).status({message:'Both username and password is required'});
    }
})

router.post('/login', (req,res) =>{
    const {username, password} = req.body;

    if(IsValid(username && password)){
        account.filterBy({username:username}).then(([profile]) =>{
            if(user && bcrypt.compareSync(password,user.password)){
                res.status(200).json({message:'logged in'});
                req.session.loggedIn = true;
                req.session.user = user;
            }
            else{
                res.status(404).json({message:'invalid credentials'});
            }
        }).catch(err =>{res.status(500).json({message:err.message})});
    }else{
        res.status(400).json({message:'It seems there wasnt a username or a password.'})
    }
})

router.get('/users', authorized, (req,res) =>{
    account.findAll()
    .then(list =>{
        res.status(200).json(list);
    }).catch(err =>{res.status(500).json(err.message)});
})

module.exports = router;