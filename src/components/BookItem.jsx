import { Link } from "react-router-dom";

export default function BookItem({book, onBookDelete, onBookUpdate, userRole}){
    
    const imageData = book.imageFile ? `data:${book.imageFile.contentType};base64,${book.imageFile.data}` : null;
    return(
       
        <div className='col-4'>
                       <div className='card'>
                            <div className='card-header'>
                                {book.title}
                                
                                {imageData && 
                                <>
                                <img src={imageData} alt={book.title} className='img-fluid' />
                                    {/* <p>{book.imageFile.filename}</p> 
                                    <p>{book.imageFile.contentType}</p>
                                    <p>{book.imageFile.data}</p> */}
                                    {/* <img src={`${book.imageFile.filename}`} alt={book.title} className='img-fluid' /> */}

                                </>
                                }
                             </div>
                             <div className='card-body'>
                                <p className='card-text'><span className="text-primary">Description: </span>{book.description}</p>
                                <p className='card-text'><span className="text-primary">Author: </span>{book.author}</p>
                                <p className='card-text'><span className="text-primary">Price: </span>{book.price}</p>
                                <p className="card-text"><span className="text-primary">Genre: </span>{book.genre}</p>
                                <p className="card-text"><span className="text-primary">Year: </span>{book.publication_year}</p>
                              </div> 
                              <div className='card-footer'>
                                <button className='btn btn-danger' onClick={(evt) => onBookDelete(evt, book._id)}>Delete</button>
                                {userRole.includes('quality analyst') && <Link to={`/books/update/${book._id}`} className='btn btn-info'>Update</Link>}
                               </div> 
                        </div>
        </div>
    );
}