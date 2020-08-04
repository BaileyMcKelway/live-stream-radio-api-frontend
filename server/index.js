const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

const PORT = process.env.PORT || 3001;

// Remember that we aren't able to use await outside of an async function.
async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}
startServer();

module.exports = app;
