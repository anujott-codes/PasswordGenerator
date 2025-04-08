import { use, useState, useCallback, useEffect, useRef } from 'react'
import Waves from './blocks/Backgrounds/Waves/Waves';


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*{}_+-~[]"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {passwordGenerator()},[length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Waves
  lineColor="#fff"
  backgroundColor="rgba(135, 206, 250, 0.5)"
  waveSpeedX={0.02}
  waveSpeedY={0.01}
  waveAmpX={40}
  waveAmpY={20}
  friction={0.9}
  tension={0.01}
  maxCursorMove={120}
  xGap={12}
  yGap={36}
/></div>
<div className="relative z-10">
      <h1 className='text-black text-5xl font-bold text-center my-8'>Password Generator</h1>
      <div className="w-4xl h-98 mx-auto shadow-xl border border-gray-400 rounded-lg px-4 py-3 my-8 bg-white flex flex-wrap text-black flex-col justify-evenly">
        <div>
        <h1 className='text-3xl font-bold m-0.5'>Generate a Secure Password</h1>
        <h2 className='text-slate-600 m-0.5'>Create a strong password with your preffered settings</h2>
        </div>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
          className='outline-none bg-black text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-gray-400'
          onClick={copyPasswordtoClipboard}
          >copy</button>
        </div>
        <div className='flex flex-col flex-wrap text-sm gap-x-2 w-full'>
          <div className='flex flex-col items-start gap-x-1 w-full'>
            <label className='text-sm font-bold m-1'>Password Length: {length}</label>
            <input type="range" 
            min={6}
            max={20}
            value={length}
            className='cursor-pointer w-full m-1 accent-black hover:accent-gray-500'
            onChange={(e) => {setLength(Number(e.target.value))}}/>
          </div>
          <div className='flex items-center gap-x-1 m-1'>
            <input type="checkbox"
            defaultChecked = {numAllowed}
            className='m-1 accent-black w-4 h-4'
            id='numberInput'
            onChange={() => {setNumAllowed((prev) => !prev)}} />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 m-1'>
            <input type="checkbox"
            defaultChecked = {charAllowed}
            id='characterInput'
            className='m-1 accent-black w-4 h-4'
            onChange={() => {setCharAllowed((prev) => !prev)}} />
            <label>Characters</label>
          </div>
        </div>
        <div className='text-center'>
          <button
          className='outline-none bg-black text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-gray-400 rounded-lg w-full h-10'
          onClick={passwordGenerator}>
            Generate Password
          </button>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
