import {noteService} from '../services/noteService.js'

export class NewNote extends React.Component {

    state = {
        note: { title: '', text: '' }
    }

    onInputChange = (ev) => {
        const note = { ...this.state.note}
        note[ev.target.name] = ev.target.value
        this.setState({note})
    }

    onSaveNote = (ev) => {
        ev.preventDefault()

        noteService.save(this.state.note)
        .then(savedNote => {
            console.log('Saves succesfully', savedNote);
            // this.props.history.push('/note');
        })
    }

    render() {
        return (
            <div className="new-note">
                <form onSubmit={this.onSaveNote}>
                    <input value={this.state.note.title} type="text"
                        name="title" onChange={this.onInputChange} />
                    <input value={this.state.note.text} type="text"
                        name="text" onChange={this.onInputChange} />
                    <button type="submit">{(this.state.note.id)? 'Update' : 'Add'}</button>
                </form>
            </div>
        )
    }

}