import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getOutgoingFriendReqs, getSearchUsers, getUserFriends, sendFriendRequest } from "../lib/api";
import { CheckCircleIcon, MapPinIcon, UserIcon, UserPlusIcon } from "lucide-react";
import { Link } from "react-router";
import NoFriendsFound from "../components/NoFriendsFound";
import FriendCard from "../components/FriendCard";
import { useEffect, useState } from "react";



const Friends = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
    
    const queryClient = useQueryClient();

    const { data: friends = [], isLoading: loadingFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    });

    const { data: outgoingFriendReqs } = useQuery({
        queryKey: ["outgoingFriendReqs"],
        queryFn: getOutgoingFriendReqs,
    });
    
    const { data: searchUsers = [], isLoading: loadingSearchUsers } = useQuery({
        queryKey: ["searchUsers", searchTerm],
        queryFn: () => getSearchUsers(searchTerm),
        enabled: !!searchTerm,
    })

    const { mutate: sendRequestMutation, isPending } = useMutation({
        mutationFn: sendFriendRequest,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
    });

    useEffect(() => {
        const outgoingIds = new Set();
        if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
          outgoingFriendReqs.forEach((req) => {
            outgoingIds.add(req.recipient._id);
          });
          setOutgoingRequestsIds(outgoingIds);
        }
      }, [outgoingFriendReqs]);

    

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Your Friends</h2>
          <Link
            to="/notifications"
            className="btn btn-outline btn-sm hover:!bg-primary hover:!btn-primary"
          >
            <UserIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg' />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Add a Friend</h2>
        <div className="flex items-center justify-center gap-2">
            <input 
                type="text" 
                placeholder="Search for users" 
                className="input input-bordered w-full max-w-sm" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
        </div>
        {loadingSearchUsers ? (
            <div className="card bg-base-200 p-6 flex justify-center items-center gap-4 py-12">
                <span className="loading loading-spinner loading-lg"></span>
                <p className="text-lg">Searching for users...</p>
            </div>
        ) : searchUsers.length > 0  ? (
            <div className='card bg-base-200 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {searchUsers.map((user) => {
                    const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                    return (
                    <div
                        key={user._id}
                        className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="card-body p-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="avatar size-16 rounded-full">
                            <img src={user.profilePic} alt={user.fullName} />
                            </div>

                            {/* User info */}
                            <div>
                            <h3 className="font-semibold text-lg">{user.username}</h3>
                            {user.location && (
                                <div className="flex items-center text-xs opacity-70 mt-1">
                                <MapPinIcon className="size-3 mr-1" />
                                {user.location}
                                </div>
                            )}
                            </div>
                        </div>

                        {/* User bio */}
                        {user.bio && <p className='text-sm opacity-70'>{user.bio}</p>}

                        {/* Friend request button */}
                        <button
                            className={`btn w-full mt-2 ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"}`}
                            onClick={() => sendRequestMutation(user._id)}
                            disabled={hasRequestBeenSent || isPending}
                        >
                            {hasRequestBeenSent ? (
                            <>
                                <CheckCircleIcon className='size-4 mr-2' />
                                Request Sent
                            </>
                            ) : (
                            <>
                                <UserPlusIcon className='size-4 mr-2' />
                                Send Friend Request
                            </>
                            )}
                        </button>
                        </div>
                    </div>
                    )
                })}
            </div>
        ) : (
            <div className="card bg-base-200 p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">No users found</h3>
            </div>
        )}
      </div>
    </div>
  )
}

export default Friends