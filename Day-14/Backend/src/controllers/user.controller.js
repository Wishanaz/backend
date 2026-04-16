//1. require followModel
const followModel = require("../models/follow.model")

//1.1 require userModel
const userModel = require("../models/user.models")

//2. controller for follow a user
async function followUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    // logic for not to follow yourself
    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message:"you cannot follow yourself."
        })
    }

    //logic for checking if a user is following the same user multiple times
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if(isAlreadyFollowing){
        return res.status(201).json({
           message: `Follow request sent to ${followeeUsername}`,
            follow: followRecord

        })
    }

    // logic for followee exists?
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })
    
    if(!isFolloweeExists){
        return res.status(404).json({
            message: "User you are trying to follow doesnot exists."
        })
    }

    // logic for making a followRecord in database
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message:`you have requested to follow ${followeeUsername}`,
        follow: followRecord
    })

}

//5. controller for seeing all pending follow req
async function getFollowRequestsController(req,res){
    const username = req.user.username;

    const requests = await followModel.find({
        followee: username,
        status: "pending"
    });

    return res.json({
        message: "Pending follow requests",
        requests
    });
}

//6. controller for accepting a pending follow req
async function acceptFollowRequestController(req,res){
        const requestId = req.params.id;

    // 1. find request
    const request = await followModel.findById(requestId);

    if (!request) {
        return res.status(404).json({
            message: "Follow request not found"
        });
    }

    // 2. authorization check (only followee can accept)
    if (request.followee !== req.user.username) {
        return res.status(403).json({
            message: "Not allowed to accept this request"
        });
    }

    // 3. check status
    if (request.status !== "pending") {
        return res.status(400).json({
            message: "Request already processed"
        });
    }

    // 4. update status
    request.status = "accepted";
    await request.save();

    return res.status(200).json({
        message: "Follow request accepted",
        request
    });
}

//7. controller for rejecting a pending req
async function rejectFollowRequestController(req, res){
    const request = await followModel.findById(req.params.id);

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    // update status + soft delete (if you still want it)
    request.status = "rejected";
    request.isDeleted = true;

    await request.save();

    return res.json({
        message: `You rejected follow request from ${request.follower}`,
        request
    });
}

//4. controller for unfollowing a user
async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    // agar nahi follow krta hoga above combination of users to ham res denge you are not following ka
    if(!isUserFollowing){
        return res.status(200).json({
            message: `you are not following ${followeeUsername}`
        })
    }

    // agar follow krta hua hoga to ham us record ko delete kr denge
    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })
    

}

//3. export it to routes
module.exports = {
    followUserController,
    unfollowUserController,
    getFollowRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController
}