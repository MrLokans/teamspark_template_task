$(document).ready(function(){

    var btn1 = $('#followed_1');
    var btn2 = $('#followed_2');

    if(isFollowing(1)){
        btn1.text("Unfollow");
    } else{
        btn1.text("Follow");
    }

    if(isFollowing(2)){
        btn2.text("Unfollow");
    } else{
        btn2.text("Follow");
    }

    btn1.on("click", function(){
        changeFollowStatus(1);
    });

    btn2.on("click", function(){
        changeFollowStatus(2);
    });


    var buyTicket = $('#buy-ticket-button');
    buyTicket.on("click", function(){
        $('#buy-ticket-button').replaceWith($('<input id="ticket-nuber-input" placeholder="Enter ticket num"></input>'));
    });

    tickNumInput = $('#ticket-nuber-input');
    tickNumInput.on("keydown", function(e) {
            if(e.which == 13) {

                $('#ticket-nuber-input').replaceWith($("<h4>You bought" + 12 + "</h4>"));    
            } else{
                console.log(e.which);
            }
    });

    var newPostField = $('#search-church');
    var newPostBtn = $('#new-post');
    newPostBtn.on("click", function(){
        var postText = newPostField.val();
        if (postText.length === 0){
            console.log('Empty posts are not allowed');
            return;
        }
        console.log("Sending new post");
        newPost(postText);
    });


});

function newPost(postText){
    $.ajax({
      type: "POST",
      url: '/post/new',
      data: {title: postText},
      success: function(){
        console.log("new post created");
      },
      error: function(err){
          console.log("error occured " + err);
      },
      dataType: "json"
    });
}

function isFollowing(follower_id){
    var followerStatusId = "followed_" + follower_id;
    var lsoFollowingStatus = localStorage.getItem(followerStatusId);
    if (!lsoFollowingStatus || (lsoFollowingStatus == "not-following")){
        return false;
    } 
    else{
        return true;
    }
}

function changeFollowStatus(buttonNum){
    var btn_id = "followed_" + buttonNum;
    console.log(isFollowing(buttonNum));
    if (isFollowing(buttonNum)){
        $('#'+btn_id).text("Follow");
        localStorage.setItem(btn_id, "not-following");
    } else{
        $('#'+btn_id).text("Unfollow");
        localStorage.setItem(btn_id, "following");
    }
}

