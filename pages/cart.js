import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import data from '../utils/data';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';


const CartPage = () => {
  const { state, dispatch } = useContext(Store);

  const cartItems = state.cart.cartItems;

  const router = useRouter()

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler =(item , q) =>{

    const quantity = Number(q)

    if (data.countInStock < quantity) {
        alert('Sorry. Product is out of stock');
        return;
      }

      dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  }
  return (
    <Layout title="Shopping cart">
      <h1 className="text-xl mb-4">Lending Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty <Link href="/">Go to shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <p className='font-light text-red-600 '>** The rental amount is 10 percentage of the actual component cost</p>
            <table className="table table-compact min-w-full">
              <thead>
                <tr>
                  <th className="p-2 text-center  md:p-5">Item</th>
                  <th className="p-2 text-right  md:p-5">Quantity</th>
                  <th className="p-2 text-right md:p-5">Price</th>
                  <th className="p-2 text-center md:p-5 ">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="">
                    <td>
                      <Link href={`/product${item.slug}`}>
                        <a className="flex items-center md:px-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <div className="px-2 md:px-4">{item.name}</div>
                        </a>
                      </Link>
                    </td>

                    <td className="p-5 text-right"><select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select></td>
                    <td className="p-5 text-right">{item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="red"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='rounded-lg  shadow-md p-8 '>
          <ul>
              <li>
                <div className="py-4 text-xl flex justify-between">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) 
                  <span className='font-bold'>

                   : Rs {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </span>
                </div>
              </li>
              <li>
                <div className="py-4 text-xl flex justify-between">
                  Rental amount <span className='text-red-600'>*</span> 
                  <span className='font-bold'>

                   : Rs {cartItems.reduce((a, c) => a + c.quantity * c.price, 0) *(10/100)}
                  </span>
                </div>
              </li>
              <li>
                <button
                onClick={() => router.push('login?redirect=/borrow')}
                className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>

          </div>
        </div>
      )}
    </Layout>
  );
};


export default dynamic (() => Promise.resolve  (CartPage) , {ssr:false} ) 