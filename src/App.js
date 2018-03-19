import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import UserPosts from './components/UserPosts';



class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Route exact path="/" component={Home}/>
                <Route exact path="/user/:id" component={UserPosts}/>
            </div>
        );
    }
}

export default App;
