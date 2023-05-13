import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/products";
import { useModal } from '../../context/Modal'
import './DeleteProduct.css';
import { useEffect, useState } from "react";

const DeleteProduct = ({ productId }) => {
    const dispatch = useDispatch();

    const { closeModal } = useModal();
    // console.log('PRODUCTID', productId)
    const handleSubmit = () => {
        dispatch(deleteProduct(productId))
        closeModal()
    };


    return (
        <div className='delete-product-container'>
            <h1 className='delete-product-title'>Confirm Delete</h1>
            <p className='delete-product-text'>Are you sure you want to remove this Product?</p>
            <div className='delete-product-submit'>
                <button id='yes-delete' onClick={handleSubmit}>Yes, Delete Product</button>
                <button id='no-keep' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteProduct;
