import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [isLoading, setIsloding] = useState(false)
    

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input type="text" name='categoryName'  className="form-control" id="categoryName" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Category Image</label>
                        <input type="file" name='categoryImage' className="form-control" id="categoryImage" />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="categoryActive" id="categoryActive"  />
                            <label className="form-check-label" htmlFor="categoryActive">
                                Active in Homepage
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed':'allowed'}`}>{isLoading ? "Please Wait..." : "Add Category"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddCategory;
