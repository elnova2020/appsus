import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/storageService.js';

const KEY = 'notesDB'

export const noteService = {
    save,
    remove,
    getNotes,
    getById,
    getPinnedNotes,
    getOtherNotes
}

// var gNotes = [
//     {
//         type: "NoteText",
//         isPinned: true,
//         info: {
//             txt: 'Today is Reactive Sprint !'
//         }
//     },
//     {
//         type: "NoteImg",
//         info: {
//             url: '',
//             title: 'Good memories...'

var gNotes
_createNotes()

function _createNotes() {
    // Try loading from localStorage
    gNotes = storageService.load(KEY);
    if (!gNotes || !gNotes.length) {
        // Nothing in localStorage, use demo data
        gNotes = _getDemoNotes()
        _saveNotesToStorage();
    }
}

function remove(noteId) {
    gNotes = gNotes.filter(note => note.id !== noteId);
    _saveNotesToStorage();
    return Promise.resolve();
}

function getById(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function getNotes() {
    return Promise.resolve(gNotes)
}

function getNotesByType(type){
    return gNotes.filter(note => note.type === type)
}

function getNotesByContent(searchText){
    return gNotes.info.title.includes(searchText)
}

function getPinnedNotes() {
    const pinned = gNotes.filter(note => note.isPinned)
    return Promise.resolve(pinned)
}

function getOtherNotes() {
    const other = gNotes.filter(note => { return !note.isPinned})
    return Promise.resolve(other)
}

function save(note) {
    if (note.id) {
        return _update(note);
    } else {
        return _add(note);
    }
}

function _add(note) {
    const noteToAdd = {
        id: utilService.makeId(),
        ...note
    };
    gNotes = [noteToAdd, ...gNotes];
    _saveNotesToStorage();
    return Promise.resolve(noteToAdd); 
}

function _update(note) {

    console.log("Update note ", note);
    const noteToUpdate = {
        ...note
    };
    const notesCopy = [...gNotes];
    const idx = notesCopy.findIndex(note => note.id === note.id);
    notesCopy[idx] = noteToUpdate;
    gNotes = notesCopy;
    _saveNotesToStorage();
    return Promise.resolve(noteToUpdate);
}

function _saveNotesToStorage() {
    storageService.save(KEY, gNotes)
}

function _getDemoNotes() {
    
    const notes = [
        {
            id: utilService.makeId(),
            title: 'Birthday',
            text: 'Buy a present',
            picture: null,
            backgroundColor: 'pink',
            isPinned: true
        },
        {
            id: utilService.makeId(),
            title: 'Hotel Order',
            text: 'Need to call to confirm a reservation',
            picture: null,
            backgroundColor: 'white',
            isPinned: false
        },
        {
            id: utilService.makeId(),
            title: 'Shopping list',
            text: 'Eggs, milk, salad, chease, some sweets',
            picture: null,
            backgroundColor: 'lightblue',
            isPinned: false
        }
    ]

    return notes;
}