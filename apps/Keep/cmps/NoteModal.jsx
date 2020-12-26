import { NewNote } from "./NewNote.jsx";

export class NoteModal extends React.Component {

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

    render() {
        return (<section className="modal">
                    {this.state.note && <NewNote  note={this.state.note} onUpdate={this.props.onUpdate}/>}
                 </section>)
    }
}