import express from 'express';
import bodyParser from 'body-parser';
import { vulnerableQuery, safeQueryWithNumber, safeQueryWithConstant } from './queries';

const app = express();
app.use(bodyParser.json());

app.post('/vulnerable-query', (req, res) => {
    const userInput = req.body.input; // external input from user

    vulnerableQuery(userInput, (error: any, results: any) => {
        if (error) {
            res.status(500).send('Error in the query');
        } else {
            res.json(results);
        }
    });
});

app.get('/safe-query-int', (req, res) => {
    const id = parseInt(req.query.id as string, 10); // input is a number

    safeQueryWithNumber(id, (error: any, results: any) => {
        if (error) {
            res.status(500).send('Error in the query');
        } else {
            res.json(results);
        }
    });
});

app.get('/safe-query-constant', (req, res) => {
    safeQueryWithConstant((error: any, results: any) => {
        if (error) {
            res.status(500).send('Error in the query');
        } else {
            res.json(results);
        }
    });
});

app.listen(4000, () => {
    console.log('Server 2 running on port 4000');
});
