import { useEffect, useState } from 'react'
import { getDataPresident } from './data'
const Tab1 = () => {
    const [presidents, setPresidents] = useState([]);
    const [responseTimeApi, setResponseTimeApi] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortedData, setSortedData] = useState([]);
    const [countPresidents, setCountPresidents] = useState([]);

    const sortData = () => {
        const sorted = [...presidents].sort((a, b) => {
            if (a.politicalParty < b.politicalParty) return sortOrder === 'asc' ? -1 : 1;
            if (a.politicalParty > b.politicalParty) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setSortedData(sorted);
    };

    const handleSort = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };
    const toggleExpand = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const { parties: data, resultTime, countPresidents:count } = await getDataPresident();
            setResponseTimeApi(resultTime);
            setPresidents(data);
            setCountPresidents(count);
            setLoading(false);
            
        }
        fetch()
    }, [])
    useEffect(() => {
        if (presidents && presidents.length > 0) {
            sortData();
        }
    }, [presidents, sortOrder])


    return (
        <>
            <h1>
                Cantidad de Presidentes: {countPresidents }
            </h1>
            <h3>Tiempo de respuesta: {responseTimeApi}ms</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>
                            Partido <button onClick={handleSort} className="sort-button">
                            {sortOrder === 'asc' ? '🔼' : '🔽'}
                            </button>
                        </th>
                        <th>Presidente</th>
                        <th>Periodo </th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>{
                    !loading ?
                        sortedData && sortedData.length > 0
                            ?
                            sortedData.map((party, index) => (
                                party.presidents.map((president, index) =>
                                    <tr key={president.id}>
                                        <td>
                                            {party.politicalParty}
                                        </td>
                                        <td>
                                            <div className='data-image'>
                                                <span>{president.name}  {president.lastName}</span>
                                                <img src={president.image} alt={`${president.name}  ${president.lastName}`} />
                                            </div>
                                        </td>
                                        <td>
                                            {president.startPeriodDate} - {president.endPeriodDate || "Present"}
                                        </td>
                                        <td className="description">
                                            {expandedRow === president.id
                                                ? president.description
                                                : `${president.description.substring(0, 50)}...`
                                            }
                                            <button onClick={() => toggleExpand(president.id)}>
                                                {expandedRow === president.id ? 'Show less' : 'Show more'}
                                            </button>
                                        </td>

                                    </tr>
                                )
                            )
                            )
                            : "No hay datos"
                        : Array.from({ length: 3 }).map((_, index) => (
                            <tr key={index}>
                                <td><div className="skeleton skeleton-text"></div></td>
                                <td><div className="skeleton skeleton-image"></div></td>
                                <td><div className="skeleton skeleton-text"></div></td>
                                <td><div className="skeleton skeleton-text"></div></td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </>
    )
}

export default Tab1
