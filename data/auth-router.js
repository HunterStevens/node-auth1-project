const router = require('express').Router();
const bcrypt = require('bcryptjs');
const account = require('./auth-model');


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
    
    if(account.IsValid(req.body)){
        account.filterBy({username:username}).then(([profile]) =>{
            if(profile && bcrypt.compareSync(password,profile.password)){
                req.session.loggedIn = true;
                req.session.profile = profile;
                console.log('login endpoint LoggedIN', req.session.loggedIn);
                console.log(req.session.profile);
                res.status(200).json({message:'logged in'});
            }
            else{
                res.status(404).json({message:'invalid credentials'});
            }
        }).catch(err =>{res.status(500).json({message:err.message})});
    }else{
        res.status(400).json({message:'It seems there wasnt a username or a password.'})
    }
})
function authorized(req,res,next){
    console.log('Authorized MiddleWare loggedIn', req.session.loggedIn);
    if(req.session && req.session.loggedIn ){
        next();
    }else{res.status(404).json({well:'YOU SHALL NOT PASS!'});}
}

router.use(authorized)

router.get('/users', (req,res) =>{
    account.findAll()
    .then(list =>{
        res.status(200).json(list);
    }).catch(err =>{res.status(500).json(err.message)});
})

router.get('/logout', (req,res) =>{
    if(req.session){
        req.session.destroy(err =>{
            console.log(req.session);
            if(err){
                res.status(500).json({message:'server error to logout. Was not successful.'})
            }else{
                res.status(204).end();
            }
        })
    }else{
        req.session.end();
    }
})

module.exports = router;