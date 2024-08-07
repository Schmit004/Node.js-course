import dotenv from 'dotenv';
dotenv.config();

export const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  udpHost: process.env.UDP_HOST,
  udpPort: process.env.UDP_PORT,
  secret: process.env.SECRET,
  passphrase: process.env.PASSPHRASE,
};
