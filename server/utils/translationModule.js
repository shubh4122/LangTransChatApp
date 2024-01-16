function translate(message, senderLang, recieverLang) {
  //-------------------- This is how we translate -----------------------
  const transText = `https://api.mymemory.translated.net/get?q=${message}&langpair=${senderLang}|${recieverLang}`;

  fetch(transText)
    .then((transText) => transText.json())
    .then((data) => {
      console.log(data.responseData.translatedText);
    });
}

module.exports = { translate };
