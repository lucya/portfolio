const jwt = require('jsonwebtoken');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  sign: (user) => {
    const payload = {
      uid: user.uid,
      photoURL: user.photoURL,
      username: user.username,
    };
    const options = {
      expiresIn: '1h',
      issuer: 'nature'
    }
    const result = {
      token: jwt.sign(payload, process.env.TOKEN_SECRET, options),
      // refreshToken: randToken.uid(256)
    };
    return result;
  },
  verify: (token) => {
    // let decoded;
    // try {
    //   // verify를 통해 값 decode!
    //   decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // } catch (err) {
    //   console.log('jwt ', err)
    //   if (err.message === 'jwt expired') {
    //     console.log('expired token');
    //     return TOKEN_EXPIRED;
    //   } else if (err.message === 'invalid token') {
    //     console.log('invalid token');
    //     console.log(TOKEN_INVALID);
    //     return TOKEN_INVALID;
    //   } else {
    //     console.log("invalid token");
    //     return TOKEN_INVALID;
    //   }
    // }
    // return decoded;

    console.log("token: " + token);

    return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log('err', err)
        throw err
      }
      console.log('decoded', decoded)
      return decoded;
    })

  }
}