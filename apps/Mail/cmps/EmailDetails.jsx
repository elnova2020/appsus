import { emailService } from '../services/emailService.js'


export class EmailDetails extends React.Component {

    state = {
        email: null
    };

    componentDidUpdate(prevProps) {
        console.log('UPDATE', this.props);
        if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
            this.loadEmail()
        }
    }

    componentDidMount() {
        console.log('MOUNT', this.props);
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

    render() {
        if (!this.state.email) return <div>Loading..</div>;

        return (
            <section className="email-details">
                <h1>email Details {this.state.email.subject}</h1>
                <pre>{JSON.stringify(this.state.email, null, 2)}</pre>
                <hr />
                <button onClick={this.onBack}>Back</button>
            </section>
        );
    }
}
