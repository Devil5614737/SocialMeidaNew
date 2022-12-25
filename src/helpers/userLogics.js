const loggedUser=(currentUser,user)=>{
return currentUser._id==user._id
}

const isLiked=(post,user)=>{
    const id=user?._id
    return post.likes.findIndex(item=>item._id===id)

}

const isFriend=(user,currentUserId)=>{
    return user?.friends?.indexOf(currentUserId)
}


const isMyPost=(postId,user)=>{
    return user._id===postId
}

export {loggedUser,isLiked,isFriend,isMyPost}