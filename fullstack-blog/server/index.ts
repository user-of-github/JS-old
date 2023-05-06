import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (request: Request, response: Response) => {
    response.send('Hello world');
});

const port: number = 8000;

app.listen(port, () => {
    console.info('Server listening on port ', port);
});
