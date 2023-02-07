const express =require('express')
const cryptoRoutes = require('./src/Client_id/routes')
const cryptoSecret =require('./src/Client_secret/routes')
const app = express();

const port = 3000;

app.use(express.json());
app.get("/", (req, res)=>{
    res.send("hi");
});
app.use('/api/v1/crypto', cryptoRoutes);
app.use('/api/v1/cryptosecret', cryptoSecret);
app.listen(port, () => console.log(`app server ${port}`));