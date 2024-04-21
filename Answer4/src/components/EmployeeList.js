import React, { useState } from 'react';

const EmployeeList = ({ employees, editEmployee, deleteEmployee }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name or designation"
                value={searchTerm}
                onChange={handleChange}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Age</th>
                        <th>Department</th>
                        <th>Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.designation}</td>
                            <td>{emp.age}</td>
                            <td>{emp.department}</td>
                            <td>{emp.available ? 'Yes' : 'No'}</td>
                            <td>
                                <button type="button" class="btn btn-primary" onClick={() => editEmployee(emp.id, { available: !emp.available })}>
                                    {emp.available ? 'Mark Unavailable' : 'Mark Available'}
                                </button>
                                <button type="button" class="btn btn-primary" onClick={() => editEmployee(emp.id, { name: 'New Name' })}>
                                    Edit
                                </button>
                                <button type="button" class="btn btn-primary" onClick={() => deleteEmployee(emp.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
