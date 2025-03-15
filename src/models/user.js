const bcrypt = require('bcryptjs');
const pool = require('../config/database');

class User {
  constructor(username, password, email, role) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length) {
      return new User(rows[0]);
    }
    return null;
  }

  async save() {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const [result] = await pool.execute(
            'INSERT INTO users (username, password, email, phone, role) VALUES (?, ?, ?, ?, ?)', 
            [this.username, hashedPassword, this.email, this.role]
        );
        return result.insertId;
    } catch (error) {
        throw error;
    }
  }

  async checkPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}