import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import Image from 'next/image';
import { Store } from '../../utils/Store';

const ProductDetails = () => {
  const { state, dispatch } = useContext(Store);
  const slug = useRouter().query.slug;
  const product = data.products.find((x) => x.slug == slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry , Component out of stock');
      return;
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });
  };

  return (
    <Layout title={product.name}>
      <div className="py-2 px-8">
        <Link href="/">Back</Link>
      </div>
      <div className="grid md:grid-cols-3 md:gap-8">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            layout="responsive"
          ></Image>
        </div>
        <div className="px-8">
          <ul>
            <li>
              <h1 className="text-2xl font-bold">{product.name}</h1>
            </li>
            <li> Category: {product.name}</li>
            <li>Mfg. by : {product.company}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Specificatons : {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="block mx-4 p-8 rounded-lg  shadow-md">
            <div className="mb-2 flex justify-between">
              <div>Prize</div>
              <div> {product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In Stock' : 'Unavialable'}</div>
            </div>
            <button
              className="primary-button my-4 w-full font-bold"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
