import React from 'react';

import Users from './repos/Users';


const Comments = ({comments}) => {
    return <div className="col-12">
        {comments.map((comment, index) => 
            <div className="comment">
                <h6 key={index}>{comment.name} - {comment.email}</h6>
                <p>{comment.body}</p>
            </div>
        )}
    </div>;
};
class UserDetails extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }
    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        });
    }

    render(){
        return <div class="card bg-light mb-3" >
                <h5 className="card-header" onClick={() => this.toggle()}>User Details {this.state.toggle ? <i class="fas fa-minus"></i> : <i class="fas fa-plus"></i>} </h5>
                {this.state.toggle && <div class="card-body">
                    <p class="card-text">
                    {this.props.user.name}<br />
                    {this.props.user.email}<br />
                    {this.props.user.address.street}<br />
                    {this.props.user.address.suite}<br />
                    {this.props.user.address.city}<br />
                    </p>
                </div>}
            </div>;
    }
};
const UserPresentation = ({user}) => {
    return <h5 className="card-header">{user.name}</h5>;
};

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            posts: [],
            comments: [],
            toggles: []
        };    
    }

    componentDidMount() {
        Users.getPosts(this.state.userId).
            then((posts) => {
                this.setState({posts});
                return posts;
            }).
            then((posts) => {
                const proms = posts.map((post) => Users.getComments(post.id));
                return Promise.all(proms);
            }).
            then((values) => {
                this.setState({
                    comments: values
                });
            });
    }

    _toggle = (index) => {
        const toggles = this.state.toggles;
        toggles[index] = !toggles[index];
        this.setState({
            toggles
        });
    }

    render() {
        return (
        <div class="card">
            <ul class="list-group list-group-flush">
            {this.state.posts.map((post, index) => 
                <li class="list-group-item">
                    <div className="post" key={index}>
                        <div className="col">
                            <h5>{post.title}</h5>
                        </div>
                        <div className="col">
                            {post.body}
                        </div>
                        <div className="col">
                            <div className="comments" onClick={() => this._toggle(index)}>{this.state.comments[index] && this.state.comments[index].length} comments {this.state.toggles[index] ? <i class="fas fa-minus"></i> : <i class="fas fa-plus"></i>}</div>
                            {this.state.toggles[index] && <Comments comments={this.state.comments[index]} />}
                        </div>
                    </div>
                </li>
            )}
            </ul>
        </div>);
    }
}

class UserPosts extends React.Component {

    constructor(props) {
        super(props);

        this.userId = props.match.params.id;
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        Users.getUser(this.userId).then((user) => {
            this.setState({user});
        });
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card">
                        {this.state.user && <UserPresentation user={this.state.user}/>}
                        <div className="card-body text-left">
                            <div className="row">
                                <div className="col-12 col-md-8">
                                    {this.state.user && <Posts userId={this.state.user.id}/>}
                                </div>
                                <div className="col-12 col-md-4">
                                    {this.state.user && <UserDetails user={this.state.user}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

}

export default UserPosts;