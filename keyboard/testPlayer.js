// Setup namespace
var Test_Player = new function() {
    
    // return a new player
    this.init = function(){
        return new Player();
    }
    
    /**
     * A simple player that can link to the midi editor
     * it needs to contain the following methods:
     *      linkEditor(editor)
     *      midiKeyUp(key code)
     *      midiKeyDown(key code)
     *      saveNotes(notes,project id)
     *      loadNotes()
     * 
     * To send keys to the editor, use the following methods
     *      this.editor.recordKeyDown(keyCode)
     *      this.editor.recordKeyUp(keyCode)
     * 
     * To send and recieve notes from the editor, use the following methods
     *      this.editor.notesSaved(project id)
     *      this.editor.notesLoaded(notes,project id)
     */
    var Player = function(){
        $("body").append('<div id="reciever"></div>');
        $("body").append('<div id="sender"></div>');
        
        MIDI_Editor.init("body", this);
    }
    
    Player.prototype.linkEditor = function(editor){
        this.editor = editor;
        
        var thisObj = this;
        $(document).keydown(function(e){
            thisObj.editor.recordKeyDown(e.keyCode);
            $("#sender").append("<div class='message'>Keydown "+e.keyCode+"</div>");
            var elem = document.getElementById('sender');
            elem.scrollTop = elem.scrollHeight;
        });
        
        $(document).keyup(function(e){
            thisObj.editor.recordKeyUp(e.keyCode);
            $("#sender").append("<div class='message'>Keyup "+e.keyCode+"</div>");
            var elem = document.getElementById('sender');
            elem.scrollTop = elem.scrollHeight;
        });
        
        console.log("Linked Editor and Player");
    }
    
    Player.prototype.midiKeyUp = function(kc){
        $("#reciever").append("<div class='message'>Keyup "+kc+"</div>");
        var elem = document.getElementById('reciever');
        elem.scrollTop = elem.scrollHeight;
    }
    
    Player.prototype.midiKeyDown = function(kc){
        $("#reciever").append("<div class='message'>Keydown "+kc+"</div>");
        var elem = document.getElementById('reciever');
        elem.scrollTop = elem.scrollHeight;
    }
    
    // called by the editor
    Player.prototype.saveNotes = function(notes,pid){
        // call to editor that notes have been save and
        // that the unique song id is 1
        this.editor.notesSaved(1);
        console.log("Notes saved");
    }
    
    // called by the editor
    Player.prototype.loadNotes = function(){
        // call to editor to load the notes in the notes array
        // and that the song id is 1
        this.editor.notesLoaded([{"note":2,"beat":3,"length":1},{"note":3,"beat":6,"length":1}],1);
        console.log("Notes loaded");
    }
    
}