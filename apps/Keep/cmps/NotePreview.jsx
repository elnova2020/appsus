import { noteService } from "../services/noteService.js"
const MODAL_OPEN_CLASS = 'show-modal'

// export function NotePreview({ note, onRemove, onSelect, onPin }) {
export class NotePreview extends React.Component {

    state = {
        note: null
    }

    componentDidMount() {
        const note = {...this.props.note}
        this.setState({note})
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            console.log('PREV IS NOT CURRENT');
            console.log('prev props...', prevProps);
            console.log('this props...', this.props);
            const note = {...this.props.note}
            console.log(  'NOTE MODAL PROPS NOTE ...', this.props.note);
            this.setState({note})
        }
    }

    noteSelected = () => {
        document.body.classList.add(MODAL_OPEN_CLASS);
        console.log('Note selected...')
        onSelect(this.props.note)
        clsSelected = 'note-selected'
    }

    handlePinState = (event) => {

        event.stopPropagation()
        this.props.onPin(this.props.note)
    }

    render() {

        const note = this.props.note
        return (<section>
            <div className="note-preview"
                style={{ backgroundColor: note.backgroundColor }} onClick={this.noteSelected} >
                <button onClick={this.handlePinState}>PIN</button>
                <div>
                    <h2>{note.title}</h2>
                    <p>{note.text}</p>
                    {note.picture && <img src={note.picture} />}
                </div>
            </div>
            <div>
                <button onClick={() => { onRemove(note.id) }}>RMV</button>
                <button>IMG</button>
                <button>COLR</button>
                <button>LBL</button>
            </div>
        </section>)
    }

}