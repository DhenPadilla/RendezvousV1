import React , { useState } from 'react';
import classnames from 'classnames';
import { useMutation, gql } from '@apollo/client'

const updateStatus = gql`
mutation {
    updateStatus(status: 1) {
      success,
      user {
        status
      },
      errors {
        path,
        message
      }
    }
}`

function Toggle () {
    const [status, setStatus] = useState(false)
    
    const toggleStatus = () => {
        setStatus(!status);
    }

    let toggleClassOuter = classnames(
        'block', 
        'w-10', 
        'h-6', 
        'rounded-full', 
        'shadow-inner',
        {
            'bg-gray-400' : !status,
            'bg-green-400' : status
        }
    )

    let toggleClassInner = classnames(
        'absolute',
        'block', 
        'w-4', 
        'h-4', 
        'mt-1',
        'ml-1', 
        'rounded-full',
        'shadow', 
        'inset-y-0', 
        'left-0', 
        'focus-within:shadow-outline', 
        'transition-transform duration-300',
        'ease-in-out', 
        'bg-white',
        { 
            'transform' : status,
            'translate-x-full' : status
        }
    )

    return (
        <div className="md:flex md:items-left mb-6">
            <div>
            {/* <div className="w-full border-black block md:hidden flex-grow lg:flex lg:items-center lg:w-auto"> */}
                <div className="text-md lg:flex-grow">
                    {/* <button onClick={on} className="bg-transparent float-right block mt-4 lg:inline-block lg:mt-0 text-black hover:bg-black hover:border-transparent hover:text-white border-solid border border-black rounded py-3 px-6 mt-4 mr-4 lg:inline-block lg:mt-0 text-black hover:text-teal mr-4 font-sofia font-normal tracking-wider">
                        on
                    </button> */}
                    <label for="checked" class="mt-3 inline-flex items-center cursor-pointer">
                        <span className="relative">
                            <span className={toggleClassOuter}></span>
                            <span className={toggleClassInner}>
                                <input id="checked" 
                                       type="checkbox" 
                                       className="absolute opacity-0 w-0 h-0"
                                       onClick={toggleStatus} />
                            </span>
                        </span>
                        <span className="ml-3 text-sm font-sofia">{ status ? 'online' : 'offline'}</span>
                    </label>
                </div>
            </div>
        </div>
    )
}


export default Toggle;