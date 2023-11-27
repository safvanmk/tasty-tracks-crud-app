import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

function Footer() {
  return (
    <div>
      <MDBFooter className='text-center text-white bg-primary'>
        <MDBContainer className='p-4 pb-0'>
          <section className=''>
            <p className='d-flex justify-content-center align-items-center'>
              <span className='me-3'>Register for free</span>
              <MDBBtn type='button' color="dark" rounded>
                Sign up!
              </MDBBtn>
            </p>
          </section>
        </MDBContainer>

        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2023 Copyright:
          <a className='text-white' style={{textDecoration:'none'}}>
            TastyTracks.com
          </a>
        </div>
      </MDBFooter>
    </div>
  )
}

export default Footer