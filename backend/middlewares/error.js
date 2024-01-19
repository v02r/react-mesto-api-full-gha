const error = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.statusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  res.status(status).send({ message });
  next();
};

module.exports = error;
