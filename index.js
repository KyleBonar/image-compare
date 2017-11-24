var Jimp = require("jimp");
var path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("path to directory?", answer => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});

// Jimp.read("IMG_0028.PNG", function (err, image) {
//     if (err) throw err;
//     console.log(image.getPixelColor(200,200));
// });

var img1 = "sample_images/1.png";
var img2 = "sample_images/2.png";
var img3 = "sample_images/3.png";
(async function() {
  var j = await Jimp.read(img1);
  var m = await Jimp.read(img2);
  var p = await Jimp.read(img3);

  var k = Jimp.diff(j, m);
  console.log(k);
})();
// Jimp.read(img1)
//   .then(function(lenna) {
//     console.log(lenna);
//     return Jimp.read(img2);
//   })
//   .then(function(res) {
//     console.log(res.);
//   })
//   .catch(function(err) {
//     console.error(err);
//   });

// var j = Jimp.distance(Jimp.read(img1), Jimp.read(img2));

// console.log(j);
// console.log(Jimp.distance(img2, img3))
// console.log(Jimp.distance(img1, img3))
