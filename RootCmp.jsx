import { AppHeader } from './cmps/AppHeader.jsx';
import { About } from './pages/About.jsx';
import { Home } from './pages/Home.jsx';
import {BookAppPage} from './pages/BookAppPage.jsx'
import {KeepAppPage} from './pages/KeepAppPage.jsx'
import {MailApp} from './apps/Mail/MailApp.jsx'

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class RootCmp extends React.Component {

    render() {
        return (
            <Router>
                <section className="app">
                    <AppHeader />
                    <Switch>
                        <Route path="/bookapp" component={BookAppPage} />
                        <Route path="/keepapp" component={KeepAppPage} />
                        <Route path="/mailapp" component={MailApp} />
                        <Route path="/about" component={About} />
                        <Route path="/" component={Home} />
                    </Switch>
                    <footer className="animate__animated animate__jello">coffeerights 2020</footer>
                </section>
            </Router>
        );
    }
}
