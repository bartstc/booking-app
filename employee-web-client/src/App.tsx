import React from 'react';
import { FormattedMessage } from 'react-intl';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          <FormattedMessage
            id='app.title'
            defaultMessage='Edit {path} and save to reload. Now with {what} !'
            values={{ what: 'react-intl', path: <code>src/App.js</code> }}
          />
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          <FormattedMessage id='app.subtitle' defaultMessage='Learn React' description='Link on react page' />
        </a>
      </header>
    </div>
  );
}

export default App;
