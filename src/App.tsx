import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  OfferData as CoinbaseOfferData,
  OrderBook as CoinbaseOrderBook,
} from "./classes/Coinbase";

import {
  OfferData as BinanceOfferData,
  OrderBook as BinanceOrderBook,
} from "./classes/Binance";

import {
  OfferData as KrakenOfferData,
  OrderBook as KrakenOrderBook,
} from "./classes/Kraken";

import { TriangleData, TrianglePairData, TriangleSetsData} from "./classes/General";

let ws: any = null;

function App() {
  const [apiURL, setApiURL] = useState<string>("");
  const [coinbaseOrderBooks, setCoinbaseOrderbooks] =
    useState<CoinbaseOrderBook>();
  const [binanceOrderBooks, setBinanceOrderbooks] =
    useState<BinanceOrderBook>();
  const [krakenOrderBooks, setKrakenOrderbooks] =
    useState<KrakenOrderBook>();
  
  const [binanceTriangleArbitrage, setBinanceTriangleArbitrage] = useState<TriangleSetsData>();

  function onOpen(event: any): void {
    console.log("Opened Connection!");
  }

  function onMessage(event: any): void {
    // let my_data = JSON.parse(event.data);
    if (event.data) {
      // console.log(event.data);
      let parsedData = JSON.parse(event.data);
      console.log(
        "received data type: " +
          parsedData.data_type +
          ", for exchange: " +
          parsedData.exchange_name
      );

      if (parsedData.exchange_name === "binance") {
        const ds = parsedData.data_set;
        if (parsedData.data_type === "orderbooks") {
          const orderbooks = new BinanceOrderBook(
            ds.lastUpdateId,
            ds.bids.map(
              (bid: any) => new BinanceOfferData(bid.price, bid.size)
            ),
            ds.asks.map(
              (ask: any) => new BinanceOfferData(ask.price, ask.size)
            )
          );
          setBinanceOrderbooks(orderbooks);
        } else if (parsedData.data_type === "triangle_arbitrage") {
          console.log("received triangle aribitrage data");
          const triangle_arbitrage: TriangleSetsData = parsedData;
          setBinanceTriangleArbitrage(triangle_arbitrage);
        }
      } else if (parsedData.exchange_name === "coinbase") {
        const ds = parsedData.data_set;
        if (parsedData.data_type === "orderbooks") {
          const orderbooks = new CoinbaseOrderBook(
            ds.sequence,
            ds.bids.map(
              (bid: any) => new CoinbaseOfferData(bid.price, bid.size)
            ),
            ds.asks.map(
              (ask: any) => new CoinbaseOfferData(ask.price, ask.size)
            )
          );
          setCoinbaseOrderbooks(orderbooks);
        }
      } else if (parsedData.exchange_name === "kraken") {
        const ds = parsedData.data_set;
        if (parsedData.data_type === "orderbooks") {
          const orderbooks = new KrakenOrderBook(
            ds.bids.map(
              (bid: any) => new KrakenOfferData(bid.price, bid.size)
            ),
            ds.asks.map(
              (ask: any) => new KrakenOfferData(ask.price, ask.size)
            )
          );
          setKrakenOrderbooks(orderbooks);
        }
      }
    }
  }

  function renderTriangleArbitrageTable(exchange_name: String, triangle_arbitrage_set: TriangleSetsData) {
    return (
      <div>
        <div>{exchange_name}</div>
        <div>
          <table className="trade-table">
            <thead>
              <tr>
              <th>triangle</th>
              <th>start pair ask</th>
              <th>mid pair ask</th>
              <th>end pair ask</th>
              <th>potential profit</th>
              </tr>
            </thead>
            <tbody>
             {triangle_arbitrage_set.triangle_sets.map((triangleData: TriangleData, i: number) => {
               return triangleData.profits.map((triangleProfit, j) =>{
                 return (
                   <tr key={j}>
                     <td>{triangleData.triangle}</td>
                     <td>{triangleData.start_pair.asks[j].price}</td>
                     <td>{triangleData.mid_pair.asks[j].price}</td>
                     <td>{triangleData.end_pair.asks[j].price}</td>
                     <td>{triangleProfit}%</td>
                   </tr>
                 )
               })
             })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderOrderbooksTable(exchange_name: string, orderbooks: any) {
    return (
      <div>
          <div>{exchange_name}</div>
          <table className="trade-table">
            <thead>
              <tr>
                <th>bid price</th>
                <th>bid size</th>
                <th>ask price</th>
                <th>ask size</th>
              </tr>
            </thead>
            <tbody>
              {orderbooks?.bids.slice(0, 25).map((bid: any, i: number) => {
                return (
                  <tr key={i}>
                    <td>{bid.price}</td>
                    <td>{bid.size}</td>
                    <td>{orderbooks.asks[i].price}</td>
                    <td>{orderbooks.asks[i].size}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    )
  }

  function connectToServer() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: 1 }),
    };
    fetch("http://127.0.0.1:8000/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setApiURL(data.uri);
        ws = new WebSocket(data.uri);
        ws.onopen = onOpen;
        ws.onmessage = onMessage;
      });
  }

  return (
    <div className="App">
      <div>
        <button disabled={!(!apiURL)} onClick={connectToServer}>Connect to backend</button>  {apiURL ? "Connected to: " + apiURL : "No connected"}
      </div>
      <div className="tables-container">
      {binanceTriangleArbitrage ? renderTriangleArbitrageTable("Binance", binanceTriangleArbitrage) : <div>No data for binance triangle arbitrage</div>}
      </div>
      <div className="tables-container">
        {coinbaseOrderBooks ? renderOrderbooksTable("Coinbase ETH-BTC", coinbaseOrderBooks) : <div>No data for coinbase</div>}
        {binanceOrderBooks ? renderOrderbooksTable("Binance ETH-BTC", binanceOrderBooks) : <div>No data for binance</div>}
        {binanceOrderBooks ? renderOrderbooksTable("Kraken ETH-BTC", krakenOrderBooks) : <div>No data for kraken</div>}
      </div>
    </div>
  );
}

export default App;
