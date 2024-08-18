import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import BooksService from '../services/book.service';
import { useSelector } from 'react-redux';

export const BookForm = ({funcSuccessReg,dataBookModal,tipoRegMod, bookStatuses}) => {
    const token = useSelector((state) => state.user.token);
    const [dataForm, setDataForm] = useState(dataBookModal);
    const [errors, setErrors] = useState('');

    const submitRegBook = async (e) => {
        e.preventDefault();
        setErrors('');
        if(dataForm.title==="" || dataForm.title.length>100){
            setErrors('El título es requerido y no debe exceder los 100 caracteres.');
            return false;
        }
        if(dataForm.author==="" || dataForm.author.length>100){
            setErrors('El autor es requerido y no debe exceder los 100 caracteres.');
            return false;
        }

        if(dataForm.status_id==="" || dataForm.status_id===undefined){
            setErrors('Debe seleccionar el estado de lectura del libro.');
            return false;
        }
        if(dataForm.qualification==="" || dataForm.qualification<0 || dataForm.qualification>5 || isNaN(dataForm.qualification)){
            setErrors('Ingrese una calificación entre 1 y 5 para este libro.');
            return false;
        }
        if(dataForm.gender==="" || dataForm.gender.length>100){
            setErrors('El género es requerido y no debe exceder los 100 caracteres.');
            return false;
        }
        if(tipoRegMod===1){//registro
            const response = await BooksService.regBook(dataForm, token);
            const data = response.data;
            if(data.trans){
                Swal.fire({
                    title: '¡Registro exitoso!',
                    text: 'El registro fue realizado exitosamente',
                    confirmButtonColor: '#0d6efd'
                })
                setDataForm({id:'',title:'',author:'',status_id:'', status_name:'' ,qualification: '', gender: '', fecha: ''});
                funcSuccessReg();
            }else{
                Swal.fire({
                    title: '¡ERROR!',
                    text: data.message ? data.message : 'Se ha presentado un error inesperado al intentar registrar el ingreso/egreso.',
                    confirmButtonColor: '#dc3545'
                })
            }
        }else if(tipoRegMod===2){//modificacion
            const response = await BooksService.updateBook(dataForm, token);
            const data = response.data;
            if(data.trans){
                Swal.fire({
                    title: '¡Modificación exitosa!',
                    text: 'La modificación se ha realizado exitosamente.',
                    confirmButtonColor: '#0d6efd'
                })
                funcSuccessReg();
            }else{
                Swal.fire({
                    title: '¡ERROR!',
                    text: data.message ? data.message : 'Se ha presentado un error inesperado al intentar modificar el libro.',
                    confirmButtonColor: '#dc3545'
                })
            }
        }
    }

    return (
        <Form onSubmit={submitRegBook}>
            {errors && <div className='col-12 errorlabel'>{errors}</div>}
            <div className='row'>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                            type="text"
                            value={dataForm.title} 
                            onChange={({target})=>setDataForm({...dataForm, title: target.value})} 
                            placeholder="Ingrese el título del libro."
                            maxLength={100}
                        />
                    </Form.Group>
                </div>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control
                            type="text"
                            value={dataForm.author} 
                            onChange={({target})=>setDataForm({...dataForm, author: target.value})} 
                            placeholder="Ingrese el autor del libro."
                            maxLength={100}
                        />
                    </Form.Group>
                </div>
                <div className='col-lg-6'>
                    <Form.Label>Estado de lectura</Form.Label>
                    <Form.Control
                        as="select"
                        value={dataForm.status_id}
                        onChange={({ target }) => setDataForm({ ...dataForm, status_id: target.value })}
                    >
                        <option value="" disabled>Seleccione el estado inicial del libro</option>
                        {
                        bookStatuses.map(status => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </Form.Control>
                </div>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Calificación</Form.Label>
                        <Form.Control
                            type="number"
                            value={dataForm.qualification} 
                            onChange={({target})=>setDataForm({...dataForm, qualification: target.value})} 
                            placeholder="Ingrese la calificación del libro de 1 a 5."
                        />
                    </Form.Group>
                </div>
                <div className='col-lg-6'>
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
                        {tipoRegMod===1 ? 'Registrar' : 'Modificar'}
                    </Button>
                </div>
            </div>
        </Form>
    )
}