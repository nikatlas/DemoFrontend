import React from 'react';

import Users from './repos/Users';
import Table from './Table';

const titles = [
    { key: 'name', Value: 'Name', link: {url:'user/', key: 'id'}},
    { key: 'posts', Value: 'Posts' },
    { key: 'comments', Value: 'Comments/Posts'}
];
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        Users.getAll().then((users) => {
            this.setState({users});
        });
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <h5 className="card-header">Users</h5>
                        <div className="card-body">
                            <Table titles={titles} data={this.state.users} />
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

}

export default Home;