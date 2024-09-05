import React from 'react'
import hero from '../images/hero.svg'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen px-6 '>
      {/* Left Column: Text Content */}
      <div className='md:w-1/2 mb-8 md:mb-0 text-center md:text-left'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
          Building the Future of Personalized Gifts
        </h1>
        <p className='text-lg md:text-xl text-gray-600 mb-6'>
          Welcome to Craftora, a startup aiming to revolutionize gift-giving! We
          connect customers with local artisans to create unique, handcrafted
          presents.
        </p>
        {/* Explore Button */}
        <Link to='/products'>
          <button className='bg-indigo-500 text-white px-6 py-3 rounded-full text-lg shadow-md hover:bg-indigo-600 transition duration-300'>
            Explore
          </button>
        </Link>
      </div>

      {/* Right Column: Image */}
      <div className='hidden sm:flex md:w-1/2 justify-center'>
        <img src={hero} alt='Craftora Artisans' className='max-w-full h-auto' />
      </div>
    </div>
  )
}

export default Home
