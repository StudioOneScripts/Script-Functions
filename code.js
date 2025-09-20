include_file("functions.js")
let kPackageID = "do.something"
function userFunction()
{
	this.interfaces =  [Host.Interfaces.IEditTask]

	this.prepareEdit = function (context)
	{
	
		return Host.Results.kResultOk;
	}

	// ------------------------------------------

	this.performEdit = function (context)
	{
		if (this.result != 0) {return} // did not click ok
		
		// ***************************************
		//         FUNCTIONS EXAMPLES 
		// ***************************************
		// color all tracks green
		// let green = "0b6352"
		// let Tracks = S1.getTracks();
		// for (let track of Tracks)
		// S1.colorTrack(context,track,green)	

		// -----------------------------------

		// open the console and print channel names
		// S1.openWindow("MessageWindow")
		// let Channels = S1.getChannels()
		// for(let channel of Channels)
		// 	print(channel.label)

		// -----------------------------------

		// Close all header tracks
		// let tracks = ["Marker","Chord","Arranger","Lyrics","Video"]
		// let filter = S1.getHeaderTrackFilter();
		// for (let track of tracks)
		//     filter.findParameter(track + "Track").setValue(0,true)
			
		// -----------------------------------

		// // ask a question
		// let retVal = ask("Do you want to do this?")
		// if (retVal === 1)  // you clicked 'No'
		// return;

		// // otherwise do the thing...
		// alert("You clicked yes...")

		// -----------------------------------

		return Host.Results.kResultOk;
	}

	// ---------------------------------------

}

// -------------------------------------------

function createInstance()
{
	return new userFunction();
}

