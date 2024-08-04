const { writeFile, readFile } = require("fs").promises;

writeFile("./temp.txt", "First Line - Then\n")
  .then( () => {
    console.log("Got first result");
    return writeFile("./temp.txt", "Second Line - Then\n", {flag: "a"});
  })
  .then( () => {
    console.log("Got second result");
    return writeFile("./temp.txt", "Third Line - Then\n", {flag: "a"});
  }).then ( () => {
    console.log("Got third result");
  })
  .catch((err) => {
    console.log("Encountered the error: ", err);
  });
  