import './Header.css';
import { useState, useRef } from "react";
import { TextField, IconButton, Box, Alert, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { sendIntervalToServer } from '../connection/useClient';
import { sendNewTickerToServer } from '../connection/useClient';

const Header = () => {
  const [butCheck, setButCheck] = useState("hidden")
  const [interval, setInterval] = useState('15')
  const showSentInterval = () => setButCheck("visible")
  const closeSentInterval = () => setButCheck("hidden")

  const inputEl = useRef();

  const [newTicket, setNewTicket] = useState('')
  
  const [errorMessage, setErrorMessage] = useState('off')
  const showErrorMessage = () => setErrorMessage('on')
  const hideErrorMessage = () => setErrorMessage('off')

  const [butAdd, setButAdd] = useState("hidden")
  const showAddTick = () => setButAdd("visible")
  const closeAddTick = () => setButAdd("hidden")

  const [errorTick, setErrorTick] = useState(false)
  const showErrorInputTickers = () => { setErrorTick(true) }
  const closeErrorInputTickers = () => { setErrorTick(false) }

  const changeInterval = (e) => {
    setInterval(e.target.value)
    showSentInterval()
  }
  const sendInterval = () => {
    console.log('interval', interval);
    sendIntervalToServer(interval)
    closeSentInterval()
  }
  const inputTicket = (e) => {
    if(!e.target.value){
      closeAddTick()
      closeErrorInputTickers()
      hideErrorMessage()
      return
    }
    if(!checkInputError(e.target.value)){
      showErrorInputTickers()
      closeAddTick()
      return
    }
    closeErrorInputTickers()
    setNewTicket(e.target.value)
    showAddTick()
  }
  const checkInputError = (str) => {
    let regexp = /^[a-z]{2,6}$/i;
    if(!regexp.test(str)){
      showErrorMessage()
      return false
    }
    hideErrorMessage()
    return true
  }
  const sendTicket = () => {
    if(!checkInputError(newTicket)){
      return
    }
    sendNewTickerToServer(newTicket)
    inputEl.current.value = ''
    inputEl.current.focus()
    setButAdd("hidden")
  }

    return (
      <Box  component="form" className='header' noValidate autoComplete="off">
        
        <TextField  label="Интервал (сек.)" type="number" sx={{fontWeight: 'bold'}} className='header__input'
         defaultValue={interval} inputProps={{ min: 1, max: 600 }} onChange={changeInterval}/>

        <IconButton type="button" sx={{ visibility: butCheck }} onClick={sendInterval} className='header__icon'>
          <CheckIcon fontSize="large" />
        </IconButton>

        <div>
          <TextField label="Новый тикер" error={errorTick} variant="outlined" className='header__input'
          inputRef={inputEl} onChange={inputTicket}/>
          <p className={`header__error-message_${errorMessage}`}>Используйте латинские символы от 2 до 6 знаков</p>
        </div>
        

        <IconButton type="button" sx={{ visibility: butAdd }} onClick={sendTicket} className='header__icon'>
          <AddIcon fontSize="large"/>
        </IconButton>
      
      </Box>
    );
}

export default Header
