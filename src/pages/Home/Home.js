import React from 'react'
import Slider from '../../features/Slider/Slider'
import FeaturedProducts from '../../features/FeaturedProducts/FeaturedProducts'
import Categories from '../../features/Categories/Categories'
import Contact from '../../features/Contact/Contact'
import './Home.scss'

const Home = () => {
  return (
    <div className='home'>
      <Slider/>
      <FeaturedProducts type="featured"/>
      <Categories/>
      <FeaturedProducts type="trending"/>
      <Contact/>
    </div>
  )
}

export default Home