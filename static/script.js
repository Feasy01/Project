

$(document).ready(function(){
$(".small-container img").on('click', function(){
let $id = $(this).parent().attr('id');
console.log($id);
switch($id)
{
case 'ticket':
    $ ('#first').slideToggle();
    $('#first').css('display','grid');
    console.log($id);
    $.ajax({
    type:'POST',
    url:'/getQr',
    success:function(data)
    {
    if(data.hasTicket == 1){
    window.userId = data.userId;
    $('#qrCode').html('<img src="https://api.qrserver.com/v1/create-qr-code/?data='+data.userId+'&amp;size=600x600">')
    }
    else{
    $('#buyTicket').css('display','block');

    }
    }
    });
    break;
case 'live':
    $('#second').slideToggle();
    $('#second').css('display','relative');
    break;
case 'settings':
    $('#third').slideToggle();
    $('#third').css('display','grid');
    break;
case 'timetable':
    $('#fourth').slideToggle();
    $('#fourth').css('display','grid');
default:
    break;
}
});

$(".back").on('click', function(){
let $id=$(this).parent().attr('id');
console.log($id);
$('#'+$id).slideToggle();

});

$('#buyTicket').on('click', function(){
console.log(window.userId);
$.ajax({
    url:'/buyTicket',
    type:'POST',
    success:function(data){
    $('#qrCode').html('<img src="https://api.qrserver.com/v1/create-qr-code/?data='+data.userId+'&amp;size=600x600">')
    $('#buyTicket').css('display','none');
    }
    })
});

$('.stop').on('click', function(){
    $('.timetable').slideToggle();
    $('.timetable').css('display','grid');
    var name = event.target.id;
    console.log(name);
    switch(name){
        case 'Stop1':
            $('#myImage').attr('src','/static/timetable0.png');
            break;
        case 'Stop2':
            $('#myImage').attr('src','/static/timetable1.png');
            break;
        case 'Stop3':
            $('#myImage').attr('src','/static/timetable3.png');
            break;
        case 'Stop4':
            $('#myImage').attr('src','/static/timetable4.png');
            break;
        case 'Stop5':
            $('#myImage').attr('src','/static/timetable5.png');
            break;
        case 'Stop6':
            $('#myImage').attr('src','/static/timetable6.png');
            break;



    }
    });




});



function initMap(){
var options = {
zoom:15,
center:{lat:52.767263627161616, lng:-1.2319909146730976}


}
var map = new google.maps.Map(document.getElementById('map'), options);
var marker = new google.maps.Marker({
position: window.options.center,
map:map,
icon:'/static/smallBus.png'
})
 const PlanCoordinates =[{lat:52.759691 , lng:-1.244781},
{lat:52.7602428 , lng:-1.2443948},
{lat:52.7607428 , lng:-1.2443733},
{lat:52.7610025 , lng:-1.2440085},
{lat:52.761392 , lng:-1.2423027},
{lat: 52.7618854, lng:-1.2411976},
{lat: 52.7624113, lng:-1.2400603},
{lat:52.7630475 , lng:-1.2386227},
{lat:52.7624892 , lng:-1.2378073},
{lat:52.7628917 , lng:-1.2364125},
{lat: 52.7634825, lng:-1.235286},
{lat: 52.7642031, lng:-1.2339771},
{lat: 52.7648718, lng:-1.2325716},
{lat:52.7654301 , lng:-1.231209},
{lat: 52.7660273, lng:-1.230104},
{lat:52.7667544 , lng:-1.228677},
{lat:52.7659235 , lng:-1.2269068},
{lat: 52.7657287, lng:-1.2264132},
{lat:52.7661052 , lng:-1.2255764},
{lat:52.7674101, lng:-1.2250292},
{lat:52.768559 , lng:-1.2271535},
{lat: 52.7675334, lng:-1.2286878},
{lat:52.7671504 , lng:-1.2289882},
{lat:52.7667544 , lng:-1.2286878}];
 const flightPath = new google.maps.Polyline({
    path: PlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,});
flightPath.setMap(map);
}









