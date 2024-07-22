import './App.css';
import { useState, useEffect } from 'react';
import closeicon from './closeicon.png';
import checkmark from './checkmark.png';

const Cus453 = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: '',
    date: '',
    telegramId: ''
  });

  useEffect(() => {
    fetch('/api/getlist')
      .then(response => response.json())
      .then(data => {
        const updatedUsers = data.map(user => {
          const currentDate = new Date();
          const targetDate = new Date(user.date);
          const differenceInTime = targetDate.getTime() - currentDate.getTime();
          const differenceInDays = Math.abs(Math.ceil(differenceInTime / (1000 * 3600 * 24)));
          return { ...user, daysDifference: differenceInDays };
        });
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    fetch('/api/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, { ...newUser, id: data.insertedId, daysDifference: 0 }]);
        setNewUser({
          email: '',
          date: '',
          telegramId: ''
        });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="date"
          name="date"
          value={newUser.date}
          onChange={handleInputChange}
          placeholder="Date"
          required
        />
        <input
          type="text"
          name="telegramId"
          value={newUser.telegramId}
          onChange={handleInputChange}
          placeholder="Telegram ID (optional)"
        />
        <button type="submit">Add User</button>
      </form>
      {users.map(user => (
        <div className="cards" key={user.id}>
          <h1>id: {user.id}</h1>
          <h1>username: {user.username}</h1>
          <h1>email: {user.email}</h1>
          <h1>Days: {user.daysDifference} <img src={user.daysDifference >= 31 ? closeicon : checkmark} alt="close icon" width="24px" height="24px"/></h1>
        </div>
      ))}
    </div>
  );
}

export default Cus453;
