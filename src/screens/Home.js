import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { Button, Table } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import { useSelector } from 'react-redux';
import BooksService from "../services/book.service";
import { LargeModal } from "../components/LargeModal";
import { BookList } from "../components/BookList";
import { BookForm } from "../components/BookForm";
import Swal from 'sweetalert2'
import { Filter } from "../components/Filter";

const Home = () => {
  const token = useSelector((state) => state.user.token);
  // const {token} = LoginService.getCurrentUser();

  const initialBook = {
    id: '',
    title: '',
    author: '',
    status_id: '',
    status_name: '',
    qualification: '',
    gender: '',
    fecha: ''
  }

  const [bookList, setBookList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [tipoRegMod, setTipoRegMod] = useState(1)
  const [dataBookModal, setDataBookModal] = useState(initialBook)
  const [bookStatuses, setBookStatuses] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    getBooks();
    getStatuses();
  }, [token])


  const getStatuses = async() => {
    const response = await BooksService.getBookStatuses(token);
    const statuses = response.data.statuses;
    setBookStatuses(statuses);
  }

  const getBooks = (book_id='',book_status='',book_gender='') => {
    BooksService.getBooks(book_id,book_status,book_gender, token)
    .then((res)=>{
      setBookList(res);
    });
  }

  const modalRegBook = () => {
    setDataBookModal(initialBook);
    setTipoRegMod(1);
    setShowModal(true);
  }

  const modalModBook = (dataBook) => {
    setDataBookModal(dataBook);
    setTipoRegMod(2);
    setShowModal(true);
  }

  const confirmDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar libro?',
      text: "¡No podrás revertir esta eliminación!",
      icon: 'warning',
      showCancelButton: true, // Muestra el botón de cancelación
      confirmButtonColor: '#d33', // Color del botón de confirmación
      cancelButtonColor: '#3085d6', // Color del botón de cancelación
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await BooksService.deleteBook(id, token);
        if(response.data.trans){
          Swal.fire(
            '¡Eliminado!',
            'El libro ha sido eliminado.',
            'success'
          );
          getBooks();
        }else{
          Swal.fire(
            '¡Error!',
            'No se pudo eliminar el libro.',
            'error'
          );
        }
      }
    });
  }
  return (
    (token) ? (
        <div className="col-12">
          <div className='col-12 right'>
              <Button variant="outline-primary" onClick={()=>modalRegBook()}>
                  <FaIcons.FaPlusCircle/>
                  <b className='m-l-5'>Nuevo libro</b>
              </Button>
          </div>
          <div className="m-b-20 m-t-20">
            <h3>Filtros</h3>
            <Filter getBooks={getBooks} bookStatuses={bookStatuses}/>
          </div>
          <h3>Mis libros</h3>
          <div style={{ overflowX: 'auto' }}>
            <BookList bookList={bookList} modalModBook={modalModBook} confirmDelete={confirmDelete}/>
          </div>
          <LargeModal
            show={showModal}
            onHide={() => setShowModal(false)} 
            title={tipoRegMod===1 ? 'Registrar' : 'Modificar'}
            body={<BookForm dataBookModal={dataBookModal} tipoRegMod={tipoRegMod} funcSuccessReg={()=>getBooks()} bookStatuses={bookStatuses}/>}
            footer={<Button variant='danger' onClick={() => setShowModal(false)}>Cerrar</Button>}
          />
        </div>
    ) : <Login/>
  );
};

export default Home;