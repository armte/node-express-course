const { write } = require("fs");

const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile("./temp.txt", "This is the first line\n");
    await writeFile("./temp.txt", "This is the second line\n", {flag: "a"});
    await writeFile("./temp.txt", "This is the third line", {flag: "a"});
  } catch (err) {
    console.log("An error occurred: ", err);
  }
}

const reader = async () => {
  try {
    contents = await readFile("./temp.txt","utf8");
    console.log("The temp.txt file contents: ", contents);
  } catch (err) {
    console.log("Encountered an error: ", err);
  }
}

const readWrite = async () => {
  await reader();
  await writer();
}

readWrite();
