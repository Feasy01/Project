$(document).ready(function(){

$('.signup').on('submit', function(event){

$.ajax({
type:'POST',
url: '/signup',
data:{
name : $("#name").val(),
surrname: $("#surrname").val(),
password: $("#password").val(),
idNumber: $("#idNumber").val()
}
})
.done(function(data){
    if( data.message == 'Success'){
    $('#checker').css('color' , 'green');
    $('#checker').text(data.message);
    }
    else{
    $('#checker').css('color' , 'red');
    $('#checker').text(data.message);
    }

})
event.preventDefault();
});

$('.login').on('submit', function(event){

$.ajax({
type:'POST',
url: '/login',
success:function(){},
data:{
password: $("#pass").val(),
idnum: $("#idnum").val()
},
success:function(response){document.write(response);
window.location.href = "main";

}
})
event.preventDefault();
})
});





