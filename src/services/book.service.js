import axios from "axios";

const getBooks = async (id,status,gender, token) => {
    const response = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/books`,{
        params: {
            id,
            status,
            gender
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if(response) {
        if (response.data.books) {
            return response.data.books;
        }
        return response;
    };
};

const getBookStatuses = async (token) => {
    const response = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/books/statuses`,{
        params: {},
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if(response) {
        if (response.data.books) {
            return response.data.books;
        }
        return response;
    };
};


const regBook = async ({title, author, status_id, status_name, qualification, gender}, token) => {
    const response = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/books`, {title, author, status_id, status_name, qualification, gender}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
    if (response.data.data) {
        return response.data.data;
    }
    return response;
};

const updateBook = async({id, title, author, status_id, status_name, qualification, gender}, token) => {
    const response = await axios.put(`${process.env.REACT_APP_URL_BACKEND}/books/${id}`, {title, author, status_id, status_name, qualification, gender}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
    if (response.data.data) {
        return response.data.data;
    }
    return response;
};

const deleteBook = async(id, token) => {
    const response = await axios.delete(`${process.env.REACT_APP_URL_BACKEND}/books/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
    if (response.data.data) {
        return response.data.data;
    }
    return response;
};

const BooksService = {
  getBooks,
  regBook,
  updateBook,
  getBookStatuses,
  deleteBook
}

export default BooksService;
