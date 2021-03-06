$(document).ready(function(){
    var submit_btn = $('.login-btn');
    var user_field = $('.username-field');
    var mail_field = $('.email-field');
    var pass_field = $('.password-field');

    submit_btn.on('click', function(){
        console.log('Attempting to login');
        //console.log("username: " + user_field.val());
        console.log("mail: " + mail_field.val());
        console.log("pass: " + pass_field.val());
        $.ajax({
            type: 'POST',
            url: '/users/session',
            data: {email: mail_field.val(), password: pass_field.val()},
            dataType: "json",
            success: function(data, textStatus){
                console.log("Logged in");
            },
            error: function(err){
                console.log("login didn't succeed " + err.text);
            }
        });
    });
});