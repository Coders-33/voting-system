const fs = require("node:fs");
const path = require("node:path");


const pathDir  = "/home/varun/Personal-data/FULL STACK DEVLOPMENT/GIT-HUB/Basic-projects/voting-system/file.txt"

 const data = fs.readFileSync(pathDir , "utf-8");
 console.log(data);