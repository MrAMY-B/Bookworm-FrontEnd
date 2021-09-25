import React from "react";
import { Redirect, Route } from "react-router-dom";

    function AdminProtected({ component: Component, ...restOfProps }) {
        
      const isAdmin = localStorage.getItem('user_type')==='ADMIN';
      console.log("this", isAdmin);
    
      return (
        <Route
          {...restOfProps} render={(props) =>  isAdmin ? <Component {...props} /> : <Redirect to="/" /> }
        />
      );
    }
    


export default AdminProtected
