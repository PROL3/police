import React from 'react';

const TableCard = ({ data, onRowClick, onDeleteClick }) => {
    return (
        <>
            {data.map((employee, index) => (
                <tr key={employee.nationalId} onClick={() => onRowClick(employee)}>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>
                        <button onClick={(e) => {
                             onDeleteClick(employee);
                        }} className='bg-slate-600'>
                            Delete Employee
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
};
 


export default TableCard;
