import { useState } from 'react'
import { Link } from 'react-router';
import useSignup from '../hooks/useSignup';

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Signup Form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className='m-4 flex items-center justify-start gap-2'>
            <img src="/logo_icon_c.png" alt="logo" className='size-9' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              VoxityChat
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className='text-xl font-semibold'>Create an Accont</h2>
                  <p className='text-sm opacity-70'>Join Voxitychat and connect with you friends</p>
                </div>
                {/* Username */}
                <div className="space-y-3">
                  <div className='form-control w-full flex flex-col gap-2'>
                    <label className='ml-2 mt-1'>
                      <span className='text-sm'>Username</span>
                    </label>

                    <input type="text" placeholder='John Doe' className='input input-bordered w-full' required
                      onChange={(e) => setSignupData({ ...signupData, username: e.target.value })} value={signupData.username} />
                  </div>
                  {/* Email */}
                  <div className='form-control w-full flex flex-col gap-2'>
                    <label className='ml-2 mt-1'>
                      <span className='text-sm'>Email</span>
                    </label>

                    <input type="email" placeholder='john@gmail.com' className='input input-bordered w-full' required
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} value={signupData.email} />
                  </div>
                  {/* Password */}
                  <div className='form-control w-full flex flex-col gap-2'>
                    <label className='ml-2 mt-1'>
                      <span className='text-sm'>Password</span>
                    </label>

                    <input type="password" className='input input-bordered w-full' placeholder='******' required
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} value={signupData.password} />
                    <p className='text-xs opacity-70 mt-1'>Password must be at least 6 characters long</p>
                  </div>
                  {/* Terms and services box */}
                  <div className="form-control">
                    <label className='label cursor-pointer justify-start gap-2'>
                      <input type="checkbox" className='checkbox checkbox-sm' required />
                      <span className='text-xs leading-tight'>
                        I agree to the{" "}
                        <span className='text-primary hover:underline'>terms of servide</span> and{" "}
                        <span className='text-primary hover:underline'>privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className='btn btn-primary w-full' type='submit'>
                  {isPending ? (
                    <>
                      <span className='loading loading-spinner loading-xs'></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className='text-sm'>
                    Already have an account?{" "}
                    <Link to="/login" className='text-primary hover:underline'>
                      Login
                    </Link>
                  </p>
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

export default SignUp