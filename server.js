require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
const post = [

    {
        username : 'Talha',
        title : 'post 1'
    },
    {
        username : 'Awais',
        title : 'post 2'
    }
]

app.get('/posts',(req,res)=>{

    res.json(post.filter(post => post.username === req.user.name));

});

app.post('/login',authenticateToken,(req,res)=>{
  
    const username = req.body.username;
    const user = { name : username  };

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken : accessToken});

});

function authenticateToken(req,res,next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err ,user)=>{
    if(err) return res.sendStatus(403)
    req.user = user
    next()
    });
}
app.listen(3000);