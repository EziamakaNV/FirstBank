const $result1 = $('#result1'); //Number Format Paragraph
const $result2 = $('#result2'); //Password Paragraph Format
const $submit = $('#submit');
let submitValue; 
//regular expression  for nigerian phone number
function validateNumber (number){
let re = /^[0]\d{10}$/;
	return re.test(number);
}
// function to validate the phone number and display corresponding text
function validate(){
	let number = $('#validate').val();

	if (validateNumber(number)){
		
		$result1.text(`Number Format Is Correct!`);
	}
	else{
		
		$result1.text(`Number Format Is Incorrect!`);
	}
	return false;
}
//On each keypress, validate phone number
$('#validate').keyup(validate);
//On keyup, check if passwords match and display corresponding text
$('#ps2').keyup(function(){
	if (($('#ps2').val()===$('#ps1').val()) && submitValue === true){
		$result2.text(`Password Match!`);
		$submit.css(`display`,`block`);
	}
	else {
		$result2.text(`Password Does Not Match`);
	}
});


$('#validate').blur(function(){
	$.ajax({
		url: `${testNumberAjax}${$('#validate').val()}`,
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
    	url : `${submitButtonAjax}${$("#validate").val()}/crit/${$('#ps2').val()}`,
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
//login script
function regPage(){
    window.location.assign('registration.html');
}
$('span.loginbttn1').click(function(){
	$.ajax({
    	url : `${loginApi}${$('#number').val()}/${$('#password').val()}`,
		method: 'GET',
		// data: $('#validate').val()+"/crit/"+$('#ps2').val() ,
		dataType: 'json',
		success: function(data){
			$('div.login_fields').remove();
			$('div.loginbttn').remove();
			$('div.login').append('<p id = \'logSuccess\'>Login Successful<p>');
			console.log(data);
		},
		error: function(data){
			console.log('Did Not Succeed');
			$('div.login_fields').remove();
			$('div.loginbttn').remove();
			$('div.login').append('<p id = \'logSuccess\'>Unsuccessful<p>');
			setTimeout(_ => location.reload(),4000);
			console.log(data);
		}
	});
});

//registration script
$('#registerCustomer').click(function(){
	$.ajax({
		url : `${enrolApi}${geekNumber}/enrl/${$('#customerNumber').val()}`,
		method: 'POST',
		dataType: 'json',
		success: function(data){
			if (data.result === 1){
				$('#regResult').html(`Success! ${$('#customerNumber').val()} successfully registered!`);
			}
			else if (data.result === -1) {
				$('#regResult').html(`Registration not successful. User(${$('#customerNumber').val()}) already exists!`);
			}
			console.log(data);
		},
		error: function(data){
			console.log('error');
		}
	});
});