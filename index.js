const express =require('express')
const crypto = require ("crypto");
// const { createHash } = require("crypto")
const cryptoRoutes = require('./src/Client_id/routes')
const cryptoSecret =require('./src/Client_secret/routes')
const authCode = require('./src/Auth_code/routes')
// const jwk =require('./src/jwt/routes')
// const accesToken =require('./src/Access_token/routes')
const app = express();

const port = 3000;

app.use(express.json());
app.get("/", (req, res)=>{
    res.send("hi");
});

// privateKey and publicKey

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
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
const data ="given_name: Oishi,famicompareAPIly_name: Chowdhury,,nickname : oishichowdhury2"
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
const signature2 = crypto.sign("sha256", Buffer.from(mainData), {
	key: privateKey,
	padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
})
 console.log(signature2.toString("base64"))
const isVerified = crypto.verify(
	"sha256",
	Buffer.from(mainData),
	{
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
	},
	signature2
)
console.log("signature verified: ", isVerified)





// JWT token Issuing and Verification Implementation
const jwt = require("jsonwebtoken")
const toBase64 = obj => {
  const str = JSON.stringify (obj);
  return Buffer.from(str).toString ('base64');
};
const replaceSpecialChars = b64string => {
     return b64string.replace (/[=+/]/g, charToBeReplaced => {
      switch (charToBeReplaced) {
        case '=':
          return '';
        case '+':
          return '-';
        case '/':
          return '_';
      }
    });
  };

const payload = {
  family_name: "Chowdhury",
  nickname: "oishichowdhury2",
  name: "Oishi Chowdhury",
  picture: "https://lh3.googleusercontent.com/a/AEdFTp7heuVipDGEoouGtKAzNhmWm9-L95dpZtGlT-K6lQ=s96-c",
  locale: "en",
  updated_at: "2023-02-07T03:41:20.052Z",
  email: "oishichowdhury2@gmail.com",
  email_verified: true,
  iss: "https://dev-plzeeez2javw3mh0.us.auth0.com/",
  aud: "ALil0hVJgWq4K4gy1dhOmPux7bvRU1yg",
  ia: 1675836840,
  exp: 1675872840,
  sub: "google-oauth2|117357238666985379195",
  sid: "7vjlHfOJKufNvT3OtRg0TgcmfoGdmceJ",
  nonce: "26863d58f88a53e4685b28645073d008"
};

const b64Payload = toBase64 (payload);
const jwtB64Payload = replaceSpecialChars (b64Payload);
// console.log ("the payload is: ",jwtB64Payload);

const header = {
	alg: 'RS256',
	typ: 'JWT',
	kid: "vwhfkByBWWLFXq8MNE-OZ"
  };
  const b64Header = toBase64 (header);
  const jwtB64Header = replaceSpecialChars(b64Header);
  console.log ("the header is: ",jwtB64Header)

const createSignature =(jwtB64Header,jwtB64Payload,secret)=>{
    let signature = crypto.createHmac ('sha256', secret);
    signature.update (jwtB64Header + '.' + jwtB64Payload);
    signature = signature.digest ('base64');
    signature = replaceSpecialChars (signature);
    return signature
}
const secret = 'super_secret_society';
const signature= createSignature(jwtB64Header,jwtB64Payload,secret);
console.log ("the signature is: ",signature);
const jsonWebToken = jwtB64Header + '.' + jwtB64Payload + '.' + signature;
console.log ("the JWT is :",jsonWebToken);




app.use('/api/v1/client_id', cryptoRoutes);
app.use('/api/v1/client_secret', cryptoSecret);
app.use('/api/v1/auth_code', authCode);
// app.use('/api/v1/jwk', jwk);
app.listen(port, () => console.log(`app server ${port}`));