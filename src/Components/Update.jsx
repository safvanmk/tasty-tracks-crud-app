import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateRecipe } from '../Redux/slices/reciepDetailSlice';


function Update() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {id} = useParams();

  const [updateData, setUpdateData] = useState()

  const {recipes, loading} = useSelector((state) => state.app)


  useEffect(() => {
    if (id) {
      const singleRecipe = recipes.filter((item) => item.id === id)
      setUpdateData(singleRecipe[0])
    }
  }, [])

  console.log(updateData);

  const newData = (e) => {
    setUpdateData({...updateData, [e.target.name]: e.target.value})
  }

  console.log("updated data", updateData);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateRecipe(updateData))
    alert("Data updated successfully")
    navigate("/read")
  }

  return (
    <div>
      <div className="w-50 mx-auto">
        <Card style={{marginTop:'130px'}}>
          <Card.Body>
            <FloatingLabel className='mb-3' label="Title">
              <Form.Control value={updateData && updateData.title} type="text" name='title' placeholder="Title" onChange={newData} />
            </FloatingLabel>
            <FloatingLabel className='mb-3' label="Image url">
              <Form.Control value={updateData && updateData.thumbnail} type="text" name='thumbnail' placeholder="Title" onChange={newData} />
            </FloatingLabel>
            <FloatingLabel className='mb-3' label="Ingredients">
              <Form.Control value={updateData && updateData.ingredients} as="textarea" name='ingredients' placeholder="Ingredients" onChange={newData} />
            </FloatingLabel>
            <FloatingLabel className='mb-3' label="Directions">
              <Form.Control value={updateData && updateData.directions} as="textarea" name='directions' placeholder="Directions" onChange={newData} style={{ height: '100px' }} />
            </FloatingLabel>
            <FloatingLabel className='mb-3' label="Select Your Meal Category">
              <Form.Select value={updateData && updateData.type} name='type' onChange={newData} >
                <option hidden>Choose an option</option>
                <option value='Breakfast'>Breakfast</option>
                <option value='Lunch'>Lunch</option>
              </Form.Select>
            </FloatingLabel>
            <div className="text-center mt-3">
                <Link to={'/read'}>
                  <Button variant="outline-danger">Cancel</Button>
                </Link>
                <Button onClick={handleUpdate} className='ms-5' variant="outline-success">Update</Button>
              </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Update