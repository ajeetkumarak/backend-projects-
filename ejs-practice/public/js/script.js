"use strict";

const headingContent = document.querySelector(".heading");
const allSections = document.querySelectorAll("section");
const about = document.querySelector(".page");
const homeMain = document.querySelector("main");
console.log(allSections);

const createBlog = document.getElementById("create--blog");
// console.log(createBlog);
const writeBlog = document.querySelector(".write--blog");

createBlog.addEventListener("click", function () {
  headingContent.classList.add("hidden");
  // about.classList.remove("hidden");
  homeMain.classList.add("hidden");
  writeBlog.classList.remove("hidden");

  allSections.forEach(function (item) {
    // console.log(item);
    item.classList.add("hidden");
  });
});
