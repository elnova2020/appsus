
import { Home } from './pages/home.jsx'
import {BookApp} from './pages/book-app.jsx'
import { BookDetails } from './cmps/book-details.jsx'
import { AppHeader } from './cmps/AppHeader.jsx';
import { About } from './cmps/about.jsx';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class App extends React.Component {

    render() {
        return (
            <Router>
                <section className="app">
                    <AppHeader/>
                    <Switch>
                        <Route path="/book/:bookId" component={BookDetails} />
                        <Route path="/book" component={BookApp} />
                        <Route path="/about" component={About} />
                        <Route path="/" component={Home}/>
                    </Switch>

                </section>
            </Router>
        )
    }
}



// Using Class:
// export class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 <header>
//                     <h1>Lets Play</h1>
//                 </header>
//                 <main>
//                     <Home />
//                 </main>
//             </div>
//         )
//     }
// }

