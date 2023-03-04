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
          messages.forEach((msg) => {
            if (msg.from._id == req.user.id) {
              msg.isReadByFrom = true;
              msg.save();
            } else if (msg.to._id == req.user.id) {
              msg.isReadByTo = true;
              msg.save();
            }
          });

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
      let msgTo = "";

      if (req.user.id == pet.protectorId) {
        Message.find({ to: pet.protectorId }).then((msg) => {
          msgTo = msg[0].from;

          return Message.create({
            from: req.user.id,
            to: msgTo,
            message: req.body.message,
            pet: req.params.id,
          }).then((message) => res.redirect(`/pets/${req.params.id}/chat`));
        });
      } else {
        return Message.create({
          from: req.user.id,
          to: pet.protectorId,
          message: req.body.message,
          pet: req.params.id,
        }).then((message) => res.redirect(`/pets/${req.params.id}/chat`));
      }
    })
    .catch(next);
};

module.exports.checkMsg = (req, res, next) => {
  Message.find({
    $or: [{ to: req.user.id }, { from: req.user.id }],
  }).then((msgs) => {
    const newMessages = [];
    const allMessages = [];

    msgs.forEach((msg) => {
      if (!msg.isReadByTo && msg.to == req.user.id) {
        Pet.findById(msg.pet).then((pet) => {
          if (!newMessages.find((newPet) => newPet.id == pet.id)) {
            newMessages.push(pet);
          }
        });
      }
      
      if (msg.from == req.user.id) {
        Pet.findById(msg.pet).then((pet) => {
          if (!allMessages.find((newPet) => newPet.id == pet.id)) {
            allMessages.push(pet);
          }
        });
      }
    });

    res.render("messages/inbox", {
      newMsgs: newMessages,
      allMsg: allMessages,
    });
  });
};
