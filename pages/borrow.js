import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import CheckoutSteper from '../components/CheckoutSteper';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

const BorrowPage = () => {

    const router = useRouter()
    const { state , dispatch} = useContext(Store);
    const {cart} = state;
    const {projectDetails} = cart

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    setValue('projectName', projectDetails.projectName);
    setValue('projectType', projectDetails.projectType ? projectDetails.projectType : 'projecttype' );
    setValue('guide', projectDetails.guide);
  }, [setValue, projectDetails]);
  

  const submitHandler = ({ projectName ,projectType , guide }) => {
    dispatch({
      type: 'SAVE_PROJECT_DETAILS',
      payload: { projectName ,projectType , guide},
    });
    

    Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          projectDetails: {
            projectName,
            projectDetails,
            guide
          },
        })
    );

    router.push('/payment');
  };

  return (
    <Layout title="Borrow">
      <CheckoutSteper activeStep={1} />

      <form className=" min-w-lg max-w-lg mx-auto p-4"
              onSubmit={handleSubmit(submitHandler)}

      >
        <div className="flex justify-center flex-col">
          <div className="mb-4">
            <input
              placeholder="Project Name"
              className="input input-bordered w-full "
              id="projectName"
              autoFocus
              {...register('projectName', {
                required: 'Please enter project name',
              })}
            />
            {errors.projectName && (
              <div className="text-red-500">{errors.projectName.message}</div>
            )}
          </div>
          <div className="mb-4">
            <select className="select select-bordered w-full "
            {...register('projectType', {
                required: 'Please select a project type',
              })}
              autoFocus
            >
              <option  value='projecttype' disabled selected>
                Project Type
              </option>
              <option value="academic">Academic</option>
              <option value="hobby">Hobby</option>
              <option value="sae">SAE</option>
              <option value="iee">IEE</option>
            </select>
            {errors.projectType && (
              <div className="text-red-500 ">{errors.projectType.message}</div>
            )}
          </div>
          <div className="mb-4">
            <input
              placeholder="Guide Faclty (Optional)"
              className="input input-bordered w-full "
              id="guide"
              {...register('guide')}
            />
            {errors.guide && (
              <div className="text-red-500 ">{errors.guide.message}</div>
            )}
          </div>
          
          <div className="mb-4 flex justify-end">
            <button className="primary-button">Next
            
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default BorrowPage;

BorrowPage.auth = true;