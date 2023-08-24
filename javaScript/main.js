// This can be a place to setup event listeners and be the main entry point that makes calls to other functions in other files.
import {generatePhrase} from "./generatePhrase.js";
import {generatePrompt} from "./generatePhrase.js";
import {phraseToPassword} from "./generatePhrase.js";
const phrase = generatePhrase()

// event listener for "Get Started" button
document.querySelector('#btn-start').addEventListener('click', function() {
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.password-generator').style.display = 'block';
    console.log("Button Clicked");
    console.log(phrase)
});

// //event listener for generate pw
document.querySelector('#btn-generate').addEventListener('click', function() {
    document.querySelector('.password-generator').style.display = 'none';
    document.querySelector('.password-show').style.display = 'block';
    console.log(generatePrompt(phrase))
  });

// //event listener to bring to pw check section
document.querySelector('#btn-pw-check').addEventListener('click', function() {
    document.querySelector('.password-show').style.display = 'none';
    document.querySelector('.password-check').style.display = 'block';
    document.querySelector('#btn-hide-hint').style.display = 'none';
    console.log(phraseToPassword(phrase))
});

// // event listener to show pw hint
document.querySelector('#btn-reveal-hint').addEventListener('click', function() {
    document.querySelector('.hint-phrase').style.display = 'block';
    document.querySelector('#btn-reveal-hint').style.display = 'none';
    document.querySelector('#btn-hide-hint').style.display = 'block'; 
});

// // event listener to hide pw hint
document.querySelector('#btn-hide-hint').addEventListener('click', function() {
    document.querySelector('.hint-phrase').style.display = 'none';
    document.querySelector('#btn-hide-hint').style.display = 'none';
    document.querySelector('#btn-reveal-hint').style.display = 'block';
});