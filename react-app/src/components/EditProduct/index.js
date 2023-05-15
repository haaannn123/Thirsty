import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { editProduct, thunkGetAllProducts } from '../../store/products';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../store/products';
import './EditProduct.css';

const EditProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const product = useSelector((state) => state.products.singleProduct)
    console.log('PRODUCT HERE PRODUCT HERE!!!!:', product)

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    // const [preview_img, setPreview_img] = useState(product.preview_img);
    const [errors, setErrors] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setPrice(Number(product.price).toFixed(2) || '');
        }
    }, [product]);

    useEffect(() => {
        dispatch(fetchProduct(productId))
    }, [dispatch, productId])

    if (!product) {
        return (<div>Loading</div>)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Price -->', price)

        let allErrors = {}

        if (!name.length) allErrors.name = 'Name is Required'
        if (name.length < 3 || name.length > 255) allErrors.name = 'Name must be between 3 and 255 characters'
        if (description.length < 30 || description.length > 255) allErrors.description = 'Description must be between 30 and 255 characters'
        if (!price.length || price < 1) allErrors.price = 'Please enter a valid price'
        // if (!preview_img || preview_img === '') allErrors.preview_img = 'Preview image is required'
        // if (!preview_img.endsWith('.png') && !preview_img.endsWith('.jpg') && !preview_img.endsWith('.jpeg')) allErrors.preview_img = 'Image URL must end in .png, .jpg, or .jpeg'

        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const newProduct = {
            name,
            description,
            price
            // preview_img
        }

        const updatedProduct = await dispatch(editProduct(newProduct, productId))

        console.log("UPDATED PRODUCT--------", updatedProduct)

        await dispatch(fetchProduct(updatedProduct.id))

        // if (updatedProduct) {
        dispatch(thunkGetAllProducts())
        history.push(`/products/${updatedProduct.id}`)
        //     return
        // }
    }

    return (
        <div className='edit-product-container'>
            <h1 className='edit-product-header'>Update Your Product</h1>
            <div className='edit-product-photo-form'>
                <img className='edit-product-photo' src={product.preview_img} alt="this is a drink!" />
                <form className='edit-product-form-container' method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className='edit-product-name' style={{marginBottom: '2em'}}>
                        <label className='edit-product-label'>Name</label>
                        <div className='edit-product-errors'>
                            {errors.name ? <p>{errors.name}</p> : null}
                        </div>
                        <input
                            className='edit-product-input'
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder='Name'
                            name='name'
                        />
                    </div>
                    <div className='edit-product-description' style={{marginBottom: '2em'}}>
                        <label className='edit-product-label'>Description</label>
                        <div className='edit-product-errors'>
                            {errors.description ? <p>{errors.description}</p> : null}
                        </div>
                        <textarea
                            className='edit-product-description-field'
                            type='textbox'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder='Please write at least 30 characters'
                            name='description'
                            rows='7'
                        />
                    </div>
                    <div className='edit-product-price' style={{marginBottom: '2em'}}>
                        <label className='edit-product-label'>Price($)</label>
                        <div className='edit-product-errors'>
                            {errors.price ? <p>{errors.price}</p> : null}
                        </div>
                        <input
                            className='edit-product-input'
                            type='number'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            placeholder='Price'
                            name='price'
                        />
                    </div>
                    {/* <label>Preview Image</label>
                {errors.preview_img ? <p>{errors.preview_img}</p> : null}
                <input
                type='file'
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setPreview_img(e.target.files[0])}
                placeholder='Preview Image'
                name='preview_img'
            /> */}
                    <div className='edit-submit-button-container'>
                        <button className='edit-product-submit-button' type='submit'>Update Your Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProduct;
