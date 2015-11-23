$(document).ready(function(){
    var submit_btn = $('#signup-btn');
    var user_field = $('.username-field');
    var mail_field = $('.email-field');
    var pass_field = $('.password-field');

    submit_btn.on('click', function(){
        console.log('Attempting to login');
        console.log("username: " + user_field.val());
        console.log("email: " + mail_field.val());
        console.log("pass: " + pass_field.val());
        $.ajax({
            type: 'POST',
            url: '/users',
            data: {username: user_field.val(), email: mail_field.val(), password: pass_field.val()},
            dataType: "json",
            success: function(data, textStatus){
                console.log("Logged in");
            },
            error: function(err){
                console.log("Signup didn't succeed " + err);
                console.log("Signup didn't succeed " + err.text);
                // console.log("Signup didn't succeed " + err.);

            }
        });
    });
});