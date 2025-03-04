import dotenv from 'dotenv';

dotenv.config();

const config = {
  GEMINA_API_ONE: process.env.GEMINA_API_ONE,
  GEMINA_API_TWO: process.env.GEMINA_API_TWO,
};

export default config;
