import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';


var $ = require('jquery');
window.$ = $;
require('bootstrap');

ReactDOM.render(
<BrowserRouter>
	<App />
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
