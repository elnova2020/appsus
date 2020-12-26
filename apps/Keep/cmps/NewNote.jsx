import {noteService} from '../services/noteService.js'

const MODAL_OPEN_CLASS = 'show-modal'

export class NewNote extends React.Component {

    state = {
        note: {
            title: '',
            text: '',
            picture: null,
            backgroundColor: 'pink',
            isPinned: false
        }
    }

    componentDidMount() {
        const note = (this.props.note) ? {...this.props.note} : { ...this.state.note}
        
        console.log(  'PROPS NOTE ...', this.props.note);

        this.setState({note})
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const note = {...this.props.note}
            this.setState({note})
        }
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

    onInputChange = (ev) => {
        const note = { ...this.state.note}
        
        if (ev.target.type === 'file') {
            note.picture = URL.createObjectURL(ev.target.files[0]);
        } else {
            note[ev.target.name] = ev.target.value
        }
        this.setState({note})
    }

    onSaveNote = (ev) => {
        ev.preventDefault()

        noteService.save(this.state.note)
        .then(savedNote => {
            console.log('Saved succesfully', savedNote);
            this.props.addNote && this.props.addNote(savedNote)
            document.body.classList.remove(MODAL_OPEN_CLASS)
            this.props.onUpdate()
        })

    }

    render() {

        const backgroundColor = this.state.note.backgroundColor
        
        return (
            <div className="new-note" style={{backgroundColor:backgroundColor}}>
                <form onSubmit={this.onSaveNote}>
                    <input value={this.state.note.title} type="text"
                        name="title" onChange={this.onInputChange} />
                    {/* <input value={this.state.note.text} type="text"
                        name="text" onChange={this.onInputChange} /> */}
                    <textarea rows="4" cols="30" name="text" value={this.state.note.text}
                    onChange={this.onInputChange}/>
                    <input type="file" name="picture"
                        accept="image/png, image/jpeg" onChange={this.onInputChange}/>
                    <button type="submit">{(this.state.note.id)? 'Update' : 'Add'}</button>  
                </form>
                <img src={this.state.note.picture} />
                <input className="note-color" type="color" name="backgroundColor" 
                value={backgroundColor} onChange={this.onInputChange}/>
            </div>
        )
    }

}