import React, { useEffect, useState } from 'react'
import { MDBCollapse, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRipple
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipe, showRecipe } from '../Redux/slices/reciepDetailSlice';
import { Link } from 'react-router-dom';
import { MDBRadio, MDBBtnGroup } from 'mdb-react-ui-kit';
import { MDBSpinner } from 'mdb-react-ui-kit';




function Read() {

  // view modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // radios
  const [radioData, setRadioData] = useState()

  const dispatch = useDispatch()


  const { recipes, loading, searchData } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(showRecipe())
  }, []);

  if (loading) {
    return (
      <div className='text-center'>
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </div>
    )
  }




  return (
    <div>


      <div style={{ marginTop: '130px' }}>
        <h1 className="text-center">Welcome To Tasty Tracks</h1>
      </div>

      <div className="text-center mt-5">
        <MDBBtnGroup>
          <MDBRadio btn btnColor='secondary' id='btn-radio' name='type' wrapperTag='span' label='All Recipes' checked={radioData === ""} onChange={(e) => setRadioData(e.target.value)} />
          <MDBRadio btn btnColor='secondary' id='btn-radio2' name='type' wrapperClass='mx-2' wrapperTag='span' value="Breakfast" label='Breakfast' checked={radioData === "Breakfast"} onChange={(e) => setRadioData(e.target.value)} />
          <MDBRadio btn btnColor='secondary' id='btn-radio3' name='type' wrapperTag='span' value="Lunch" label='Lunch' checked={radioData === "Lunch"} onChange={(e) => setRadioData(e.target.value)} />
        </MDBBtnGroup>
      </div>

      <div className="m-5">
        <MDBRow className="p-5">
          {
            recipes &&

            recipes.filter((item) => {
              if (searchData.length === 0) {
                return item;
              } else {
                return item.title.toLowerCase().includes(searchData.toLowerCase())
              }
            })
              .filter((item) => {
                if (radioData === "Breakfast") {
                  return item.type === radioData
                }
                else if (radioData === "Lunch") {
                  return item.type === radioData;
                }
                else
                  return item;
              })

              .map((item, index) => (

                <MDBCol sm={12} md={6}>
                  <MDBCard className='mb-4 bg-dark'>
                    <MDBRow className='g-0'>
                      <MDBCol md='4'>
                        <MDBCardImage style={{height:'100%'}} src={item.thumbnail} alt='...' fluid />
                      </MDBCol>
                      <MDBCol md='8'>
                        <MDBCardBody>
                          <MDBCardTitle className='ms-5 mb-3 fs-3 text-light'>{item.title}</MDBCardTitle>
                          <MDBCardText>
                            <span className='text-success fw-bolder'>Ingredients:</span> {item.ingredients}
                          </MDBCardText>
                          <MDBCardText>
                            <span className='text-success fw-bolder'>Directions:</span> {item.directions}
                          </MDBCardText>
                          <MDBCardText>
                            <small className='text-muted'>{item.type}</small>
                          </MDBCardText>
                          <div className="mb-0">
                            <Link to={`/edit/${item.id}`}>
                              <MDBBtn color='info' className='ms-2 mb-2'>Edit</MDBBtn>
                            </Link>
                            <MDBBtn onClick={() => dispatch(deleteRecipe(item.id))} color='danger' className='ms-2 mb-2'>Delete</MDBBtn>
                          </div>
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCol>

              ))
          }

        </MDBRow>

      </div>



    </div>
  )
}

export default Read