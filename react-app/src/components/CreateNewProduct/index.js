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
    const [previewImg, setPreviewImg] = useState('');
    const [errors, setErrors] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Price -->', price)

        let allErrors = {}

        if (!name.length) allErrors.name = 'Name is Required'
        if (description.length < 30) allErrors.description = 'Description is too short'
        if (description.length > 255) allErrors.description = 'Description is too long'
        if (!price.length) allErrors.price = 'Please enter a valid price'
        if (!previewImg || previewImg === '') allErrors.previewImg = 'Preview image is required'
        if (!previewImg.endsWith('.png') && !previewImg.endsWith('.jpg') && !previewImg.endsWith('.jpeg')) allErrors.previewImg = 'Image URL must end in .png, .jpg, or .jpeg'


        if (Object.keys(allErrors).length) {
            return setErrors(allErrors)
        }

        const newProduct = {
            name,
            description,
            price,
            previewImg
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
            <form onSubmit={handleSubmit}>
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
                {errors.previewImg ? <p>{errors.previewImg}</p> : null}
                <input
                    type='text'
                    onChange={(e) => setPreviewImg(e.target.value)}
                    value={previewImg}
                    placeholder='Preview Image'
                    name='previewImg'
                />
                <button type='submit'>Create a New Product</button>
            </form>
        </div>
    )
}

export default CreateNewProduct;
