import { noteService } from "../services/noteService";

export class NotePreview extends React.Component {

    state = {
        bgc : 'white'
    }

    render() {
        const note = {...this.props.note}
        return <div className="note-preview">
            <h2>{note.title}</h2>
            <p>{note.text}</p>
        </div>
    }

}