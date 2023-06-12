import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { createNewProduct, fetchProduct } from '../../store/products';
import './CreateNewProduct.css';
import { thunkGetAllProducts } from '../../store/products';

const CreateNewProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [preview_img, setPreview_img] = useState('');
    const [errors, setErrors] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Price -->', price)

        let allErrors = {}

        if (!name.length) allErrors.name = 'Name is Required'
        if (name.length < 3 || name.length > 255) allErrors.name = 'Name must be between 3 and 255 characters'
        if (description.length < 30 || description.length > 255) allErrors.description = 'Description must be between 30 and 255 characters'
        if (!price.length || price < 1) allErrors.price = 'Please enter a valid price'
        if (!preview_img || preview_img === '') allErrors.preview_img = 'Preview image is required'
        // if (!preview_img.endsWith('.png') && !preview_img.endsWith('.jpg') && !preview_img.endsWith('.jpeg')) allErrors.preview_img = 'Image URL must end in .png, .jpg, or .jpeg'


        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }
        // console.log('Preview Image', preview_img)
        // console.log('Name', name)

        const newProduct = new FormData();
        newProduct.append('name', name)
        newProduct.append('description', description)
        newProduct.append('price', price)
        newProduct.append('preview_img', preview_img)

        // console.log('HELLLO', newProduct)
        const createdProduct = await dispatch(createNewProduct(newProduct))
        // console.log('CREATED_PRODUCT->', createdProduct)
        dispatch(thunkGetAllProducts())
        if (createdProduct) {
            history.push(`/products/${createdProduct.id}`)
            return
        }
    }

    return (
        <div className='new-product-container'>
            <h1 className='new-product-header'>Create a New Product</h1>
            <div className='new-product-photo-form'>
                <img className='new-product-photo' src='/images/blue-lagoon.png' alt="this is a drink!" />
                <form className='new-product-form-container' method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className='new-product-name' style={{ marginBottom: '2em', display: 'flex', flexDirection: 'column' }}>
                        <label className='new-product-label'>Name</label>
                        {errors.name ? <p className='new-product-errors'>{errors.name}</p> : null}
                        <input
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='Name'
                            name='name'
                        />
                    </div>
                    <div className='new-product-description' style={{ marginBottom: '2em', display: 'flex', flexDirection: 'column' }}>

                        <label className='new-product-label'>Description</label>
                        {errors.description ? <p className='new-product-errors'>{errors.description}</p> : null}
                        <textarea
                            type='textbox'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder='Please write at least 30 characters'
                            name='description'
                            rows='7'
                        />
                    </div>
                    <div className='new-product-price' style={{ marginBottom: '2em', display: 'flex', flexDirection: 'column' }}>
                        <label className='new-product-label'>Price($)</label>
                        {errors.price ? <p className='new-product-errors'>{errors.price}</p> : null}
                        <input
                            type='number'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            placeholder='Price'
                            name='price'
                        />
                    </div>
                    <div className='new-product-preview-img' style={{ marginBottom: '2em', display: 'flex', flexDirection: 'column' }}>
                        <label className='new-product-label'>Preview Image</label>
                        {errors.preview_img ? <p className='new-product-errors'>{errors.preview_img}</p> : null}
                        <input
                            type='file'
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => setPreview_img(e.target.files[0])}
                            placeholder='Preview Image'
                            name='preview_img'
                        />
                    </div>
                    <div className='new-submit-button-container'>
                        <button className='new-product-submit-button' type='submit'>Create a New Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNewProduct;
