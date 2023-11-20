import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import BookItem from './BookItem';

export default function BookList({showToast}) {
    const [books, setBooks] = useState([]);
    const [deleteCounter, setDeleteCounter] = useState(0);

    function onBookDelete(evt, bookId){
        evt.preventDefault();
        axios.delete(`${import.meta.env.VITE_API_URL}/api/books/delete/${bookId}`,{withCredentials: true})
        .then(response => {
            setDeleteCounter(prevCount => prevCount + 1);
            showToast(response.data.message, 'success');
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/books/list`,{withCredentials: true})
        .then(response => {
            setBooks(response.data);
        })
        .catch(error => console.log(error));
    }, [deleteCounter]);

    return(
        <>
            <h1>Book List</h1>
            {!books.length ? <h2>Please <Link to='/login'>Login</Link> to See Books</h2> :
             <div className='row'>
                {books.map((book) => (
                    <BookItem book={book} key={book._id} onBookDelete={onBookDelete} />
                ))}
             </div>
            }
        </>
    );
}