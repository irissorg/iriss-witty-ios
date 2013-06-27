/**
 * @fileoverview What's important to you index.html JQuery events.
 * @author lesley.duff@iriss.org.uk (Lesley Duff)
 */

'use strict';

$(document).ready(function() {
    // Handler for .ready() called.
    var bRunningOnBrowser = !WittyApp.wc.isRunningOnDevice();
    if (bRunningOnBrowser) {
    // called when run from browser rather than device
    // Manually trigger e.g. init of DB
        WittyApp.wc.onDeviceReady();
    }
});

$(document).on('mobileinit', function() {
    $.mobile.buttonMarkup.hoverDelay =
        wittyConfig.mobileinit.buttonMarkupHoverDelay;
    WittyApp.wc.init();
});

$(document).on('pageinit', wittyConfig.id.indexPage, function(event) {
    $(wittyConfig.id.indexCreateMapButton).click(function() {
        var newmap = new Usermap();
        WittyApp.wc.addMap(newmap);
        return true; // redirect to map details
    });
});

$(document).on('pagebeforeshow', wittyConfig.id.indexPage, function(event) {
    WittyApp.wc.syncIndexPageControls();
});

$(document).on('pageinit', wittyConfig.id.mapDetailsDialog, function(event) {
    $(wittyConfig.id.mapDetailsName).on('keyup', function(event, ui) {
        WittyApp.wc.setSaveMapButtonStatus(WittyApp.wc.getCurrentMap());
    });
               
    $(wittyConfig.id.mapDetailsLocked).on('change', function(event, ui) {
        var usermap = WittyApp.wc.getCurrentMap();
        WittyApp.wc.toggleLockMap(usermap);
        WittyApp.wc.setSaveMapButtonStatus(usermap);
    });

    //bind event handler to password field
    $(wittyConfig.id.mapDetailsPassword).on('keyup', function(event, ui) {
        WittyApp.wc.setSaveMapButtonStatus(WittyApp.wc.getCurrentMap());
    });

    $(wittyConfig.id.mapDetailsSaveButton).on('click', function(e) {
        e.preventDefault();
        WittyApp.wc.saveMap(WittyApp.wc.getCurrentMap());
        return false;
    });

    $(wittyConfig.id.mapDetailsDeleteButton).on('click', function(e) {
        e.preventDefault();
        $.mobile.changePage($(wittyConfig.id.deleteMapDialog));
        return false;
    });
});

/*$(document).on('pagehide', wittyConfig.id.mapDetailsDialog,
    function(event, ui) {
    //WittyApp.wc.cancelDialogMapDetails(); - moved to pagebeforehide event (see below), prevents brief flash of UI change
});*/
$(document).on('pagebeforehide', wittyConfig.id.mapDetailsDialog,
    function(event, ui) {
    WittyApp.wc.cancelDialogMapDetails();
    WittyApp.wc.syncIndexPageControls();
});

$(document).on('pagebeforeshow', wittyConfig.id.mapDetailsDialog,
    function(event) {
    WittyApp.wc.setupForm(WittyApp.wc.getCurrentMap());
});

$(document).on('pageshow', wittyConfig.id.mapDetailsDialog,
    function(event, ui) {
    $(wittyConfig.id.mapDetailsName).focus();
});

$(document).on('pageinit', wittyConfig.id.deleteMapDialog, function(event) {
    $(wittyConfig.id.deleteMapConfirmButton).on('tap', function(event) {
        event.preventDefault();
        WittyApp.wc.removeMap();
        return false;
    });
});

$(document).on('pageinit', wittyConfig.id.enterPasswordDialog,
    function (event) {
    // Check after each keypress whether the password is valid
    // if so open the map
    $(wittyConfig.id.enterPasswordPassword).on('keyup', function(event) {
        var currentMap = WittyApp.wc.getCurrentMap();
                                            
        WittyApp.wc.enterPasswordCheck(currentMap, function() {
            WittyApp.wc.loadMapBlob(currentMap,
            function onSuccessfulLoad(strBlob) {
                WittyApp.wv.loadCanvas(strBlob);
            });
            WittyApp.wc.gotoMap(wittyConfig.id.enterPasswordDialog+' 1');
        });
    });

    $(wittyConfig.id.enterPasswordForm).submit(function() {
        // handle press of enter key with no text - disable close
        return false;
    });
        
    $(wittyConfig.id.enterPasswordForgotPasswordLink).click(function(e) {
        e.preventDefault();
        e.stopPropagation();
                                                    
        $.mobile.changePage(wittyConfig.id.forgotPasswordDialog, {
            transition : 'pop',
            role: 'dialog',
            // so that enterPasswordDialog isn't shown again
            changeHash: false
        });
        return false;
    });
});

$(document).on('pagebeforeshow', wittyConfig.id.enterPasswordDialog,
    function(event) {
    var forgotPasswordBlock =
       $(wittyConfig.id.enterPasswordForgotPasswordLinkText);
    var bShowForgotLink = false;
    var preferencesAnswer = WittyApp.wp.getSecretAnswer();
    $(wittyConfig.id.enterPasswordPassword).val('');
    // Set locked image
    WittyApp.wc.setEnterPasswordMapsThumbImage(true);
             
    // Check to see preferences answer
    if (preferencesAnswer) {
        if (preferencesAnswer.length > 0) {
            bShowForgotLink=true;
        }
    }
    if (bShowForgotLink) {
        forgotPasswordBlock.css('visibility','visible');
    } else {
        forgotPasswordBlock.css('visibility','hidden');
    }
});

$(document).on('pageshow', wittyConfig.id.enterPasswordDialog,
   function(event, ui) {
   $(wittyConfig.id.enterPasswordPassword).focus();
});

// Forgot Password
$(document).on('pageinit', wittyConfig.id.forgotPasswordDialog,
    function(event) {
    // Check after each keypress whether the password is valid
    // if so open the map
    $(wittyConfig.id.forgotPasswordSecretAnswerText).on('keyup', function(e) {
        var securityAnswer =
            $(wittyConfig.id.forgotPasswordSecretAnswerText).val();
        var preferenceSecretAnswerEncrypted = WittyApp.wp.getSecretAnswer();
        securityAnswer = WittyApp.wc.encryptText(securityAnswer);
        if (securityAnswer === preferenceSecretAnswerEncrypted) {
           // We have the correct answer, open the map
            var currentMap = WittyApp.wc.getCurrentMap();

            WittyApp.wc.loadMapBlob(currentMap,
                function onSuccessfulLoad(strBlob) {
                    WittyApp.wv.loadCanvas(strBlob);
                });
            WittyApp.wc.gotoMap(wittyConfig.id.forgotPasswordDialog);
        }
    });
});

$(document).on('pagebeforeshow', wittyConfig.id.forgotPasswordDialog,
    function(event) {
    var preferencesSecretQuestion = WittyApp.wp.getSecretQuestion();
    $(wittyConfig.id.forgotPasswordSecretQuestionText).text(
        preferencesSecretQuestion);
});

$(document).on('pagebeforeshow', wittyConfig.id.loadMapPage, function(event) {
    // retrieve list of maps from storage
    WittyApp.wc.updateMapList(function onBuildOK() {
        $(wittyConfig.id.loadMapPage).css('background',
            wittyConfig.colours.loadMapBackground);
        $(wittyConfig.id.loadMapList).listview('refresh');
    });
});

$(document).on('pageinit', wittyConfig.id.mapPage, function() {
    // Remove Asset
    $(wittyConfig.id.mapAssetRemoveButton).tap(function() {
        WittyApp.wv.removeIcon();
    });
});

$(document).on('pagebeforeshow', wittyConfig.id.mapPage, function(event) {
    var usermap = WittyApp.wc.getCurrentMap();
    var mapTitle = usermap.title;
    var classPadlock = wittyConfig.classes.headerPadlock;
    var classPadlockStatus = usermap.isLocked() ?
        wittyConfig.classes.padlockLockedSmall :
        wittyConfig.classes.padlockUnlockedSmall;

    // Put link to map details dialog around title and padlock
    mapTitle = '<div><a href="' + wittyConfig.id.mapDetailsDialog +
        '" class="' + wittyConfig.classes.headerLink + '">' +
        mapTitle + ' <span class="'+classPadlock + ' ' + classPadlockStatus +
        '"></span></a></div>';
    $(wittyConfig.id.mapTitleBar).html(mapTitle);
});

$(document).on('pageshow', wittyConfig.id.mapPage, function(event, ui) {
    if (WittyApp.takeScreenshot) {
    // Add a small delay otherwise we get a blank screen
        setTimeout(function() {
            WittyApp.wc.doScreenshot();
            WittyApp.takeScreenshot = false;
        }, 500);
    }
});

$(document).on('pagehide', wittyConfig.id.mapPage, function(event, ui) {
// addition if changing away from map make sure it's saved
    WittyApp.wv.storeCanvas();
});

$(document).on('pageinit', wittyConfig.id.optionsDialog,
    function (event) {
    $(wittyConfig.id.optionsScreenshotButton).click(function() {
        event.preventDefault();
        WittyApp.takeScreenshot = true;
        return true;
    });

    // Toggle Background
    $(wittyConfig.id.optionsBackgroundImageSelect).on('change', function() {
        var v = $(this).val();
        WittyApp.wv.toggleBackgroundImage(v);
        WittyApp.wv.storeCanvas();
    });//End Toggle Background

    // Change Background Colour
    $(wittyConfig.id.optionsBackgroundColourSelect).on('change', function() {
        var v = $(this).val();
        WittyApp.wv.changeBackgroundColour(v);
        WittyApp.wv.storeCanvas();
    });//End Change Background Colour
});

$(document).on('pagebeforeshow', wittyConfig.id.optionsDialog,
    function(event) {
    WittyApp.wv.populateSettings(
        $(wittyConfig.id.optionsBackgroundColourSelect),
        $(wittyConfig.id.optionsBackgroundImageSelect));
});

$(document).on('pageinit', wittyConfig.id.appPreferencesDialog,
    function (event) {
    // Disable the OK button if either or both of the question and
    // answer text are missing
    $(wittyConfig.id.appPreferencesSecretQuestionText).on('cut paste keyup',
        function() {
        syncPreferencesOK();
    });
    $(wittyConfig.id.appPreferencesSecretAnswerText).on('cut paste keyup',
        function() {
        syncPreferencesOK();
    });
               
    $(wittyConfig.id.appPreferencesOKButton).click(function () {
        var questionText =
           $(wittyConfig.id.appPreferencesSecretQuestionText).val();
        var answerText = $(wittyConfig.id.appPreferencesSecretAnswerText).val();
        //console.log('set answer text:'+answerText);
        WittyApp.wp.storeSecretQuestion(questionText);

        answerText = WittyApp.wc.encryptText(answerText);
        WittyApp.wp.storeSecretAnswerEncrypted(answerText);
        
        $(wittyConfig.id.appPreferencesDialog).dialog('close');
        return false;
    });
});

function syncPreferencesOK()
{
    var questionText =
    $(wittyConfig.id.appPreferencesSecretQuestionText).val();
    var answerText =
    $(wittyConfig.id.appPreferencesSecretAnswerText).val();   
    
    var okButton = $(wittyConfig.id.appPreferencesOKButton);
    if ((questionText.length > 0) && (answerText.length > 0)) {
        if (okButton.hasClass('ui-disabled')) {
            okButton.removeClass('ui-disabled');
        }
    } else {
        if (!okButton.hasClass('ui-disabled')) {
            okButton.addClass('ui-disabled');
        }
    }
}

$(document).on('pagebeforeshow', wittyConfig.id.appPreferencesDialog,
    function(event) {
    // get the preferences security question
    var prefSecretQuestion  = WittyApp.wp.getSecretQuestion();
    //var prefSecretAnswer    = WittyApp.wp.getSecretAnswer();

    $(wittyConfig.id.appPreferencesSecretQuestionText).val(prefSecretQuestion);
    //$(wittyConfig.id.appPreferencesSecretAnswerText).val(prefSecretAnswer);
    syncPreferencesOK();
});

$(document).on('pageshow', wittyConfig.id.appPreferencesDialog,
    function(event) {
           //    $(wittyConfig.id.appPreferencesOKButton).button('disable');
        var questionText =
            $(wittyConfig.id.appPreferencesSecretQuestionText).val();
        if (questionText.length == 0) {
            $(wittyConfig.id.appPreferencesSecretQuestionText).focus();
        } else {
           var answerText =
               $(wittyConfig.id.appPreferencesSecretAnswerText).val();
               
           if (answerText.length == 0) {
               $(wittyConfig.id.appPreferencesSecretAnswerText).focus();
           }
        }
});

// Choose icon page
$(document).on('pageinit', wittyConfig.id.assetIconsPage, function(event) {
    WittyApp.wv.buildIconList(wittyConfig.id.assetIconsList,
        function onTap() {
        // Close icon page and goto map
            WittyApp.wc.gotoMap(wittyConfig.id.assetIconsPage);
        });
    $(wittyConfig.id.assetIconsList).listview('refresh');
});

$(document).on('pagebeforeshow', wittyConfig.id.assetIconsPage,
    function(event) {
    // reset the text filter
    $('input[data-type="search"]').val('');
    //  Edit: To update the list you will also have to trigger the
    // "change"-event on the searchfilter:

    $('input[data-type="search"]').trigger('change');
});

$(document).on('pageinit', wittyConfig.id.assetSettingsPage, function() {
    $(wittyConfig.id.assetSettingsTitleForm).submit(function() {
        WittyApp.wv.storeCanvas();
        WittyApp.wc.gotoMap(wittyConfig.id.assetSettingsPage);
        return false;
    });
               
    ////START NOTES
    //Add an note to the notes list
    // Modification LD 24 Apr 2013 - adding a new item where finger over
    // first item in list sometimes generates an update event
    $(wittyConfig.id.addNoteSaveNoteButton).on('tap', function(event) {
        event.preventDefault();
        var saveText = $(wittyConfig.id.addNoteTextarea).val();
        $(wittyConfig.id.assetSettingsNoteList).removeClass(
            wittyConfig.classes.assetSettingsNoNotes);
        $(wittyConfig.id.assetSettingsNoteList).append(
            '<li><a class="notetext">' + saveText +
            '</a><a class="deletenote" ' +
            'data-position-to="window" data-transition="pop">' +
            wittyConfig.id.assetSettingsDeleteNote +
            '</a></li>').listview('refresh');
        WittyApp.wv.addNote(saveText);
        WittyApp.wv.storeCanvas();
        $(wittyConfig.id.addNotePopup).popup('close');
    });

    //Toggle the save note button
    $(wittyConfig.id.addNotePopup).on('popupbeforeposition',
        function(event, ui) {
        if ($(wittyConfig.id.addNoteTextarea).val().length > 0) {
            $(wittyConfig.id.addNoteSaveNoteButton).removeClass(
                'ui-disabled');
        } else {
            $(wittyConfig.id.addNoteSaveNoteButton).addClass(
                'ui-disabled');
        }
    });
               
    $(wittyConfig.id.addNotePopup).on('popupafteropen',
        function(event, ui) {
        WittyApp.wv.fixOffSetBug();
        $(wittyConfig.id.addNoteTextarea).focus();
    });
               
    //Enable/Disable the save button on the notes input popup
    $(wittyConfig.id.addNoteTextarea).keyup(function() {
        var saveNoteButton = $(wittyConfig.id.addNoteSaveNoteButton);
        if ($(this).val().length > 0) {
            if (saveNoteButton.hasClass('ui-disabled')) {
                saveNoteButton.removeClass('ui-disabled');
            }
        } else {
            if (!saveNoteButton.hasClass('ui-disabled')) {
                saveNoteButton.addClass('ui-disabled');
            }
        }
    });
               
    //Clear the text input area
    $(wittyConfig.id.addNotePopup).on('popupafterclose', function(event, ui) {
        $(wittyConfig.id.assetSettingsNoteList +
            ' li.editing').removeClass('editing');
        $(wittyConfig.id.addNoteTextarea).val('');
    });
               
    //Update note popup
    $(wittyConfig.id.assetSettingsNoteList).on('click', 'li a.notetext',
    // Modifcation LD 24 Apr 2013 - local event param + preventDefault
        function(event) {
        event.preventDefault();
        $(this).parentsUntil('ul', 'li').addClass('editing');
        $(wittyConfig.id.updateNoteTextarea).val($(this).text());
        $(wittyConfig.id.updateNotePopup).popup('open');
    });
               
    //Enable/Disable the save button on the notes input popup
    $(wittyConfig.id.updateNoteTextarea).keyup(function() {
        var updateNoteButton = $(wittyConfig.id.updateNoteButton);
        if ($(this).val().length > 0) {
            if (updateNoteButton.hasClass('ui-disabled')) {
                updateNoteButton.removeClass('ui-disabled');
            }
        } else {
           if (!updateNoteButton.hasClass('ui-disabled')) {
               updateNoteButton.addClass('ui-disabled');
           }
        }
    });
               
    //Clear the text input area
    $(wittyConfig.id.updateNotePopup).on('popupafterclose',
        function(event, ui) {
        $(wittyConfig.id.assetSettingsNoteList +
            ' li.editing').removeClass('editing');
        $(wittyConfig.id.updateNoteTextarea).val('');
    });
               
    //Toggle the update note button
    $(wittyConfig.id.updateNotePopup).on('popupbeforeposition',
        function(event, ui) {
        var noteButton = $(wittyConfig.id.updateNoteButton);
        if ($(wittyConfig.id.updateNoteTextarea).val().length > 0) {
            if (noteButton.hasClass('ui-disabled')) {
                noteButton.removeClass('ui-disabled');
            }
        } else {
            if (!noteButton.hasClass('ui-disabled')) {
                noteButton.addClass('ui-disabled');
            }
        }
    });

    $(wittyConfig.id.updateNotePopup).on('popupafteropen',
        function(event, ui) {
        $(wittyConfig.id.updateNoteTextarea).focus();
    });

    // Update the current note
    //   $(wittyConfig.id.updateNoteButton).tap(function() {
    // Modification LD 24 Apr 2013 add (event) param and event.preventDefault();
    $(wittyConfig.id.updateNoteButton).on('tap', function(event) {
        event.preventDefault();
        var saveText = $(wittyConfig.id.updateNoteTextarea).val();
        $(wittyConfig.id.assetSettingsNoteList + ' li.editing').replaceWith(
            '<li class="editing"><a class="notetext">' + saveText +
            '</a><a class="deletenote" ' +
            'data-position-to="window" data-transition="pop">' +
            wittyConfig.id.assetSettingsDeleteNote + '</a></li>');
        var position = $(wittyConfig.id.assetSettingsNoteList +
            ' li.editing').index();
        WittyApp.wv.updateNote(saveText, (position - 1));
        WittyApp.wv.storeCanvas();
        $(wittyConfig.id.assetSettingsNoteList).listview('refresh');
        $(wittyConfig.id.assetSettingsNoteList +
            ' li.editing').removeClass('editing');
        $(wittyConfig.id.updateNotePopup).popup('close');
    });
               
   // Remove a note from the notes list
    $(document).on('tap', 'a.deletenote', function(event) {
        event.preventDefault();

   // $(document).on('tap', 'a.deletenote', function() {
        var position = $(this).parentsUntil('ul', 'li').index();
        $(this).parentsUntil('ul', 'li').remove();
        WittyApp.wv.removeNote(position - 1);
        WittyApp.wv.storeCanvas();
    });
   //END NOTES
               
    // Change icon colour
    $(wittyConfig.id.assetSettingsColourTabsInline).delegate('div', 'tap',
        function() {
        WittyApp.wv.changeIconColour(this);
    });
               
    // Icon title Saving
    $(wittyConfig.id.assetSettingsTitleText).keyup(function() {
        WittyApp.wv.updateTitle($(this).val());
    });
});

$(document).on('pagebeforeshow', wittyConfig.id.assetSettingsPage,
    function(event) {
    WittyApp.wv.loadAssetSettings();
});

$(document).on('pagebeforehide', wittyConfig.id.assetSettingsPage,
    function(event) {
    WittyApp.wv.fixOffSetBug();
});

$(document).on('pageinit', wittyConfig.id.aboutDiaLog, function() {
    // Set Version
    $(wittyConfig.id.aboutVersionText).text(wittyConfig.app.version);

    // Set copyright
    var yearNow = new Date().getFullYear();
    $(wittyConfig.id.aboutCopyrightText).html(
        wittyConfig.uitext.iriss+', ' + yearNow);
    // <a href="http://www.iriss.org.uk/">IRISS</a>, 2013
});

$(document).on('pageinit', wittyConfig.id.creditsDiaLog, function(event) {
    WittyApp.wv.buildAttributionList(wittyConfig.id.creditsIconAttributionList);
});

$(document).on('pagebeforeshow', wittyConfig.id.allNotesPage,
    function(event) {
    var mapNotes = WittyApp.wv.getMapNotes();
    var mapObjectList = $(wittyConfig.id.allNotesList);
    var usermap = WittyApp.wc.getCurrentMap();
    var mapAllNotesTitle = usermap.title + ' - ' +
       wittyConfig.uitext.mapAllNotesPageTitle;
    var objectTitle, arrStorage, emailSubject, emailBody;

    emailSubject = wittyConfig.uitext.mapAllNotesEmailSubject + ' ' +
       mapAllNotesTitle;
    emailBody = mapAllNotesTitle + '\n\n';

    // Set page title
    $(wittyConfig.id.allNotesTitleBar).text(mapAllNotesTitle);

    // remove all items from list
    mapObjectList.empty();
    mapNotes.forEach(function(element, index, array) {
        var newLi = $('<li>');
        var objectUl = '<ul>';
        objectTitle = element[0];
        var arrObjectNotes = element[1];
        newLi.append(objectTitle);
        emailBody = emailBody + objectTitle + '\n';
                    
        if (arrObjectNotes) {
            if (arrObjectNotes.length > 0) {
                arrObjectNotes.forEach(function(elementb, indexb, arrayb) {
                    objectUl = objectUl + '<li>' + elementb + '</li>';
                    emailBody = emailBody + ' - ' + elementb + '\n';
                });
                objectUl = objectUl + '</ul>';
                emailBody = emailBody + '\n';
                newLi.append(objectUl);
            } else {
                emailBody = emailBody + '\n';
            }
        }
        mapObjectList.append(newLi);
    });
    var buttonEmail = $(wittyConfig.id.allNotesEmailButton);

    // mailto:?subject=[Witty]&body=my test
    buttonEmail.attr('href', 'mailto:?subject=' + emailSubject +
        '&body=' + encodeURIComponent(emailBody));
});

//NEW CODE: Text Icon page
$(document).on('pageinit', wittyConfig.id.assetTextIconPage, function() {
    //Keypress listener
    $(wittyConfig.id.assetTextIconTextarea).keyup(function() {
        var addTextButton = $(wittyConfig.id.assetTextIconAddTextButton);
        WittyApp.wv.limitTextInput(
           $(wittyConfig.id.assetTextIconTextarea), 4, 40);
        WittyApp.wv.updateTextIconText($(this).val());
        
        if ($(wittyConfig.id.assetTextIconTextarea).val().length >
            0) {
            if (addTextButton.hasClass('ui-disabled')) {
                addTextButton.removeClass('ui-disabled');
            }
        } else {
            if (!addTextButton.hasClass('ui-disabled')) {
                addTextButton.addClass('ui-disabled');
            }
        }
    });
               
    $(wittyConfig.id.assetTextIconFontList).on('tap', 'li a',
        function() {
        WittyApp.wv.updateTextIconTextFont($(this).text());
        $(wittyConfig.id.assetTextIconFontPopup).popup('close');
    });
               
    $(wittyConfig.id.assetTextIconAlignList).on('tap', 'li a',
        function() {
        WittyApp.wv.updateTextIconTextAlign($(this).text());
    });
               
    $(wittyConfig.id.assetTextIconColourTabsInline2).on('tap', 'div',
        function() {
        WittyApp.wv.changeTextIconColour(this);
    });
               
    //Add icon to map
    $(wittyConfig.id.assetTextIconAddTextButton).on('tap',
        function() {
        if ($(wittyConfig.id.assetTextIconPage).hasClass('editing-texticon')) {
            //$.mobile.changePage(wittyConfig.id.mapPage);
            WittyApp.wc.gotoMap(wittyConfig.id.assetTextIconAddTextButton+'1');
            WittyApp.wv.updateTextIconCurrent();
        } else {
            WittyApp.wc.gotoMap(wittyConfig.id.assetTextIconAddTextButton+'2');
            //$.mobile.changePage(wittyConfig.id.mapPage);
            WittyApp.wv.addTextIcon();
        }
    });
});

$(document).on('change', wittyConfig.id.assetTextIconBoldCheckbox,
    function() {
    if ($(wittyConfig.id.assetTextIconBoldCheckbox + ':checked').length > 0) {
        WittyApp.wv.updateTextIconTextBold('bold');
    } else {
        WittyApp.wv.updateTextIconTextBold('');
    }
});

$(document).on('change', wittyConfig.id.assetTextIconItalicCheckbox,
    function() {
    if ($(wittyConfig.id.assetTextIconItalicCheckbox + ':checked').length > 0) {
        WittyApp.wv.updateTextIconTextItalic('italic');
    } else {
        WittyApp.wv.updateTextIconTextItalic('');
    }
});

$(document).on('pagebeforeshow', wittyConfig.id.assetTextIconPage,
    function(event) {
    if ($(wittyConfig.id.assetTextIconPage).hasClass('editing-texticon')) {
        var txt = WittyApp.wv.editTextIcon(WittyApp.wv.getActiveTextIcon());
        $(wittyConfig.id.assetTextIconTextarea).val(txt);
        $(wittyConfig.id.assetTextIconAddTextButton +
            ' .ui-btn-text').text('Update text');
    } else {
        WittyApp.wv.clearTextIcon();
        $(wittyConfig.id.assetTextIconTextarea).val('');
        var addTextButton=$(wittyConfig.id.assetTextIconAddTextButton);
        if (!addTextButton.hasClass('ui-disabled')) {
            addTextButton.addClass('ui-disabled');
        }
        WittyApp.wv.loadTextIcon();
        $(wittyConfig.id.assetTextIconAddTextButton +
            ' .ui-btn-text').text('Add text to my map');
   }
});

$(document).on('pagebeforehide', wittyConfig.id.assetTextIconPage,
    function(event) {
    var textIconPage = $(wittyConfig.id.assetTextIconPage);
    if (textIconPage.hasClass('editing-texticon')) {
        textIconPage.removeClass('editing-texticon');
    }
});

$(document).on('pageshow', wittyConfig.id.assetTextIconPage, function(event) {
    $(wittyConfig.id.assetTextIconTextarea).focus();
});
