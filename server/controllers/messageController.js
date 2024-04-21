const Users = require("../models/userModel");
const Messages = require("../models/messageModel");
const translate = require("../utils/translationModule");
const translateM = require("../utils/translation.js")
const { countries } = require("../utils/countries");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        translation: msg.translation.text,
        //add translation get message.
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { message, from, to } = req.body;
    const sender = await Users.findById(from);
    const reciever = await Users.findById(to);

    const senderCode = countries[sender.language];
    const recieverCode = countries[reciever.language];

    //-------------------------------------------------------------------------------
    //model

    if (
      (sender.language === "English" && reciever.language === "French") ||
      (sender.language === "French" && reciever.language === "English")
    ) {
      translateM.setupTranslator(message.trim());
      console.log("En Fr detected!!!");
    }

    //-------------------------------------------------------------------------------

    
    const translatedMsg =
      senderCode === recieverCode
        ? message
        : await translate.translate(message.trim(), senderCode, recieverCode);

    // console.log(translatedMsg);

    const data = await Messages.create({
      message: { text: message },
      translation: { text: translatedMsg },
      users: [from, to],
      sender: from,
    });

    // console.log(data);
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
