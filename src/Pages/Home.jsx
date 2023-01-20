import React, { useEffect } from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Home = () => {

  //to get to top on rendering
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
        <Navbar/>
        <Announcement/>
        <Slider />
        <Categories/>
        <Products home={true}/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home
