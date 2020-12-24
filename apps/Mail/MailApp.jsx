import { EmailList } from './cmps/EmailList.jsx'
import { EmailFilter } from './cmps/EmailFilter.jsx'
import { EmailCompose } from './cmps/EmailCompose.jsx'
import { emailService } from './services/emailService.js'

const { Link } = ReactRouterDOM;

export class MailApp extends React.Component {

    state = {
        emails: [],
        filterBy: {
            isRead: false,
            title: ''
        },
    };

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => {
        emailService.query().then(emails => {
            this.setState({ emails });
        });
    }


    // onRemoveEmail = (emailId) => {
    //     emailService.remove(emailId).then(() => {
    //         this.loadEmails()
    //     })
    // }

    getEmailsForDisplay = () => {
        const txt = filterBy.title.toLowerCase()
        return this.state.emails.filter(email => {
            return email.title.toLowerCase().includes(txt);
        });
    }


    onSetFilter = (filterBy) => {
        console.log('filterBy:', filterBy);
        this.setState({ filterBy });
    }


    onAddNewEmail = (email) => {
        emailService.addEmail(email)
            .then(() => this.loadEmails())

    }


    render() {

        const emailsForDisplay = this.getEmailsForDisplay();
        return (
            <section className="mail-app">
                <EmailFilter setFilter={this.onSetFilter} />
                {/* <button className="compose-btn"> +Compose</button> */}
                <Link className="compose-btn"><EmailCompose addNewEmail={this.onAddNewEmail}/> +Compose </Link>
                <EmailList emails={emailsForDisplay} />
            </section>
        );
    }
}