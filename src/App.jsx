import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // State variables for managing password generation and settings
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Ref to store a reference to the password input for copy-to-clipboard functionality
  const passwordRef = useRef();

  // Function to generate a password based on selected settings
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // Include numbers in the password if numberAllowed is true
    if (numberAllowed) str += "0123456789";

    // Include symbols in the password if charAllowed is true
    if (charAllowed) str += "!@#$%^&*?_+";

    // Generate a password of specified length
    for (let i = 1; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    // Update the password state with the generated password
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Function to copy the password to the clipboard
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  // useEffect to generate a password when length, numberAllowed, or charAllowed changes
  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  // JSX for rendering the password generator UI
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-200 text-gray-800">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-6">
        {/* Checkbox for including numbers in the password */}
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            name=""
            id="number"
          />
          <label htmlFor="number">Numbers</label>
        </div>
        {/* Checkbox for including symbols in the password */}
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            name=""
            id="character"
          />
          <label htmlFor="character">Symbols</label>
        </div>
        {/* Range input for selecting password length */}
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer"
            type="range"
            min={8}
            max={32}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            name=""
            id="lengthInput"
          />
          <label htmlFor="lengthInput">Length: {length}</label>
        </div>
      </div>
    </div>
  );
}

export default App;
