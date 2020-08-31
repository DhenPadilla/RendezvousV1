import React , { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import classnames from 'classnames';
import { useMutation, gql } from '@apollo/client'

const updateStatusMutation = gql`
mutation($status:Int!) {
    updateStatus(status: $status) {
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
    const [updateStatus, { data }] = useMutation(updateStatusMutation);
    const user = useContext(UserContext);
    const [status, setStatus] = useState(user['status']);
    console.log(status);

    const toggleStatus = async (e) => {
        updateStatus({ variables: {
            //turns 'true'/'false' to: 0 / 1
            status: +(!status)
          }
        })
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
        <div className="md:flex md:items-left ml-6">
            <div className="text-md lg:flex-grow">
                <label htmlFor="checked" className="mt-3 inline-flex items-center cursor-pointer">
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
    )
}


export default Toggle;