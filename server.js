'use strict';

import express from 'express';
import path from 'path';
import compression from 'compression';
// import favicon from 'serve-favicon';
import morgan from 'morgan';

let port = (process.env.PORT || 5000),
    app = express(),
    buildDir = path.join(__dirname, 'dist');

app.use(compression());
// app.use(favicon(path.join(buildDir, 'images', 'favicon.ico')));
app.use(express.static(path.join(process.cwd(), 'dist')));

app.use(morgan('dev'));

process.addListener('uncaughtException', (err) => {
  console.error('Uncaught Error', err);
});

app.use((req, res, next) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(port, function() {
  console.log('Node app is running on port', port);
});

export default app;
