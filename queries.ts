import { createConnection } from 'mysql';

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_db',
});

export const handleQueries = (queryType: string, userInput: string | number, callback: any) => {
    let query = '';

    switch (queryType) {
        case 'vulnerable':
            // Vulnerable query - SQL Injection (due to direct user input in the query)
            query = `SELECT * FROM users WHERE username = '${userInput}'`;
            break;

        case 'safe-int':
            // Safe query - the external input is an integer
            query = `SELECT * FROM users WHERE id = ${userInput}`;
            break;

        case 'safe-constant':
            const fixedUsername = 'admin'; // constant value
            // Safe query - the value is constant
            query = `SELECT * FROM users WHERE username = '${fixedUsername}'`;
            break;

        default:
            callback(new Error('Invalid query type'), null);
            return;
    }

    connection.query(query, callback);
};
