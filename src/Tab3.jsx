import { useEffect, useState } from 'react'
import { getDataPresident } from './data'
const Tab3 = () => {
    const [presidents, setPresidents] = useState([]);
    const [responseTimeApi, setResponseTimeApi] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortedData, setSortedData] = useState([]);

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
            const { parties: data, resultTime } = await getDataPresident();
            setResponseTimeApi(resultTime);
            setPresidents(data);
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
            <h2>
                Cantidad de registros: {presidents.length}
            </h2>
            <h3>Tiempo de respuesta: {responseTimeApi}ms</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>
                            Partido <button onClick={handleSort} className="sort-button">
                                {sortOrder === 'asc' ? (
                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                                        <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3 .4z" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                                        <path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3 .4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z" />
                                    </svg>
                                )}
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

export default Tab3