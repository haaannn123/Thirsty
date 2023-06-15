import GetAllProducts from ".";
import Footer from "../Footer/Footer";

const ProductsPage = () => {
    return (
      <div>
        <div className="color-strip"></div>
        <div class="color-strip-bottom"></div>
        <GetAllProducts />
        <div style={{ position: 'absolute', left: '0', right: '0' }}>
          <Footer />
        </div>
      </div>
    );
  };

  export default ProductsPage;
