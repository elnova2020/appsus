const { Link } = ReactRouterDOM;


export function EmailPreview({ email }) {

    return <article className="email-preview">
        <Link to={`/email/${email.id}`}>
            <h3>{email.from}</h3>
            <h3>{email.title}</h3>
            <h3>{email.body}</h3>
        </Link>
        <div>
            <button onClick={() => {
                onRemove(email.id)
            }}
            >Remove</button>
        </div>

    </article>

}

