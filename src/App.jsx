import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Status from './Status/Status'

import "primereact/resources/themes/lara-light-cyan/theme.css";

import ProductsDemo from './Status/Prime'
import StateTable from './Status/StateTabel'

function App() {

  return (
    <>
      {/* <Status/>    */}
      {/* <ProductsDemo/> */}
      <StateTable/>
    </>
  )
}

export default App
