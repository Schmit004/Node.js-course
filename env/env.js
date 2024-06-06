import dotenv from 'dotenv';
dotenv.config();

console.log('HOST - ', process.env.HOST);
console.log('PORT - ', process.env.PORT);
console.log('DB_CONN - ', process.env.DB_CONN);
console.log('SECRET_KEY - ', process.env.SECRET_KEY);
