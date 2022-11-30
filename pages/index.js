import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState, useEffect } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const aboutUserTextChange = (event) => {
    setUserInput(event.target.value);
  };

  const [userInput1, setUserInput1] = useState('');
  const startUserTextChange = (event) => {
    setUserInput1(event.target.value);
  };

  const [userApiKey, setUserApiKey] = useState('');

  useEffect(() => {
    const key = localStorage.getItem("userApiKey")
    if (key) {
      setUserApiKey(key)
    }
  }, [])

  const ApiKeyChange = (event) => {
    setUserApiKey(event.target.value);
    localStorage.setItem("userApiKey",event.target.value)
  };

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userApiKey,userInput,userInput1 }),
    })
try{    const data = await response.json()
    const { output } = data;
    console.log("OpenAI replied...", output.text)
    
    setApiOutput(`${userInput1}${output.text}`);
    }catch{
      setApiOutput("Invalid Api Key")
    }
    setIsGenerating(false);
  }
  
  return (
    <div className="root">
      <Head>
        <title>CouplesAiAdviser</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Couples-AI-Adviser</h1>
          </div>
          <div className="header-subtitle">
            <h2>Fill in the boxes below</h2>
          </div>
       
        </div>
         // code for api
        <div className="prompt-container">
        <p className='prompt-label'>What should the problems about?/Feelings</p>
          <textarea rows="1" placeholder="EXP:...My husband is a software developer. But he doesn't give me any time even at night. I respect and love him a lot but I find myself unsatisfied as he is so busy in his work. What should I do?" className="prompt-box" value={userInput} onChange={aboutUserTextChange}/>
          
        </div>
        <div className="prompt-container">
          <p className='prompt-label'>Write the first 2-3 lines here</p>
          <textarea placeholder={"What is your worst-case scenario?,\What do you need from me right now?,"} className="prompt-box" value={userInput1} onChange={startUserTextChange} />
        </div>
        <div className="prompt-buttons">
        <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
    </div>
  </a>
  </div>
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.buymeacoffee.com/lJTa2O8gZ9"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>Developed By Mashimi</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
