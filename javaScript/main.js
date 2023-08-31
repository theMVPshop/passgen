import { generatePhrase, generatePrompt, phraseToPassword } from "./generatePhrase.js";
import { imageFetch } from "./imageFetch.js";
let abortController = new AbortController();


let newPhrase = generatePhrase()
let generatedPassword = phraseToPassword(newPhrase)
let passwordInput = ""
let returnName=  () => {
    let arr = newPhrase.split(" ")
    while (arr.length > 2) {
        arr.pop()
    }
    return arr.join(" ")
} 
let celebName = returnName()
    

 function verifyPassword () {
    const container = document.querySelector('#checkPwContainer')
    let h4 = document.createElement('h4')
    h4.className = 'h4'
    if (container.lastChild.nodeName === 'H4') {
        container.removeChild(container.lastChild)
    }
    container.appendChild(h4)
    if(passwordInput === generatedPassword) {
        h4.innerText = "Correct! Nice job!"
    }
    else {
       h4.innerText = "Incorrect..."
    }
}

function reset () {
    abortController.abort()
    abortController = new AbortController()
    newPhrase = generatePhrase()
    generatedPassword = phraseToPassword(newPhrase)
    celebName = returnName()
    passwordInput = ""
    document.querySelector('.hero').style.display = 'flex';
    document.querySelector('.password-generator').style.display = 'none';
    document.querySelector('.password-show').style.display = 'none'
    document.querySelector('.password-check').style.display = 'none'
    document.querySelector('.image-display').style.display = 'none'
    document.querySelector('.reset').style.display = 'none'
    document.querySelector('.h4').style.display = 'none'
    let child = document.querySelector('#img-display-child')
            while (child.firstChild) {
                child.removeChild(child.firstChild)
                console.log("remove child")
            }
    let div = document.createElement('div')
    div.classList.add('spinner')
    child.appendChild(div)
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
    document.querySelector('#nameSpot').innerHTML = `Now, let's take two letters from each word, and capitalize the first letter, so ${celebName} becomes ${generatedPassword[0]}${generatedPassword[1]}${generatedPassword[2]}${generatedPassword[3]}.`

    imageFetch(generatePrompt(newPhrase), abortController)
        .then((res) => {
            let child = document.querySelector('#image-display-child')
            while (child.firstChild) {
                child.removeChild(child.firstChild)
                console.log("remove child")
            }
            // vvv might need to refactor this to render images to correct container
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
        document.querySelector('.image-display').style.display = 'flex';
        document.querySelector('.image-display').scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.reset').style.display = 'block';
    });

    document.querySelector('#resetButton').addEventListener('click', function(event) {
        event.preventDefault()
        reset()
    })
});

