import { io } from "socket.io-client";
import { useDispatch } from 'react-redux'
import { useEffect } from "react"
import { setData } from '../store/dataReducer'
import { setTickers } from '../store/tickersReducer'
import { setInterval } from '../store/intervalReducer'
import { setError } from '../store/errorReducer'

let socket

const useClient = () => {
    socket = io('http://localhost:4000');

    const dispatch = useDispatch()

    useEffect(()=>{
        socket.on('connect', () => {
            socket.emit('setInterval', 15);
            socket.emit('tickers', "");
            //socket.emit('start', "");
        });
    
        socket.on('data', data => {
            dispatch(setData(data))
        });
    
        socket.on('tickers', tick => {
            dispatch(setTickers(tick))
        });
    
        socket.on('setInterval', time => {
            dispatch(setInterval(time))
        });

        socket.on('error', (error) => {
            dispatch(setError(error))
        });
    
        socket.on('disconnect', () => {
            console.log("disconnect");
        });

        return () => socket.disconnect();

    })
}

export const sendIntervalToServer = (time) => {
    console.log(time);
    socket.emit('setInterval', time);  
}
export const sendNewTickerToServer = (ticker) => {
    console.log(ticker);
    socket.emit('addTicker', ticker);  
}
export const sendDeleteTickersToServer = (arrTicker) => {
    console.log('arrTicker', arrTicker);
    socket.emit('deleteTickers', arrTicker);  
}
export const sendChangeOrderTickets = (from, to) => {
    console.log('change order', from, to);
    socket.emit('changeOrderTickets', from, to);
}
export default useClient
