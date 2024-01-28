async function translate(message, senderLang, recieverLang) {
  //-------------------- This is how we translate -----------------------
  const transText = `https://api.mymemory.translated.net/get?q=${message}&langpair=${senderLang}|${recieverLang}`;

  let result = "";

  return await fetch(transText)
    .then((transText) => transText.json())
    .then((data) => {
      result = data.responseData.translatedText;
      console.log(`From module : ${data.responseData.translatedText}`);
      console.log(
        `Match percentage: ${data.responseData.match}`
      );

      //to check  a better match? idk it was on some github repo code.
      data.matches.forEach((data) => {
        if (data.id === 0) {
          result = data.translation;
        }
      });
      return result;
    });
}

module.exports = { translate };
