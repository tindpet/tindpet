const Pet = require("../models/pets.model");
const Message = require("../models/message.model");

module.exports.list = (req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      return Message.find({
        $or: [
          { from: req.user.id, to: pet.protectorId, pet: pet.id },
          { to: req.user.id, from: pet.protectorId, pet: pet.id },
          { to: pet.protectorId, pet: pet.id },
          { from: pet.protectorId, pet: pet.id },
        ],
      })
        .populate("from")
        .populate("to")
        .then((messages) => {
          res.render(`messages/chat`, {
            messages,
            to: req.params.id,
          });
        });
    })
    .catch(next);
};

module.exports.doCreate = (req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      return Message.create({
        from: req.user.id,
        to: pet.protectorId,
        message: req.body.message,
        pet: req.params.id,
      }).then((message) => {
        res.redirect(`/pets/${req.params.id}/chat`);
      });
    })
    .catch(next);
};
