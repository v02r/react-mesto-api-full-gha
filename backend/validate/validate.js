const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL } = require('validator');

const linkValidator = /(https*:\/\/)([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#*/m;

const validateURL = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new CelebrateError('Неправильный формат ссылки');
  }
  return value;
};

const validateDBID = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserPatch = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL).required(),
  }),
});

const validateCardInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(linkValidator).required(),
  }),
});

module.exports = {
  validateURL,
  validateDBID,
  validateUserId,
  validateUser,
  validateUserPatch,
  validateUserAvatar,
  validateCardInfo,
};

// 659148b08d603d0cba87801e

// {
//   "name": "test card",
//   "link": "https://cdn.create.vista.com/api/media/small/483841144/stock-photo-old-oak-tree-growing-agricultural-field-spring-sunset-sky",
//   "owner": "659148b08d603d0cba87801e",
//   "_id": "65914dffca9eacba23cc70b8"
// }
