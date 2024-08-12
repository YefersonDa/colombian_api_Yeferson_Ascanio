import React, { useEffect, useState } from 'react';
import { getDataAirportGroupedByRegion } from './data';


const Tab3 = () => {
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedData, setSortedData] = useState([]);
    const [responseTimeApi, setResponseTimeApi] = useState([]);
    const [count, setCount] = useState(0);


    const sortData = () => {
        const sorted = [...regions].sort((a, b) => {
            if (a.regionName < b.regionName) return sortOrder === 'asc' ? -1 : 1;
            if (a.regionName > b.regionName) return sortOrder === 'asc' ? 1 : -1;
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
            const regionData = await getDataAirportGroupedByRegion();
            const regionsArray = Object.keys(regionData.region).map(regionName => ({
                regionName,
                departments: Object.keys(regionData.region[regionName]).map(departmentName => ({
                    departmentName,
                    cities: Object.keys(regionData.region[regionName][departmentName]).map(cityName => ({
                        cityName,
                        types: Object.entries(regionData.region[regionName][departmentName][cityName].tipo).map(([typeName, count]) => ({
                            typeName,
                            count,
                        })),
                    })),
                })),
            }));
            setResponseTimeApi(regionData.resultTime);
            setRegions(regionsArray);
            setCount(regionData.countAirport);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (regions.length > 0) {
            sortData();
        }
    }, [regions, sortOrder]);

    const renderTableRows = () => {
        let regionRowSpan = 0;
        return sortedData.map((region, regionIndex) => {
            regionRowSpan = region.departments.reduce((sum, department) => {
                return sum + department.cities.reduce((citySum, city) => {
                    return citySum + city.types.length;
                }, 0);
            }, 0);

            return region.departments.map((department, departmentIndex) => {
                const departmentRowSpan = department.cities.reduce((sum, city) => {
                    return sum + city.types.length;
                }, 0);

                return department.cities.map((city, cityIndex) => {
                    return city.types.map((type, typeIndex) => (
                        <tr key={`${regionIndex}-${departmentIndex}-${cityIndex}-${typeIndex}`}>
                            {departmentIndex === 0 && cityIndex === 0 && typeIndex === 0 && (
                                <td rowSpan={regionRowSpan}>{region.regionName}</td>
                            )}
                            {cityIndex === 0 && typeIndex === 0 && (
                                <td rowSpan={departmentRowSpan}>{department.departmentName}</td>
                            )}
                            {typeIndex === 0 && (
                                <td rowSpan={city.types.length}>{city.cityName}</td>
                            )}
                            <td>{type.typeName}</td>
                            <td>{type.count}</td>
                        </tr>
                    ));
                });
            });
        });
    };

    return (
        <>
            <h1>Cantidad de Aeropuertos: {count}</h1>
            <h3>Tiempo de respuesta: {responseTimeApi}ms</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>
                            Región <button onClick={handleSort} className="sort-button">
                                {sortOrder === 'asc' ? '🔼' : '🔽'}
                            </button>
                        </th>
                        <th>Departamento</th>
                        <th>Ciudad</th>
                        <th>Tipo</th>
                        <th>Conteo</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading ? (
                        sortedData && sortedData.length > 0 ? (
                            renderTableRows()
                        ) : (
                            "No hay datos"
                        )
                    ) : (
                        Array.from({ length: 3 }).map((_, index) => (
                            <tr key={index}>
                                <td><div className="skeleton skeleton-text"></div></td>
                                <td><div className="skeleton skeleton-text"></div></td>
                                <td><div className="skeleton skeleton-text"></div></td>
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

export default Tab3;