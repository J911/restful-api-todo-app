import App from './app'
import {config} from 'dotenv'

config();

// @ts-ignore: Cannot find name 'process'.
const port = parseInt(process.env.PORT, 10) || 3000;

const app = new App();
app.listen(port);
