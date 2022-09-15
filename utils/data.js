import bcrypt from 'bcryptjs'
const data = {
  users:[
    {
      name:'aravind',
      email:'admin@gmail.com',
      password: bcrypt.hashSync('admina'),
      isAdmin:true

    },
    {
      name:'rahul',
      email:'rahul@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin:false

    }

  ],
  products: [
    {
      name: 'raspbery pi',
      slug: 'raspberry-pi',
      category: 'Development boards',
      image: '/images/pi.jpg',
      price: 8000,
      company: 'Texas instruments',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: ' jlfalfaiie ie m iagam agima',
    },

    {
      name: 'arudino uno',
      slug: 'arudino-uno',
      category: 'Development boards',
      image: '/images/img1.jpg',
      price: 8000,
      company: 'Texas instruments',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: ' jlfalfaiie ie m iagam agima',
    },

    {
      name: 'Usb jack',
      slug: 'usb-jack',
      category: 'Others',
      image: '/images/img1.jpg',
      price: 8000,
      company: 'Texas instruments',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: ' jlfalfaiie ie m iagam agima',
    },

    {
      name: 'FPGA',
      slug: 'FPGA',
      category: 'Others',
      image: '/images/img1.jpg',
      price: 8000,
      company: 'Texas instruments',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: ' jlfalfaiie ie m iagam agima',
    },
    {
        name: 'Motor driver',
        slug: 'wire',
        category: 'Others',
        image: '/images/img1.jpg',
        price: 8000,
        company: 'Texas instruments',
        rating: 4.5,
        numReviews: 8,
        countInStock: 20,
        description: ' jlfalfaiie ie m iagam agima',
      },
  ],
};


export default data;