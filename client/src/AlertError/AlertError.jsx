//import './useAlerError.css';
import { useState, useEffect, useMemo } from "react";
import  {Box, Modal, Typography } from '@mui/material';
import { useSelector } from 'react-redux'

const AlertError = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const error = useSelector(state => state.error.message)

  useEffect(()=>{
    if(error) {
      handleOpen()
    }
    
  },[error]) 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="useAlertError">
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Ошибка!
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default AlertError
