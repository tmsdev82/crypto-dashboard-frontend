import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';

let ws: any = null;

function App() {
  const [apiURL, setApiURL] = useState<string>("");
  const [rawData, setRawData] = useState<string>("");
  

  function onOpen(event: any): void {
    console.log("Opened Connection!");
  };

  function onMessage(event: any): void {
    // let my_data = JSON.parse(event.data);
    if (event.data) {
      // console.log(event.data);
      let parsedData = JSON.parse(event.data);
      console.log("updating coinData");
      setRawData(JSON.stringify(parsedData));

    }
  };

  function testClick() {
    console.log("test click!");
  }

  function connectToServer() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: 1 })
  };
  fetch('http://127.0.0.1:8000/register', requestOptions)
      .then(response => response.json())
      .then(data => {
        setApiURL(data.uri);
        ws = new WebSocket(data.uri);
        ws.onopen = onOpen;
        ws.onmessage = onMessage;
      }
        );
  }

  return (
    <div className="App">
      <div>
          <button onClick={connectToServer}>Connect to backend</button>
        </div>
        <div>
          { !rawData? "no data" : rawData}
        </div>
    </div>
  );
}

export default App;
