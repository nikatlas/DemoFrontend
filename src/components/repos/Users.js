import Net from '../services/net';

class Users {
    getAll() {
        let users = [];
        let comments = [];
        let posts = [];
        return Net.get('users')
            .then((data) => users = data)
            .then(() => Net.get('posts'))
            .then((data) => posts = data)
            .then(() => Net.get('comments'))
            .then((data) => comments = data)
            .then(() => this._format(users, comments, posts));
    }

    getUser(id) {
        return Net.get('users/' + id);
    }

    getComments(postId) { 
        return Net.get('comments?postId='+postId);
    }

    getPosts(userId) {
        return Net.get('posts?userId='+userId);
    }

    _format(users, comments, posts) {
        posts.map((post) => {
            post.comments = comments.reduce((a,b) => a + (b.postId === post.id), 0);
            return post;
        });
        return users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                posts: posts.reduce((a,b) => a + (b.userId === user.id) ,0),
                comments: posts.map((post) => post.userId === user.id ? post.comments : 0).reduce((a,b) => a + b,0)
            };
        });
    }

}

export default new Users();