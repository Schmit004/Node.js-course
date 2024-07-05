import dotenv from 'dotenv';
dotenv.config();

export const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  secret: process.env.SECRET,
  passphrase: process.env.PASSPHRASE,
};
