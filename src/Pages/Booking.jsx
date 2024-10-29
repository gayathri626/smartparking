import React from 'react'

function Booking() {
  return (
    <>
    <div style={{width:'500px',border:'2px solid blue', marginLeft:'780px', marginTop:'150px', backgroundColor:'skyblue', borderRadius: '10px'}} >

    <img width={'300px'} style={{ marginLeft: '100px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="" />
    <input type="text" placeholder='Username' style={{width: '400px',marginLeft:'45px', height:'30px',marginBottom:'10px'}} />
    <input type="text" placeholder='Vehicle Modal' style={{width: '400px',marginLeft:'45px', height:'30px',marginBottom:'10px'}} />
    <input type="text" placeholder='Vehicle Number' style={{width: '400px',marginLeft:'45px', height:'30px',marginBottom:'10px'}} />
    <input type="text" placeholder='Slot Number' style={{width: '400px',marginLeft:'45px', height:'30px',marginBottom:'10px'}} />
    <button type="submit" style={{ height: '35px', width: '250px', fontSize: '20px', marginLeft: '120px', marginTop: '20px',marginBottom:'30px' }}>Complete payment</button>



    </div>
    </>
  )
}

export default Booking