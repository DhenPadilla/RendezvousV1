import React, { Component } from 'react'

class Home extends Component {
    render() {
        return (
            <div className="block h-full w-screen pl-48 pt-40 items-center justify-between">
                <h1>
                    <span className="font-sofia font-bold text-6xl">
                        MEET
                        &#x26;
                        DISCOVER
                    </span>
                </h1>
                <h4 className="font-sofia font-light text-xl w-1/3">
                    Rendezvous provides an efficient method to meet up with 
                    friends, removing the unnecessary clutter when organising meetups.
                </h4>
                <button href="/" className="bg-black block lg:inline-block lg:mt-12 text-white hover:bg-transparent hover:border-transparent hover:text-black border-solid border border-black rounded py-3 px-6 mt-4 lg:inline-block lg:mt-0 text-black hover:text-teal mr-4 font-sofia font-normal tracking-wider">
                    sign up
                </button>
            </div>
        )
    }
}

export default Home