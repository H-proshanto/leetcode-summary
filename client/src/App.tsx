import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import './App.css';
import { useFetchSummary } from './api/hooks';

type AcceptedSubmissions = {
  difficulty: string;
  count: number;
}

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // later change any type
  const [summary,setSummary] = useState<any | null>(null);
  const {mutateAsync, isLoading} = useFetchSummary();

  const onSubmit = async (data: FieldValues) => {
    await mutateAsync(data, {
      onSuccess: ({data: payload}) => setSummary(payload),
      onError: () => toast.error("Data was not found!",{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2200,
        theme: 'dark'
      })
    })
  };

  return (
    <>
    {isLoading && (
        <div className="loader-overlay">
        <div className="loader">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
      )}
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
    {
      summary && 
      (
      <div className='summary-container'>
        {summary?.submitStatsGlobal?.acSubmissionNum.map((item: AcceptedSubmissions,index: number) => {
          if (index === 0) {
            return <p key={index} className='accepted-item'>{`Total Problems Solved : ${item.count}`}</p>
          }
          return <p key={index} className='accepted-item'>{`${item.difficulty} Problems : ${item.count}`}</p>
        })}
      </div>
      )
    }
    </>
  );
}

export default App
