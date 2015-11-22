$(document).ready(function(){

    btn1 = $('#followed_1');
    btn2 = $('#followed_2');

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


    buyTicket = $('#buy-ticket-button');
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

});

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

