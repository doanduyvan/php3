
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from './home/home'
import Listnews from './listnews/listnews'
import Page404 from './components/404'
import NewsDetail from './newsdetail/newsdetail';
import SignIn from './author/signin';
import SignUp from './author/signup';
import React, { useState, useEffect } from "react";
import Nav from "/src/components/nav";
import Footer from "/src/components/footer";


export default function Layout() {


  // useEffect(() => {}, []);

  return (
    <>
      <div className="min-h-full">
        <Nav />
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/danhmuc/:slug/:id" element={<Listnews />} />
              <Route path="/chitiet/:id/:slug" element={< NewsDetail />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Page404 />} />
            </Routes>

          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
