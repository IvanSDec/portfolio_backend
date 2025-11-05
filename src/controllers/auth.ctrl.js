import jwt from 'jsonwebtoken';
import Users from '../models/users.js';

const SECRET_KEY = process.env.JWT_SECRET;

export const ME = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token required' });
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await Users.findByPk(decoded.id_user);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const userResponse = user.toJSON();
    delete userResponse.password;
    return res.status(200).json({ user: userResponse });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};