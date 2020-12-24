import {emailService } from './services/emailService.js'


export class EmailStatus extends React.Component {


    state = {
        emails: {
            total: 0,
            isRead: false,
        }

    }


    render () {
        
        return (
            <section className="email-counter">
         
                <span>Total Emails:</span> 

            </section>
        )

    }
}


