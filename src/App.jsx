import React from 'react'
import "./App.css"
import Hero from './Components/Hero'
import Text from './Components/Text'

const App = () => {
  return (
    <main>
        <div className='main'>
            <div className='gradient'/>
        </div>
        <div className="app">
            <Hero/>
            <Text/>
        </div>
    </main>
  )
}

export default App