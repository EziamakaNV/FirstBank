var $result1 = $('#result1'); //Number Format Paragraph
var $result2 = $('#result2'); //Password Paragraph Format
var $submit = $('#submit');
var submitValue; 
//regular expression  for nigerian phone number
function validateNumber (number){
let re = /^[0]\d{10}$/;
	return re.test(number);
}
// function to validate the phone number and display corresponding text
function validate(){
	let number = $('#validate').val();

	if (validateNumber(number)){
		
		$result1.text("Number Format Is Correct!");
	}
	else{
		
		$result1.text("Number Format Is Incorrect!");
	}
	return false;
}
//On each keypress, validate phone number
$('#validate').keyup(validate);
//On keyup, check if passwords match and display corresponding text
$('#ps2').keyup(function(){
	if (($('#ps2').val()===$('#ps1').val()) && submitValue === true){
		$result2.text('Password Match!');
		$submit.css('display','block');
	}
	else {
		$result2.text('Password Does Not Match');
	}
});


$('#validate').blur(function(){
	$.ajax({
		url: "http://10.10.141.243:9000/QTest/GetGeekId/" + $('#validate').val(),
		method: "GET",
		dataType: "json",
		success: function(data){
			if (data.result==="empty"){
				submitValue = false;
				$result1.text("Geek Not Found!");
			}
			else{
				submitValue = true;
				$result1.text("Geek Found!");
			}
			console.log(data);
		},
		error: function(data){
			console.log(data);
		}
	});
}
);
$submit.on('click',function(){
	$.ajax({
    	url : "http://10.10.141.243:9000/GeekReg/"+$("#validate").val()+"/crit/"+$('#ps2').val(),
		method: 'POST',
		// data: $('#validate').val()+"/crit/"+$('#ps2').val() ,
		dataType: 'json',
		success: function(data){
			console.log(data);
		},
		error: function(data){
			console.log('Did Not Succeed');
		}
	});
})
