import axios from 'axios';
import {useState, useEffect} from 'react';

export default function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3003/api/books/list',{withCredentials: true})
        .then(response => {
            setBooks(response.data);
        })
        .catch(error => console.log(error));
    }, []);

    return(
        <>
            <h1>Book List</h1>
            {!books.length ? <h2>No books to display</h2> :
                books.map(book => {
                    return(
                        <div key={book._id}>
                            <h3>{book.title}</h3>
                            <h4>{book.author}</h4>
                            <p>{book.description}</p>
                        </div>
                    );
                })
            }
        </>
    );
}