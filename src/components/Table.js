import React from 'react';

import { Link } from 'react-router-dom';

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortBy: 'name',
            sortDirection: 1,
            titles: props.titles || [],
            data: props.data || []
        };
    }

    componentWillReceiveProps(nextProps) {
        let titles = nextProps.titles;
        let data = nextProps.data;
        this.setState({
            data: this.sortThem(data, this.state.sortBy, this.state.sortDirection),
            titles: titles
        });
    }

    sortThem(data, sortField, sortDirection) {
        if (sortField === -1) return data;
        return data.sort(function(a, b){
            return sortDirection > 0 ? (a[sortField] > b[sortField]) : (a[sortField] <= b[sortField]);
        });
    }

    filter(key) {
        let applied = this.state.sortBy;
        let direction = (key === applied) ? -1 * this.state.sortDirection : 1;
        this.setState({
            data: this.sortThem(this.state.data, key, direction),
            sortDirection: direction,
            sortBy: key
        });
    }

    render() {
        return <table className="table">
            <thead>
                <tr>
                    {this.state.titles.map((title, index) => {
                        return <th scope="col" key={index} onClick={() => this.filter(title.key)}>
                            {title.Value} 
                            {this.state.sortBy === title.key && (this.state.sortDirection > 0 ? <i class="fas fa-sort-up"></i> : <i class="fas fa-sort-down"></i> )}
                        </th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {this.state.data.map((item, index) => {
                    return <tr key={index}>
                        {this.state.titles.map((title, zindex) => {
                            return <td key={zindex}>
                                { title.link ?
                                    <Link to={title.link.url+item[title.link.key]}>
                                        {item[title.key]}
                                    </Link> : 
                                    item[title.key]
                                }
                            </td>;
                        })}
                    </tr>;
                })}
            </tbody>
        </table>;
    }
}

export default Table;