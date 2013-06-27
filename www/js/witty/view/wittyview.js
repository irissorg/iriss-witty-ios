/**
 * @fileoverview View with access to icons, map and canvas.
 * @author lesley.duff@iriss.org.uk (Lesley Duff)
 * @author paul.hart@iriss.org.uk (Paul Hart)
 */

'use strict';

/**
 * Creates an instance of WittyView.
 *
 * @constructor
 * @this {WittyView}
 */
function WittyView() {

    this.shadowSettings = {
        color: 'rgba(0,0,0,0.2)',
        blur: 10,
        offsetX: 10,
        offsetY: 10
    };

    this.canvas = null;

    //used for double click detection
    this.lastTime = Date.now();

    //Mini Text Icon Preview Canvas
    this.texticonminicanvas = null;

    //Mini Icon Preview Canvas
    this.minicanvas = null;

    this.canvas = null;
}

WittyView.prototype = {
    constructor: WittyView,

    sortByTitle: function byTitle(a, b) {
        var left = a[0].toLowerCase();
        var right = b[0].toLowerCase();
        if (left < right) return -1;
        if (left > right) return 1;
        return 0;
    },

    buildIconList: function(idList, callbackSelected)  {
        var wittyView = this;
        var htmlList = $(idList);

        // Sort the data a.sort(function(a,b) {
        wittyConfig.iconList.sort(this.sortByTitle);

        // remove all items from html list
        htmlList.empty();

        wittyConfig.iconList.forEach(function(arrIcon) {
            var link = $('<a>');
            var newLi = $('<li>');
            var iconTitle = arrIcon[0];
            var iconURL = arrIcon[1];
            var iconSynonyms = arrIcon[3];
  /*          link.bind('tap', function(e) {
                var iconTitle = arrIcon[0];
                wittyView.loadIcon(iconURL, iconTitle);
                callbackSelected();
                return false;
            });*/
            link.tap(function() {
                //var iconTitle = arrIcon[0];
                //data-filtertext="value"

                wittyView.loadIcon(iconURL, iconTitle);
                callbackSelected();
                return false;
            });

            if (iconURL.length > 0) {
                link.append('<img src="' + iconURL + '" alt="">');
            }
            link.append('<h2>' + iconTitle + '</h2>');
            var dataFilterText = iconTitle;

            // If alternative versions of Title exist make them searchable
            if (iconSynonyms) {
                if (iconSynonyms.length > 0) {
                     dataFilterText = dataFilterText + ' ' + iconSynonyms;
                }
            }
            newLi.attr('data-filtertext', dataFilterText);
            newLi.append(link);
            htmlList.append(newLi);
        });
    },

    buildAttributionList: function(idList) {
        var htmlList = $(idList);

        // Sort the data a.sort(function(a,b) {

        wittyConfig.iconList.sort(this.sortByTitle);

        wittyConfig.iconList.forEach(function(arrIcon) {
            var htmlAttribution = arrIcon[2];
            if (htmlAttribution.length > 0) {
                var newLi = $('<li>');
                newLi.append(arrIcon[0]);
                newLi.append(', ');
                newLi.append(htmlAttribution);
                htmlList.append(newLi);
            }
        });
    },

    onDeviceReady: function() {
        var wittyView = this;

        //Mini Text Icon Preview Canvas
        wittyView.texticonminicanvas = new fabric.StaticCanvas(
            'icontextthumbnail', {
            backgroundColor: 'white',
            selection: false
        });

        //Mini Icon Preview Canvas
        wittyView.minicanvas = new fabric.StaticCanvas('iconthumbnail', {
            backgroundColor: 'white',
            selection: false
        });

        wittyView.canvas = new fabric.Canvas('c', {
            backgroundColor: wittyConfig.colours.mapBackgroundLight,
            backgroundImage: wittyConfig.images.mapBackground,
            HOVER_CURSOR: 'pointer',
            selection: false
        });
        //FIX OFFSET BUG
        wittyView.canvas._offset.top = 40;
        //Mouse down on canvas
        // wittyView.canvas.on('mouse:down', function(options) {
//             if (options.target) {
//                 wittyView.shadowify();
//             }
//         });
        //Mouse up on canvas
        wittyView.canvas.on('mouse:up', function(options) {
            if (options.target) {
                options.target.bringToFront();
//                 wittyView.shadowify();
            }
        });

        wittyView.canvas.observe('object:selected',
            function(event) {
                event.target.cornerSize = 20;
                var date = new Date();
                var now = date.getTime();
                if (now - wittyView.lastTime < 500) {
                    //console.log('Type of object is: '+event.target.type);
                    if (event.target.type === 'text-object') {
                        //open text editing page
            //console.log('Navigating to Text Icon Edit screen hopefully');
                        var textIconPage = $(wittyConfig.id.assetTextIconPage);
                        if (!textIconPage.hasClass('editing-texticon')) {
                            textIconPage.addClass('editing-texticon');
                        }
                        $.mobile.navigate(wittyConfig.id.assetTextIconPage);
                        } else {
            //console.log('Navigating to Normal Icon Edit screen hopefully');
                        $.mobile.navigate(wittyConfig.id.assetSettingsPage);
                    }
                }
                wittyView.lastTime = now;
        });

        wittyView.canvas.observe('object:modified', function(event) {
                // Change observed - saving
                wittyView.storeCanvas();
        });

        wittyView.canvas.observe('selection:cleared',
            //When we de-select an icon
            function selectionClearedHandler(event) {
            //Clear any notes
            $(wittyConfig.id.assetSettingsNoteList).
                children().remove('li:not(:first-child)');

            var addNoteButton = $(wittyConfig.id.assetSettingsAddNoteButton);
            if (!addNoteButton.hasClass('ui-disabled')) {
                addNoteButton.addClass('ui-disabled');
            }
        });
    },

////////NEW CODE
    loadMiniIcon: function(icon, fillcolour) {
        var wittyView = this;
        var miniLocalCanvas = this.minicanvas;
        miniLocalCanvas.clear();
        fabric.loadSVGFromURL(icon, function(objects, options) {
            var shape = fabric.util.groupSVGElements(objects, options);
            miniLocalCanvas.add(shape.scale(1.8));

            //Depending on Background colour
            var canvasColour;
            if ($(wittyConfig.id.optionsBackgroundColourSelect).val() ==
                'white') {
                canvasColour = 'white';
            } else {
                canvasColour = 'black';
            }
            miniLocalCanvas.backgroundColor = canvasColour;
            miniLocalCanvas.renderAll();

            shape.set({
                fill: fillcolour,
                left: miniLocalCanvas.getWidth() / 2,
                top: miniLocalCanvas.getHeight() / 2
            }).setCoords();
            miniLocalCanvas.renderAll();
        });
    },

    //NEW CODE
    loadIcon: function(icon, iconTitle) {
        var wittyView = this;
        var localCanvas = this.canvas;

        localCanvas.deactivateAll();

        fabric.loadSVGFromURL(icon, function(objects, options) {
            var shape = fabric.util.groupSVGElements(objects, options);
            localCanvas.add(shape.scale(1)).setActiveObject(shape);
            shape.sourcePath = icon;
            //Depending on Background colour
            var fillColour;
            if ($(wittyConfig.id.optionsBackgroundColourSelect).val() ==
                'white') {
                fillColour = '#666666';
            } else {
                fillColour = 'white';
            }

            shape.set({
                storage: [],
                title: iconTitle,
                fill: fillColour,
                cornerSize: 20,
                minScaleLimit: 0.7,
                transparentCorners: true,
                left: localCanvas.getWidth() / 2,
                top: -100
            }).setCoords();

            shape.setShadow({
                color: 'rgba(0,0,0,0.2)',
                blur: 10,
                offsetX: 10,
                offsetY: 10
            });

            shape.animate('top', localCanvas.getHeight() / 2, {
                onChange: localCanvas.renderAll.bind(localCanvas),
                duration: 700,
                easing: fabric.util.ease.easeOutBounce,
                onComplete: function() {
                    wittyView.storeCanvas();
                }
            });
            //shape.setCoords();
            localCanvas.renderAll();
        });
    },

    removeIcon: function() {
        var obj = this.canvas.getActiveObject();

        if (obj) {
            obj.remove();
            this.canvas.renderAll();
            this.storeCanvas();
        }
    },

    //Add a drop shadow
    shadowify: function() {
        var obj = this.canvas.getActiveObject();
        if (obj) {
            if (obj.shadow) {
                obj.shadow = null;
            } else {
                obj.setShadow(this.shadowSettings);
            }
            this.canvas.renderAll();
        }
    },

    toggleBackgroundImage: function(strState) {
        var wittyCanvas = this.canvas;
        if (strState === 'on') {
            wittyCanvas.setBackgroundImage(wittyConfig.images.mapBackground,
                function() { wittyCanvas.renderAll(); });
        } else {
            wittyCanvas.setBackgroundImage('',
                function() { wittyCanvas.renderAll(); });
        }
    },

    changeBackgroundColour: function(strBackgroundColour) {
        var strColour, opacity;
        if (strBackgroundColour === 'white') {
            //strColour = '#FFFFF0';
            strColour = wittyConfig.colours.mapBackgroundLight;
            opacity = 1;
        } else {
            //strColour = '#303639';
            strColour = wittyConfig.colours.mapBackgroundDark;
            opacity = 0.1;
        }
        this.canvas.backgroundColor = strColour;
        this.canvas.backgroundImageOpacity = opacity;
        this.canvas.renderAll();
    },

    loadAssetSettings: function() {
        //Load icon settings page
        var object = this.canvas.getActiveObject();
        if (object) {
            $(wittyConfig.id.assetSettingsTitleText).val(object.title);
            this.populateNotes(object.storage, object);
            this.loadMiniIcon(object.sourcePath, object.fill);
            $(wittyConfig.id.assetSettingsAddNoteButton).removeClass(
                'ui-disabled');
            //object.setCoords();
            //this.canvas.renderAll();
        }
    },

    //NEW CODE
    //Fix damn weird bug
    fixOffSetBug: function() {
    //var localCanvas = this.canvas;
        this.canvas._offset.top = 42;
        // this.canvas.forEachObject(function(obj){
// obj.setCoords();
// localCanvas.renderAll();
// });
        //console.log(localCanvas._offset.top);
        //console.log(localCanvas._offset.top);
        // localCanvas.calcOffset();
// localCanvas.renderAll();

        //console.log('Fixed Offset Bug?');
    },

    //START NOTES
    // Create notes UI
    populateNotes: function(items, currObject) {
        var noteList = $(wittyConfig.id.assetSettingsNoteList);
        var wittyView = this;
        //Clear any notes
        noteList.children().remove('li:not(:first-child)');
        //If no notes add the hide class back in
         //console.log('Length: ' + items.length);
        var itemsLength = items.length;
        if (itemsLength == 0) {
            //console.log('no notes hiding myself');
            if (!noteList.hasClass(wittyConfig.classes.assetSettingsNoNotes)) {
                $(noteList).addClass(wittyConfig.classes.assetSettingsNoNotes);
            }
        } else {
            if (noteList.hasClass(wittyConfig.classes.assetSettingsNoNotes)) {
                $(noteList).removeClass(
                    wittyConfig.classes.assetSettingsNoNotes);
            }
        }
        //Loop  add  update
        for (var i = 0; i < itemsLength; i++) {
            noteList.append('<li><a class="notetext">' + items[i] +
            '</a><a class="deletenote" ' +
            'data-position-to="window" data-transition="pop"' +
            '>' + wittyConfig.uitext.assetSettingsDeleteNote + '</a></li>');
        }
        //refresh
        noteList.listview('refresh');
    },

    // Add note to data
    addNote: function(value) {
        var wittyView = this;
        var target = this.canvas.getActiveObject();
        if (target) {
            target.storage.push(value);
            wittyView.addNotesIndicator(target);
        }
    },

    // Update note in data
    updateNote: function(value, position) {
        var target = this.canvas.getActiveObject();
        if (target) {
        //console.log('updating: ' + position);
            target.storage[position] = value;
        }
    },

    // Remove note from data
    removeNote: function(position) {
        var wittyView = this;
        var noteList = $(wittyConfig.id.assetSettingsNoteList);
        var target = this.canvas.getActiveObject();
        if (target) {
            target.storage.splice(position, 1);
            if (target.storage.length == 0) {
                if (!noteList.hasClass(
                    wittyConfig.classes.assetSettingsNoNotes)) {
                    noteList.addClass(wittyConfig.classes.assetSettingsNoNotes);
                }
                wittyView.removeNotesIndicator(target);
            }
        }
    },
    //END NOTES

    //NEW CODE
    populateSettings: function(uiBGColour, uiBGImage) {
        //this.canvas
        //Background colour controls
        if (this.canvas.backgroundColor ==
            wittyConfig.colours.mapBackgroundDark) {
            uiBGColour.val('black').slider('refresh');
         } else {
             uiBGColour.val('white').slider('refresh');
         }

         //Background Image controls
         if (this.canvas.backgroundImage == '') {
            uiBGImage.val('off').slider('refresh');
         } else {
             uiBGImage.val('on').slider('refresh');
         }
    },

    //NEW CODE
    changeIconColour: function(uiColour) {
        var pickedColour = $(uiColour).data('colour');
        //main canvas
        var object = this.canvas.getActiveObject();
        if (object) {
            object.setFill(pickedColour);
            this.canvas.renderAll();
            this.storeCanvas();
        }
        //mini canvas
        var currentIcon = this.minicanvas.getObjects();
        if (currentIcon[0]) {
            currentIcon[0].setFill(pickedColour);
            this.minicanvas.renderAll();
        }
    },

    // Update the tite of an icon
    updateTitle: function(value) {
        var target = this.canvas.getActiveObject();
        if (target) {
            target.title = value;
            this.storeCanvas();
        }
    },

    storeCanvas: function() {
        if (this.canvas) {
            var usermap = WittyApp.wc.getCurrentMap();
            var mapstring = JSON.stringify(this.canvas.toDatalessJSON());
            WittyApp.wc.saveMapBlob(usermap, mapstring);
        }
    },

    loadCanvas: function(strBlob) {
        this.canvas.clear();
        this.canvas.loadFromDatalessJSON(strBlob, function() {});
        this.canvas.renderAll();
    },

    //NEW CODE: TEXT ICONS
    getActiveTextIcon: function() {
        return this.canvas.getActiveObject();
    },

    clearTextIcon: function() {
        this.texticonminicanvas.clear();
    },

    loadTextIcon: function() {
        var textSample = new fabric.TextObject('', {
            left: 20,
            fontFamily: 'helvetica',
            fill: '#666666',
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            textAlign: 'left',
            originX: 'left'
        });
        $(wittyConfig.id.assetTextIconItalicCheckbox).prop('checked',
            false).checkboxradio('refresh');
        $(wittyConfig.id.assetTextIconBoldCheckbox).prop('checked',
            false).checkboxradio('refresh');
        this.texticonminicanvas.add(textSample);
        this.texticonminicanvas.centerObjectV(textSample);
        //Depending on Background colour
            var canvasColour;
            if ($(wittyConfig.id.optionsBackgroundColourSelect).val() ==
                'white') {
                canvasColour = 'white';
            } else {
                canvasColour = 'black';
            }
            this.texticonminicanvas.backgroundColor = canvasColour;
            this.texticonminicanvas.renderAll();
        return textSample.text;
    },

    editTextIcon: function(txticon) {
        var textSample = new fabric.Text(txticon.text, {
            left: 20,
            fontFamily: txticon.fontFamily,
            fill: txticon.fill,
            scaleX: 0.5,
            scaleY: 0.5,
            fontStyle: txticon.fontStyle,
            fontWeight: txticon.fontWeight,
            textAlign: txticon.textAlign,
            originX: 'left'
        });
        //set UI elements to correct settings
        //Bold
        if (txticon.fontWeight == 'bold') {
            $(wittyConfig.id.assetTextIconBoldCheckbox).prop('checked',
                true).checkboxradio('refresh');
        } else {
            $(wittyConfig.id.assetTextIconBoldCheckbox).prop('checked',
                false).checkboxradio('refresh');
        }
        //Italic
        if (txticon.fontStyle == 'italic') {
            $(wittyConfig.id.assetTextIconItalicCheckbox).prop(
                'checked', true).checkboxradio('refresh');
        } else {
            $(wittyConfig.id.assetTextIconItalicCheckbox).prop(
                'checked', false).checkboxradio('refresh');
        }
        this.texticonminicanvas.add(textSample);
        this.texticonminicanvas.centerObjectV(textSample);
        //Depending on Background colour
            var canvasColour;
            if ($(wittyConfig.id.optionsBackgroundColourSelect).val() ==
                'white') {
                canvasColour = 'white';
            } else {
                canvasColour = 'black';
            }
            this.texticonminicanvas.backgroundColor = canvasColour;
            this.texticonminicanvas.renderAll();
        return textSample.text;
    },

    updateTextIconCurrent: function() {
        var currIcon = this.getActiveTextIcon();
        var textIcon = this.texticonminicanvas._objects[0];
        currIcon.text = textIcon.text;
        currIcon.fontWeight = textIcon.fontWeight;
        currIcon.fontStyle = textIcon.fontStyle;
        currIcon.fontFamily = textIcon.fontFamily;
        currIcon.setFill(textIcon.fill);
        this.canvas.renderAll();
        this.storeCanvas();
    },

    updateTextIconText: function(value) {
        this.texticonminicanvas._objects[0].setText(value);
        this.texticonminicanvas.renderAll();
    },

    updateTextIconTextBold: function(value) {
        this.texticonminicanvas._objects[0].fontWeight = value;
        this.texticonminicanvas.renderAll();
    },

    updateTextIconTextItalic: function(value) {
        this.texticonminicanvas._objects[0].fontStyle = value;
        this.texticonminicanvas.renderAll();
    },

    updateTextIconTextFont: function(value) {
        this.texticonminicanvas._objects[0].fontFamily = value;
        this.texticonminicanvas.renderAll();
    },

    updateTextIconTextAlign: function(value) {
        this.texticonminicanvas._objects[0].textAlign = value;
        this.texticonminicanvas.renderAll();
    },

    changeTextIconColour: function(uiColour) {
        var pickedColour = $(uiColour).data('colour');
        var currenticon = this.texticonminicanvas._objects[0];
        if (currenticon) {
            currenticon.setFill(pickedColour);
            this.texticonminicanvas.renderAll();
        }
    },

    addTextIcon: function() {
        var wittyView = this;
        // close page, clone existing one on preview add to main canvas
        var currentIcon = this.texticonminicanvas._objects[0];
        var myCopyIcon = fabric.util.object.clone(currentIcon);
        this.canvas.add(myCopyIcon);

        myCopyIcon.set({
                title: myCopyIcon.text,
                cornerSize: 20,
                //minScaleLimit: 1,
                angle: fabric.util.getRandomInt(-10, 10),
                transparentCorners: true,
                left: this.canvas.getWidth() / 2,
                scaleX: 0.9,
                scaleY: 0.9,
                top: -100
            }).setCoords();

        myCopyIcon.animate('top', this.canvas.getHeight() / 2, {
                onChange: this.canvas.renderAll.bind(this.canvas),
                duration: 700,
                easing: fabric.util.ease.easeOutBounce,
                onComplete: function() {
                    wittyView.storeCanvas();
                    wittyView.canvas.setActiveObject(myCopyIcon);
              }
            });
        this.canvas.renderAll();
    },

    limitTextInput: function(myTextArea, maxLines, maxChar) {
        var lines = myTextArea[0].value.replace(/\r/g, '').split('\n'),
            lines_removed, char_removed, i;
        if (maxLines && lines.length > maxLines) {
            lines = lines.slice(0, maxLines);
            lines_removed = 1;
        }
        if (maxChar) {
            i = lines.length;
            while (i-- > 0) if (lines[i].length > maxChar) {
                lines[i] = lines[i].slice(0, maxChar);
                char_removed = 1;
            }
            if (char_removed || lines_removed) {
                myTextArea[0].value = lines.join('\n');
            }
        }
    },

    //NEW May
    addNotesIndicator: function(obj) {
        var localCanvas = this.canvas;
        obj.set({
                strokeWidth: 5,
                stroke: 'rgba(100,200,200,0.5)'
            }).setCoords();
        localCanvas.renderAll();
    },

    removeNotesIndicator: function(obj) {
        var localCanvas = this.canvas;
        obj.set({
                strokeWidth: 0,
                stroke: ''
            }).setCoords();
        localCanvas.renderAll();
    },

    // Initialise a new map (get rid of existing objects)
    newMap: function() {
        if (this.canvas) {
            this.canvas.clear();
            this.canvas.renderAll();
        }
    },

    // Build array containing notes for each object
    getMapNotes: function() {
        var mapNotes = [];
        this.canvas.forEachObject(function(object) {
            mapNotes.push([object.title, object.storage]);
        });
        return mapNotes;
    },

    show: function() {
        console.log('iconList length=' + wittyConfig.iconList.length);
        console.log(wittyConfig.iconList);

        wittyConfig.iconList.forEach(function(arrIcon) {
            console.log('Icon Title: ' + arrIcon[0]);
            console.log('Icon File: ' + arrIcon[1]);
            console.log('Icon Attribution: ' + arrIcon[2]);
            console.log('-');
        });
    }
};
