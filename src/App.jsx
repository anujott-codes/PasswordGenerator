import { use, useState, useCallback, useEffect, useRef } from 'react'


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
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
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
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-green-400'
          onClick={copyPasswordtoClipboard}
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={6}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}/>
            <label>length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {numAllowed}
            id='numberInput'
            onChange={() => {setNumAllowed((prev) => !prev)}} />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {numAllowed}
            id='characterInput'
            onChange={() => {setCharAllowed((prev) => !prev)}} />
            <label>Characters</label>
          </div>
        </div>
        <div className='text-center'>
          <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-green-400'
          onClick={passwordGenerator}>
            Generate Password
          </button>
        </div>
      </div>
    </>
  )
}

export default App
