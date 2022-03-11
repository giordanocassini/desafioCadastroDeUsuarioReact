
import axios from '../api/axios';
import { useState, useEffect } from "react";
import useAxiosPrivate from '../users/hooks/useAxiosPrivate';

const EmployeesTest = () => {

    const [employees, setEmployees] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getEmployees = async () => {

            const controller = new AbortController();
            
            try {
                const response = await axiosPrivate.get('/employees', {
                    signal: controller.signal
                });
                console.log(response.data);
                setEmployees(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        getEmployees();
    }, []);

    return (
        <article>
            <h2>Employees List</h2>
            {employees?.length
                ? (
                    <ul>
                        {employees.map((employee, i) => <li key={i}>{employee?.firstname}</li>)}
                    </ul>
                ) : <p>No employees to display</p>
            }
        </article>
    )
}

export default EmployeesTest