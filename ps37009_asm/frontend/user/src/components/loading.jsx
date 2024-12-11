import React from 'react';
import { Spin } from 'antd';
function LoaDing({ loader }) {
    return (
        <>
            {loader &&
                <div className='fixed inset-0 bg-gray-400/50 grid place-items-center'>
                    <Spin />
                </div>
            }
        </>
    )
}

export default LoaDing;