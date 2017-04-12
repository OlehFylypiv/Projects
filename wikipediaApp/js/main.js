$(document).ready(function() {

	$("#search").click(function() {
		let searchTerm = $("#searchTerm").val();
		let url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
		
		$.ajax({
			type : "GET",
			url : url,
			async : false,
			dataType : "json",
			success : function(data) {
				$("#output").html("");
				for (let i = 0; i < data[1].length; i++) {
					$("#output").prepend("<li><a href = " + data[3][i] + " target = 'blank' >" + data[1][i] + "</a><p>" + data[2][i] + "</p></li>");		
				}
				$("#searchTerm").val(" ");
			},
			error : function(errorMessage) {
				alert("Error");
			}
		});
	});
	
	$("#searchTerm").keypress(function(e) {
		if (e.which == 13) {
			$("#search").click();
		}
	});
});