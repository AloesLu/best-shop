/**
 * Best Shop
 * 
 * app.js
 * 
 * Copyright 2019-present, AloesLu. All rights reserved.
 */
// ===== MODULES ===============================================================
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import {Server} from 'http';

// ===== ROUTES ================================================================
import index from './routes/index';
// import lists from './routes/lists';
import webhooks from './routes/webhooks';

/* =============================================
   =                Initialize                 =
   ============================================= */

export const app = express()
export const server = Server(app);

/* =============================================
   =           Basic Configuration             =
   ============================================= */

/* ----------  Views  ---------- */
app.set('view engine', 'ejs');

/* ----------  Static Assets  ---------- */

/* ----------  Parsers  ---------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/* ----------  Loggers &c  ---------- */


/* =============================================
   =                   Sockets                 =
   ============================================= */

/* ----------  Sockets  ---------- */

/* ----------  Sockets Hooks  ---------- */


/* =============================================
   =                   Routes                  =
   ============================================= */

/* ----------  Primary / Happy Path  ---------- */
app.use('/webhook', webhooks);
app.use('/', index);

/* ----------  Errors  ---------- */

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
   
// development error handler, will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
      res.status(err.status || 500);
      new Error(err); // eslint-disable-line no-new
    });
}

// production error handler, no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
    message: err.message,
    error: {},
    });
});   

/* =============================================
   =              Messenger Setup              =
   ============================================= */


   
/* =============================================
      =            Complete Configuration         =
      ============================================= */

const appPort = process.env.PORT;
server.listen(appPort);

export default app;