
export class EmailFilter extends React.Component {

    state = {
        filterBy : {
            title: '',
            isRead: false
        }
    };

    handleChange = (ev) => {
        const callback = () => {
            this.props.setFilter(this.state.filterBy);
        };
        
        const filterBy = {...this.state.filterBy}
        filterBy[ev.target.title] = ev.target.value;

        this.setState({filterBy}, callback);
    };

    render() {
        return <section className="email-filter">
            <input type="text" name="title"
                value={this.state.filterBy.title}
                placeholder="Filter by title"
                autoComplete="off"
                onChange={this.handleChange} />
        </section>;
    }

}