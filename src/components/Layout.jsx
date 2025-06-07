import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./desktop/NavBar";

import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../contexts/AuthContext";
import { GeneralContextProvider } from "../contexts/GeneralContext";
import { GameContextProvider } from "../contexts/GameContext";

const Layout = () => {
  return (
    <AuthContextProvider>
      <GeneralContextProvider>
        <GameContextProvider>
          <Toaster />
            <div className="row " style={{ minHeight: '100vh', overflowY: 'scroll', height: 'max-content' }}>
              <div className="col-10 px-0 offset-1">
                <NavBar />
                <Outlet />
              </div>
            </div>
          {/* <BottomMenu /> */}
        </GameContextProvider>
      </GeneralContextProvider>
    </AuthContextProvider>
  );
};

export default Layout;
