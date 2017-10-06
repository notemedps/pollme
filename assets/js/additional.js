$(function(){

	$('#sm').on('click',function(e){
		e.preventDefault();
		var many = $('#many').val();
		var msg;
		if(many<2){
			msg = "At least Two options are to be provided"
		}
		else if(many>100){
			msg = "You cannot have more than 100 options"
		}
		else{
			msg = '';

		}
		if(msg ==''){
			$('#opt').html("");
			for(i=0;i<many;i++){
				$('#opt').append(`
						<input type = 'text' name = 'ips[${i}]' class = 'form-control' placeholder = "Option ${i+1}">
					`);
			}
			$('#opt').append('<input type = "submit" name = "submit" id = "fsubmit" value = "Create Poll" class = "btn btn-danger" >  ')
		}
		else{
			alert(msg)
		}
	});




	$('#vote').on('click',function(e){
		e.preventDefault();
		let ans = $('input[name="ans"]:checked').val();

		if(ans === undefined){
			alert("Please choose an option to vote")
		} 
		else{
			$("form").submit();
		}
	})

});


