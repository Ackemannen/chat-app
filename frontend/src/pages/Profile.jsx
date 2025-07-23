import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeProfile } from "../lib/api";
import { CameraIcon, LoaderIcon, MapPinIcon, ShuffleIcon } from "lucide-react";


const Profile = () => {

  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    username: authUser?.username || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: profileMutation, isPending } = useMutation({
    mutationFn: completeProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    profileMutation(formState);
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture selected");
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 ">Update Your Profile</h1>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile picture container */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img src={formState.profilePic} alt="Profile Picture" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent rounded-full">
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/* Username */}
            <div className='form-control w-full flex flex-col gap-2'>
              <label className='ml-2 mt-1'>
                <span className='text-sm'>Username</span>
              </label>

              <input type="text" name="username" className='input input-bordered w-full rounded-full' placeholder="Username"
                onChange={(e) => setFormState({ ...formState, username: e.target.value })} value={formState.username} />
            </div>

            {/* Bio */}
            <div className='form-control w-full flex flex-col gap-2'>
              <label className='ml-2 mt-1'>
                <span className='text-sm'>Bio</span>
              </label>

              <textarea type="text" name="bio" className='textarea textarea-bordered h-24 w-full rounded-2xl' placeholder="Profile bio..."
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })} value={formState.bio} />
            </div>

            {/* Location */}
            <div className='form-control w-full flex flex-col gap-2'>
              <label className='ml-2 mt-1'>
                <span className='text-sm'>Location</span>
              </label>

              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transorm -translate-y-1/2 left-3 size-5 text-base-content opacity-70 z-10" />
                <input type="text" name="location" className='input input-bordered w-full pl-10 rounded-full' placeholder="City, Country"
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })} value={formState.location} />
              </div>
            </div>

            {/* Submit button */}
            <button className="btn btn-primary w-full rounded-full" disabled={isPending} type="submit">
                {isPending ? (
                  <>
                    <LoaderIcon className="animate-spin size-5 mr-2" />
                    <span className="text-base">Loading...</span>
                  </>
                ) : (
                  <>
                    <img src="/logo_icon_w.png" alt="" className="size-10" />
                    <span className="text-base">Update Profile</span>
                  </>
                )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile