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
];

export const postCreateValidator = [
    body('title', 'Title is absent or shorter than 5 symbols').isString().isLength({min: 5}),
    body('text', 'Text is absent or shorted than 10 symbols').isString().isLength({min: 10}),
    body('tags', 'Tags must be an array').optional().isArray(),
    body('imageUrl', 'Invalid image url').optional().isString()
];

export const postUpdateValidator = [
    body('title', 'Title is absent or shorter than 5 symbols').optional().isString().isLength({min: 5}),
    body('text', 'Text is absent or shorted than 10 symbols').optional().isString().isLength({min: 10}),
    body('tags', 'Tags must be an array').optional().isArray(),
    body('imageUrl', 'Invalid image url').optional().isString()
];
