const express =require('express')
const crypto = require ("crypto");
// const { createHash } = require("crypto")
const cryptoRoutes = require('./src/Client_id/routes')
const cryptoSecret =require('./src/Client_secret/routes')
const authCode = require('./src/Auth_code/routes')
// const accesToken =require('./src/Access_token/routes')
const app = express();

const port = 3000;

app.use(express.json());
app.get("/", (req, res)=>{
    res.send("hi");
});


// const crypto = require("crypto")

// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	// The standard secure default length for RSA keys is 2048 bits
	modulusLength: 2048,
})

console.log(
	publicKey.export({
		type: "pkcs1",
		format: "pem",
	}),

	privateKey.export({
		type: "pkcs1",
		format: "pem",
	})
)

// This is the data we want to encrypt
const data =" given_name: Oishi,famicompareAPIly_name: Chowdhury,,nickname : oishichowdhury2"
const encryptedData = crypto.publicEncrypt(
	{
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	},
	Buffer.from(data)
)
 const mainData = encryptedData.toString("base64");
console.log("encypted data: ",mainData)



const verifiableData = "this need to be verified"


const signature = crypto.sign("sha256", Buffer.from(mainData), {
	key: privateKey,
	padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
})

console.log(signature.toString("base64"))


const isVerified = crypto.verify(
	"sha256",
	Buffer.from(mainData),
	{
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
	},
	signature
)


console.log("signature verified: ", isVerified)

app.use('/api/v1/client_id', cryptoRoutes);
app.use('/api/v1/client_secret', cryptoSecret);
app.use('/api/v1/auth_code', authCode);
// app.use('/api/v1/acces_token', accesToken);
app.listen(port, () => console.log(`app server ${port}`));