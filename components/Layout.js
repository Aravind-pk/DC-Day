import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + ' | DC Day' : 'DC Day'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className='min-h-screen  flex flex-col justify-between'>

      <header>
        <nav className='flex h-12 items-center px-4 justify-between shadow-sm'>
            <Link href='/'>
                <a className='text-lg font-bold'> DC Day</a>
            </Link>
            <div>
                <Link href='/cart'><a className='p-2'>Cart</a></Link>
                <Link href='login'><a className='p-2'>Login</a></Link>
            </div>
        </nav>
      </header>
      <main className='container m-auto mt-4 px-4'>{children}</main>

      <footer className='flex h-10 justify-center items-center'>Copyright @ 2022 DC Day</footer>
    </div>
    </>
  );
};

export default Layout;
