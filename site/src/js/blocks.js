$(function() {
    $( ".draggable" ).draggable({
        connectToSortable: "#tracktable td",
        helper: "clone",
        revert: "invalid"
    });

    $(".resizable").resizable({
        grid: 50
    });


    $("#snaptrack").sortable({
        revert: true,
        placeholder: "ui-state-highlight"
    });


    $('.droppable').droppable({
       drop: function(event, ui) {
           $(this).find("div:first").removeAttr("style");
       }
    });
                
                
                
    $("#tracktable td").sortable({
        revert: true,
        placeholder: "ui-state-highlight"
    });
                
    const synth = new Tone.Synth().toMaster();
    const synth2 = new Tone.Synth().toMaster();
    const synth3 = new Tone.Synth().toMaster();
                
    var notes = [];
    var notes2 = [];
    var notes3 = [];
                
    
                
                
    function getTracks() {
       $('#track1 td').each(function() { 
           note = $(this).find('p').html();
           if (note != undefined) {
               notes.push(note);
           }
            else {
                notes.push(null);
            }
       });
        $('#track2 td').each(function() { 
           note = $(this).find('p').html();
           if (note != undefined) {
               notes2.push(note);
           }
            else {
                notes2.push(null);
            }
       });
        $('#track3 td').each(function() { 
           note = $(this).find('p').html();
           if (note != undefined) {
               notes3.push(note);
           }
            else {
                notes3.push(null);
            }
       });
        console.log(notes);
        console.log(notes2);
        console.log(notes3);
    };
                
                
                
    function startTracks(beat) {
        const synthPart = new Tone.Sequence(
            function(time,note) {
                synth.triggerAttackRelease(note, "4n", time)
            },
            notes,
            beat
        );

        const synthPart2 = new Tone.Sequence(
            function(time,note) {
                synth2.triggerAttackRelease(note, "4n", time)
            },
            notes2,
            beat
        );

        const synthPart3 = new Tone.Sequence(
            function(time,note) {
                synth3.triggerAttackRelease(note, "4n", time)
            },
            notes3,
            beat
        );

        synthPart.start();
        synthPart2.start();
        synthPart3.start();

    };
                
                
                
                
                
                
    document.querySelector('#play').addEventListener('click', async() => {

        getTracks();
        startTracks("8n");
        Tone.Transport.loopEnd = '0.5m';
        Tone.Transport.loop = true;
        Tone.Transport.start();

    });
                
    document.querySelector('#clear').addEventListener('click', async() => {
        $('#track1 td').each(function() { 
           $(this).html("");
       });
        $('#track2 td').each(function() { 
           $(this).html("");
       });
        $('#track3 td').each(function() { 
           $(this).html("");
       });
        Tone.Transport.stop();
    });
                
    document.querySelector('#stop').addEventListener('click', async() => {
        Tone.Transport.stop();
    });

                
});
