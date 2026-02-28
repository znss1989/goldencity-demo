import React from 'react'

const NotFound = () => {
    return (
        <div className='min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center transition-colors duration-300'>
            <div className="text-center">
                <h1 className='text-4xl md:text-5xl font-bold mb-6 text-secondary-900 dark:text-white'>
                  Page not found
                </h1>
	            <p className='text-xl text-secondary-600 dark:text-secondary-400'>
                Error 404: The page your're looking for does not exist!
              </p>
            </div>
        </div>
    )
}

export default NotFound;
