const { writeFile } = require("fs");
console.log("at start");
writeFile("./temporary/output.txt", "This is line 1\n", (err) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    console.log("at point 2");
    writeFile("./temporary/output.txt", "this is line 2\n", { flag: 'a'}, (err) => {
      if (err) {
        console.log("This error happened at point 2: ", err);
      } else {
        console.log("at point 3");
        writeFile("./temporary/output.txt", "this is line 3\n", {flg: 'a'}, (err) => {
          if (err) {
            console.log("This error happend at point 3: ", err);
          } else {
            console.log("at end of callbacks");
          }
        });
      }
    });
  }
});
console.log("At end of script");
console.log("hello");
