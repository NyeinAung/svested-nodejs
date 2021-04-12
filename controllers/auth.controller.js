import njwt from 'njwt';
import repository from '../repositories/repository';
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
  APP_SECRET = 'secret' } = process.env;

const encodeToken = (tokenData) => {
  return njwt.create(tokenData, APP_SECRET).compact();
}

const decodeToken = (token) => {
  return njwt.verify(token, APP_SECRET).setExpiration(new Date().getTime() + 604800000).body; //1 week
}

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return next();
  }

  try {
    const decoded = decodeToken(token);
    const { userId } = decoded;
    const user = await repository.getUserById(userId)
    if (user) {
      req.userId = userId;
    }
  } catch (e) {
    return next();
  }
  next();
};

export const authenticated = (req, res, next) => {
  if (req.userId) {
    return next();
  }

  res.status(401);
  res.json({ error: 'User not authenticated' });
}

const returnInvalidCredentials = (res) => {
  res.status(401);
  return res.json({ error: 'Invalid username or password' });

}

export const signup = async (req, res) => {
  const { username, password } = req.body;

  const olduser = await repository.getUserByUsername(username);
  if(olduser) {
    res.status(500);
    return res.json({ error: 'Sorry! User Name Already Exists!' });
  }

  const hash = bcrypt.hashSync(password, saltRounds);
  const result = await repository.registerUser(username, hash)
  if (!result) {
    res.status(500);
    return res.json({ error: 'Registration Error!' });
  }
  
  const user = await repository.getUserByUsername(username);
  const accessToken = encodeToken({ userId: user.id });
  return res.json({ accessToken });
}