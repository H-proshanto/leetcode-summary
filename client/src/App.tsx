import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import './App.css';
import { useFetchStats, useFetchSummary } from './api/hooks';

type Stats = {
  difficulty: string;
  count: number;
}

type AcceptedSubmissions = {
  timestamp: string;
  item: ProblemItem[];
}

type ProblemItem = {
  id: string;
  title: string;
  titleSlug: string;
  timestamp: string | number;
}

function App() {
  const { getValues,register, handleSubmit, formState: { errors } } = useForm();
  // later change any type
  const [summaries,setSummaries] = useState<AcceptedSubmissions[] | null>(null);
  const [stats,setStats] = useState<Stats[] | null>(null);
  const {mutateAsync, isLoading} = useFetchStats();
  const {mutateAsync: mutateAsyncSummary, isLoading: isSummaryLoading} = useFetchSummary();

  const onSubmit = async (data: FieldValues) => {
    await mutateAsyncSummary(data, {
      onSuccess: ({data: payload}) => setSummaries(payload),
      onError: () => toast.error("Data was not found!",{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2200,
        theme: 'dark'
      })
    })
    await mutateAsync(data, {
      onSuccess: ({data: payload}) => setStats(payload),
      onError: () => toast.error("Data was not found!",{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2200,
        theme: 'dark'
      })
    })
  };

  return (
    <>
    {(isLoading || isSummaryLoading) && (
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
    {/* {
      stats && 
      (
      <div className='stats-container'>
        {stats?.submitStatsGlobal?.acSubmissionNum.map((item,index: number) => {
          if (index === 0) {
            return <p key={index} className='accepted-item'>{`Total Problems Solved : ${item.count}`}</p>
          }
          return <p key={index} className='accepted-item'>{`${item.difficulty} Problems : ${item.count}`}</p>
        })}
      </div>
      )
    } */}

    {summaries && 
    ( 
      <div className='summary-container'>
        <h2 className='summary-title'>{`Summary of ${getValues('username')} of past 7 days`}</h2>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Date</th>
            <th>Problem Titles</th>
            <th>Solve Count</th>
          </tr>
        </thead>
        <tbody>
          {
            summaries.map((summaryItem, index) => {
              const dateTime = new Date(summaryItem?.timestamp);
              const problemCount = summaryItem?.item?.length;
              return (
                <tr key={`index-${index}`} className='table-item'>
                  <td>{dateTime.toDateString()}</td>
                  <td >
                    {summaryItem.item.map((singleItem) => (
                    <div key={singleItem.id}>
                      <p>{singleItem.title}</p>
                    </div>
                    ))}
                  </td>
                  <td>{problemCount}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      </div>
    )}
    </>
  );
}

export default App
