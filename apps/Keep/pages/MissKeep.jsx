import { noteService } from "../services/noteService.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import {NotesList} from "../cmps/NotesList.jsx"

const { Link } = ReactRouterDOM;

export class MissKeep extends React.Component {

    state = {
        notes: [],
        filterBy : {
            title: ''
        }
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.getNotes().then((notes)=>this.setState({notes}))
    }

    onRemoveNoete = (noteId) => {
        noteService.remove(noteId).then(() => {
            this.loadNotes()
        })
    }

    get notesForDisplay() {

        const { filterBy } = this.state;

        if (!filterBy.title === '')
            return this.state.notes;
        
        const filterRegex = new RegExp(filterBy.name, 'i');
        return this.state.notes.filter(note => filterRegex.test(note.title));
    }

    onSetFilter = (filterBy) => {
        console.log('filterBy:', filterBy);
        this.setState({ filterBy });
    }

    render() {
        
        const notesForDisplay = this.notesForDisplay;
        return (
            <section className="miss-keep-app">
                <NoteFilter setFilter={this.onSetFilter} />
                {/* <Link className="btn" to="/note/edit">Add Note</Link> */}
                <h2>My Notes</h2>
                {this.state.notes.length > 0 && <NotesList notes={notesForDisplay} onRemove={this.onRemoveNote}/> }
            </section>
        );
    }
}