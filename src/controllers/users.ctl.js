import jwt from 'jsonwebtoken';
import Users from '../models/users.js';

const SECRET_KEY = process.env.JWT_SECRET;

/**
 * @author Iván Sánchez
 * @name GET_ALL
 * @description Get all users from the database
 */
export const GET_ALL = async (req, res) => {
  try {
    const users = await Users.findAll();
    console.info('✅ Users fetched successfully');
    return res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @author Iván Sánchez
 * @name CREATE_ONE
 * @description Create a new user in the database
 */
export const CREATE_ONE = async (req, res) => {
  try {
    const user_created = await Users.create(req.body);
    console.info('✅ User created successfully');
    return res.status(201).json(user_created);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @author Iván Sánchez
 * @name GET_ONE
 * @description Get one user by ID
 */
export const GET_ONE = async (req, res) => {
  try {
    const { id_user } = req.body;
    if (!id_user) return res.status(400).json({ error: 'Missing user ID' });

    const user = await Users.findByPk(id_user);
    if (!user) return res.status(404).json({ error: 'User not found' });
    console.info('✅ User fetched successfully');

    return res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @author Iván Sánchez
 * @name DELETE_USER
 * @description Delete a user by ID
 */
export const DELETE_USER = async (req, res) => {
  try {
    const { id_user } = req.body;
    if (!id_user) return res.status(400).json({ error: 'Missing user ID' });
    const userDeleted = await Users.destroy({ where: { id_user } });
    if (!userDeleted) return res.status(404).json({ error: 'User not found' });
    console.info('✅ User deleted successfully');
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @author Iván Sánchez
 * @name UPDATE_USER
 * @description Update a user by ID
 */
export const UPDATE_USER = async (req, res) => {
  try {
    const { id_user } = req.body;
    if (!id_user) return res.status(400).json({ error: 'Missing user ID' });
    const [rowsUpdated, [updatedUser]] = await Users.update(
      {
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        status: req.body.status,
        rol: req.body.rol,
      },
      {
        where: { id_user },
        returning: true,
      }
    );
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.info('✅ User updated successfully');
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('❌ Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @author Iván Sánchez
 * @name COMPARE_PASSWORD
 * @description Compare password for login
*/
export const COMPARE_PASSWORD = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.scope('withPassword').findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // ✅ Eliminar contraseña antes de responder
    const userResponse = user.toJSON();
    delete userResponse.password;

    // ✅ Generar token JWT
    const token = jwt.sign(
      { id_user: user.id_user, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    console.info('✅ Password match for user:', email);
    return res.status(200).json({
      message: 'Login successful',
      user: userResponse,
      token, // ✅ Devuelves el token
    });
  } catch (error) {
    console.error('❌ Error during login/password comparison:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

