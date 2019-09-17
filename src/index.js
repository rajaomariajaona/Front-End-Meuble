import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './bootstrap.min.css';
import './shards.min.css'
import 'loaders.css/loaders.min.css'
import './rsuite-table.css';
import './Navigation.css'
import './react-sidenav.css'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
