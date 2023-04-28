import React, { Children } from 'react'
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
export default function CommonRoute({comp}) {
  return (
    <>
        <Banner></Banner>
        <Header></Header>
        {comp}
        <Footer></Footer>
    </>
  )
}
