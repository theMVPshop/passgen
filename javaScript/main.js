import { generatePhrase, generatePrompt, phraseToPassword, phraseToPasswordSpan } from "./generatePhrase.js";
import { imageFetch } from "./imageFetch.js";
let abortController = new AbortController();


let newPhrase = generatePhrase()
let generatedPassword = phraseToPassword(newPhrase)
let generatedPasswordSpan = phraseToPasswordSpan(newPhrase)
let phraseArray = newPhrase.split(" ")
let passwordInput = ""
let returnName=  () => {
    let arr = newPhrase.split(" ")
    while (arr.length > 2) {
        arr.pop()
    }
    return arr.join(" ")
} 
let celebName = returnName()

let transformedWords = phraseArray.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const secondLetter = word.charAt(1);
    const remainingLetters = word.slice(2);
    return `<span class='pLetter'>${firstLetter}${secondLetter}</span>${remainingLetters}`;
    })

let joinedWords = transformedWords.join(' ')

let index = 0;
const delay = 1000
let intervalId

function colorShift () {
    const phLetterSpans = document.querySelectorAll('.phLetter');
    const pLetterSpans = document.querySelectorAll('.pLetter')
    // These lines set the style back to how it originally was
    pLetterSpans.forEach(span => span.style.color = '#191970');
    phLetterSpans.forEach(span => span.style.color = '#191970');
    // These lines change the style to something new
    pLetterSpans[index].style.color = '#e45f2b';
    phLetterSpans[index].style.color = '#e45f2b';
    // This line increments the index to keep the style change moving
    index = (index + 1) % pLetterSpans.length
}


const progress = () => {
    document.querySelector('.image-display').style.display = 'flex';
    document.querySelector('.image-display').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.reset').style.display = 'block';
}
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
        setTimeout(progress, 1000)
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
    generatedPasswordSpan = phraseToPasswordSpan(newPhrase)
    celebName = returnName()
    passwordInput = ""
    phraseArray = newPhrase.split(" ")
    transformedWords = phraseArray.map(word => {
        const firstLetter = word.charAt(0).toUpperCase();
        const secondLetter = word.charAt(1);
        const remainingLetters = word.slice(2);
        return `<span class='pLetter'>${firstLetter}${secondLetter}</span>${remainingLetters}`;
    })
    joinedWords = transformedWords.join(' ')
    document.querySelector('#passwordInput').value = ""
    document.querySelector('.hero').style.display = 'flex';
    document.querySelector('.password-generator').style.display = 'none';
    document.querySelector('.password-show').style.display = 'none'
    document.querySelector('.password-check').style.display = 'none'
    document.querySelector('.image-display').style.display = 'none'
    document.querySelector('.reset').style.display = 'none'
    document.querySelector('.h4').style.display = 'none'
    document.querySelector('.hint-phrase').style.display = 'none';
    document.querySelector('#btn-hide-hint').style.display = 'none'
    document.querySelector('#btn-reveal-hint').style.display = 'block'
    document.querySelector('#phraseButton').style.display = 'block'
    document.querySelector('#btn-pw-check').style.display = 'none'
    clearInterval(intervalId)
    intervalId = null
    index = 0
    let child = document.querySelector('#image-display-child')
            while (child.firstChild) {
                child.removeChild(child.firstChild)
                console.log("remove child")
            }
    let div = document.createElement('div')
    div.classList.add('loadingSpinner')
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
    document.querySelector('#generatedPassword').innerHTML = generatedPasswordSpan
    document.querySelector('#passwordToPhrase').innerHTML = joinedWords

    document.querySelector('#generatedPassword2').innerHTML = generatedPassword
    document.querySelector('#passwordToPhrase2').innerHTML = joinedWords
    document.querySelector('#nameSpot').innerHTML = `Now, let's take two letters from each word, and capitalize the first letter, so ${celebName} becomes ${generatedPassword[0]}${generatedPassword[1]}${generatedPassword[2]}${generatedPassword[3]}.`

    imageFetch(generatePrompt(newPhrase), abortController)
        .then((res) => {
            if (res) {
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
            child.appendChild(div)}
        })
    });

    // Event listener for "Generate Password" button
    document.querySelector('#btn-generate').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('#phraseReveal').style.display = 'none';
        document.querySelector('.password-show').style.display = 'block';
        document.querySelector('#btn-pw-check').style.display = 'none'
        document.querySelector('.password-show').scrollIntoView({ behavior: 'smooth' });
    });
    // Event listener for "Generate Phrase" button
    document.querySelector('#phraseButton').addEventListener('click', function(event) {
        event.preventDefault();
        intervalId = setInterval(colorShift, delay)
        document.querySelector('#phraseReveal').style.display = 'block';
        document.querySelector('#phraseButton').style.display = 'none'
        document.querySelector('#btn-pw-check').style.display = 'inline-block'

    });

    //event listener to convert pw to a passphrase
    document.querySelector('#btn-phrase-convert').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.password-phrase').style.display = 'block';
        document.querySelector('.password-phrase').scrollIntoView({ behavior: 'smooth' });
    })

        //event listener to show pw and passphrase combo
        document.querySelector('#btn-pw-combo').addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('.pass-phrase-combo').style.display = 'block';
            document.querySelector('.pass-phrase-combo').scrollIntoView({ behavior: 'smooth' });
        })
    

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
        // checks input against generated password and progresses to images if correct
        verifyPassword()
    });

    document.querySelector('#resetButton').addEventListener('click', function(event) {
        event.preventDefault()
        reset()
    })
});

