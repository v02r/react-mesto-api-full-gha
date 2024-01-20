const Card = require('../models/card');
const IternalErr = require('../errors/IternalErr');
const BadRequestErr = require('../errors/BadRequestErr');
const NotFoundErr = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      next(new IternalErr());
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({card}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Ошибка создания карточки. Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundErr('Карточка не найдена');
    })
    .then((card) => {
      const owner = card.owner;
      if (owner.toString() === req.user._id) {
        return card.deleteOne().then(() => {
          res.status(200).send(card);
        });
      } else {
        throw new ForbiddenErr('Вы не можете удалить чужую карточку');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Невозможно удалить карточку'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Карточка не найдена');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Данные введены некорректно'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Карточка не найдена');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Данные введены некорректно'));
      } else {
        next(err);
      }
    });
};
