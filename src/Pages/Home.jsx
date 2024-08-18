import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import TableCard from '../Components/TableCard';
import axios from 'axios';

const Home = () => {
    const [WinIsOpen, setWinOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        nationalId: "",
        role: "",
        salary: "",
        workingHours: "",
        employmentDate: "",
        currentWorkingHours: "",
        employeeId: ""
    });

 
    const handleRowClick = (employee) => {
        setSelectedEmployee(employee);
        setFormData({
            ...employee,
            currentWorkingHours: employee.currentWorkingHours,
            employeeId: employee._id
        });
        setWinOpen(true);
    };
    const Clear=() => {
        setFormData({
            name: "",
            nationalId: "",
            role: "",
            salary: "",
            workingHours: "",
            employmentDate: "",
            currentWorkingHours: "",
            employeeId: ""
        });
    }
    const closeModal = () => {
        setWinOpen(false);
        setSelectedEmployee(null);
     };

    const getAllemployees = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/employees/');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.nationalId) {
            alert("Name and National ID are required");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/api/employees', formData);
            console.log('Success:', response.data);
            getAllemployees();
            closeModal();
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    const handleEditClick = async () => {
        if (!formData.employeeId) {
            alert("Employee ID is required for updating");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:3000/api/employees/${formData.employeeId}`, formData);
            console.log('Success:', response.data);
            getAllemployees();
            closeModal();
        } catch (error) {
            console.error('Error update employee:', error.response?.data || error.message);
        }
    };

    const handleDeleteClick = async (employee) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/employees/${employee.nationalId}`);
            console.log('Deleted:', response.data);
            getAllemployees();
        } catch (error) {
            console.error('Error delete employee:', error);
        }
    };

    const handleUpdateCurrentHour = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/employees/${formData.employeeId}/currentWorkingHoursid`, {
                currentWorkingHours: parseInt(formData.currentWorkingHours, 10)
            });
            console.log('Success:', response.data);
             getAllemployees();
            closeModal();
        } catch (error) {
            console.error('Error update employee:', error.response?.data || error.message);
        }
      
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        getAllemployees();
    }, []);

    return (
        <>
            <Header />
            <main className='container'>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableCard data={data} onRowClick={handleRowClick} onDeleteClick={handleDeleteClick} />
                        </tbody>
                    </table>
                </div>

                {WinIsOpen && (
                    <div className="win-bg">
                        <div className="win-content">
                            {selectedEmployee && (
                                <div>
                                    <h2>Name: {selectedEmployee.name}</h2>
                                    <p>Id: {selectedEmployee.nationalId}</p>
                                    <p>Role: {selectedEmployee.role}</p>
                                    <p>Salary: {selectedEmployee.salary}</p>
                                    <p>Working Hours: {selectedEmployee.workingHours}</p>
                                    <p>Employment Date: {selectedEmployee.employmentDate}</p>
                                    <p>Current Hours: {selectedEmployee.currentWorkingHours}</p>  
                                    <input
                                        type="number"
                                        name="currentWorkingHours"
                                        placeholder="Update Current Hours"
                                        onChange={handleInputChange}
                                        className="border border-blue-300 rounded"
                                    />    
                                    <button onClick={handleUpdateCurrentHour}>Update Current Hours</button>
                                    <button onClick={closeModal}>Close</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <form className='flex items-center justify-center gap-3 flex-wrap mt-5 mb-5' onSubmit={formData.employeeId ? handleEditClick : addUser}>
                    <input
                        placeholder='Employee ID'
                        name="employeeId"
                        onChange={handleInputChange}
                        type="text"
                        value={formData.employeeId}
                        className="border border-blue-300 rounded"
                        readOnly={formData.employeeId} 
                    />
                    <input
                        placeholder='Name'
                        name="name"
                        onChange={handleInputChange}
                        type="text"
                        value={formData.name}
                        className="border border-blue-300 rounded"
                    />
                    <input
                        placeholder='National ID'
                        name="nationalId"
                        onChange={handleInputChange}
                        type="number"
                        value={formData.nationalId}
                        className="border border-blue-500 rounded"
                    />
                    <input
                        placeholder='Role'
                        name="role"
                        onChange={handleInputChange}
                        type="text"
                        value={formData.role}
                        className="border border-blue-300 rounded"
                    />
                    <input
                        placeholder='Salary'
                        name="salary"
                        onChange={handleInputChange}
                        type="text"
                        value={formData.salary}
                        className="border border-blue-300 rounded"
                    />
                    <input
                        placeholder='Working Hours'
                        name="workingHours"
                        onChange={handleInputChange}
                        type="number"
                        value={formData.workingHours}
                        className="border border-blue-300 rounded"
                    />
                    <input
                        placeholder='Employment Date'
                        name="employmentDate"
                        onChange={handleInputChange}
                        type="text"
                        value={formData.employmentDate}
                        className="border border-blue-300 rounded"
                    />
                    <button className="border border-blue-500 rounded bg-blue-500">
                        {formData.employeeId ? "Update Employee" : "Add to Table"}
                    </button>
                   
                </form>
                <div className='flex justify-center items-center'>
                <button onClick={Clear} className="border   border-blue-500 rounded bg-blue-500 ml-3">
                        Clear
                    </button>

                </div>
              
            </main>
        </>
    );
};

export default Home;
