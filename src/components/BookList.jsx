import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [deleteCounter, setDeleteCounter] = useState(0);

    function onBookDelete(evt, bookId){
        evt.preventDefault();
        axios.delete(`http://localhost:3003/api/books/delete/${bookId}`,{withCredentials: true})
        .then(response => {
            setDeleteCounter(prevCount => prevCount + 1);
            console.log(response.data);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get('http://localhost:3003/api/books/list',{withCredentials: true})
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
                    <div key={book._id} className='col-4'>
                       <div className='card'>
                            <div className='card-header'>
                                {book.title}
                             </div>
                             <div className='card-body'>
                              <p className='card-text'>{book.description}</p> 
                              </div> 
                              <div className='card-footer'>
                                <button className='btn btn-danger' onClick={(evt) => onBookDelete(evt, book._id)}>Delete</button>
                               </div> 
                        </div>
                    </div>
                ))}
             </div>
            }
        </>
    );
}