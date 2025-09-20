
/**
 * @namespace S1
 */
let S1 = S1 || {};
S1.runCommand = function(context,command)
{
    Host.GUI.Commands.interpretCommand(context,command);
}

// **********************************************************
//                      TRANSPORT
// **********************************************************

S1.getTransport = function ()
{
    let transport = Host.Objects.getObjectByUrl
    ("://hostapp/DocumentManager/ActiveDocument/Environment/TransportPanel")

    return transport;
}

S1.getTrackFilter = function ()
{
    let filter = Host.Objects.getObjectByUrl
    ("://hostapp/DocumentManager/ActiveDocument/TrackListFilter")

    return filter;
}

S1.getChannelFilter = function ()
{
    let filter = Host.Objects.getObjectByUrl
    ("://hostapp/DocumentManager/ActiveDocument/Environment/MixerConsole/ChannelFilter")
    return filter;
}

S1.getHeaderTrackFilter = function ()
{
    let filter = Host.Objects.getObjectByUrl
    ("://hostapp/DocumentManager/ActiveDocument/TrackListFilter1")

    return filter;
}

S1.getVersion = function ()
{
    let version = Host.Objects.getObjectByUrl
    ("://studioapp/Application").findParameter("appNameAndVersion").string
    
    let data = version.split(" ")
    return data[2];
}

S1.getArrangeItems = function ()
{
    let arrange = Host.Objects.getObjectByUrl
    ("object://studioapp/DocumentManager/ActiveDocument/TrackList")
    
    let data = version.split(" ")
    return arrange;
}
// **********************************************************
//                      ROOT
// **********************************************************

S1.getMixer = function ()
{
	let mixer = Host.Objects.getObjectByUrl
    ("object://hostapp/Studio/ActiveEnvironment/MixerConsole");
	
    return mixer;
}

S1.getMasterBus = function()
{
    var master = S1.getMixer().getChannelList(3).getChannel(0);
    return master;
}

// **********************************************************
//                      TRACKS
// **********************************************************



S1.getTracks = function ()
{
    let Tracks = new Array()
	let trackList = S1.getTrackList();
    for(i = 0; i < trackList.numTracks; i++)
    {
        let track = trackList.getTrack(i)
        Tracks.push(track)
    }
    return (Tracks)
}

S1.disableMutedTracks =  function()
{
    let tracks = S1.getTracks()
    for (let track of tracks)
    {
        if(track.channel)  
        {
            if (track.channel.mute == 1 && 
                track.channel.canDisable)
            {
                track.channel.disabled = 1;
                track.channel.mute = 0;
            }
        }	
    }	
}

S1.getSelectedTracks = function ()
{
    let sTracks = [];
	let trackList = S1.getTrackList();
    
    for(i = 0; i < trackList.numSelectedTracks; i++)
    {
        let track = trackList.getSelectedTrack(i)
        sTracks.push(track)
    }
	return  (sTracks);
}

S1.getTrackList = function ()
{
	let trackList = Host.Objects.getObjectByUrl
    ("object://hostapp/DocumentManager/ActiveDocument/TrackList").mainTrackList;

    return trackList;
}



S1.colorTrack = function (context, track, hexColor)
{
    let functions = context.functions;
    let color = RGBToColor(fromHex(hexColor)) & 0x00ffffff;
    functions.colorizeEvent(track,color)
}

function fromHex(value)
{
    return parseInt(value, 16);
}

function RGBToColor(value)
{
    let r = (value >> 16) & 0xff;
    let g = (value >> 8) & 0xff;
    let b = value & 0xff;
    let c = (b << 16) | (g << 8) | r;
    return c | 0xff000000;
}

// **********************************************************
//                     CHANNELS
// **********************************************************

S1.getChannels = function ()
{
    let Channels = [];
    let mixer = S1.getMixer().getChannelList(1)

    for(i = 0; i < mixer.numChannels; i++)
    {
        let channel = mixer.getChannel(i)
        Channels.push(channel)
    }
    return  (Channels);
}

S1.getSelectedChannels = function ()
{
    let Channels = [];
    let mixer = S1.getMixer().getChannelList(1)

    for(i = 0; i < mixer.numSelectedChannels; i++)
    {
        let channel = mixer.getSelectedChannel(i)
        Channels.push(channel)
    }
    return  (Channels);
}

S1.getChannelList = function ()
{
	let channelList = S1.getMixer().getChannelList(1);
	return channelList;
}

// **********************************************************
//                     RESET MIXER
// **********************************************************
S1.resetMixer = function ()
{
    const msg =
    "This will reset the entire mixer.\r\n\r\n" + 
    "Are you sure you want to do this?" 
        
    if (ask(msg) === 1) return;

    S1.resetInputGain(0);
    S1.resetPolarity(0);
    S1.resetPan(0);
    S1.fadersToInfinty(0)
    S1.resetVCA(0)
    S1.resetSpeaker(0);

    const globalFX = Host.Objects.getObjectByUrl("object://studioapp/Studio/ActiveEnvironment/FXMaster")
    globalFX.findParameter("bypassAll").setValue(1,true);
}

// **********************************************************
//                     INPUT GAIN
// **********************************************************

S1.resetInputGain = function (selected)
{
    if (selected == undefined)
        selected = 0;

    let channelList = S1.getMixer().getChannelList(1)

    switch (selected)
    {
        case 0:
            for (i = 0; i < channelList.numChannels; i++)
            {
                var channel = channelList.getChannel(i);
                if (channel.find('InputFX'))	
                    channel.find('InputFX').findParameter('gain').value = 0;
                
            }
        break;

        case 1:
            for (i = 0; i < channelList.numSelectedChannels; i++)
            {
                var channel = channelList.getSelectedChannel(i);
                if (channel.find('InputFX'))	
                    channel.find('InputFX').findParameter('gain').value = 0;
                
            }
        break;        
    }
}

// **********************************************************
//                        POLARITY
// **********************************************************

S1.resetPolarity = function (selected)
{
    if (selected == undefined)
        selected = 0;

    let channelList = S1.getMixer().getChannelList(1)

    switch (selected)
    { 
        case 0:
            for (i = 0; i < channelList.numChannels; i++)
            {
                var channel = channelList.getChannel(i);
                if (channel.find('InputFX'))	
                {
                    let polarity = channel.find('InputFX')
                    polarity.findParameter('invertPhaseL').value = 0;
                    polarity.findParameter('invertPhaseR').value = 0;
                }
            }
        break;
        
        case 1:
            for (i = 0; i < channelList.numSelectedChannels; i++)
            {
                var channel = channelList.getSelectedChannel(i);
                if (channel.find('InputFX'))	
                {
                    let polarity = channel.find('InputFX')
                    polarity.findParameter('invertPhaseL').value = 0;
                    polarity.findParameter('invertPhaseR').value = 0;
                }
            }
        break;
    }

}

// **********************************************************
//                        VCA's
// **********************************************************

S1.resetVCA = function (selected)
{
    if (selected == undefined)
        selected = 0;

    let channelList = S1.getMixer().getChannelList(1)

    switch (selected)
    { 
        case 0:
            for (i = 0; i < channelList.numChannels; i++)
            {
                var channel = channelList.getChannel(i);
                if (channel.findParameter('vcaInputPort'))	
                    channel.findParameter('vcaInputPort').setValue(0,true)
            }
        break;
        
        case 1:
            for (i = 0; i < channelList.numSelectedChannels; i++)
            {
                var channel = channelList.getSelectedChannel(i);
                
                if (channel.findParameter('vcaInputPort'))	
                    channel.findParameter('vcaInputPort').setValue(0,true);
            }
        break;
    }

}

// **********************************************************
//                        SPEAKER
// **********************************************************

S1.resetSpeaker = function (selected)
{
    if (selected == undefined)
        selected = 0;
    
    let channelList = S1.getMixer().getChannelList(1); 
        
    switch (selected)
    { 
        case 0:
            for (i = 0; i < channelList.numChannels; i++)
            {
                let channel = channelList.getChannel(i);
                let speaker = channel.findParameter("speakerSetup")

                if(speaker)
                    speaker.setValue(1, true);
            }
        break;

        case 1:
            for (i = 0; i < channelList.numSelectedChannels; i++)
            {
                let channel = channelList.getSelectedChannel(i);
                let speaker = channel.findParameter("speakerSetup")

                if(speaker)
                    speaker.setValue(1, true);
            }
        break;
    }
}

// **********************************************************
//                        PANS
// **********************************************************

S1.panChannelPairs = function ()
{
    let channels = S1.getSelectedChannels()
    channels.forEach
    (
        (channel, index) => 
        {
            if (index % 2 === 0) {
                channel.pan = 1;
            } else {
                channel.pan = 0;
            }
        }
    );
}

S1.resetPan = function (selected)
{
    if (selected == undefined)
        selected = 0;

    let channelList = S1.getMixer().getChannelList(1); 
        
    switch (selected)
    { 
        case 0:
            let chs = S1.getChannels()
            for (channel of chs)
            {
                channel.pan = 0.5
            }
        break;

        case 1:
            let channels = S1.getSelectedChannels()
            for (channel of channels)
            {
                channel.pan = 0.5
            }

        break;
    }
}

// **********************************************************
//                        FADERS
// **********************************************************

S1.fadersToUnity = function (selected)
{
    if (selected == undefined)
        selected = 0;

    let channelList = S1.getMixer().getChannelList(1); 
    
    switch (selected)
    {
        case 0:
            for(i = 0; i < channelList.numChannels; i++)
            {
                let channel = channelList.getChannel(i)
                channel.volume = 1;
            }
        break;

        case 1:
            for(i = 0; i < channelList.numSelectedChannels; i++)
            {
                let channel = channelList.getSelectedChannel(i)
                channel.volume = 1;
            }
        break;
    }
	
}

// ------------------------------------------

S1.fadersToInfinty = function (selected)
{
    if (selected == undefined)
        selected = 0;
    
    let channelList = S1.getMixer().getChannelList(1); 

    switch (selected)
    {
        case 0:
            for(i = 0; i < channelList.numChannels; i++)
            {
                let channel = channelList.getChannel(i)
                channel.volume = 0;
            }
        break;

        case 1:
            for(i = 0; i < channelList.numSelectedChannels; i++)
            {
                let channel = channelList.getSelectedChannel(i)
                channel.volume = 0;
            }
        break;
    }
}

// **********************************************************
//                Text READ / WRITE
// **********************************************************

S1.writeTextFile = function (folder, filename, text)
{
    var path = Host.Url("local://$USERCONTENT/Script Support/" + folder + "/" + filename + ".txt");
    let textFile = Host.IO.createTextFile (path);
    if(textFile)
    { 
        textFile.writeLine (text) ;    
        textFile.close ();
    }
}

// ------------------------------------------

S1.readTextFile = function (folder, filename)
{
    var path = Host.Url("local://$USERCONTENT/Script Support/" + folder + "/" + filename + ".txt");
    let textFile = Host.IO.openTextFile (path);

    if (textFile)
    {
        var fileArray = new Array();
        while(!textFile.endOfStream)
        {
            fileArray.push(textFile.readLine ()) ;    
        }
           
        textFile.close ();
    }

        return fileArray;
}

S1.saveNewVersion = function (name)
{
    Host.GUI.Commands.interpretCommand("File","Save New Version",false,
        Host.Attributes(["Description",name,"Incremental","0"]))
}

// **********************************************************
//                      ENGINE
// **********************************************************


S1.getAudioDeviceName = function ()
{
	let audioEngine = Host.studioapp.find ("Studio").find ("AudioEngine");
	return audioEngine.findParameter ("masterDeviceName").string;
}


// **********************************************************
//                OPEN / CLOSE WINDOWS
// **********************************************************

S1.openWindow = function (window)
{
    let WM = Host.Objects.WindowManager;
        WM.openWindow(window);
}

S1.closeWindow = function (window)
{
    let WM = Host.Objects.WindowManager;
        WM.closeWindow(window);
}

// **********************************************************
//                 CLOSE HEADER TRACKS
// **********************************************************

S1.closeHeaderTracks = function ()
{
    let WM = Host.Objects.WindowManager;
    	WM.closeWindow("TempoEditor");
		WM.closeWindow("SignatureEditor");

    let headers = Host.Objects.getObjectByUrl
		("://hostapp/DocumentManager/ActiveDocument/TrackListFilter1")
        headers.findParameter("MarkerTrack").setValue(0,true)
        headers.findParameter("ChordTrack").setValue(0,true)
        headers.findParameter("LyricsTrack").setValue(0,true)
        headers.findParameter("ArrangerTrack").setValue(0,true)
        headers.findParameter("VideoTrack").setValue(0,true)

        let ruler = Host.Objects.getObjectByUrl
        ("object://hostapp/DocumentManager/ActiveDocument/TempoEditor")
            .findParameter("showSecondaryRuler").setValue(0,true)
}

// **********************************************************
//                 CONFORM TRACK NAMES
// **********************************************************

S1.normalizeTrackNames = function(context) 
{
    let Tracks = S1.getTracks()
    let functions = context.functions;

    for (const track of Tracks) 
    {
        if (track.name == undefined) { continue; }
        var result = capWords(track.name.trim())
        functions.renameEvent(track, result);
    }
}
function capWords(trackName)
{
    // make text lower case
    trackName = trackName.toLowerCase();

    // split words into an array
    var words = trackName.split(' ');

    // create an array for the letters
    var chars = [];

    for (i = 0; i < words.length; i++)
    {
        // capitalize the first letter in every word
        chars.push(words[i].charAt(0).toUpperCase() + words[i].slice(1));
    }

    // put humpy back together and return him
    return chars.join(' ');
}

// **********************************************************
//                 PREFIX WITH NUMBERS
// **********************************************************


S1.prefixMixerChannels = function () 
{
    let Channels = S1.getChannels(); 
    let number = 1; 

    for (const channel of Channels) 
    {
        if (channel.channelType == "MusicTrack")
			continue;
       
        const prefix = number.toString().padStart(3, '0');
        const newName = prefix + " - " + channel.label;
        channel.label = newName;
        number++;
    }
}

S1.removeChannelPrefixes = function () 
{
    let Channels = S1.getChannels();
       
    for (const channel of Channels) 
    {
        if (Channels.length == 0) { return }
        var data = channel.label.split('-');
        channel.label = data[data.length-1].trim();
    }

   
}

S1.removechannelNotes = function ()
{
    var channelList = Host.Objects.getObjectByUrl
    ("://hostapp/DocumentManager/ActiveDocument/Environment/MixerConsole")
        .getChannelList(1);

    for (i = 0; i < channelList.numChannels; i++)
    {   
        var channel = channelList.getChannel(i)
        
        if (!channel.find("NotepadItem"))
            continue;
            
        channel.find("NotepadItem").findParameter("text").setValue("",true)
    }
}

S1.removeEmptyTracks = function(context)
{
    let Tracks = S1.getTracks()
           
    for (track of Tracks)
    if (track.isEmpty() && track.mediaType == "Audio" || track.mediaType == "Music")
            context.functions.removeTrack(track);       
}


// **********************************************************
//               FORCE LEGAL FILENAME
// **********************************************************

S1.getLegalFileName = function (fileName)
{
	let regExp = new RegExp ('[,/\:*?""<>|]', 'g');
	return fileName.replace (regExp, "_");
}


// **********************************************************
//                MESSAGING SHORTCUTS
// **********************************************************
function print  (msg) { Host.Console.writeLine(msg.toString()) }
function alert  (msg) { Host.GUI.alert(msg.toString()) }
function ask    (msg) { var result = Host.GUI.ask(msg.toString()); return result; }

// parse object properties
function getAllPropertyNames(obj)
{
	var props = [];
	do
	{
		props = props.concat(Object.getOwnPropertyNames(obj));
	} while (obj = Object.getPrototypeOf(obj));
	for (i in props)
		print(props[i])
}

// <!-- WINDOW NAMES -->
// <!-- <th  colspan="3"
// >Useful Window Names</th>
//  <tr class="highlightable">
//   <td>
    
//     BigTimeDisplay,
//     Browser,
//     ChordDisplay,
//     Console,
//     Editor,
//     Editor1,
//     EditSceneManager,
//     HistoryPanel,
//     InfoView,
//     Inspector,
//     LyricsDisplay,
//     MessageWindow,
//     MetronomeSetup,
//     MidiMonitor,
//     MixGroupManager,
//     MixSceneManager,
//     MusicDeviceRack,
//     PerformanceMonitor,
//     PluginManager,
//     RecordPanel,
//     SignatureEditor,
//     SongInformation,
//     SongToolbar,
//     SoundVariationEditor,
//     SynthRack,
//     TempoEditor,
//     TrackList,
//     VideoPlayer
//   </td>
// </tr> -->

