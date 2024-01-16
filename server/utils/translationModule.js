async function translate(message, senderLang, recieverLang) {
  //-------------------- This is how we translate -----------------------
  const transText = `https://api.mymemory.translated.net/get?q=${message}&langpair=${senderLang}|${recieverLang}`;

  return await fetch(transText)
    .then((transText) => transText.json())
    .then((data) => {
      console.log(`From module : ${data.responseData.translatedText}`);
      return data.responseData.translatedText;
    });
}

module.exports = { translate };
