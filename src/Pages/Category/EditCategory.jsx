import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './EditCategory.css';

const EditCategory = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const { _id } = useParams();
    const [data, setData] = useState({});

    const getApiData = async () => {
        try {
            const res = await axios.get(`https://api.bajrangvahinidal.com/api/signup/${_id}`);
            if (res.status === 200) {
                setData(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, [_id]);

    const generatePdfAndSend = async () => {
        try {
            const input = document.getElementById('pdf-content');
            const canvas = await html2canvas(input, { scale: 2 }); // Increase scale for better quality
            const imgData = canvas.toDataURL('image/png');
    
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth - 20; // Margin of 10mm on each side
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
            // Set initial position and add image to PDF
            let position = 0;
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    
            // Add new page if necessary
            if (imgHeight > pdfHeight) {
                let heightLeft = imgHeight - pdfHeight;
                while (heightLeft > 0) {
                    pdf.addPage();
                    position = -pdfHeight + 10; // Adjust for margin
                    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }
            }
    
            const pdfBlob = pdf.output('blob');
            const formData = new FormData();
            formData.append('file', pdfBlob, 'receipt.pdf');
            formData.append('email', data.email);
    
            setBtnLoading(true);
            const res = await axios.post('https://api.bajrangvahinidal.com/api/send-receipt', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (res.status === 200) {
                toast.success('Receipt sent successfully!');
            } else {
                toast.error('Error sending receipt.');
            }
            setBtnLoading(false);
        } catch (error) {
            toast.error('Error sending receipt.');
            console.error(error);
            setBtnLoading(false);
        }
    };

    const printPage = () => {
        const printContent = document.getElementById('print-content').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContents;
    };


    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>User Details</h4>
                </div>
                <div className="links">
                    <Link to="/all-users" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <div className="user-details" id="print-content">
                    <div className="detail-item">
                        <strong>Name:</strong> <span>{data.title} {data.name}</span>
                    </div>
                    <div className="detail-item">
                        <strong>Email:</strong> <span>{data.email}</span>
                    </div>
                    <div className="detail-item">
                        <strong>Phone:</strong> <span>{data.phone}</span>
                    </div>
                    <div className="detail-item">
                        <strong>Address:</strong> <span>{data.address}, {data.city}, {data.state}</span>
                    </div>
                    <div className="detail-item">
                        <strong>Donation Amount:</strong> <span>₹{data.donationAmount}</span>
                    </div>
                    <div className="detail-item">
                        <strong>Payment Method:</strong> <span>{data.paymentMethod}</span>
                    </div>
                    {/* <div className="detail-item">
                        <strong>Payment Status:</strong> <span>{data.paymentStatus}</span>
                    </div> */}
                    <div className="detail-item">
                        <strong>Aadhaar Number:</strong> <span>{data.adharnumber}</span>
                    </div>
                    <div className='aadharcard'>
                        <div className="detail-item">
                            {/* <strong>Aadhaar Front:</strong>&nbsp; */}
                            <img src={data.adharcardFront} alt="Aadhaar Front" className="aadhaar-img" />
                        </div>
                        <div className="detail-item">
                            {/* <strong>Aadhaar Back:</strong> &nbsp; */}
                            <img src={data.adharcardBack} alt="Aadhaar Back" className="aadhaar-img" />
                        </div>
                    </div>
                </div>
            </div>

            {/* <button onClick={generatePdfAndSend} className="mt-2 send-receipt-btn">
                {btnLoading ? "Please Wait, Receipt is Sending" : "Send Receipt"}
            </button> */}

            <button onClick={printPage} className="btn btn-primary mt-2 print-btn">
                Print
            </button>
        </>
    );
};

export default EditCategory;
