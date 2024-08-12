import { useEffect, useState } from 'react';
import { getDataTouristicAttraction } from './data'

const Tab2 = () => {
    const [departments, setDepartments] = useState([]);
    const [responseTimeApi, setResponseTimeApi] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedData, setSortedData] = useState([]);
    const [count, setCount] = useState(0);
    const sortData = () => {
        const sorted = [...departments].sort((a, b) => {
            if (a.departmentName < b.departmentName) return sortOrder === 'asc' ? -1 : 1;
            if (a.departmentName > b.departmentName) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setSortedData(sorted);
    };

    const handleSort = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { departments: data, resultTime, countSites} = await getDataTouristicAttraction();
            setResponseTimeApi(resultTime);
            setDepartments(data);
            setCount(countSites);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (departments.length > 0) {
            sortData();
        }
    }, [departments, sortOrder]);

    return (
        <>
            <h1>Cantidad de Atracciones Turisticas: {count}</h1>
            <h3>Tiempo de respuesta: {responseTimeApi}ms</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>
                            Departamento <button onClick={handleSort} className="sort-button">
                                {sortOrder === 'asc' ? '🔼' : '🔽'}
                            </button>
                        </th>
                        <th>Ciudades y Atracciones</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading ? (
                        sortedData && sortedData.length > 0 ? (
                            sortedData.map((department, index) => (
                                <tr key={department.departmentId}>
                                    <td>{department.departmentName}</td>
                                    <td>
                                        {department.cities.map(city => (
                                            <div key={city.cityId}>
                                                <strong>{city.cityName}</strong>
                                                <ul>
                                                    {city.touristAttractions.map(attraction => (
                                                        <li key={attraction.id}>{attraction.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            "No hay datos"
                        )
                    ) : (
                        Array.from({ length: 3 }).map((_, index) => (
                            <tr key={index}>
                                <td><div className="skeleton skeleton-text"></div></td>
                                <td><div className="skeleton skeleton-text"></div></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Tab2;