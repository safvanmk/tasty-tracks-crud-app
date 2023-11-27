import React, { useEffect } from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, searchRecipe } from '../Redux/slices/reciepDetailSlice';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [recipes, setRecipes] = useState({});

  const getRecipeData = (e) => {
    setRecipes({...recipes, [e.target.name]: e.target.value})
    console.log(recipes);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(recipes);
    dispatch(createRecipe(recipes))
    alert("Recipe added successfully")
    handleClose()
    navigate("/read")
  }

  // search
  const [searchData, setSearchData] = useState("")

  useEffect(() => {
    dispatch(searchRecipe(searchData))
  }, [searchData])

  // count on navbar
  const allRecipes = useSelector((state) => state.app.recipes)




  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <MDBNavbar fixed='top' light bgColor='primary'>
        <MDBContainer fluid>
          <div className="d-flex">
            <MDBNavbarBrand className='mx-5 text-info fw-bolder fs-4' href='/'>
              <img
                src='https://cdn.imgbin.com/12/19/11/imgbin-cream-cupcake-karn-yar-k-recipe-literary-cookbook-cooking-9pP9DwShHwTLmakBBfaLWfKHL.jpg'
                height='30'
                alt=''
                loading='lazy'
              />
              Tasty Tracks
            </MDBNavbarBrand>
            <MDBBtn onClick={handleShow} outline color="success" className='me-2' type='button'>
              Add new Reciepe
              <i className="fa-solid fa-circle-plus ms-2 fs-5"></i>
            </MDBBtn>
            <Link to={"/read"}>
              <MDBBtn outline color="secondary" className='me-2' type='button'>
                All Recipes <Badge bg="light" >{allRecipes.length}</Badge>
              </MDBBtn>
            </Link>
          </div>

          <FloatingLabel className='w-50 me-2' controlId="floatingTitle" label="Search your favourite recipe">
            <Form.Control type="search" placeholder="Search your favourite recipe" onChange={(e) => setSearchData(e.target.value)} />
          </FloatingLabel>
        </MDBContainer>
      </MDBNavbar>

      {/* modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Your Reciepe Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='px-4'>
          <FloatingLabel className='mb-3' label="Title">
            <Form.Control type="text" name='title' placeholder="Title" onChange={getRecipeData} />
          </FloatingLabel>
          <FloatingLabel className='mb-3' label="Image url">
            <Form.Control type="text" name='thumbnail' placeholder="Title" onChange={getRecipeData} />
          </FloatingLabel>
          <FloatingLabel className='mb-3' label="Ingredients">
            <Form.Control as="textarea" name='ingredients' placeholder="Ingredients" onChange={getRecipeData} />
          </FloatingLabel>
          <FloatingLabel className='mb-3' label="Directions">
            <Form.Control as="textarea" name='directions' placeholder="Directions" onChange={getRecipeData} style={{ height: '100px' }} />
          </FloatingLabel>
          <FloatingLabel className='mb-3' label="Select Your Meal Category">
            <Form.Select name='type' onChange={getRecipeData}>
              <option hidden>Choose an option</option>
              <option value='Breakfast'>Breakfast</option>
              <option value='Lunch'>Lunch</option>
            </Form.Select>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer className='mt-3'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit} variant="success">Submit</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Header