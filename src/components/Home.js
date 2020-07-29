import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import Map from './Map'
function Home () {
    const [users, setUsers] = useState([]);
    return (
        <div>
            <Navigation />
            <Map />
        </div>
    )
}

export default Home