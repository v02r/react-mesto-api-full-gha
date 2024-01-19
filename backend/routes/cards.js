const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateCardInfo, validateDBID } = require('../validate/validate');

router.get('/cards', getCards);

router.post('/cards', validateCardInfo, createCard);

router.delete('/cards/:id', validateDBID, deleteCard);

router.put('/cards/:id/likes', validateDBID, likeCard);

router.delete('/cards/:id/likes', validateDBID, dislikeCard);

module.exports = router;
