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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api-vpn.netlify.app/.netlify/functions/getlist');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const updatedUsers = data.map(user => {
          const currentDate = new Date();
          const targetDate = new Date(user.date);
          const differenceInTime = targetDate.getTime() - currentDate.getTime();
          const differenceInDays = Math.abs(Math.ceil(differenceInTime / (1000 * 3600 * 24)));
          return { ...user, daysDifference: differenceInDays };
        });
        setUsers(updatedUsers);
      } catch (error) {
        setError('Error fetching users: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api-vpn.netlify.app/.netlify/functions/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('Response data:', data); // Log response data
      setUsers([...users, { ...newUser, _id: data.insertedId, daysDifference: 0 }]);
      setNewUser({
        email: '',
        date: '',
        telegramId: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map(user => (
          <div className="cards" key={user._id}>
            <h1>id: {user._id}</h1>
            <h1>email: {user.email}</h1>
            <h1>Days: {user.daysDifference} <img src={user.daysDifference >= 31 ? closeicon : checkmark} alt="icon" width="24px" height="24px"/></h1>
          </div>
        ))
      )}
    </div>
  );
}

export default Cus453;
