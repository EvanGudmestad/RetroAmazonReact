import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import BookItem from './BookItem';

export default function BookList({showToast, userRole}) {
    const [books, setBooks] = useState([]);
    const [deleteCounter, setDeleteCounter] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [currentPage,setCurrentPage] = useState(1);
    const [searchParams,setSearchParams] = useState({keywords:'', minPrice:'', maxPrice:'', genre:'', sortBy:''});

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
        const fetchInitialBooks = () => {
            axios.get(`${import.meta.env.VITE_API_URL}/api/books/list/`, {
                withCredentials: true,
                params: { pageSize: 3, pageNumber: 1 }
            }).then(response => {
                setBooks(response.data.books); // Assuming response contains books
                setTotalPages(Math.ceil(response.data.totalCount / 3)); // Assuming total count is returned
                setCurrentPage(1);
            }).catch(error => console.log(error));
        };
        fetchInitialBooks();
    }, [deleteCounter]);

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        const keywords = evt.target.search.value;
        const minPrice = evt.target.minPrice.value;
        const maxPrice = evt.target.maxPrice.value;
        const genre = evt.target.genre.value;
        const sortBy = evt.target.sort.value;
        const newSearchParams = {keywords, minPrice, maxPrice, genre, sortBy};
        setSearchParams(newSearchParams);
        fetchBooks({...newSearchParams, pageSize: 3, pageNumber: 1})
    }

    const fetchBooks = (params) => {
      //  console.log(`Search params are: ${JSON.stringify(params)}`);
        axios.get(`${import.meta.env.VITE_API_URL}/api/books/list/`, {
            withCredentials: true,
            params: { ...params, pageSize: 3 }
        }).then(response => {
            setBooks(response.data.books);
            setTotalPages(Math.ceil(response.data.totalCount / 3));
            setCurrentPage(params.pageNumber || 1);
        }).catch(error => console.log(error));
    }

    const generatePageNumbers = () => {
        const pageNumbers = [];
        for(let i = 1; i <= totalPages; i++){
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    const handlePageChange = (pageNumber) => {
        fetchBooks({...searchParams, pageNumber});
    };

    return(
        <>
       
            <h1>Book List</h1>
            {!books.length ? <h2>Please <Link to='/login'>Login</Link> to See Books</h2> :
             <div className='row'>
                 <form onSubmit={(evt) => onFormSubmit(evt)}>
                    {/* Search for books by keywords */}
                    <div className="form-group">
                        <label htmlFor="search" className='form-label'>Search</label>
                        <input type="text" className="form-control" id="search" placeholder="Search for books by keywords"/>
                    </div>
                    {/* Max Price and Min Price */}
                    <div className='row'>
                        <div className="col-4">
                            <label htmlFor="minPrice" className='form-label'>Min Price</label>
                            <input type="number" className="form-control" id="minPrice" placeholder="Min Price"/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="maxPrice" className='form-label'>Max Price</label>
                            <input type="number" className="form-control" id="maxPrice" placeholder="Max Price"/>
                        </div>
                        <div className='col-4'>
                            {/* Genre */}
                            <label htmlFor="genre" className='form-label'>Genre</label>
                            <select id="genre" className="form-select">
                                <option value="">All</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Magical Realism">Magical Realism</option>
                                <option value="Dystopian">Dystopian</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Young-Adult">Young Adult</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        {/* Sort By Price or year */}
                        <div className='col-4'>
                            <label htmlFor="sort" className='form-label'>Sort By</label>
                            <select id="sort" className="form-select">
                                <option value="">Please Select a Sort Option</option>
                                <option value="price">Price</option>
                                <option value="year">Year</option>
                            </select>
                        </div>
                    </div>
                    {/* Search Button */}
                    <button type="submit" className="btn btn-primary">Search</button>
                    
                </form>
                {books.map((book) => (
                    <BookItem book={book} key={book._id} onBookDelete={onBookDelete} userRole={userRole}/>
                ))}
                <nav aria-label="Page navigation">
                   <ul className="pagination">
                        {generatePageNumbers().map((pageNumber) => (
                            <li className={`page-item ${pageNumber === currentPage ? 'active' : ''}`} key={pageNumber}>
                                <button className="page-link" onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                             </li>   
                        ))}
                    </ul>
                </nav>
             </div>
            }
        </>
    );
}