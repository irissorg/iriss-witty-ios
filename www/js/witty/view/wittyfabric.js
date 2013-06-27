/**
 * @fileoverview Fabric initialisation and customisation.
 * @author paul.hart@iriss.org.uk (Paul Hart)
 */

'use strict';

//----Subclass - extends fabric text class to add padding around a text object
// making it easier to tap & manipulate
    fabric.TextObject = fabric.util.createClass(fabric.Text, {
        type: 'text-object',

        initialize: function(element, options) {
            this.callSuper('initialize', element, options);
            options && this.set('split', options.split);
            this.set('width', this.get('width') + 120);
            this.set('padding', 30);
        },
        toObject: function() {
            return fabric.util.object.extend(this.callSuper('toObject'), {
                split: this.split
            });
        }

    });
    //Ensure the TextObject Subclass is used when loading the map
    fabric.TextObject.fromObject = function(object, callback) {
        return new fabric.TextObject(object.text, object);
    };

//-----Subclass - extends fabric object class to add a storage array -
// NOT used at the moment
    // fabric.WittyObject = fabric.util.createClass(fabric.Object, {
//       type: 'wittyObject',

//       initialize: function(options) {
//         options || (options = { });
//         this.callSuper('initialize', options);
//         this.set('storage', options.storage || []);
//       },

//       toObject: function() {
//         return fabric.util.object.extend(this.callSuper('toObject'), {
//           storage: this.get('storage')
//         });
//       }
//     });
//     //Ensure the TextObject Subclass is used when loading the map
//     fabric.WittyObject.fromObject = function (object, callback) {
//         return new fabric.WittyObject(object);
//     };
