// This can be a place to setup event listeners and be the main entry point that makes calls to other functions in other files.


// event listener for "Get Started" button
document.querySelector('#btn-start').addEventListener('click', function() {
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.password-generator').style.display = 'block';
});

//event listener for generate pw
document.querySelector('#btn-generate').addEventListener('click', function() {
    document.querySelector('.password-generator').style.display = 'none';
    document.querySelector('.password-show').style.display = 'block';
});

//event listener to bring to pw check section
document.querySelector('#btn-pw-check').addEventListener('click', function() {
    document.querySelector('.password-show').style.display = 'none';
    document.querySelector('.password-check').style.display = 'block';
    document.querySelector('#btn-hide-hint').style.display = 'none';

});

// event listener to show pw hint
document.querySelector('#btn-reveal-hint').addEventListener('click', function() {
    document.querySelector('.hint-phrase').style.display = 'block';
    document.querySelector('#btn-reveal-hint').style.display = 'none';
    document.querySelector('#btn-hide-hint').style.display = 'block'; 
});

// event listener to hide pw hint
document.querySelector('#btn-hide-hint').addEventListener('click', function() {
    document.querySelector('.hint-phrase').style.display = 'none';
    document.querySelector('#btn-hide-hint').style.display = 'none';
    document.querySelector('#btn-reveal-hint').style.display = 'block';
});

function generateRandomPassword(animals, clothes, colors, length) {
    let password = "";
    
    for (let i = 0; i < length; i++) {
        const randomArray = Math.random() < 0.5 ? animals : colors || clothes;
        const randomWord = randomArray[Math.floor(Math.random() * randomArray.length)];
        password += randomWord + "/";
    }
    
    return password;
}

const generateButton = document.getElementById('btn-start');
const generatedPasswordSpan = document.getElementById('generatedPassword');
// const passwordButton = document.getElementById('passwordButton');
// const generateShortPasswordSpan = document.getElementById('generateShortPassword')

generateButton.addEventListener('click', function() {
    console.log("Button Clicked");
    const animalsArray = ["dog", "cat", "elephant", "lion", "tiger", "giraffe", "zebra", "bear", "rabbit", "monkey"];
    const clothesArray = ["shirt", "pants", "jacket", "dress", "hat", "shoes", "socks", "scarf", "gloves", "skirt"];
    const colorsArray = ["red", "orange", "yellow", "green", "blue", "purple", "gray", "black", "pink", "white"];
    
    const password = generateRandomPassword(animalsArray, clothesArray, colorsArray, 6)
    console.log("Generate Password", password);

    generatedPasswordSpan.textContent = password;



});

// passwordButton.addEventListener('click', function(){
//     console.log("Short Button Clicked!")
//     const shortPassword = generatedPasswordSpan.textContent;
    
// });