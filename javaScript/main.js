import { generatePhrase, generatePrompt, phraseToPassword } from "./generatePhrase.js";
import { imageFetch } from "./imageFetch.js";
let abortController = new AbortController();


let newPhrase = generatePhrase()
let generatedPassword = phraseToPassword(newPhrase)
let passwordInput = ""

function verifyPassword () {
    console.log(passwordInput)
    console.log(generatedPassword)
    if(passwordInput === generatedPassword) {
        console.log("Correct!")
    }
    else console.log("Incorrect.")
}

// event listener to abort unresolved fetch requests on page refresh
    window.addEventListener('beforeunload', () => {
        abortController.abort();
    });


    // When the page loads, we set up all the event listeners
    document.addEventListener('DOMContentLoaded', function() {
    // Event listener for "Get Started" button
    document.querySelector('#btn-start').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.password-generator').style.display = 'block';
        document.querySelector('.password-generator').scrollIntoView({ behavior: 'smooth' })
    
    });


// event listener for "Get Started" button
    document.querySelector('#btn-start').addEventListener('click', function() {
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.password-generator').style.display = 'block';

    document.querySelector('#generatedPassword').innerHTML = generatedPassword
    document.querySelector('#passwordToPhrase').innerHTML = newPhrase

    imageFetch(generatePrompt(newPhrase), abortController)
        .then((res) => {
            let imageDisplay = document.querySelector('.image-display')
            let child = document.querySelector('#img-display-child')
            while (child.firstChild) {
                child.removeChild(child.firstChild)
                console.log("remove child")
            }
            let div = document.createElement('div')
            div.classList.add('container')
            div.classList.add('flex-container')
            for (let i = 0; i < res.length; i++) {
                let img = document.createElement('img')
                img.src = res[i]
                div.appendChild(img)
            }
            child.appendChild(div)
        })
    });
});


    // Event listener for "Generate Password" button
    document.querySelector('#btn-generate').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.password-show').style.display = 'block';
        document.querySelector('.password-show').scrollIntoView({ behavior: 'smooth' });
    });


    // Event listener to bring to password check section
    document.querySelector('#btn-pw-check').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.password-check').style.display = 'block';
        document.querySelector('.password-check').scrollIntoView({ behavior: 'smooth' });
    });

    // Event listener to show pw hint
    document.querySelector('#btn-reveal-hint').addEventListener('click', function() {
        document.querySelector('.hint-phrase').style.display = 'block';
        document.querySelector('.hint-phrase').innerHTML = newPhrase;
        document.querySelector('#btn-reveal-hint').style.display = 'none';
        document.querySelector('#btn-hide-hint').style.display = 'block';
    });

    // Event listener to hide pw hint
    document.querySelector('#btn-hide-hint').addEventListener('click', function() {
        document.querySelector('.hint-phrase').style.display = 'none';
        document.querySelector('#btn-hide-hint').style.display = 'none';
        document.querySelector('#btn-reveal-hint').style.display = 'block';
    });

    // Keeps track of and updates user's input for checking password
    document.querySelector('#passwordInput').addEventListener('input', function() {
        passwordInput = document.querySelector('#passwordInput').value
    })

    // When the user clicks the check password button
    document.querySelector('#btn-pw-verify').addEventListener('click', function(event) {
        event.preventDefault();
        // checks input against generated password
        verifyPassword()
        // progresses down to the images section
        document.querySelector('.image-display').style.display = 'grid';
        document.querySelector('.image-display').scrollIntoView({ behavior: 'smooth' });
        
    });