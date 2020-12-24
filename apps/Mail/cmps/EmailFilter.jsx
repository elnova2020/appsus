
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
        const value = ev.target.value;
        const field = ev.target.name
        this.setState({ [field]: value }, callback);
    };


    onFilter = (ev) => {
        this.props.onSetFilter(ev.target.value);
    }

    render() {
        return <section className="email-filter">
            <input type="text" name="title" value={this.state.filterBy.title} placeholder="Filter by title" autoComplete="off"
                onChange={this.handleChange} />
                 <button>Search By</button>
                <div>
                    <option onClick={this.onFilter}>Read</option>
                    <option onClick={this.onFilter}>Unread</option>
                </div>
        </section>;
    }

}



  

