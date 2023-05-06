import { body } from 'express-validator';


export const registerValidator = [
    body('email', 'Email is absent or has invalid format').isEmail(),
    body('password', 'Password length must be at least 5 symbols').isLength({min: 5}),
    body('name', 'Name length must be at least 5 symbols').isLength({min: 3}),
    body('avatar', 'Invalid URL').optional().isURL()
];

export const loginValidator = [
    body('email', 'Email is absent or has invalid format').isEmail(),
    body('password', 'Password length must be at least 5 symbols').isLength({min: 5})
]
