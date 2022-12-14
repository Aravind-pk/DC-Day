import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';

const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();

  const { state , dispatch} = useContext(Store);
  const cart = state.cart;
  const [cartCount, setCartCount] = useState(0);
  

  useEffect(() => {
    setCartCount(cart.cartItems.reduce((a, item) => a + item.quantity, 0));
  }, [cart.cartItems]);


  const logoutHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/' });

  };


  return (
    <>
      <Head>
        <title>{title ? title + ' | DC Day' : 'DC Day'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="min-h-screen  flex flex-col justify-between">
        <header>
          <div className="p-4 p">
            <div className="navbar bg-base-200 rounded-lg">
              <div className="flex-1 px-2 lg:flex-none">
                <Link href="/">
                  <a className="text-lg font-bold"> DC Day</a>
                </Link>
              </div>
              <div className="flex justify-end flex-1 px-2">
                <div className="flex items-stretch">
                  <Link href="/cart">
                    <button type="button" className="btn btn-ghost rounded-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                      <span className="p-2">Cart</span>
                      {cartCount > 0 && (
                        <span className="indicator-item badge badge-primary">
                          {cartCount}
                        </span>
                      )}
                    </button>
                  </Link>

                  {status === 'loading' ? (
                    <div className="btn btn-ghost rounded-btn">Loading</div>
                  ) : session?.user ? (
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost rounded-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="p-2">{session.user.name}</span>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                      >
                                    <li>
                          <Link href='/profile'>
                          <a> profile</a>
                          </Link>
                        </li>
                        
                        <li>
                          <Link href='/activity-history'>
                          <a> Activity History</a>
                          </Link>
                        </li>

                        {session.user.isAdmin && (
                                  <li>
                                  <Link href='/admin/dashboard'>
                                  <a>Admin Dashboard</a>
                                  </Link>
                                </li>
                        )}



                        <li>
                          <a 
                          onClick={logoutHandler}
                          >Logout</a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link href="/login">
                      <a className="btn btn-ghost rounded-btn">Login</a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex h-10 justify-center items-center">
          Copyright @ 2022 DC Day
        </footer>
      </div>
    </>
  );
};

export default Layout;
