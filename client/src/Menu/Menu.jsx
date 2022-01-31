//import './Menu.css';
import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab } from '@mui/material';
import { useSelector } from 'react-redux'
import { sendDeleteTickersToServer } from '../connection/useClient';
import { setValue } from '../store/tickersReducer'
import { useDispatch } from 'react-redux'
import { indexDragDrop } from "../DataField/DataField";

const Menu = () => {
  const [open, setOpen] = useState(false)
  const tickers = useSelector(state => state.tickers)
  const data = useSelector(state => state.data.data)
  const dispatch = useDispatch()

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false);
  
  const onDeleteTickers = () => {
    const sliceTickers = []
    const entr = Object.entries(tickers)
    entr.forEach(el => {
      if(el[1] === true){
        sliceTickers.push(el[0])
      }
    })  
    sendDeleteTickersToServer(sliceTickers)
  }

  const handleChange = (event) => {
    dispatch(setValue(event.target.name))
  };

  return (
 
    <div className="menu">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Выберите тикеры для удаления!"}
        </DialogTitle>
        <DialogContent>
          <FormGroup sx={{ marginBottom: '5px' }} >
            {Object.keys(tickers).map((value, index) => {
              return (
                <FormControlLabel key={index} control={<Checkbox checked={tickers[value]}
                  onChange={handleChange} name={value} />} label={value} />
              );
            })}
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDeleteTickers}>
              Delete
            </Button>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>

      <Fab color="primary"  onClick={handleClickOpen}
        onDrop={(e) => {
            e.preventDefault()
            const name = data[indexDragDrop].ticker
            sendDeleteTickersToServer([name])
        }}
        onDragOver={(e) => {
          e.preventDefault()
          
        }}
        >
        <DeleteIcon />
      </Fab>
    </div>

      
    
    
    
  );
}

export default Menu
