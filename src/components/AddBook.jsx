import { useState } from "react";

import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AddBook({showToast}){


    const[isbn, setIsbn] = useState('');
    const[title, setTitle] = useState('');
    const[author, setAuthor] = useState('');
    const[genre, setGenre] = useState('');
    const[year, setYear] = useState('');
    const[price, setPrice] = useState('');
    const[description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [bookPic, setBookPic] = useState('');

    const navigate = useNavigate();

    const isbnError = isbn.length != 14 ? 'ISBN must be between 14 characters' : '';
    const titleError = title.length < 1 || title.length > 100 ? 'Title must be between 1 and 100 characters' : '';
    const authorError = author.length < 1 || author.length > 100 ? 'Author must be between 1 and 100 characters' : '';
    const genreError = genre.length < 1 || genre.length > 100 ? 'Please Select a Genre' : '';
    const yearError = year.length != 4 ? 'Year must be 4 characters' : '';
    const priceError = price < 0 || price > 100 ? 'Price must be between $0 and $100' : '';
    const descriptionError = description.length < 1 || description.length > 1000 ? 'Description must be between 1 and 1000 characters' : '';

    const onAddBook = (evt) => {
        evt.preventDefault();
        setError('');
        if(isbnError){
            setError(isbnError);
            return;
        }
        if(titleError){
            setError(titleError);
            return;
        }
        if(authorError){
            setError(authorError);
            return;
        }
        if(genreError){
            setError(genreError);
            return;
        }
        if(yearError){
            setError(yearError);
            return;
        }
        if(priceError){
            setError(priceError);
            return;
        }
        if(descriptionError){
            setError(descriptionError);
            return;
        }

        const formData = new FormData();

        formData.append('isbn', isbn);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('genre', genre);
        formData.append('publication_year', year);
        formData.append('price', price);
        formData.append('description', description);
        if(bookPic){
            formData.append('bookPic', bookPic);
        }

        axios.post(`${import.meta.env.VITE_API_URL}/api/books/add`,formData,{withCredentials: true, headers: {'Content-Type': undefined}})
        .then(response => {
            showToast(`${response.data.message}`, 'success');
            navigate('/');
        })
        .catch(error => console.log(error));

    }

    

    return (
       <form onSubmit={(evt) => onAddBook(evt)} encType="multipart/form-data">
        {/* //isbn, title,author, genre,year,price, description fields */}
        <h1>Add Book</h1>
        <div className="d-flex flex-column">
            <div className="form-group col-4 mt-3">
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
            <div className="form-group col-4 mt-3">
                <label htmlFor="isbn" className="form-label">ISBN</label>
                <input type="text" className="form-control" id="isbn" placeholder="Enter ISBN" value={isbn} onChange={(evt) => setIsbn(evt.target.value)} />
            </div>
            <div className="form-group col-4 mt-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" placeholder="Enter Title" value={title} onChange={(evt) => setTitle(evt.target.value)} />
            </div>
            <div className="form-group col-4 mt-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input type="text" className="form-control" id="author" placeholder="Enter Author" value={author} onChange={(evt) => setAuthor(evt.target.value)} />
            </div>  
             <div className="form-group col-4 mt-3">
                     <select className="form-select" aria-label="Default select example" value={genre} onChange={(evt) => setGenre(evt.target.value)}>
                      <option value="" >Please Select a Genre</option>
                      {/* Fiction', 'Magical Realism', 'Dystopian', 'Mystery', 'Young Adult', 'Non-Fiction */}
                        <option value="Fiction">Fiction</option>
                        <option value="Magical Realism">Magical Realism</option>
                        <option value="Dystopian">Dystopian</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Young Adult">Young Adult</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                      </select>
              </div>
                <div className="form-group col-4 mt-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input type="text" className="form-control" id="year" placeholder="Enter Year" value={year} onChange={(evt) => setYear(evt.target.value)} />
                </div>
                <div className="form-group col-4 mt-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control" id="price" placeholder="Enter Price" value={price} onChange={(evt) => setPrice(evt.target.value)} />
                </div>
                <div className="form-group col-4 mt-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="3" value={description} onChange={(evt) => setDescription(evt.target.value)}></textarea>
                </div>
                {/* Book Picture */}
                <div className="form-group col-4 mt-3">
                    <label htmlFor="bookPic" className="form-label">Book Picture</label>
                    <input type="file" className="form-control" name="bookPic" id="bookPic" placeholder="Enter Book Picture" onChange={(evt) => setBookPic(evt.target.files[0])} />
                </div>
                <div className="form-group col-4 mt-3">
                    <button type="submit" className="btn btn-primary mt-3">Add Book</button>
                </div>
        </div>
       </form>
    );
}