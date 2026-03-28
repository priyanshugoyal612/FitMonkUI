import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Button} from "./components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>This is my application</h1>

    <Button variant="destructive">Click Me</Button>

   <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
      
      </Button>
      </div>

    </>
  )
}

export default App
