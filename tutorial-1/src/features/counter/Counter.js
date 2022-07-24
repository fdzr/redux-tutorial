import {useSelector, useDispatch} from 'react-redux';
import { increment, 
         decrement,
         reset,
         incrementByAmount } from './counterSlice';
import { useState } from 'react';

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(0);
    const addValue = Number(incrementAmount) || 0;
    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    };


    return (
            <div className='flex flex-col justify-center items-center h-screen'>
                <p className='text-8xl'>{count}</p>
                <div className='my-3'>
                    
                    <button className='py-2 px-3 bg-gray-300 text-5xl' 
                            onClick={() => dispatch(increment())}>
                                +
                    </button>
                    <button className='py-2 px-4 bg-gray-300 text-5xl ml-2' 
                            onClick={() => dispatch(decrement())}>
                                -
                    </button>
                </div>
                <div className='flex flex-col items-center'>
                    <input
                        className='py-4 px-1 w-[200px] text-5xl text-center border border-slate-600'
                        type="text"
                        value={incrementAmount}
                        onChange={(e) => {setIncrementAmount(e.target.value)}}
                    />
                    <div className='flex flex-row my-3 justify-center'>
                        <button className='py-2 px-3 bg-gray-300 rounded-md text-3xl'
                                onClick={(e) => dispatch(incrementByAmount(addValue))}>
                            Add amount
                        </button>    
                        <button className='py-2 px-3 bg-gray-300 rounded-md text-3xl mx-3'
                                onClick={(e) => dispatch(resetAll())}>
                            Reset
                        </button>
                    </div>
                    
                </div>
            </div>
    );
};

export default Counter; 


