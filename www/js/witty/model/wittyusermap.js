/**
 * @fileoverview Data structure representing our in-memory usermaps.
 * @author lesley.duff@iriss.org.uk (Lesley Duff)
 */

'use strict';

// Data structure for usermaps which contain metadata about the map

/**
 * Creates an instance of Usermap.
 *
 * @constructor
 * @this {Usermap}
 */
function Usermap() {
    this.mapid = Usermap.UNSAVED;
    this.title = '';
    this.description = '';
    this.password = '';
    var dateNow = new Date();
    this.dateCreated = dateNow;
    this.dateModified = dateNow;
    this.locked = false;
}

/**
 * Status for an unsaved map
 * @const
 * @type {number}
 */
Usermap.UNSAVED = -1;

/**
 * Has the map been saved?
 *
 * @this {Usermap}
 * @return {boolean}
 */
Usermap.prototype.isUnsaved = function() {
    return (this.mapid === Usermap.UNSAVED);
};

/**
 * Is the map locked - protected by a password?
 *
 * @this {Usermap}
 * @return {boolean}
 */
Usermap.prototype.isLocked = function() {
    return (this.locked === true);
};

/**
 * Set the map locked - protected by a password?
 *
 * @param {boolean} bLocked  Lock status to change to.
 * @this {Usermap}
 */
Usermap.prototype.setLocked = function(bLocked) {
    this.locked = bLocked;
};


/**
 * Helper function to show the contents of a usermap
 */
Usermap.prototype.show = function() {
    console.log('=== Usermap ===');
    console.log('Map id:' + this.mapid);
    console.log('Title:' + this.title);
    console.log('Description:' + this.description);
    console.log('Password:' + this.password);
    console.log('Date created:' + this.dateCreated);
    console.log('Date modified:' + this.dateModified);
    console.log('Date locked:' + this.locked);
};
