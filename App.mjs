import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { addRemoveSlash, getEnv } from './core/Utils.mjs';
import Routes from './routes/Router.mjs';
const app = express();
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist'), { index: false }));
app.use(addRemoveSlash(getEnv('UPLOAD_URL'), true), express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), addRemoveSlash(getEnv('UPLOAD_DIRECTORY'))), { index: false }));
app.set('ssr', true);
app.use(getEnv('APP_DIRECTORY_NAME') ? addRemoveSlash(getEnv('APP_DIRECTORY_NAME'), true) : '', Routes)
app.listen(getEnv('SERVER_PORT'));