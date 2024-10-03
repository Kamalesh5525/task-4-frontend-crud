




import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";   
import './view.css';

const View = () => {
    const [mdelete, setMdelete] = useState([]);
    const [record, setRecord] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('course')) || [];
        setRecord(data);
    }, []);

    const multipleDelete = (id, checked) => {
        let all = [...mdelete];
        if (checked) {
            all.push(id);
        } else {
            all = all.filter((val) => val !== id);
        }
        setMdelete(all);
    };

    const deleteCourse = (id) => {
        const d = record.filter((val) => val.id !== id);
        localStorage.setItem('course', JSON.stringify(d));
        setRecord(d);
        toast.error("Deleted successfully.");
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setTitle(item.title);
        setDescription(item.dep); 
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!title || !description) {
            toast.error('Both fields are required!');
            return;
        }

        const updatedItems = record.map(item => 
            item.id === editItem.id ? { ...item, title, dep: description } : item
        );

        localStorage.setItem('course', JSON.stringify(updatedItems));
        setRecord(updatedItems);
        setEditItem(null);
        setTitle('');
        setDescription('');
        toast.success('Item updated successfully!');
    };

    const allDelete = () => {
        if (mdelete.length === 0) {
            toast("At least 1 row must be selected.");
            return false;   
        }

        const all = record.filter((val) => !mdelete.includes(val.id));
        localStorage.setItem('course', JSON.stringify(all));
        setRecord(all);
        setMdelete([]);
    };

    return (
        <div>
            <Header />
            <div className="container mt-5 ">
                {editItem && (
                    <form onSubmit={handleUpdate} style={{ margin: "5% 30%" ,border:"3px solid green",padding:"10px",borderRadius:'10px'}}>
                        <h3 style={{ fontWeight: "bold", color: "black", textDecoration: "underline", marginBottom: "20px" }}>EDIT</h3>
                        <div className='py-2'>
                            <input className='py-2 rounded w-100' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                            
                        </div>
                        <div  className='py-2'>
                            <input className='py-2 rounded w-100 mb-3' type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                        </div>
                        <button className='py-2 rounded bg-success text-white ms-2 mb-3 'type="submit" style={{width:"110px",fontWeight:"700"}}>Update</button>
                            <button className='py-2 ms-2 mb-3 rounded bg-danger text-white' style={{width:"110px",fontWeight:"700"}} onClick={() => setEditItem(null)}>Cancel</button>
                    </form>
                )}
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <h2 style={{ fontWeight: "bold", color: "black", marginLeft: "3px", marginBottom: "30px", textDecoration: "underline" }}>VIEW </h2>
                        <div className="row">
                            {record.map((val) => (
                                <div key={val.id} className="col-md-4 mb-4">
                                    <div className="card " style={{background:"#93B5C6",border:"5px solid #180A0A",borderRadius:"20px"}}>
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{val.title}</h5>
                                            <p className="card-text">{val.dep}</p>
                                            <button className='btn' onClick={() => handleEdit(val)} style={{ fontSize: "30px", color: "#183D3D" }}>
                                                <FaEdit />
                                            </button>
                                            <button className='btn' onClick={() => deleteCourse(val.id)} style={{ fontSize: "30px", color: "red" }}>
                                                <MdDelete />
                                            </button>
                                            <div className="form-check mt-2">
                                                <input className="form-check-input" type="checkbox" onChange={(e) => multipleDelete(val.id, e.target.checked)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className='btn btn-danger' onClick={allDelete}>Delete Selected</button>

                        
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default View;
