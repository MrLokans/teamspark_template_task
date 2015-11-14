$(document).ready(function(){
    var submit_btn = $('.login-btn');
    var user_field = $('.email-field');
    var pass_field = $('.password-field');

    submit_btn.on('click', function(){
        console.log('Attempting to login');
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/login',
            data: {username: user_field.val(), password: pass_field.val()},
            dataType: "json",
            success: function(data, textStatus){
                console.log("Logged in");
            },
        });
    });
});