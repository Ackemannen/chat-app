import React, { useState } from 'react'
import { Link } from 'react-router';
import useLogin from '../hooks/useLogin';

const Login = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Login form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <img src="/logo_icon_c.png" alt="logo" className='size-9' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              VoxityChat
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className='w-full'>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className='text-xl font-semibold'>Welcome Back</h2>
                  <p className='text-sm opacity-70'>Login to your account to connect with others</p>
                </div>

                <div className='flex flex-col gap-3'>
                  {/* Email */}
                  <div className='form-control w-full flex flex-col gap-2'>
                    <label className='ml-2 mt-1'>
                      <span className='text-sm'>Email</span>
                    </label>

                    <input type="email" placeholder='example@mail.com' className='input input-bordered w-full' required
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} value={loginData.email} />
                  </div>

                  {/* Password */}
                  <div className='form-control w-full flex flex-col gap-2'>
                    <label className='ml-2 mt-1'>
                      <span className='text-sm'>Password</span>
                    </label>

                    <input type="password" placeholder='******' className='input input-bordered w-full' required
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} value={loginData.password} />
                  </div>

                  <button className='btn btn-primary w-full' type='submit'>
                    {isPending ? (
                      <>
                        <span className='loading loading-spinner loading-xs'></span>
                        Loading...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className='text-sm'>
                      Don't have an account?{" "}
                      <Link to="/signup" className='text-primary hover:underline'>Sign up</Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Image - right side */}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
          <div className="max-w-md p-8">
            {/* Illustartion */}
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src="/i.png" alt="Chat illustration" className='w-full h-full' />
            </div>

            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold'>Connect with friends worldwide</h2>
              <p className='opacity-70'>Join many others to chat with</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login