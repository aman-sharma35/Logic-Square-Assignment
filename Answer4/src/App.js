import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import AddEmployeeModal from './components/AddEmployeeModal';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const editEmployee = (id, updatedEmployee) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, ...updatedEmployee } : emp
    );
    setEmployees(updatedEmployees);
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <h1>Resource Management System</h1>
      <div className="dashboard">
        <div className="overview">
          <h2>Overview</h2>
          <p>Total Employees: {employees.length}</p>
          <p>Available Employees: {employees.filter(emp => emp.available).length}</p>
          <button type="button" class="btn btn-primary" onClick={() => setShowModal(true)}>Add Employee</button>
        </div>
        <div className="employee-list">
          <h2>Employee Listing</h2>
          <EmployeeList
            employees={employees}
            editEmployee={editEmployee}
            deleteEmployee={deleteEmployee}
          />
        </div>
      </div>
      {showModal && (
        <AddEmployeeModal
          addEmployee={addEmployee}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;
