import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"

function App() {

  return (
    <>
    <Routes >
      <Route path="/" element={<HomePage />} />
      <Route path="/user" element={<div>user</div>} />
    </Routes>
    
    </>
  )
}

export default App
