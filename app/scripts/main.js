console.log('\'Allo \'Allo!');

$(document).ready(function() {
 
       $.ajax({
		  url: "http://hackathon-fe-lb-1213387662.eu-west-1.elb.amazonaws.com:8080/keywords",
		  type: "GET",
		  dataType: "json",
		  crossDomain: true,
		  success: function(data) {
			  PopulateKeywords(data);
		    },
		  error: function(data, error){
		  	console.log(error);
			console.log(data);
			}
		});

    	$(".suggestion").bind('contextmenu', function(e){
		    e.preventDefault();
		    //code
		    return false;
		});
    	
    	//$.ajax({
		////  url: url,
		//  data: data,
		//  success: PopulateTweets,
		//  dataType: dataType
		//});

		$.ajax({
		  url: "http://hackathon-fe-lb-1213387662.eu-west-1.elb.amazonaws.com:8080/tweets",
		  type: "GET",
		  dataType: "json",
		  crossDomain: true,
		  success: function(data) {
			  PopulateTweets(data);
		    },
		  error: function(data, error){
		  	console.log(error);
			console.log(data);
			}
		});

		
		//var jqxhr = $.get( "http://hackathon-fe-lb-1213387662.eu-west-1.elb.amazonaws.com:8080/tweets", function(data) {
		//	  PopulateTweets(data);
		//	});

		HighlightKeywords();

		 
    });

function ApproveKeyword(keyword){
	console.log("ApproveKeyword:"+keyword);
	keyword = encodeURIComponent(keyword);
	console.log("ApproveKeyword:"+keyword);
	$.ajax({
		  url: "http://hackathon-fe-lb-1213387662.eu-west-1.elb.amazonaws.com:8080/keywords/"+keyword+"/approve",
		  type: "GET",
		  dataType: "json",
		  crossDomain: true,
		  success: function(data) {
			  console.log("keywork approved");
		    },
		  error: function(data, error){
		  	console.log(error);
			console.log(data);
			}
		});
}

function RejectKeyword(keyword){
	console.log("RejectKeyword:"+keyword);
	keyword = encodeURIComponent(keyword);
	console.log("RejectKeyword:"+keyword);
	$.ajax({
		  url: "http://hackathon-fe-lb-1213387662.eu-west-1.elb.amazonaws.com:8080/keywords/"+keyword+"/reject",
		  type: "GET",
		  dataType: "json",
		  crossDomain: true,
		  success: function(data) {
			  console.log("keywork Rejected");
		    },
		  error: function(data, error){
		  	console.log(error);
			console.log(data);
			}
		});
}


function PopulateTweets(tweets) {
	console.log('populatetweets called');
	$(".centrecolumn").innerHTML = "";
	$.each( tweets, function( index, value ){
		var tweetdiv = "<div class='tweet-item'>"+value+"</div>";
		if(index < 5){
    		$(".centrecolumn").append(tweetdiv);
    	}
	});
}

function PopulateKeywords(keywords) {
	$("#keywords").innerHTML = "";
	$.each( keywords, function( index, value ){
		if (value.status === "approved"){
			var tweetdiv = "<div class='suggestion approved'>"+value.keyword+"</div>";
    		$(".leftscreencolumn").append(tweetdiv);
    	} else if (value.status === "rejected"){
			var tweetdiv = "<div class='suggestion rejected'>"+value.keyword+"</div>";
    		$(".rightscreencolumn").append(tweetdiv);
    	} else {
			var tweetdiv = "<div class='suggestion proposed'>"+value.keyword+"</div>";
    		$("#keywords").append(tweetdiv);
    	}

	});
	HighlightKeywords();
	$(".suggestion").mousedown(function(event) {
        	switch (event.which) {
		        case 1:
		        	$(this).addClass("approved");
		        	$(this).removeClass("rejected");
		        	$(this).removeClass("proposed");
		            $(".leftscreencolumn").append($(this));
		            ApproveKeyword($(this).text());
		            break;
		        case 2:
		            alert('This was suggested because of the following.');
		            break;
		        case 3:
		            $(".rightscreencolumn").append($(this));
		            $(this).addClass("rejected");
		        	$(this).removeClass("approved");
		        	$(this).removeClass("proposed");
		            RejectKeyword($(this).text());
		            break;
		        default:
		            alert('You have a strange Mouse!');
   			}
    	});
}

function HighlightKeywords() {
	$(".suggestion").each(function(){ 
		var keyword = $(this).text();
		console.log("Keyword:"+keyword);
		if($(this).hasClass("proposed")){
			$(".tweet-item").each(function(){
				console.log("Keyword:"+keyword);
				var regex = new RegExp("\\b"+keyword+"\\b", "gi");
				this.innerHTML = this.innerHTML.replace(regex, function(matched) {return "<span class='suggestion proposed'>" + matched + "</span>";});
			});
		}
	});

	
};



