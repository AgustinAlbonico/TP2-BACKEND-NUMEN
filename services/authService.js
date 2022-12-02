const jwt = require("jwt-simple");
const { DateTime } = require("luxon");

let claveSecreta = process.env.KEY || "12345";

const createToken = () => {
  const payload = {
    iat: DateTime.now().toMillis(),
    exp: DateTime.now().plus({ days: 14 }).toMillis(),
  };
  return jwt.encode(payload, claveSecreta);
};

const decodeToken = (token) => {
  let payload;
  try {
    payload = jwt.decode(token, claveSecreta);
    if (payload.exp <= DateTime.now().toMillis()) {
      return { message: "El token ha expirado!" };
    }
  } catch (error) {
    console.log(error);
  }
  return payload;
};

module.exports = {
  createToken,
  decodeToken,
};
