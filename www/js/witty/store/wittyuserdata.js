/**
 * @fileoverview Userdata access to map database data.
 * @author lesley.duff@iriss.org.uk (Lesley Duff)
 */

'use strict';

/**
 * Creates an instance of Userdata.
 *
 * @constructor
 * @param {string} dbUserdataName Name of database.
 * @param {string} tableUsermapsName Name of Usermaps table.
 * @this {Userdata}
 */
function Userdata(dbUserdataName, tableUsermapsName) {
    this.dbName = dbUserdataName;
    this.db = null;
    this.tableUsermapsName = tableUsermapsName;

    // SQL queries for Usermaps
    this.sqlCreateUsermap = 'CREATE TABLE IF NOT EXISTS ' +
        this.tableUsermapsName +
        '(mapid INTEGER PRIMARY KEY, title TEXT, description TEXT, ' +
        'password TEXT, datecreated DATETIME, datemodified DATETIME, map BLOB)';
    this.sqlInsertUsermap = 'INSERT INTO ' + this.tableUsermapsName +
        '(title, description, password, datecreated, datemodified) ' +
        'VALUES (?,?,?,?,?)';
    this.sqlSelectLastId = 'SELECT last_insert_rowid() FROM ' +
        this.tableUsermapsName;
    this.sqlDeleteUsermap = 'DELETE FROM ' + this.tableUsermapsName +
        ' WHERE mapid=?';
    this.sqlUpdateUsermap = 'UPDATE ' + this.tableUsermapsName +
        ' SET title=?, description=?, password=?, datecreated=?, ' +
        'datemodified=? WHERE mapid=?';
    this.sqlSelectUsermaps = 'SELECT mapid, title, description, password, ' +
        'datecreated, datemodified FROM ' +
        this.tableUsermapsName + ' ORDER BY datetime(datemodified) ASC';
    this.sqlSelectUsermapBlob = 'SELECT map FROM ' + this.tableUsermapsName +
        ' WHERE mapid=?';
    this.sqlUpdateMapBlob = 'UPDATE ' + this.tableUsermapsName +
    ' SET datemodified=?,map=? WHERE mapid=?';

    this.openUserdataDB = function(bInBrowser) {
        var userdata = this;
        if (bInBrowser) {
            if (typeof(window.openDatabase) == 'undefined') {
                alert('Error - this browser does not support ' +
                   'window.openDatabase. Try Safari or Chrome');
            } else {
                userdata.db = window.openDatabase(this.dbName,
                    '1.0', 'Witty DB', 1000000);
            }
        }
        else {
            userdata.db = window.sqlitePlugin.openDatabase({name: this.dbName});
        }
        if (userdata.db) {
            userdata.createUserdata(userdata.onSuccess, userdata.onError);
        }
    };

    // Creates the Userdata table
    this.createUserdata = function(callbackSuccess, callbackError) {
       if ((!callbackSuccess) || (!callbackError)) {
           alert('ERROR createUserdata empty callback');
       } else {
            var userdata = this;
            userdata.db.transaction(function(tx) {
// tx.executeSql('DROP TABLE wittyusermaps',[],callbackSuccess,callbackError);
                tx.executeSql(userdata.sqlCreateUsermap, []);
            }, callbackError, callbackSuccess);
       }
    };

    // Add a Usermap to the database
    this.insertUsermap = function(usermap, callbackSuccess, callbackError) {
        if ((!callbackSuccess) || (!callbackError)) {
            alert('ERROR insertUsermap empty callback');
        } else {
            var userdata = this;
            userdata.db.transaction(function(tx) {
                tx.executeSql(userdata.sqlInsertUsermap,
                    [usermap.title,
                     usermap.description,
                     usermap.password,
                     usermap.dateCreated,
                     usermap.dateModified]);
                // Update the mapid with the id of the row just inserted
                // We will use this value elsewhere to check whether a
                // usermap has been saved
                tx.executeSql(userdata.sqlSelectLastId,
                    [],
                    function(tx, result) {
                        usermap.mapid =
                              result.rows.item(0)['last_insert_rowid()'];
                    });
            },
            callbackError,
            callbackSuccess);
        }
    };

    // Delete usermap by mapid from database
    // onsuccess function(tx, r)
    // onerror function(tx, e)
    this.deleteUsermap = function(usermap, callbackSuccess, callbackError) {
        if ((!callbackSuccess) || (!callbackError)) {
            alert('ERROR deleteUsermap empty callback');
        } else {
            var userdata = this;
            userdata.db.transaction(function deleteMap(tx) {
                tx.executeSql(userdata.sqlDeleteUsermap, [usermap.mapid],
                    callbackSuccess,
                    callbackError);
            });
        }
    };

    // Update usermap by mapid from database
    this.updateUsermap = function(usermap, callbackSuccess, callbackError) {
        if ((!callbackSuccess) || (!callbackError)) {
            alert('ERROR updateUsermap empty callback');
        } else {
            var userdata = this;
            // Whenever a usermap is saved update the date modified
            usermap.dateModified = new Date();

            userdata.db.transaction(function updateMap(tx) {
                tx.executeSql(userdata.sqlUpdateUsermap,
                    [usermap.title, usermap.description, usermap.password,
                    usermap.dateCreated, usermap.dateModified, usermap.mapid],
                    callbackSuccess,
                    callbackError);
                });
        }
    };

    // Select all usermaps
    this.selectUsermaps = function(callbackQuerySuccess, callbackError) {
        if ((!callbackQuerySuccess) || (!callbackError)) {
            alert('ERROR selectUsermaps empty callback');
        } else {
            var userdata = this;
            if (userdata.db) {
                userdata.db.transaction(function queryDB(tx) {
                    tx.executeSql(userdata.sqlSelectUsermaps,
                        [],
                        callbackQuerySuccess,
                        callbackError);
                });
            }
        }
    };

    // Select one usermap blob
    this.selectUsermapBlob = function(usermap, callbackQuerySuccess,
                                      callbackError) {
        if ((!callbackQuerySuccess) || (!callbackError)) {
            alert('ERROR selectUsermapBlob empty callback');
        } else {
            var userdata = this;
            if (userdata.db) {
                userdata.db.transaction(function queryDB(tx) {
                    tx.executeSql(userdata.sqlSelectUsermapBlob,
                        [usermap.mapid],
                        callbackQuerySuccess,
                        callbackError);
                });
            }
        }
    };

    // Update SVG map blob
    this.updateUsermapBlob = function(usermap, mapBlob, callbackSuccess,
                                      callbackError) {
        if ((!callbackSuccess) || (!callbackError)) {
            alert('ERROR updateUsermapBlob empty callback');
        } else {
            var userdata = this;
            // Whenever a usermap is saved update the date modified
            usermap.dateModified = new Date();
            userdata.db.transaction(function updateMapBlob(tx) {
                tx.executeSql(userdata.sqlUpdateMapBlob,
                  [usermap.dateModified, mapBlob, usermap.mapid],
                  callbackSuccess,
                  callbackError);
            });
        }
    };

    this.onError = function(tx, err) {
        console.log('onError :');
       // alert("Error processing SQL: "+err.code);
        console.log(err.message);
        alert('ERROR sql=' + err.message);

      //  alert('Userdata, There has been an error:  Code:'+e);
       // alert(e.code);
       // log.error('database error', transaction, error);
    };

    this.onSuccess = function(tx, r) {
        // console.log(tx);
//         console.log(r);
    };
}

