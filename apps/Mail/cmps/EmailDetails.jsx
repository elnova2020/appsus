import { emailService } from '../services/emailService.js'
import { utilService } from '../../../services/utilService.js'



export class EmailDetails extends React.Component {

    state = {
        email: null
    };

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
            this.loadEmail()
        }
    }

    componentDidMount() {
        this.loadEmail();
    }

    loadEmail() {
        const { emailId } = this.props.match.params;
        emailService.getEmailById(emailId).then(email => {
            this.setState({ email });
        });
    }

    onBack = () => {
        this.props.history.goBack()
    };

    onRemoveEmail = (emailId) => {
        emailService.remove(emailId).then(() => {
            this.loadEmails()
        })
    }

    onReplayEmail = () => {

    }

    render() {
        const sentAt = utilService.getFormattedDate(this.props.email.sentAt)
        return (
            <section className="email-body">
                <div >
                    <p>{this.props.email.from}</p>
                    <p>{sentAt}</p>
                </div>
                <hr />
                <h2>{this.props.email.title}</h2>
                <p>{this.props.email.body}</p>
                <button onClick={this.onBack} >
                    Back
                </button> 
                <button onClick={this.onRemoveEmail} >
                   delete
                </button>
                <button onClick={this.onReplayEmail} >
                   replay
                </button>
                
            </section>
        )
    }

}








