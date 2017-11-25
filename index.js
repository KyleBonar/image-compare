const Jimp = require("jimp");
const path = require("path");
const readline = require("readline");
const promisify = require("promisify-node");
const fs = promisify("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("path to directory?", answer => {
  if (answer.length === 0) {
    console.log("You must enter a directory!");
  }

  //IFEE function to use async/await
  (async function(answer) {
    console.log("starting timer");
    console.time("timer");
    //get directory
    const dir = path.resolve(__dirname, answer);
    try {
      //get all files in directory
      let files = await fs.readdir(dir);
      files = files.filter(file => {
        return (
          file.substr(file.length - 3) === "png" ||
          file.substr(file.length - 3) === "PNG" ||
          file.substr(file.length - 3) === "jpg" ||
          file.substr(file.length - 3) === "JPG"
        );
      });

      console.log(`${files.length} files to scan through!`);

      const dict = new Set();
      for (let i = 0; i < files.length; i++) {
        if (!dict.has(files[i])) {
          dict[files[i]] = await Jimp.read(`${dir}/${files[i]}`);
        }
        for (let j = i + 1; j < files.length; j++) {
          if (!dict.has(files[j])) {
            dict[files[j]] = await Jimp.read(`${dir}/${files[j]}`);
          }

          const result = Jimp.distance(dict[files[i]], dict[files[j]]);
          console.log(
            `Percent similar between ${files[i]} and ${files[j]} is %${(1 -
              result) *
              100}`
          );

          if (result < 0.05) {
            try {
              await fs.rename(
                `${dir}/${files[i]}`,
                `${dir}/Duplicates/${files[i]}`
              );
              await fs.rename(
                `${dir}/${files[j]}`,
                `${dir}/Duplicates/${files[j]}`
              );

              console.log(`moved ${files[i]} and ${files[j]}`);
            } catch (err) {
              console.log(err);
            }
            files.splice(j, 1);
            break;
          }
        }
        //console.log(files);
        // console.log(i);
      }
    } catch (err) {
      console.log(err);
    }

    console.timeEnd("timer");
  })(answer);

  rl.close();
});
