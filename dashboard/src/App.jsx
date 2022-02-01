import React from 'react';
import Dashboard from './dashboard';
import { socket, SocketContext } from './service/socket';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Dashboard />
    </SocketContext.Provider>
  );
}

export default App;