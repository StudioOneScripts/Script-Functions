include_file("functions.js")
let kPackageID = "functions"

function userFunction()
{
	this.interfaces =  [Host.Interfaces.IEditTask,]

	this.prepareEdit = function (context)
	{

	}

	// ------------------------------------------

	this.performEdit = function (context)
	{
		let tracks = S1.getTracks();

		for(let track of tracks)
			print(track.name);
		
	
		

		return Host.Results.kResultOk;
	}

	// ---------------------------------------

}

// -------------------------------------------

function createInstance()
{
	return new userFunction();
}

