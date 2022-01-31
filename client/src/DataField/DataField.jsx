import './DataField.css';
import { useSelector } from 'react-redux'
import { Paper, styled } from '@mui/material'
import AlertError from '../AlertError/AlertError'
import { sendChangeOrderTickets } from '../connection/useClient'

export let indexDragDrop 

const DataField = () => {

  const data = useSelector(state => state.data.data)
  
  let from, to
  

  const Item = styled(Paper)({
    textAlign: 'left',
    margin: 10,
    fontSize: 12,
    height: 50,
    width: 120,
    borderRadius: 10,
    padding: "5px 10px",
    lineHeight: 0.5,
    cursor: "pointer",
  });

  const showYield = (new_yield, last_yield) => {
    let suitable, extra, arrow
    if(new_yield > 1) {
      suitable = 'data-field_green'
      extra = last_yield > 1 ? '' : 'data-field_green-extra'
      arrow = '🡅'
    }
    if(new_yield < 1) {
      suitable = 'data-field_red'
      extra = last_yield < 1 ? '' : 'data-field_red-extra'
      arrow = '🡇'
    }
    return (
      <>
        <div className = {`data-field__arrow ${suitable} ${extra}`}>{arrow}</div>
        <p className={`align-right ${suitable} ${extra}`}>{new_yield}</p>
      </>
    )  
  }

  return (
    <div className="data-field flex-container">
      <AlertError />
      {data.length > 0 ? data.map((item, i) => {
        return (
          <Item key={i} elevation={1} className="grid-container" 
          draggable 
          onDragStart={(e) => {
            from = i
            indexDragDrop = i
          }}
          onDragLeave={(e) => { e.target.style.background = 'white' }}
          onDragOver={(e) => {
            e.preventDefault()
            e.target.style.background = 'lightgray'
          }}
          onDrop={(e) => {
            e.preventDefault()
            to = i
            e.target.style.background = 'white'
            sendChangeOrderTickets(from, to)
          }}
          >
            <p className="data-field__ticker data-field_black">{item.ticker}</p> 
            <p className="align-right data-field_black">price<span className='data-field_blue'>{" "+item.price}</span></p>
            { showYield(item.yield, item.last_yield) }
          </Item>
        )
      }) : "загрузка..."}
    </div>
  );
}

export default DataField
