/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="mb-5 border border-gray-300  rounded-xl ">
      <Link href={`/product/${product.slug}`}>
        <a className='flex justify-center'>
          <img
            src={product.image}
            alt={product.name}
            className="py-4 border-b "
          />
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg text-blue-900 font-bold">{product.name}</h2>
          </a>
        </Link>
        <div className="badge badge-lg badge-outline m-1"> Company : {product.company} </div>

        <p className='text-lg font-bold pb-4' >Rs. {product.price}</p>
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
