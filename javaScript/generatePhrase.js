// imports of the arrays in the data folder
import celebrities from "../data/celebrities.js"
import clothing from "../data/clothing.js"
import colors from "../data/colors.js"
import food from "../data/food.js"
import places from "../data/places.js"

// function to choose a word from an array at random
export const selectWord = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

// function to create a phrase from randomly generated words
export const generatePhrase = () => {
    let celebrity = selectWord(celebrities)
    let wearing = selectWord(clothing)
    let color = selectWord(colors)
    let foodItem = selectWord(food)
    let place = selectWord(places)
    let article = 'a'

    if(color == 'orange') {
      article = 'an'
    }

    let phrase = `${celebrity} ate ${foodItem} while wearing ${article} ${color} ${wearing} at ${place}`
    if (wearing == "glasses" || wearing == "headphones" || wearing == "pants") {
      phrase = `${celebrity} ate ${foodItem} while wearing ${color} ${wearing} at ${place}`
    }
    
    return phrase
}

// function to add keywords to prompt so AI makes better image
export const generatePrompt = (prompt) => {
    const additions = "pixar, vibrant, long shot angle, soft smooth lighting"
    return `${prompt}, ${additions}`
}

// function to generate password based on phrase
// export function phraseToPassword(phrase) {
//     const words = phrase.split(' ');
//     let password = '';
  
//     const conversionRules = {
//       'ate': '8',
//       'at': '@'
//     };
//     const arr = words.map((word)=> {
//       const lowerWord = word.toLowerCase();
//       if (conversionRules.hasOwnProperty(lowerWord)) {
//         return `<span class='phLetter'> ${conversionRules[lowerWord]} </span>`;
//       } else {
//         return `<span class='phLetter'> ${word.charAt(0).toUpperCase()}${word.charAt(1).toLowerCase()} </span>`;
//       }
//     })
//     // words.forEach((word) => {
//     //   const lowerWord = word.toLowerCase();
//     //   if (conversionRules.hasOwnProperty(lowerWord)) {
//     //     password += conversionRules[lowerWord];
//     //   } else {
//     //     password += word.charAt(0).toUpperCase() + word.charAt(1).toLowerCase();
//     //   }
//     // });
  
//     return arr.join("");
//   }


export function phraseToPassword(phrase) {
  const words = phrase.split(' ');
  let password = '';

  const conversionRules = {
      'ate': '8',
      'at': '@'
  };

  const arr = words.map((word, index) => {
      const lowerWord = word.toLowerCase();
      if (conversionRules.hasOwnProperty(lowerWord)) {
          return `<span class='phLetter flip'> ${conversionRules[lowerWord]} </span>`;
      } else {
          if (word.length > 2) {
              let usedChars = `<span class='phLetter slide' style='animation-delay: ${index * 0.3}s;'> ${word.charAt(0).toUpperCase()}${word.charAt(1).toLowerCase()} </span>`;
              let unusedChars = word.substring(2).split("").map(char => {
                  return `<span class='unusedLetter fadeOut' style='animation-delay: ${index * 0.3}s;'>${char}</span>`;
              }).join("");
              return usedChars + unusedChars;
          } else {
              return `<span class='phLetter slide' style='animation-delay: ${index * 0.3}s;'> ${word.charAt(0).toUpperCase()}${word.charAt(1).toLowerCase()} </span>`;
          }
      }
  });

  password = arr.join('');
  return password;
}
