import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { createNewProduct } from '../../store/create_a_product'

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
        if (description.length < 30) allErrors.description = 'Description is too short'
        if (description.length > 255) allErrors.description = 'Description is too long'
        if (!price.length) allErrors.price = 'Please enter a valid price'
        if (!preview_img || preview_img === '') allErrors.preview_img = 'Preview image is required'
        if (!preview_img.endsWith('.png') && !preview_img.endsWith('.jpg') && !preview_img.endsWith('.jpeg')) allErrors.preview_img = 'Image URL must end in .png, .jpg, or .jpeg'


        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const newProduct = {
            name,
            description,
            price,
            preview_img
        }

        const createdProduct = await dispatch(createNewProduct(newProduct))
        if (createdProduct) {
            history.push(`/products/${createdProduct.id}`)
            return
        }
    }

    return (
        <div>
            <h2>Create a New Product</h2>
            <form method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
                <label>Name</label>
                {errors.name ? <p>{errors.name}</p> : null}
                <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Name'
                    name='name'
                />
                <label>Description</label>
                {errors.description ? <p>{errors.description}</p> : null}
                <textarea
                    type='textbox'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='Please write at least 30 characters'
                    name='description'
                    rows='7'
                />
                <label>Price</label>
                {errors.price ? <p>{errors.price}</p> : null}
                <input
                    type='number'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder='Price'
                    name='price'
                />
                <label>Preview Image</label>
                {errors.preview_img ? <p>{errors.preview_img}</p> : null}
                <input
                    type='file'
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => setPreview_img(e.target.value)}
                    value={preview_img}
                    placeholder='Preview Image'
                    name='preview_img'
                />
                <button type='submit'>Create a New Product</button>
            </form>
        </div>
    )
}

export default CreateNewProduct;
