import { createConnection } from 'mysql';

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_db',
});

export const vulnerableQuery = (userInput: string, callback: any) => {
    // Vulnerable query - SQL Injection (due to direct user input in the query)
    const query1 = `SELECT * FROM users WHERE username = '${userInput}'`;
    connection.query(query1, callback);
};

export const safeQueryWithNumber = (id: number, callback: any) => {
    // Safe query - the external input is an integer
    const query2 = `SELECT * FROM users WHERE id = ${id}`;
    connection.query(query2, callback);
};

export const safeQueryWithConstant = (callback: any) => {
    const fixedUsername = 'admin'; // constant value

    // Safe query - the value is constant
    const query3 = `SELECT * FROM users WHERE username = '${fixedUsername}'`;
    connection.query(query3, callback);
};
