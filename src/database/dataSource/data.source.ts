import { DataSource } from "typeorm"
import { config } from 'dotenv';

config();

const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['src/model/*.entity.{ts,js}'],
    migrations: ['src/database/migration/*.{ts,js}'],
  });
  
  export default PostgresDataSource;