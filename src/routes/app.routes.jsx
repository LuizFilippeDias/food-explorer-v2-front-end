import { Routes, Route } from "react-router-dom";

export function AppRoutes ({ $Isadmin }) {
    return(
        <Routes>
            <Route path ='/' element={<Home $Isadmin={$Isadmin}/>}/>
        </Routes>
    );
}