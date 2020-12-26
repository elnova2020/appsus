import { noteService } from "../services/noteService.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NotesList } from "../cmps/NotesList.jsx"
import { NewNote } from "../cmps/NewNote.jsx";
import { NoteModal } from "../cmps/NoteModal.jsx"

const { Link } = ReactRouterDOM;

export class MissKeep extends React.Component {

    state = {
        // notes: [],
        pinned: [],
        other: [],
        filterBy: null,
        noteToShow: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        // noteService.getNotes().then((notes) => this.setState({ notes }))
        noteService.getPinnedNotes().then(pinned => this.setState({pinned}))
        noteService.getOtherNotes().then(other => this.setState({other}))
    }

    get notesForDisplay() {

        const { filterBy } = this.state;

        if (!filterBy)
            return this.state.notes;

        const filterRegex = new RegExp(filterBy.title, 'i');
        return this.state.notes.filter(note => filterRegex.test(note.title));
    }

    onSetFilter = (filterBy) => {
        console.log('filterBy:', filterBy);
        this.setState({ filterBy });
    }

    onAddNote = (note) => {
        
        const notesCopy = (note.isPinned) ? [...this.state.pinned, note] : [...this.state.other, note]

        this.setState({
            notes: notesCopy
        })
    }

    onRemoveNote = (noteId) => {
        noteService.remove(noteId).then(() => {
            this.loadNotes()
        })
    }

    onSelectNote = (note) => {

        const noteToShow = { ...note };
        this.state.noteToShow = noteToShow;
        this.setState({ noteToShow });

        console.log('App: onSelected: state noteToShow ', this.state.noteToShow);
    }

    onPinNote = (note) => {
        note.isPinned = !note.isPinned
        noteService.save(note).then(() => {
            this.loadNotes()
        })
    }

    onUpdateNote = () => {
        this.loadNotes()
    }

    render() {

        // const notesForDisplay = this.notesForDisplay
        const pinnedNotes = this.state.pinned
        const otherNotes = this.state.other
        const noteToShow = this.state.noteToShow
        
        return (
            <section className="miss-keep-app">
                <NoteFilter setFilter={this.onSetFilter} />
                <NewNote addNote={this.onAddNote} />
                <h2>My Notes</h2>
                <div className="pinned-list">
                    <h3>PINNED</h3>
                    {pinnedNotes.length > 0 && <NotesList notes={pinnedNotes}
                        onSelect={this.onSelectNote}
                        onRemove={this.onRemoveNote}
                        onUpdate={this.onUpdateNote}
                        onPin={this.onPinNote}

                    />}
                    {this.state.noteToShow && <NoteModal note={noteToShow} onUpdate={this.onUpdateNote} />}
                </div>
                <div className="other-list">
                    <h3>OTHER</h3>
                    {otherNotes.length > 0 && <NotesList notes={otherNotes}
                        onSelect={this.onSelectNote}
                        onRemove={this.onRemoveNote}
                        onUpdate={this.onUpdateNote}
                        onPin={this.onPinNote} />}
                    {this.state.noteToShow && <NoteModal note={noteToShow} onUpdate={this.onUpdateNote} />}
                </div>
            </section>
        )
    }
}