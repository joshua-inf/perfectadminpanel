import { useState } from "react"
import DatePicker from "react-date-picker";
import { Link, NavLink, useParams } from "react-router-dom"
import "react-date-picker/dist/DatePicker.css";
import { AddStock } from "./AddStock";
import { Create } from "./Create";

export const MainNav = () => {
    let {stuff} = useParams();
    
    return (
        <>
            <div className="p-3">
                <div className="edit-nav d-flex" style={{gap:'10px'}}>
                    <NavLink to='/Edit/addstock' className="text-uppercase fw-bold p-1">Add Stock</NavLink>
                    <NavLink to='/Edit/Create' className="text-uppercase fw-bold p-1">Create product</NavLink>
                </div>
                <hr className="m-0 text-secondary" />
               {stuff === 'addstock' ?
               <AddStock/> :
               stuff === 'Create' ?
               <><Create/></> :
               <></>
               }
                <div>
                </div>
            </div>
        </>
    )
}