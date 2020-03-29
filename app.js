const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.0.0');

// add , remove , read, list

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        text: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => notes.addNote(argv.title, argv.text)
});

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => notes.removeNote(argv.title)
});

yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'Note title',
            demanOption: true,
            type: 'string',
        },
    },
    handler: (argv) => notes.readNote(argv.title)
});

yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler: () => notes.listNotes()
});

yargs.parse();