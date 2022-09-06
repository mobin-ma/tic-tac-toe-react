import React from 'react'

const Square = ({ value, onClick }) => {
  //The style variable is for styling X and O values
  const style = value ? `squares ${value}` : `squares`

  return (
    <button className={style} onClick={onClick}>
      {value}
    </button>
  )
}

export default Square;