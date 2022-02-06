import './App.css';
import Navbars from './Components/Navbars';
import News from './Components/News';
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';


function App() {
  const [progress, setprogress] = useState(0);
  let page=20;
  // let apikey='650f6718c3d644388b93d3f67b3f30d1';
  let apikey=process.env.REACT_APP_NEWS_API
  let setProgress=(progress)=>{setprogress(progress)
  // console.log(progress)
  }
  return (
    <Router>
      <Navbars/>
      <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} key="general" pages={page} country="in" category="general" apikey={apikey}/>}/>

        <Route exact path="/business" element={<News setProgress={setProgress} key="business" pages={page} country="in" category="business" apikey={apikey} />}/>

        <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pages={page} country="in" category="entertainment" apikey={apikey}/>}/>

        <Route exact path="/general" element={<News setProgress={setProgress} key="general" pages={page} country="in" category="general" apikey={apikey}/>} />

        <Route exact path="/health" element={<News setProgress={setProgress} key="health" pages={page} country="in" category="health" apikey={apikey}/>} />
        
        <Route exact path="/science" element={<News setProgress={setProgress} key="science" pages={page} country="in" category="science" apikey={apikey}/>} />
        
        <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pages={page} country="in" category="sports" apikey={apikey}/>} />
        
        <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pages={page} country="in" category="technology" apikey={apikey}/>} />
      </Routes>
    </Router>
  );
}

export default App;
