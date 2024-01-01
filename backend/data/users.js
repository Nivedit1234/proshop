import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'Jane Doe',
    email: 'jd@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },

  {
    name: 'Jane Doe',
    email: 'dj@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default users;
