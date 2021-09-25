import React from "react";
import { Redirect, Route } from "react-router-dom";

    function UserProtectedRoute({ component: Component, ...restOfProps }) {
        
      const isUser = localStorage.getItem('user_type')==='USER';
      console.log("this", isUser);
    
      return (
        <Route
          {...restOfProps} render={(props) =>  isUser ? <Component {...props} /> : <Redirect to="/" /> }
        />
      );
    }
    

export default UserProtectedRoute
