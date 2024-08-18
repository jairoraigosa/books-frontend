import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import { BookItem } from "./BookItem";

export const BookList = ({bookList, modalModBook, confirmDelete}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  
  const offset = currentPage * itemsPerPage;
  const currentItems = bookList.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(bookList.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Estado</th>
            <th>Calificación</th>
            <th>Género</th>
            <th>Fecha</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.length>0 ?
              currentItems.map((bookData,index)=>{
                return <BookItem key={bookData.id} bookData={bookData} modalModBook={modalModBook} confirmDelete={confirmDelete}/>
              })
            :
              <tr><td className='center' colSpan={8}>No se encontraron datos</td></tr>
          }
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Siguiente'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakLinkClassName={'page-link'}
      />
    </>
  );
};