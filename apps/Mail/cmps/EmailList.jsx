
// import { emailService } from './services/emailService.js'
import { EmailFilter } from "./EmailFilter.jsx";
import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({ emails, onRemove }) {

    return (
        <section className="email-list">
            <EmailFilter/>
            {emails.map(email => {
                return <EmailPreview key={email.id} email={email}
                    onRemove={onRemove} />;
            })
            }
        </section>
    );
}
