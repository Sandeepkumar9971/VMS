import GetImage from '<Paste here your GetImage.js file path>';

[use it like this example]:-
<GetImage 
	redirection={true} 
	top={true} 
	imgID={this.state.activeUserID} 
	getPhotoUrl={this.state.getPhotoUrl} 
/>


[Accecpted props]:-
imgID				value			user id paste here
getPhotoUrl			url			paste getphoto api path
redirection			boolean			enable/disable onClick on image to redirect specific location
top				boolean			open redirection path in current iframe or top of the iframe(parent window)

