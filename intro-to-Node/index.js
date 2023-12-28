// jshint esversion:6

// const fs = require("fs");

// fs.copyFileSync("file1.txt","file2.txt");

var superheroes = require('superheroes') ;
var supervillains = require('supervillains');

var mySuperheroName = superheroes.random();
// var mySuperheroName = superheroes.all;
console.log(mySuperheroName);

var mySuperVillain = supervillains.random();
console.log(mySuperVillain);