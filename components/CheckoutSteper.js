import React from 'react';

export default function CheckoutSteper({ activeStep = 0 }) {
  return (
    <div className="flex justify-center">
      <ul className="steps ">
        {[
          'Login',
          'Details',
          'Payment',
          'Place Order',
        ].map((step, index) => (
          <li
            key={step}
            className={`step  ${index <= activeStep ? 'step-primary' : ''}   `}
          >
            <div className= {`p-4   ${index == activeStep ? 'text-primary font-bold' : ''} `} >{step }</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
