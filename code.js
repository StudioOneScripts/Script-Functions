

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

		return Host.Results.kResultOk;
	}

	// ---------------------------------------

}

// -------------------------------------------

function createInstance()
{
	return new userFunction();
}

