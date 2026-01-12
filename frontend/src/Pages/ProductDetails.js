import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../Components/Layout/Layout";

const SingleProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/single-product/${slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching product");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [slug]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          {/* Image */}
          <div className="col-md-6 text-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p className="text-muted">{product.description}</p>
            <h4>${product.price}</h4>
            <p>Category: {product.category.name}</p>

            <button className="btn btn-primary mt-3">Add to Cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
