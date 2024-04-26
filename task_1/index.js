import {encoded, translations} from './data.js'

console.log("Let's rock")

/* Вариант 1 */
function runDecoding() {
  const ids = [];

  encoded.forEach(obj => {
    for (let key in obj) {
      if ( key == 'groupId' 
        || key == 'service'
        || key == 'formatSize'
        || key == 'ca'
        || obj[key] == null
      ) continue;

      for (let code in translations) {
        if (obj[key] == code) {
          obj[key] = translations[code];
          break;
        }
      }
    }

    ids.push(obj.groupId);
  })

  console.log(encoded, ids)
}
runDecoding();

/* Вариант 2 */
// function runDecoding() {
//   const decoded = [];
//   const ids = [];

//   encoded.forEach(obj => {
//     const decodedObj = {};

//     for (let key in obj) {
//       if ( key == 'groupId' 
//         || key == 'service'
//         || key == 'formatSize'
//         || key == 'ca'
//         || obj[key] == null
//       ) {
//         decodedObj[key] = obj[key];
//         continue;
//       };

//       for (let code in translations) {
//         if (obj[key] == code) {
//           decodedObj[key] = translations[code];
//           break;
//         }
//       }
//     }

//     decoded.push(decodedObj);
//     ids.push(decodedObj.groupId);
//   })

//   console.log(decoded, ids)
// }
// runDecoding();