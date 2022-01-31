'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

let interval = 15000;
const PORT = process.env.PORT || 4000;
let timer
let last_yield = {}

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {
  const clone_yield = []
  const quotes = tickers.map((ticker, index) => ({
    ticker: tickers[index],
    //exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    //change: randomValue(0, 200, 2),
    //change_percent: randomValue(0, 1, 2),
    //dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_yield: last_yield[ticker],

    //last_trade_time: utcDate(),
  }));

  last_yield = {}
  quotes.forEach(el => {
    last_yield[el.ticker] = el.yield
  })

  socket.emit('data', quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  if (timer) {
    clearTimeout(timer);
  }
  getQuotes(socket);

  // every N seconds
  timer = setTimeout(function () {
    getQuotes(socket);
    timer = setTimeout(trackTickers, interval, socket)
  }, interval);

  socket.on('disconnect', function () {
    clearTimeout(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket);
  });

  socket.on('tickers', function (data) {
    socket.emit('tickers', tickers);
  });

  socket.on('disable', function (data) {
    console.log(data);
  });

  socket.on('setInterval', function (sec) {
    interval = Number(sec) * 1000
    trackTickers(socket);
    socket.emit('setInterval', sec);
  });

  socket.on('addTicker', function (ticker) {
    if (tickers.length >= 20) {
      socket.emit('error', "Лимит количесива тикеров исчерпан!");
      return
    }
    ticker = ticker.toUpperCase()
    const isExist = tickers.includes(ticker)

    if (isExist) {
      socket.emit('error', "Такой тикер уже есть!");
      return
    }
    tickers.push(ticker)
    socket.emit('tickers', tickers);
    trackTickers(socket);
  });

  socket.on('deleteTickers', function (delTickers) {
    delTickers.forEach(el => {
      const index = tickers.indexOf(el)
      if (index >= 0) {
        tickers.splice(index, 1)
      }
    });
    socket.emit('tickers', tickers);
    trackTickers(socket);
  });
  socket.on('changeOrderTickets', function (from, to) {
    console.log(from, to);
    const el = tickers.splice(from, 1)
    const tempBefore = tickers.slice(0, to)
    const tempAfter = tickers.slice(to)
    tickers.length = 0
    tickers.push(...tempBefore, el, ...tempAfter)
    socket.emit('tickers', tickers); trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});