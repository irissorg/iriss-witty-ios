/**
 * @fileoverview Main What's important to you application.
 * @author lesley.duff@iriss.org.uk (Lesley Duff)
 */

'use strict';

var WittyApp = (function() {

    // Private
    // For accessing database
    var userdata = {};

    // In memory list of maps
    var usermaps = [];
    var currentMapIndex = -1;

    // Take a screenshot of the current screen
    var bTakeScreenshot = false;

    // Application preferences
    var wittyPreferences = new WittyPreferences();

    var wittyView = new WittyView();

    var wittyController = {
        init: function() {
            bTakeScreenshot = false;
            currentMapIndex = -1;

            userdata = new Userdata(wittyConfig.database.wittyMapsDBName,
                wittyConfig.database.wittyMapsTableName);
            this.addListeners();
        },

        addListeners: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        isRunningOnDevice: function() {
            var bOnDevice = false;
            if (navigator.userAgent.match(
                /(iPhone|iPod|iPad|Android|BlackBerry)/)) {
               if (navigator.userAgent.match(
                /(Safari)/)) {
                // Safari browser rather than app
                    bOnDevice = false;
                } else {
                    bOnDevice = true;
                }
            }

            //console.log('on device ' +bOnDevice)
            //console.log('navigator.userAgent' +navigator.userAgent)
            return bOnDevice;
        },

        onDeviceReady: function() {
            if (userdata) {
                var bOnDevice = wittyController.isRunningOnDevice();

                /*
                if (bOnDevice) {
                setTimeout(function() {
                        navigator.splashscreen.hide();
                    }, 500);
                }*/
                userdata.openUserdataDB(!bOnDevice);

                if (wittyPreferences) {
                    wittyPreferences.onDeviceReady();
                }

                if (wittyView) {
                    wittyView.onDeviceReady();
                }

                // Get the initial list of usermaps from Db
                wittyController.updateMapList(function onBuildOK() {});
            } else {
                alert('ERROR onDeviceReady no userdata');
            }
        },

        // Push a map onto the map stack
        addMap: function(userMap) {
            if (userMap) {
                wittyView.newMap();
                usermaps.push(userMap);
                currentMapIndex = usermaps.length - 1;
                wittyController.setCurrentMap(currentMapIndex);
            } else {
                   alert('ERROR addMap no usermap');
            }
        },

        // Remove map from in-memory data structure
        deleteCurrentMap: function() {
            usermaps.splice(currentMapIndex, 1);

           // Since we've deleted the current map, unset current
            currentMapIndex = -1;
        },

        cancelDialogMapDetails: function() {
            if (usermaps) {
                var usermap = wittyController.getCurrentMap();

                if (usermap.isUnsaved()) {
                    // If the usermap is a new add remove it from the
                    // stack in memory
                    wittyController.deleteCurrentMap();
                    wittyController.syncIndexPageControls();
               }
           }
           else {
                alert('ERROR cancelFormPage no usermaps');
           }
        },

        encryptText: function(strInputText) {
            var arrEncryptedText = CryptoJS.SHA256(strInputText);
            return arrEncryptedText.toString(CryptoJS.enc.Base64);
        },

        updateMapFromMapDetailsForm: function(usermap) {
            usermap.title = $(wittyConfig.id.mapDetailsName).val();
            usermap.description = $(wittyConfig.id.mapDetailsDescription).val();

            var mapPassword = $(wittyConfig.id.mapDetailsPassword).val();
            if (mapPassword.length > 0) {
            // Hash user supplied password
                usermap.password = wittyController.encryptText(mapPassword);
            }
            usermap.locked = ($(wittyConfig.id.mapDetailsLocked).val() ===
                'yes');
            usermap.dateCreated = $(wittyConfig.id.mapDetailsDateCreated).val();
            usermap.dateModified =
                $(wittyConfig.id.mapDetailsDateModified).val();

            if (!usermap.isLocked()) {
                usermap.password = '';
            }
        },

        saveMap: function(usermap) {
            // Copy from UI controls into map data structure
            this.updateMapFromMapDetailsForm(usermap);

            if (usermap.isUnsaved()) {
            // Save the map to the database
               if (userdata) {
                    userdata.insertUsermap(usermap,
                        function insertOK() {
                            wittyView.storeCanvas();
                            wittyController.gotoMap('saveMap 1');
//                            wittyController.updateMapList();
                        },
                        userdata.onError);
                }
            }
            else {
                // Saved map, update existing
                if (userdata) {
                    userdata.updateUsermap(usermap,
                        function callbackSuccess(tx, r) {
                        //              console.log(tx);
                        //              console.log(r);
                        //    wittyPreferences.getCreatePreferences();
                            wittyController.gotoMap('saveMap 2');
    //                        wittyController.updateMapList();
                        },
                        userdata.onError);
                }
            }
        },

        saveMapBlob: function(usermap, strMapBlob) {
            if (userdata) {
                userdata.updateUsermapBlob(usermap, strMapBlob,
                    function callbackSuccess(tx, r) {
                    },
                userdata.onError);
            }
        },

        // callbackSuccess, one param (strMapBlob)
        loadMapBlob: function(usermap, callbackSuccess) {
            if (userdata) {
                userdata.selectUsermapBlob(usermap,
                    function queryBlobSuccess(tx, results) {
                        if (results.rows.length == 1) {
                            var rowItem = results.rows.item(0);
                            var strMapBlob = rowItem.map;
                            callbackSuccess(strMapBlob);
                        }
                    },
                userdata.onError);
            }
        },

        getCurrentMap: function() {
            var currentMap = null;
            if (usermaps) {
                if (currentMapIndex == -1) {
                } else {
                    if (currentMapIndex < usermaps.length) {
                        currentMap = usermaps[currentMapIndex];
                    }
                }
            }
            return currentMap;
        },

        setCurrentMap: function(index) {
            currentMapIndex = index;
        },

        getMapFromIndex: function(index) {
            var map = null;
            if (usermaps) {
                map = usermaps[index];
            }
            return map;
        },

        gotoMap: function(strFrom) {
 /*           if (strFrom) {
                console.log('gotoMap from:'+strFrom);
            }*/
            $.mobile.changePage(wittyConfig.id.mapPage, {
               transition: 'none',
               reverse: true
            });
        },

        gotoPreferences: function() {
            $.mobile.changePage(wittyConfig.id.appPreferencesDialog,
                {role: 'dialog'});
        },

        gotoEnterPassword: function() {
           $.mobile.changePage(wittyConfig.id.enterPasswordDialog, {
               transition: 'pop',
               reverse: true
            });
        },

        gotoMapDetails: function() {
            $.mobile.changePage(wittyConfig.id.mapDetailsDialog, {
               transition: 'pop',
               reverse: true
            });
        },

        // Update homepage ui to reflect usermaps
        syncIndexPageControls: function() {
           // Set the load button to enabled if we have usermaps and add the
           // count badge
            var loadMapButton = $(wittyConfig.id.indexLoadMapButton);
            if (usermaps.length > 0) {
                if (loadMapButton.hasClass('ui-disabled')) {
                    loadMapButton.removeClass('ui-disabled');
                }

                $('.' + wittyConfig.classes.mapcountbadge).iosbadge({
                //$('.mapcountbadge').iosbadge({
                    content: usermaps.length,
                    theme: 'blue',
                    size: 36,
                    position: 'top-right' });
                    $('.' + wittyConfig.classes.mapcountbadge).show();
           }
           else {
                if (!loadMapButton.hasClass('ui-disabled')) {
                    $('.' + wittyConfig.classes.mapcountbadge).hide();
                    loadMapButton.addClass('ui-disabled');
                }
           }
        },

        wittyDateString: function(objDate) {
           return objDate.toLocaleDateString() + ' ' +
                objDate.toLocaleTimeString();
        },

        fillFormFromMap: function(usermap) {
            $(wittyConfig.id.mapDetailsName).val(usermap.title);
            $(wittyConfig.id.mapDetailsDescription).val(usermap.description);
            var objDate = new Date(usermap.dateCreated);
            $(wittyConfig.id.mapDetailsDateCreated).val(usermap.dateCreated);
            $(wittyConfig.id.mapDetailsDateModified).val(usermap.dateModified);
            $(wittyConfig.id.mapDetailsDateCreated).text(
                WittyApp.wc.wittyDateString(objDate));
            objDate = new Date(usermap.dateModified);
            $(wittyConfig.id.mapDetailsDateModified).text(
                WittyApp.wc.wittyDateString(objDate));

            // always initialise password field to empty
            $(wittyConfig.id.mapDetailsPassword).val('');

            var flip = $(wittyConfig.id.mapDetailsLocked);
            var value = (usermap.locked) ? 1 : 0;
            flip[0].selectedIndex = value;
            flip.slider('refresh');
        },

        setLockMapImage: function(usermap) {
            (usermap.locked) ?
                $(wittyConfig.id.mapDetailsLockImage).attr('src',
                    wittyConfig.images.lockedPadlockMedium) :
                $(wittyConfig.id.mapDetailsLockImage).attr('src',
                    wittyConfig.images.unlockedPadlockMedium);
        },

        setSaveMapButtonStatus: function(usermap) {
            var bEnableSaveButton = false;
            var mapName = $(wittyConfig.id.mapDetailsName).val();

            // Check that the map has a name
            if (mapName.length > 0) {
                bEnableSaveButton = true;

                // If slider is locked then check that a password is provided
                var lockedValue = $(wittyConfig.id.mapDetailsLocked).val();

                if (lockedValue === 'yes') {
                    var mapPassword =
                        $(wittyConfig.id.mapDetailsPassword).val();
                    if ((usermap.password.length == 0) &&
                     (mapPassword.length == 0)) {
                        bEnableSaveButton = false;
                    }
                }
            }

            bEnableSaveButton ?
                $(wittyConfig.id.mapDetailsSaveButton).button('enable') :
                $(wittyConfig.id.mapDetailsSaveButton).button('disable');
        },

        setPasswordFieldsStatus: function(usermap) {
            usermap.locked ?
                $(wittyConfig.id.mapDetailsPasswordFields).show() :
                $(wittyConfig.id.mapDetailsPasswordFields).hide();
        },

       // Initialise form from data
       setupForm: function(usermap) {
           // Populate the form with data
           wittyController.fillFormFromMap(usermap);

           // Set status of controls according to data
           if (usermap.isUnsaved()) {
               $(wittyConfig.id.mapDetailsDateText).hide();
               $(wittyConfig.id.mapDetailsDeleteButton).parent().hide();
           } else {
               $(wittyConfig.id.mapDetailsDateText).show();
               $(wittyConfig.id.mapDetailsDeleteButton).parent().show();
           }

           wittyController.setLockMapImage(usermap);
           wittyController.setSaveMapButtonStatus(usermap);
           wittyController.setPasswordFieldsStatus(usermap);
       },

       buildUsermaps: function(callbackSuccessfulBuild) {
            var controller = wittyController;
            if (userdata) {
                userdata.selectUsermaps(
                    function querySuccess(tx, results) {
                        var rowItem, usermap, i, savedCurrentMap;

                        // Empty the usermaps data for clean rebuild
                        usermaps = [];

                        for (i = 0; i < results.rows.length; i++) {
                            rowItem = results.rows.item(i);
                            usermap = new Usermap();
                            usermap.mapid = rowItem.mapid;
                            usermap.title = rowItem.title;
                            usermap.description = rowItem.description;
                            usermap.password = rowItem.password;
                            usermap.dateCreated = rowItem.datecreated;
                            usermap.dateModified = rowItem.datemodified;

                            if (usermap.password.length > 0) {
                                usermap.setLocked(true);
                            } else {
                                usermap.setLocked(false);
                            }
                            usermaps.push(usermap);
                            // If sorting has changed position of current

                            //usermap.show();
                        }

                        callbackSuccessfulBuild();
                },
                   userdata.onError);
           } else {
           alert('ERROR buildUsermaps no userdata');
           }
       },

        removeMap: function() {
            // delete from database
            if (userdata) {
                var usermap = wittyController.getCurrentMap();
                // onsuccess function(tx, r)
                // onerror function(tx, e)
                userdata.deleteUsermap(usermap,
                    function callbackSuccess(tx, r) {
                        wittyController.deleteCurrentMap();
    //                    wittyController.updateMapList();
                         $.mobile.changePage(wittyConfig.id.indexPage, {
                            transition: 'slide',
                            reverse: true
                        });
                    },
                userdata.onError);
            }
        },

        updateMapList: function(callbackBuildOK) {
            var mapTapHandler = function mapTap(e) {
                //   console.log('updateMapList');
                var index = e.data.mapIndex;
                //    console.log('updateMapList setting index to index');
                wittyController.setCurrentMap(index);
                var usermap = wittyController.getCurrentMap();
                //usermap.show();
                if (usermap) {
                    if (usermap.isLocked()) {
                        wittyController.gotoEnterPassword();
                    }
                    else {
                        wittyController.loadMapBlob(usermap,
                            function onSuccessfulLoad(strBlob) {
                                 wittyView.loadCanvas(strBlob);
                        });
                        wittyController.gotoMap('updateMapList');
                    }
                }
                return false;
            }; // end mapTap

            var editMapTapHandler = function editMapTap(e) {
                wittyController.setCurrentMap(e.data.mapIndex);
                //var usermap = wittyController.getCurrentMap();
                //wittyController.editMap(usermap);
                wittyController.gotoMapDetails();
            };

            // Do DB Query and populate list
            // build ordered list from usermaps
            wittyController.buildUsermaps(function onSuccessfulBuild() {
                var index, usermap, mapLockedIcon, savedCurrentMap;
                var mapList = $(wittyConfig.id.loadMapList);
                var listContent = '';
                var objDate, usermapIndex;

                // remove all items from list
                mapList.empty();

                index = usermaps.length;
                savedCurrentMap = wittyController.getCurrentMap();

                usermaps.reverse().forEach(function(usermap, i, arr) {
                //         usermaps.forEach(function(usermap, i, arr) {
                    index = index - 1;
                    var mapLink = $('<a>');
                    usermapIndex = usermaps.length - index - 1;
                    mapLink.on('tap', {mapIndex: usermapIndex}, mapTapHandler);
                    mapLockedIcon = (usermap.isLocked()) ?
                       wittyConfig.images.lockedPadlockLarge :
                       wittyConfig.images.unlockedPadlockLarge;
                    mapLink.append('<img src="' + mapLockedIcon + '" alt="">');
                    mapLink.append('<h2>' + usermap.title + '</h2>');
                    objDate = new Date(usermap.dateModified);
                    mapLink.append('<p>Last changed: ' +
                        wittyController.wittyDateString(objDate) + '</p>');
                    var newLi = $('<li>');
                    newLi.attr({'mapindex': usermapIndex,
                               'data-filtertext': usermap.title});
                    newLi.append(mapLink);
                    if (!usermap.isLocked()) {
                        var editLink = $('<a>');
                        editLink.bind('tap', {mapIndex: usermapIndex},
                            editMapTapHandler);
                        editLink.text('Edit ' + usermap.title);
                        newLi.append(editLink);
                    }

                    mapList.append(newLi);

                    if (savedCurrentMap) {
                       if (savedCurrentMap.mapid == usermap.mapid) {
                        // We have reversed the order of the usermaps so
                        // reassign the current map
                            wittyController.setCurrentMap(i);
                       }
                    } // for
                }); // builduseremaps

                callbackBuildOK();

                wittyController.syncIndexPageControls();
            });
        },

        setEnterPasswordMapsThumbImage: function(bLocked) {
           bLocked ? $(wittyConfig.id.enterPasswordThumbImage).attr('src',
                wittyConfig.images.lockedPadlockLarge) :
           $(wittyConfig.id.enterPasswordThumbImage).attr('src',
                wittyConfig.images.unlockedPadlockLarge);
        },

        enterPasswordCheck: function(usermap, callbackValid) {
           var userEnteredPassword =
                $(wittyConfig.id.enterPasswordPassword).val();
           var userEnteredHashedPassword =
                wittyController.encryptText(userEnteredPassword);

           var passwordValid = (userEnteredHashedPassword == usermap.password);

           if (passwordValid) {
                wittyController.setEnterPasswordMapsThumbImage(false);
                setTimeout(callbackValid, 500);
           } else {
                wittyController.setEnterPasswordMapsThumbImage(true);
           }
        },

        doScreenshot: function() {
           if (window.plugins) {
                if (window.plugins.screenshot) {
                    window.plugins.screenshot.saveScreenshot();
               }
           }
        },

        toggleLockMap: function(usermap) {
            var lockedValue = $(wittyConfig.id.mapDetailsLocked).val();

            if (lockedValue === 'yes') {
                usermap.locked = true;
            }
            if (lockedValue === 'no') {
                usermap.locked = false;
            }
            wittyController.setLockMapImage(usermap);
            wittyController.setPasswordFieldsStatus(usermap);
        },

        show: function() {
            console.log('=====');
            console.log('usermaps.length=' + usermaps.length);
        }
    };
   // Public
return {
    wc: wittyController,
    wv: wittyView,
    wp: wittyPreferences,
    takeScreenshot: bTakeScreenshot
    };
})();
