const {createReadStream} = require('fs');

const stream = createReadStream('../content/big.txt', {highWaterMark: 200});
let counter = 0;
stream.on('data', (result) => {
  counter += result.length;
  console.log(result);
  console.log("Bytes read: ", counter);
});
stream.on('error', (err) => {
  console.log("Encountered an error: ", err);
});
stream.on('end', () => {
  console.log("Total bytes read: ", counter);
});
