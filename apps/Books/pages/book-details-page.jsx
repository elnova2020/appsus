import {ReviewAdd} from "../cmps/review-add.jsx"
import {BookDetails} from "../cmps/book-details.jsx"

export function BookDetailsPage(props) {

    return <section class="book-details">
            <BookDetails book={props.book}/>
            
        </section>


}