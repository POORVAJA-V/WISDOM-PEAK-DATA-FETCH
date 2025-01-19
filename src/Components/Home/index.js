import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valueA = sortField.includes('.')
      ? sortField.split('.').reduce((o, key) => o?.[key], a)
      : a[sortField];
    const valueB = sortField.includes('.')
      ? sortField.split('.').reduce((o, key) => o?.[key], b)
      : b[sortField];

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  return (
    <div className="container ">
      <div className="filter">
        <input
          type="search"
          className="searchBar"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <label className="labels">Sort By :</label>
          <select
          onChange={(event) => setSortField(event.target.value)}
          value={sortField}
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="address.city">City</option>
        </select>
        <label className="labels">Order: </label>
        <select
          className="dropDown"
          onChange={(event) => setSortOrder(event.target.value)}
          value={sortOrder}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
         
        </div>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
         
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Back
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
