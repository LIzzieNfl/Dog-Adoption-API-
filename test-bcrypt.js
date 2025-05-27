const bcrypt = require('bcryptjs');

const hashedPassword = '$2b$10$pOngxkMEOqEAbH6PjqSgDu63T5K54j2vlhzCjJBoBi7D7j61WlbWa';
const plaintextPassword = 'password123';

bcrypt.compare(plaintextPassword, hashedPassword)
  .then(match => {
    console.log('Password matches:', match);
  })
  .catch(err => {
    console.error('Error:', err);
  });
