import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Filter = ({getBooks, bookStatuses}) => {
  const initialStateFilters = {
    book_id: '',
    status_id: '',
    gender: ''
  }
  const [dataForm, setDataForm] = useState(initialStateFilters)

  const submitFilterBook = async (e) => {
    e.preventDefault();
    getBooks(dataForm.book_id, dataForm.status_id, dataForm.gender);
  }

  return (
    <Form onSubmit={submitFilterBook}>
      <div className='row'>
          <div className='col-lg-4'>
              <Form.Group className="mb-3">
                  <Form.Label>ID</Form.Label>
                  <Form.Control 
                      type="number"
                      value={dataForm.book_id} 
                      onChange={({target})=>setDataForm({...dataForm, book_id: target.value})} 
                      placeholder="ID del libro a buscar."
                  />
              </Form.Group>
          </div>
          <div className='col-lg-4'>
              <Form.Label>Estado de lectura</Form.Label>
              <Form.Control
                  as="select"
                  value={dataForm.status_id}
                  onChange={({ target }) => setDataForm({ ...dataForm, status_id: target.value })}
              >
                  <option value="">Seleccione el estado del libro</option>
                  {
                  bookStatuses.map(status => (
                      <option key={status.id} value={status.id}>
                          {status.name}
                      </option>
                  ))}
              </Form.Control>
          </div>
          <div className='col-lg-4'>
              <Form.Group className="mb-3">
                  <Form.Label>Género</Form.Label>
                  <Form.Control
                      type="text"
                      value={dataForm.gender} 
                      onChange={({target})=>setDataForm({...dataForm, gender: target.value})} 
                      placeholder="Ingrese el género del libro."
                      maxLength={100}
                  />
              </Form.Group>
          </div>
      </div>
      <div className='row'>
          <div className='center'>
              <Button variant="primary" type="submit">
                  Buscar
              </Button>
          </div>
      </div>
  </Form>
  )
}
