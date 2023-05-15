import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './manageshop.css';
import ProductOfCurrUser from '../ProductOfCurrUser';
import { fetchCurrUserShops } from '../../store/shop';
import ManageReviews from '../ManageReviews';


const ManageShop = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('listing');
  const dispatch = useDispatch();
  const history = useHistory();

  const shops = useSelector((state) => state.userShops.shops);
  const shopsArr = Object.values(shops);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  useEffect(() => {
    dispatch(fetchCurrUserShops());
  }, [dispatch]);

  const createNewProductButton = () => {
    history.push('/products/new')
  }

  return (
    <div className="manage-shop-container">
      <div className="menu-panel">
        {shopsArr.map((shop) => {
          return (
            <h2 className='your-account-text'>Your Account</h2>
          )
        })}
        <h3 className='shop-title' onClick={() => handleMenuItemClick('listing')}>
        <i class="fa-solid fa-shop"></i>
          Store
        </h3>
        <h3 className='your-review-button' onClick={() => handleMenuItemClick('testing')}>
        <i class="fa-regular fa-thumbs-up"></i>
           Reviews</h3>
      </div>
      <div className="content-panel">
        {selectedMenuItem === 'listing' &&
          <>
            <div className='content-panel-header'>
              <h1>Products</h1>
              <button className="create-new-product-button" onClick={createNewProductButton}>Create New Product</button>
            </div>
            <ProductOfCurrUser />
          </>
        }
        {selectedMenuItem === 'testing' &&
          <>
            <h1>Manage Your Reviews</h1>
            <ManageReviews />
          </>
        }
      </div>
    </div>
  );
};

export default ManageShop;
