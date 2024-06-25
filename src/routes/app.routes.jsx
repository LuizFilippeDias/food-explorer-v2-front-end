import { Routes, Route } from "react-router-dom";

import { New } from './../pages/root/New'
import { ItemEdit } from './../pages/root/ItemEdit';
import { MenuItem } from './../pages/root/MenuItem'
import { Home } from './../pages/root/Home'
import { Favorites } from '../pages/root/Favorites';
import { MyOrders } from '../pages/root/MyOrders';

export function AppRoutes({ $Isadmin }) {
    return (
        <Routes>
            <Route path='/' element={<Home $Isadmin={$Isadmin} />} />
            <Route path='/new' element={<New $Isadmin={$Isadmin} />} />
            <Route path='/edit/:id' element={<ItemEdit $Isadmin={$Isadmin} />} />
            <Route path='/item/:id' element={<MenuItem $Isadmin={$Isadmin} />} />
            <Route path='/favorites' element={<Favorites $Isadmin={$Isadmin} />} />
            <Route path='/myorders' element={<MyOrders $Isadmin={$Isadmin} />} />
        </Routes>
    );
}