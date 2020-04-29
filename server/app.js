let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser=require('body-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let userRouter = require('./routes/user');
let categoryRouter = require('./routes/category');
let productRouter = require('./routes/product');
let fileRouter = require('./routes/file');
let stockRouter = require('./routes/stock');
let customerRouter = require('./routes/customer');
let employeeRouter = require('./routes/employee');
let inventoryRouter = require('./routes/inventory');
let orderRouter = require('./routes/order');
let roleRouter = require('./routes/role');
let ruleRouter = require('./routes/rule');
let shopRouter = require('./routes/shop');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/file', fileRouter);
app.use('/stock', stockRouter);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/inventory', inventoryRouter);
app.use('/order', orderRouter);
app.use('/role', roleRouter);
app.use('/rule', ruleRouter);
app.use('/shop', shopRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res,) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
