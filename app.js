import  express  from "express";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());


// arrays globais
const tweets = [

];

const users = [
  
];

// pegar todos os tweets feitos
app.get("/tweets", (req, res) => {
    const status ="OK"
    res.send(tweets);
});


// pegar somente os tweets do username específico
/*app.get("/tweets/:username", (req, res) => {
    const {username} = req.params
    const theTweet = tweets.find((user) => user.username === username )
     res.send(theTweet)
});*/


// pegar o usuário cadastrado
app.get("/sign-up", (req, res) => {
    res.send(users);
});


// adcionar o usuário 
app.post("/sign-up", (req, res) => {
    const novoUser ={
            username: req.body.username,
            avatar: req.body.avatar
    };
    users.push(novoUser);
    res.send("OK");
});


// adcionar tweet
app.post("/tweets", (req, res) => { 
   
    if(req.body.username != users.find((user) => user.username)){
        const user = users.find((user) => user.username === req.body.username);
        
        const newTweet ={
            username: req.body.username,
            tweet: req.body.tweet,
            avatar: user.avatar
        };

        tweets.push(newTweet);

        if(tweets.length ===11){
            tweets.shift();
        };
        res.send("OK");

   }else{
        res.send("UNAUTHORIZED");
        res.sendStatus(422)
   };
    
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
