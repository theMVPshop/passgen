let templObjs = [];
let mnemonic;
const conversionRules = {
    'one': '1',
    'i': '1',
    'two': '2',
    'to': '2',
    'too': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'ate': '8',
    'nine': '9',
    'and': '&',
    'at': '@'
};

const passCount = {
    8: "One hundred eighty-five million, seven hundred ninety-four thousand, five hundred sixty <span class='red'>(185,794,560)</span>",
    9: "Twelve billion, six hundred thirty-four million, thirty thousand, eighty <span class='red'>(12,634,030,080)</span>",
    10: "Eight hundred fifty-eight billion, seven hundred twelve million, forty-eight thousand, six hundred forty <span class='red'>(858,712,048,640)</span>",
    11: "Fifty-eight trillion, three hundred twelve billion, sixteen million, nine hundred eight thousand, eight hundred <span class='red'>(58,312,016,908,800)</span>",
    12: "Three quadrillion, nine hundred sixty-four trillion, four hundred sixteen billion, seven hundred thirty million, five hundred ninety-eight thousand, four hundred <span class='red'>(3,964,416,730,598,400)</span>",
    13: "Two hundred sixty-nine quintillion, five hundred seventy-nine quadrillion, nine hundred thirty-four trillion, two hundred eight billion, seven hundred sixty-eight million <span class='red'>(269,579,934,208,768,000)</span>",
    14: "Eighteen sextillion, three hundred thirty quintillion, six hundred thirty-one quadrillion, nine hundred twenty-one trillion, three hundred ninety-four billion, two hundred million <span class='red'>(18,330,631,921,394,200,000)</span>",
    15: "One septillion, two hundred forty-six sextillion, four hundred eighty quintillion, nine hundred seventy quadrillion, five hundred thirty-five trillion, two hundred one billion <span class='red'>(1,246,480,970,535,201,000,000)</span>",
    16: "Eighty-four septillion, seven hundred sixty sextillion, two hundred eighty-five quintillion, seven hundred four quadrillion, three hundred eighty-eight trillion, eight hundred seventy billion <span class='red'>(84,760,285,704,388,870,000,000)</span>",
    17: "Five octillion, seven hundred sixty-three septillion, two hundred ninety-nine sextillion, four hundred twenty-four quintillion, eight hundred eighty-five quadrillion, two hundred thirty-nine trillion <span class='red'>(5,763,299,424,885,239,000,000,000)</span>",
    18: "Three hundred ninety-one octillion, nine hundred four septillion, three hundred seventy-five sextillion, six hundred ninety-two quintillion, five hundred eighty-nine quadrillion, eight hundred sixty trillion <span class='red'>(391,904,375,692,589,860,000,000,000)</span>",
    19: "Twenty-six nonillion, six hundred forty-nine octillion, four hundred ninety-seven septillion, five hundred forty-two sextillion, two hundred eighty-two quintillion, five hundred seventy quadrillion <span class='red'>(26,649,497,542,282,570,000,000,000,000)</span>",
    20: "One decillion, eight hundred eight nonillion, nine hundred fifty-nine octillion, eight hundred fifty-one septillion, two hundred seventy-four sextillion, nine hundred twenty-four quintillion, two hundred quadrillion <span class='red'>(1,808,959,851,274,924,200,000,000,000,000)</span>"
}

function getRandomProperty(obj) {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    templObjs.push([randomKey, obj[randomKey]]);

    return [randomKey, obj[randomKey]];
}

function getNum(min, max) {
    return ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][Math.floor(Math.random() * (max - min + 1)) + min];
}

function getAnim() {
    return getRandomProperty(animals)[0];
}
function getFood() {
    return getRandomProperty(food)[0];
}
function getVehicle() {
    return getRandomProperty(vehicle)[0];
}
function getLoc() {
    return getRandomProperty(locations)[0];
}
function getclothes() {
    return getRandomProperty(clothes)[0];
}
function getCountries() {
    return getRandomProperty(countries)[0];
}
function getInstrument() {
    return getRandomProperty(instruments)[0];
}
function getPersona() {
    return getRandomProperty(personas)[0];
}
function getThing() {
    return getRandomProperty(things)[0];
}



function generateMnemonic() {
    templObjs = [];
    let phrase = [
        `${getNum(2, 9)} ${getAnim()} ate ${getFood()} at ${getLoc()}`, 
        `${getNum(2, 5)} ${getPersona()} from ${getCountries()} played ${getInstrument()} !`,
        `${getNum(2, 5)} ${getPersona()} explored ${getCountries()} by ${getVehicle()} !`,
        `${getPersona()} prefer ${getNum(2, 5)} ${getFood()} over ${getNum(5, 9)} ${getThing()} !`,
        `${getNum(2, 5)} ${getInstrument()} playing ${getAnim()} wore ${getclothes()} !`,
        `i saw ${getAnim()} wearing ${getclothes()} at ${getLoc()}`
    ][Math.floor(Math.random() * 3)];
    console.log(phrase, templObjs);
    document.getElementById('mnemonic').innerText = phrase;
    let pWord = mnemonicToPassword(phrase);
    console.log(pWord);
    document.getElementById('info').innerHTML = `<span class='red'>INTERESTING FACT</span>: This Password contains <span class='red'>${pWord.length} characters</span> made up of numerals, special characters, upper and lower case letters. There are ${passCount[pWord.length]} possible combinations if someone were trying to guess it.`
    document.getElementById('password').innerText = pWord;

    // make pictopass
    for (let i = 0; i < templObjs.length; i++) {
        const searchString = templObjs[i][0];
        const replacementString = templObjs[i][1];
        phrase = phrase.replace(searchString, replacementString);
    }

    const words = phrase.split(' ');
    let pictopass = '';

    words.forEach((word) => {
      if (conversionRules.hasOwnProperty(word)) {
        pictopass += " " + conversionRules[word];
      } else {
        pictopass += " " + word;
      }
    });
    console.log(pictopass);
    document.getElementById('pictopass').innerText = pictopass;
}

  function mnemonicToPassword(mnemonic) {
    const words = mnemonic.split(' ');
    let password = '';

    words.forEach((word) => {
      const lowerWord = word.toLowerCase();
      if (conversionRules.hasOwnProperty(lowerWord)) {
        password += conversionRules[lowerWord];
      } else {
        password += word.charAt(0).toUpperCase() + word.charAt(1).toLowerCase();
      }
    });

    return password;
  }

  document.getElementById('generateBtn').addEventListener('click', () => {
    document.getElementById('mnemonic').style.display = 'none';
    document.getElementById('pictopass').style.display = 'none';
    document.getElementById('pictopassBtn').style.display = 'none';
    document.getElementById('mnemonicBtn').style.display = 'block';
    generateMnemonic();

  });

  document.getElementById('mnemonicBtn').addEventListener('click', () => {
    document.getElementById('mnemonic').style.display = 'block';
    document.getElementById('mnemonicBtn').style.display = 'block';
    document.getElementById('pictopassBtn').style.display = 'block';
  });

  document.getElementById('pictopassBtn').addEventListener('click', () => {
    document.getElementById('pictopass').style.display = 'block';
  });

function generateRandomPassword (animals, clothes, length) {
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomArray = Math.random() < 0.5 ? animals : clothes;
    const randomWord = randomArray[Math.floor(Math.random() * randomArray.length)];
    password += randomWord;
  }

  return password;
}