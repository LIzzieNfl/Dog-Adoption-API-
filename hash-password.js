const bcrypt = require('bcryptjs');

bcrypt.hash('password123', 10).then(hash => {
  console.log('Hashed password:', hash);
}).catch(err => {
  console.error('Error hashing password:', err);
});
