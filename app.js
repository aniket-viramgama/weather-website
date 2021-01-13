// const fs = require('fs');
// fs.writeFileSync('notes.txt','My name is Aniket.')
// fs.appendFileSync('notes.txt','I am 19 years old.')


// // const NAME = require('./utils.js');
// // console.log(NAME);
// const SUM = require('./utils.js');
// console.log(SUM(5,-3));


// const fs = require('fs');
// fs.writeFileSync('notes.js',`const getNotes = function(){
//     return "Your Notes ...";
// }
// module.exports = getNotes;`);
const noTes = require('./notes.js');
// const msg = noTes();
// console.log(msg);


// const validator = require('validator');
// console.log(validator.isEmail('aniket@ff.com'));
// console.log(validator.isURL('www.yahoo.com'));


const chalk = require('chalk');
// console.log(chalk.red.bold.bgGray('Error !'));


// const xyz = process.argv[2];
// if(xyz === "LULZ"){
//     console.log('YOS YOS DEFUNETLI')
// }
// console.log(process.argv[2]);

const yargs = require('yargs');
// console.log(process.argv);
// yargs.version('69.6.9');
// console.log(yargs.argv);

yargs.command({
    command: 'add',
    describe: 'Add a new Note',
    handler: function(argv){
        // console.log('Adding a new note !' ,argv);
        // console.log('Title:- ',argv.title);
        // console.log('Body:- ',argv.body);
        noTes.addNote(argv.title,argv.body)
    },
    builder: {
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    }
})
yargs.command({
    command: 'remove',
    describe: 'Remove a new Note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        noTes.removeNote(argv.title);
    }
})
yargs.command({
    command: 'list',
    describe: 'List all Notes',
    handler: function(argv){
        noTes.listNotes();
    }
})
yargs.command({
    command: 'read',
    describe: 'Read a new Note',
    handler: function(argv){
        noTes.readNote(argv.title);
    },
    builder: {
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    }
})
// console.log(yargs.argv);
yargs.parse();
