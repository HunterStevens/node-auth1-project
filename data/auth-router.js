const router = require('express');
const bcrypt = require('bcryptjs');
const account = require('./auth-model');

router.post