const fs = require("fs");
const chalk = require("chalk");
const isEmpty = require('lodash.isempty');

const path = "notes.json";
const encoding = "utf8";

const titleColor = chalk.cyan.bold;
const textColor = chalk.green.bold;
const success = chalk.green.italic.inverse;
const error = chalk.red.bold.inverse;
const logging = chalk.yellow;
const instruction = chalk.magenta;

async function readData() {
    let p1 = new Promise((resolve, reject) => {
        fs.readFile(path, encoding, (err, data) => {
            if (err) {
                resolve(JSON.stringify({ error: 'No file' }));
            } else resolve(data);
        });
    });
    let notesString = await p1;
    let notesJson = JSON.parse(notesString);
    return notesJson;
}

const printNote = (title, text) => console.log(titleColor(title) + " : " + textColor(text));


const readNote = title => {
    console.log(logging("Reading notes..."));
    let notesJson = {};
    readData().then(result => {
        notesJson = result;
        if ('error' in notesJson) console.log(instruction('You have no notes. Add a few notes :)'));
        else {
            let flag = false;
            if (title.toLowerCase() in notesJson) {
                printNote(title.toLowerCase(), notesJson[title.toLowerCase()]);
                flag = true;
            }
            if (!flag) console.log(error("Can't find note"));
        }
    });
};

const listNotes = () => {
    console.log(logging("Listing notes..."));
    readData().then(result => {
        let notesJson = result;
        if ('error' in notesJson) console.log(instruction('You have no notes. Add a few notes :)'));
        else
            for (let title in notesJson) printNote(title, notesJson[title]);
    });
};

const addNote = (title, text) => {
    console.log(logging("Adding Note..."));
    let notesJson = {};
    readData().then(result => {
        notesJson = result;
        if ('error' in notesJson) delete notesJson.error;
        notesJson[title.toLowerCase()] = text;
        let p1 = new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(notesJson), err => {
                if (err) reject(err);
                resolve("Note Added successfully");
            });
        });
        p1.then(result => console.log(success(result)));
    });
};

const removeNote = title => {
    console.log(logging('Removing Note...'));
    let notesJson = {};
    readData().then(result => {
        notesJson = result;
        if ('error' in notesJson) console.log(instruction('You have no notes. Add a few notes :)'));
        else {
            let p1 = new Promise((resolve, reject) => {
                if (title.toLowerCase() in notesJson) {
                    delete notesJson[title];
                    if (isEmpty(notesJson)) fs.unlink(path, () => {});
                    else {
                        fs.writeFile(path, JSON.stringify(notesJson), err => {
                            if (err) reject(err);
                            resolve('Note Removed');
                        });
                    }
                } else reject("Can't find Note");
            });
            p1.then(result => console.log(success(result)));
            p1.catch(err => console.log(error(err)));
        }
    });
};

module.exports = {
    listNotes,
    readNote,
    addNote,
    removeNote,
};