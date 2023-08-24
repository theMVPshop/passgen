// This can be a place to setup event listeners and be the main entry point that makes calls to other functions in other files.

// event listener for "Get Started" button
// document.querySelector('#btn-start').addEventListener('click', function() {
//     document.querySelector('.hero').style.display = 'none';
//     document.querySelector('.password-generator').style.display = 'block';
// });

// //event listener for generate pw
// document.querySelector('#btn-generate').addEventListener('click', function() {
//     document.querySelector('.password-generator').style.display = 'none';
//     document.querySelector('.password-show').style.display = 'block';
// });

// //event listener to bring to pw check section
// document.querySelector('#btn-pw-check').addEventListener('click', function() {
//     document.querySelector('.password-show').style.display = 'none';
//     document.querySelector('.password-check').style.display = 'block';
//     document.querySelector('#btn-hide-hint').style.display = 'none';

// });

// // event listener to show pw hint
// document.querySelector('#btn-reveal-hint').addEventListener('click', function() {
//     document.querySelector('.hint-phrase').style.display = 'block';
//     document.querySelector('#btn-reveal-hint').style.display = 'none';
//     document.querySelector('#btn-hide-hint').style.display = 'block'; 
// });

// // event listener to hide pw hint
// document.querySelector('#btn-hide-hint').addEventListener('click', function() {
//     document.querySelector('.hint-phrase').style.display = 'none';
//     document.querySelector('#btn-hide-hint').style.display = 'none';
//     document.querySelector('#btn-reveal-hint').style.display = 'block';
// });

// imports of the arrays in the data folder
import celebrities from "../data/celebrities.js"
import clothing from "../data/clothing.js"
import colors from "../data/colors.js"
import food from "../data/food.js"
import places from "../data/places.js"

// function to choose a word from an array at random
function selectWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

// function to create a phrase from randomly generated words
function generatePhrase() {
    let celebrity = selectWord(celebrities)
    let wearing = selectWord(clothing)
    let color = selectWord(colors)
    let foodItem = selectWord(food)
    let place = selectWord(places)

    const phrase = `${celebrity} ate ${foodItem} in a ${color} ${wearing} at ${place}`
    
    return phrase
}

// function to add keywords to prompt so AI makes better image
function generatePrompt(prompt) {
    const additions = "pixar, vibrant, long shot angle, soft smooth lighting"
    return `${prompt}, ${additions}`
}

// function to generate password based on phrase
export function phraseToPassword(phrase) {
    const words = phrase.split(' ');
    let password = '';
  
    const conversionRules = {
      'ate': '8',
      'at': '@'
    };
  
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

  const generateButton = document.getElementById('btn-start');

  generateButton.addEventListener('click', function() {
    console.log("Button Clicked");
    
    // const password = generateRandomPassword(celebrities, clothing, colors, food, places, 6)
    // console.log("Generate Password", password);

    // generatedPasswordSpan.textContent = password;
});