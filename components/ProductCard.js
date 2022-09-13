/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="mb-5 block rounded-lg  shadow-md ">
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
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p>{product.company}</p>
        <p>${product.price}</p>
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
