import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from '../Header/Header';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import AllCategory from '../../Pages/Category/AllCategory';
import AddCategory from '../../Pages/Category/AddCategory';
import EditCategory from '../../Pages/Category/EditCategory';
import Login from '../auth/Login';

const Home = () => {
  const login = sessionStorage.getItem("login")
  if (!login) {
    return <Login />
  }

  return (
    <>
      {login ? (
        <>
          <Header />
          <div className="rightside">
            <Routes>
              <Route path={"/dashboard"} element={<Dashboard />} />
              {/* Category */}
              <Route path={"/all-users"} element={<AllCategory />} />
              <Route path={"/add-category"} element={<AddCategory />} />
              <Route path={"/see-user/:_id"} element={<EditCategory />} />
              <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Default route */}
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect all routes to login */}
        </Routes>
      )}
    </>
  );
}

export default Home;
