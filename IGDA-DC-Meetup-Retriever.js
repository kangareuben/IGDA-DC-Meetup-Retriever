function fetchGroups(url, cb, data) {
	if(!data) {
		console.log("no data yet");
		data = [];
	}
	
	/*var request = new XMLHttpRequest();
	request.withCredentials = true;
	request.open('GET', url, true);
	request.setRequestHeader('Content-Type', 'text/plain');
	
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			// Success!
			console.log("request.responseText:");
			console.log(request.responseText);
			var result = JSON.parse(request.responseText);
			data = result.data.events;
			console.log("data:");
			console.log(data);
			cb(data);
		}
	};
	
	request.send();*/
	
	$.ajax({
		
		dataType:'jsonp',
		method:'get',
		url:url,
		success:function(result) {
			console.log('back with ' + result.data.length +' results');
			console.log(result);
			console.log(result.data)
			//add to data
			data = result.data.events;
			/*if(result.meta.next_link) {
				console.log("going to next page")
				var nextUrl = result.meta.next_link;
				fetchGroups(nextUrl, cb, data);
			} else {*/
				console.log("done finding data");
				console.log(data);
				cb(data);
			/*}*/
		}
	});	
	
}

$(document).ready(function() {
	
	var $results = $("#results");
	console.log("before finding")
	$results.html("<p>Finding IGDA DC meetups...</p>");

	
	fetchGroups("https://api.meetup.com/find/upcoming_events?photo-host=public&page=20&sig_id=230262726&lon=-77.02&lat=38.91&sig=48db3352b2f8ae77e5924cc3b9024d999537591b&callback=?", function(res) {
		console.log("totally done");
		console.log(res[1]);	

		var s = "";
		for(var i=0;i<res.length; i++) {
			var event = res[i];
			if(event.group.id == "18914658")
			{
				s += "<h2>" + (i + 1) + ". " + event.name + "</h2>";
				s += "<h3>" + event.local_date + ", " + event.local_time + "</h3>";
				s += "<h3>" + event.venue.name + ", " + event.venue.address_1 + ", " + event.venue.city + ", " + event.venue.state + ", " + event.venue.localized_country_name + "</h3>";
				s += "<h3>" + event.link + "</h3>";
			}
		}
		$results.html(s);
		console.log("s is: " + s);
	});
	console.log("after finding")
});