import { generatePhrase, generatePrompt, phraseToPassword } from "./generatePhrase.js";
import { imageFetch } from "./imageFetch.js";
let abortController = new AbortController();
const phrase = generatePhrase();

// event listener to abort unresolved fetch requests on page refresh
window.addEventListener('beforeunload', () => {
    abortController.abort();
  });


    // When the page loads, we set up all the event listeners

    // Event listener for "Get Started" button
    // document.querySelector('#btn-start').addEventListener('click', function(event) {
    //     event.preventDefault();
    //     document.querySelector('.password-generator').style.display = 'block';
    //     document.querySelector('.password-generator').scrollIntoView({ behavior: 'smooth' });
    //   });


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
    console.log(phraseToPassword(phrase))
  });

// //event listener to bring to pw check section
document.querySelector('#btn-pw-check').addEventListener('click', function() {
    document.querySelector('.password-show').style.display = 'none';
    document.querySelector('.password-check').style.display = 'block';
    document.querySelector('#btn-hide-hint').style.display = 'none';
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

const getStartedButton = document.getElementById("btn-start");
const generatedPhraseSpan = document.getElementById("generatedPhrase");
const generatedPasswordSpan = document.getElementById("generatedPassword");
const revealPasswordSpan = document.getElementById("revealPhrase");

  getStartedButton.addEventListener('click', function(){
    console.log("Generated Button Clicked");

    const newPhrase = generatePhrase(phrase);
    console.log("Generated Phrase", newPhrase)

    const generatedPassword = phraseToPassword(phrase);
    console.log("Generated Password", generatedPassword)

    generatedPhraseSpan.textContent = newPhrase;
    generatedPasswordSpan.textContent = generatedPassword;
    revealPasswordSpan.textContent = newPhrase;
  })

    // imageFetch(prompt, abortController)
    //     .then((res) => {
    //         let imageDisplay = document.querySelector('.image-display')
    //         imageDisplay.removeChild(imageDisplay.firstChild)
    //         let div = document.createElement('div')
    //         div.classList.add('container')
    //         div.classList.add('flex-container')
    //         for (let i = 0; i > res.length; i++) {
    //             let img = document.createElement('img')
    //             img.src = res[i]
    //             div.appendChild(img)
    //         }
    //         imageDisplay.appendChild(div)
    //     });