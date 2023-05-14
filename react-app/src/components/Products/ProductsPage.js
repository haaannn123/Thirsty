import GetAllProducts from ".";
import Footer from "../Footer/Footer";

const ProductsPage = () => {
    return (
      <div>
        <div className="color-strip"></div>
        <div class="color-strip-bottom"></div>
        <GetAllProducts />
        <Footer />
      </div>
    );
  };

  export default ProductsPage;
