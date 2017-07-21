#!/usr/bin/env node

// Get current working directory
const process = require('process');
const path = require('path');
const fs = require('fs');
const mkdir = require('mkdirp');
const isbinary = require('isbinaryfile');

const reactNativeTSTemplate = 'reactNativeTSTemplate';
const curDir = process.cwd();
let dependenciesPath = path.join(__dirname, 'dependencies');
let directoriesList = [];

const appNameList = curDir.split(path.sep);
const appName = appNameList[appNameList.length - 1];

// console.log("Current Directory is ", curDir);
// console.log("Dependencies path is ", dependenciesPath);

function walk(dir) {
    var results = []
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
        file = path.join(dir, file);
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) { 
            directoriesList.push(path.join(curDir, path.relative(dependenciesPath, file)));
            results = results.concat(walk(file))
        }
        else results.push(file)
    })
    return results
}

function replaceall(replaceThis, withThis, inThis) {
    withThis = withThis.replace(/\$/g,"$$$$");
    return inThis.replace(new RegExp(replaceThis.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&])/g,"\\$&"),"g"), withThis);
}

var filesList = walk(dependenciesPath);
// Make all the relevant directories here
for (var dir of directoriesList) {
    mkdir.sync(dir);
}

// Loop over files, read their content, replace, and write them

for (var file of filesList) {
    var readPath = file;
    var writePath = path.join(curDir, path.relative(dependenciesPath, readPath));
    // console.log("-------------------------------------");
    // console.log("Read path is ", readPath);
    // console.log("Write path is ", writePath);
    // console.log("-------------------------------------");
    var buf = fs.readFileSync(readPath);
    // Check if file is binary here
    if (isbinary.sync(readPath)) {
        // File is binary ---> copy it directly
        fs.writeFileSync(writePath, buf);
    } else {
        var fileContent = buf.toString();
    
        fileContent = replaceall(reactNativeTSTemplate, appName, fileContent);

        fs.writeFileSync(writePath, fileContent);
    }
}


// Append to gradle.properties here 
// Check if android folder is available
var androidFolder = path.join(curDir, "android");
if (fs.existsSync(androidFolder)) {
    // Open gradle.properties here in append mode
    var gradleFile = path.join(androidFolder, "gradle.properties");
    // org.gradle.parallel=true
    // org.gradle.daemon=true
    var propertiesToAppend = "org.gradle.parallel=true\norg.gradle.daemon=true";
    try {
        fs.appendFileSync(gradleFile, propertiesToAppend);
    } catch (e) {}
}


console.log("Done!");