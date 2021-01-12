const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');

const getNotes = function(){
    return "Your Notes ...";
}
const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } 
    else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function(){
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
const removeNote = function(title){
    const notes = loadNotes();
    const dontRemove = notes.filter(function(notee){
        return notee.title !== title;
    });
    
    if(notes.length > dontRemove.length){
        console.log(chalk.green.inverse('Note removed'))
        saveNotes(dontRemove);
    }
    else{
        console.log(chalk.red.inverse('No note found'))
    }
}

const listNotes = function(){
    const notes = loadNotes();
    console.log(chalk.yellow.inverse('Your Notes ..'));
    // console.log(notes);
    notes.forEach(note => {
        console.log(note.title);
    });
}
debugger
const readNote = function(title){
    const notes = loadNotes();
    let flag = 0;
    const readd = function(titlee){
        notes.forEach(e => {
            if(e.title === titlee){
                console.log(chalk.inverse(e.title));
                console.log(e.body);
                flag=1;
            }
            
        });
        if(flag===0){
            console.log(chalk.red.inverse('Note not found !!!'))
        }
        
    }
    
    console.log(readd(title));
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}