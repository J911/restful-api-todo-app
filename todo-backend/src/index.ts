import App from './app'
import { config } from 'dotenv'
config();

// @ts-ignore: Cannot find name 'process'.
const app = new App(process.env.PORT || 3000);
