import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCategory = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page

    const getApiData = async () => {
        try {
            const res = await axios.get("https://api.bajrangvahinidal.com/api/signup");
            console.log(res)
            if (res.status === 200) {
                const newData = res.data.data;
                setData(newData.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Calculate the data to be displayed on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Users List</h4>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search</label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Guardian Name</th>
                            <th scope="col">Aadhar No.</th>
                            <th scope="col">Payment Mode</th>
                            <th scope="col">Amount</th>
                            {/* <th scope="col">Payment Status</th> */}
                            <th scope="col">Image</th>
                            <th>Date</th>
                            <th scope="col">See Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((item, index) => (
                                <tr key={item._id}>
                                    <th scope="row">{indexOfFirstItem + index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.paranrsName}</td>
                                    <td>{item.adharnumber}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td>{item.donationAmount}</td>
                                    {/* <td>{item.paymentStatus}</td> */}
                                    <td><img src={item.image} alt="User" /></td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td><Link className="bt edit" to={`/see-user/${item._id}`}><i className="fa-solid fa fa-eye"></i></Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>

            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)} className={`btn btn-primary p-2 d-flex g-2 page-btn ${currentPage === number ? 'active' : ''}`}>
                        {number}
                    </button>
                ))}
            </div>
        </>
    );
};

export default AllCategory;
