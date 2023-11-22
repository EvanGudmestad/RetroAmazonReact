import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function BookEditor({showToast}){

    const {bookId} = useParams();
    const [book, setBook] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() =>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/books/${bookId}`,{withCredentials: true})
        .then(response => {
            setBook(response.data);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setAuthor(response.data.author);
            setPrice(response.data.price);
        })
        .catch(error => console.log(error));
    },[]);

    function onBookUpdate(evt){
        evt.preventDefault();
        console.log('Submit Triggered');

        const updatedBook = {
            ...book,
            title,
            description,
            author,
            price
        }

        delete updatedBook._id;

        //console.log(updatedBook)

        axios.put(`${import.meta.env.VITE_API_URL}/api/books/update/${bookId}`,
        {...updatedBook}
        ,{withCredentials: true})
        .then(response => {
            console.log(response.data);
            showToast(response.data.message, 'success');
            navigate('/');
           // setUpdateCounter(prevCount => prevCount + 1);
           
        })
        .catch(error => console.log(error));
    }

    return(
        <>
            <h1>Book Editor Component - {bookId}</h1>
            <form onSubmit={(evt) => onBookUpdate(evt)}>
                <div>
                    <label htmlFor='title' className="form-label">Title</label>
                    <input type='text' id='title' className='form-control' value={title} onChange={(evt) => setTitle(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='description' className="form-label">Description</label>
                    <textarea id='description' className='form-control' value={description} onChange={(evt) => setDescription(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='author' className="form-label">Author</label>
                    <input type='text' id='author' className='form-control' value={author} onChange={(evt) => setAuthor(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor='price' className="form-label">Price</label>
                    <input type='number' id='price' className='form-control' value={price} onChange={(evt) => setPrice(evt.target.value)} />
                </div>
                <div>
                    <button type='submit' className='btn btn-primary'>Update Book</button>
                 </div>
            </form>
        </>
    )
}