import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../database';

const registerUser = async (req, res) => {
    const { firstName, lastName, email, phone, password, userType } = req.body;
  
    // Check if user already exists
    const userExistsQuery = 'SELECT * FROM Users WHERE Email = ?';
    connection.query(userExistsQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error checking user existence:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into database
      const insertUserQuery = 'INSERT INTO Users (FirstName, LastName, Email, Phone, Password, UserType) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(insertUserQuery, [firstName, lastName, email, phone, hashedPassword, userType], (err, results) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        return res.status(201).json({ message: 'User registered successfully' });
      });
    });
  };
  

const login = (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const getUserQuery = 'SELECT * FROM Users WHERE Email = ?';
  connection.query(getUserQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    return res.status(200).json({ token });
  });
};

export { registerUser, loginUser };
