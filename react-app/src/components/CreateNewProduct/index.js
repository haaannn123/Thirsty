import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const CreateNewProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('');
    const [previewImg, setPreviewImg] = useState('');

    return (
        <h1>Create a New Product</h1>
    )
}

export default CreateNewProduct;
