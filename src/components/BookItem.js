import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

export const BookItem = ({bookData,modalModBook, confirmDelete}) => {
  const {id,title,author,status_id,status_name,qualification,gender,fecha} = bookData;
  return (
    <tr key={'tr'+id}>
      <td>{ id }</td>
      <td>{ title }</td>
      <td>{ author }</td>
      <td>{ status_name }</td>
      <td>{ qualification }</td>
      <td>{ gender }</td>
      <td>{ fecha }</td>
      <td>
        <Button 
          variant="outline-success" 
          onClick={()=>modalModBook({id,title,author,status_id,status_name,qualification,gender,fecha})}
          style={{ marginRight: '10px' }}
        >Modificar</Button>
        <Button 
          variant="outline-danger" 
          onClick={() => confirmDelete(id)}
        >Eliminar</Button>
      </td>
    </tr>
  );
};