import { Link } from "react-router"


const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
        <div className="card-body p-4">
            {/* User info */}
            <div className="flex items-center gap-3 mb-3">
                <div className="avatar size-12">
                    <img src={friend.profilePic} alt={friend.username} />
                </div>
                <h3 className="text-lg text-primary font-bold truncate">{friend.username}</h3>
            </div>

            {/* Message button */}
            <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full hover:!bg-primary hover:!btn-primary">
                Message
            </Link>
        </div>
    </div>
  )
}

export default FriendCard