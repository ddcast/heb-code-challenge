import React from 'react';
import './App.css';

import { Account } from './api/account';

// expose to client
window.Account = Account;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Daily withdraw limit</h2>
        <p>
          The daily withdraw limit is 1000.
        </p>
        <h2>Try it now</h2>
        <p>
          Use your browser's developer tools to try it out.
          <code>window.Account</code>
        </p>
        <h2>Tests</h2>
        <p>
          Run tests from project root.
          <code>npm test</code>
        </p>
        <h2>API</h2>
        <p>
          Get a sample account.
          <code>const account = new Account('1234')</code>
        </p>
        <p>
          Withdraw from balance.
          <code>account.withdraw(1000)</code>
        </p>
        <p>
          Deposit to balance.
          <code>account.deposit(1000)</code>
        </p>
      </header>
    </div>
  );
}

export default App;
