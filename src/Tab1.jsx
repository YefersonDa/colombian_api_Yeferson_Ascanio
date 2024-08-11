import { useEffect, useState } from 'react'
import Tabs from './Tabs'
import { getDataPresident } from './data'

function Tab1() {
    const [presidents, setPresidents] = useState([])
    useEffect(() => {

        const fetch = async () => {
            const data = await getDataPresident()
            setPresidents(data)
        }
        fetch()

    }, [])


    return (
        <>
            <h1>
                Cantidad de registros: {presidents.length}

            </h1>
            <table>
                <thead>
                    <tr>
                        <th>Partido</th>
                        <th>Presidente</th>
                        <th>Fecha Periodo Inicio</th>
                        <th>Fecha Periodo Final</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>{

                    presidents && presidents.length > 0

                    ? presidents.map((partie, index) => 
                        {partie.presidents.map((president, index)=>
                      <tr key={index} >
                        <td>
                            {partie.politicalParty}
                        </td>        
                             <td>
                                {president.name}  {president.lastName} 
                             </td>
                             <td>
                                {president.startPeriodDate}  
                             </td>
                             <td>
                                {president.endPeriodDate}  
                             </td>
                             <td>
                                {president.description}  
                             </td>
                             </tr>
                        
                        )})
                    :"No hay datos"

                }
                </tbody>
            </table>
        </>
    )
}

export default Tab1
