import './App.css';
import { useState, useEffect } from 'react';
import userData from './people.json';
import closeicon from './closeicon.png'
import checkmark from './checkmark.png'
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const updatedUsers = userData.map(user => {
      const currentDate = new Date();
      const targetDate = new Date(user.date);
      const differenceInTime = targetDate.getTime() - currentDate.getTime();
      const differenceInDays = Math.abs(Math.ceil(differenceInTime / (1000 * 3600 * 24))); // Use Math.abs to get absolute value
      return { ...user, daysDifference: differenceInDays };
    });
    setUsers(updatedUsers);
  }, []);

  return (
    <div className="App">
      {users.map(user => (
        <div className="cards" key={user.id}>
          <h1>id: {user.id}</h1>
          <h1>username: {user.username}</h1>
          <h1>Days: {user.daysDifference} <img src={user.daysDifference >= 31 ? closeicon : checkmark} alt="close icon" width="24px" height="24px"/></h1>
        </div>
      ))}
    </div>
  );
}

export default App;
