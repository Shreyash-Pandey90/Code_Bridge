

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { aura } from '@uiw/codemirror-theme-aura';
import ReactMarkdown from "react-markdown"

import "./App.css"
import Button from './Component/Button';
import Select from './Component/Select';


function App() {
  const [code, setCode] = React.useState("");

  const [language, setLanguage] = React.useState("");

  const [output, setOutput] = React.useState("Output will be generated here...")

  const [isLoadingConvert, setIsLoadingConvert] = React.useState(false);
  const [isLoadingDebug, setIsLoadingDebug] = React.useState(false);
  

  

  const onEdit = React.useCallback((value, viewUpdate) => {
    setCode(value)
  }, []);




  async function convertCode() {
    try {
      const message = `convert this code to ${language}: /n ${code}`
      setIsLoadingConvert(true)
      let req = await fetch(`http://localhost:3000/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt:message })
      });
      let res = await req.json();

      setIsLoadingConvert(false)

      if (!res.error) {
        setOutput(res.message)
      }
      else {
        alert(res.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async function debugCode() {
    const message = `Debug this code and comment errors ${code}: /n ${code}`
    setIsLoadingDebug(true)
    try {
      let req = await fetch(`http://localhost:3000/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt:message })
      });
      let res = await req.json();
      setIsLoadingDebug(false);
      if (!res.error) {
        setOutput(res.message)
      }
      else {
        alert(res.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const [isShown, setIsShown] = React.useState(false);
  

  const [theme, setTheme] = React.useState("");
  let themes = ["light", "dark"]

  React.useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, 1000);
  }, []);

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
  };

  const handleLangChange = (e) => {
    setLanguage(e.target.value)
    alert(language)
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }} className={`welcome-heading ${isShown ? 'animate-fade-in' : ''}`}>👨🏻‍💻 <span className="typewriter">Code Bridge</span></h1>
      <div className='main'>
        <div className='code-editor'>
          <select value={theme} onChange={handleThemeChange}>
            <option value="">Select a theme</option>
            {themes.map((themeOption) => (
              <option key={themeOption} value={themeOption}>
                {themeOption}
              </option>
            ))}
          </select>
          <CodeMirror
            value="//Enter your code here..."
            width="35rem"
            height="30rem"
            theme={theme || aura}
            extensions={[javascript({ jsx: true })]}
            onChange={onEdit}
          />

        </div>
        
        <div className='btnCont'>
          <Select handleLangChange={handleLangChange} />
          <Button value="Covert Code" handleClick={convertCode} isLoading={isLoadingConvert} />
          <Button value="Debug Code" handleClick={debugCode} isLoading={isLoadingDebug} />
        </div>
        {/* <OutputCont value={output || "YOUR RESPONSE WILL BE GENERATED HERE..."}/> */}
        <div className='markdown'>
          <ReactMarkdown>{output}</ReactMarkdown>
        </div>

      </div>
    </div>

  );
}
export default App;