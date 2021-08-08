import React from 'react';
import { CountryDataProvider } from './store/MapContext';

import MapboxGLMap from './map/Map.js';
import MapSidebar from './map/mapSidebar/MapSidebar';



function App() {
    return (
        <CountryDataProvider>
            <div>
                <MapboxGLMap />
            </div> 
        </CountryDataProvider>   
    )
}

export default App;







