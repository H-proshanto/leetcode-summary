import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import './App.css';
import { useFetchSummary } from './api/hooks';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [summary,setSummary] = useState(null);
  const {mutateAsync} = useFetchSummary();

  const onSubmit = async (data: FieldValues) => {
    await mutateAsync(data, {
      onSuccess: (response) => setSummary(response),
      onError: () => console.log('error')
    })
  };

  return (
    <>
    <h2>Please Enter your leetcode username to get summary</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form-container'>
        <div className='form-section'>
          <label htmlFor="username" className='form-title'>Username :</label>
          <input type="text" id="username" {...register("username", { required: true })} className='form-input' />
          <br />
          {errors?.username && <span>This field is required</span>}
        </div>
          <button type="submit" className='submit-btn'>Submit</button>
      </div>
    </form>
    </>
  );
}

export default App
