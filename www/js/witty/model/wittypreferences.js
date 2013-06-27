/**
 * @fileoverview Data structure representing Witty application preferences.
 * @author lesley.duff@iriss.org.uk (Lesley Duff)
 */

'use strict';

// Data structure representing Witty application preferences

/**
 * Creates an instance of WittyPreferences.
 *
 * @constructor
 * @this {WittyPreferences}
 */
function WittyPreferences() {
    // The user's secret question for password recovery something the user knows
    this.passwordSecretQuestion = '';

    // The user's answer to secret question for password recovery
    // N.B. This should always be stored in encrypted form
    this.passwordSecretAnswerEncrypted = '';
}

/**
 * Do any configuration depending on device being ready
 *
 * @this {WittyPreferences}
 * @return {void}
 */
WittyPreferences.prototype = {
    constructor: WittyPreferences,

    onDeviceReady: function() {
         this.setupSecretInfo();
    },

    setupSecretInfo: function() {
        var bHasHtml5Storage = this.hasHtml5Storage();

        if (bHasHtml5Storage) {
           var wittyPasswordSecretQuestion = localStorage.getItem(
                wittyConfig.preferences.password.itemSecretQuestion);

            if (wittyPasswordSecretQuestion) {
                this.passwordSecretQuestion = wittyPasswordSecretQuestion;
            }
            else {
                // no secret question set - create default
                 this.storeSecretQuestion(
                    wittyConfig.preferences.password.secretQuestionDefault);
            }

            var wittyPasswordSecretAnswerEncrypted = localStorage.getItem(
                wittyConfig.preferences.password.itemSecretAnswer);

            if (wittyPasswordSecretAnswerEncrypted) {
                this.passwordSecretAnswerEncrypted =
                    wittyPasswordSecretAnswerEncrypted;
            } else {
                // Not set yet add default empty
                this.passwordSecretAnswerEncrypted = '';
                this.storeSecretAnswerEncrypted(
                    this.passwordSecretAnswerEncrypted);
            }
        } else {
            alert('Error: WittyPreferences no access to HTML5 Storage');
        }
    },

    /* Does the system suppport local Storage? */
    hasHtml5Storage: function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },

    storeSecretQuestion: function(strSecretQuestion) {
        //console.log('storeSecretQuestion: '+strSecretQuestion);
        localStorage.setItem(
            wittyConfig.preferences.password.itemSecretQuestion,
            strSecretQuestion);
        this.passwordSecretQuestion = strSecretQuestion;
    },

    storeSecretAnswerEncrypted: function(strSecretAnswerEncypted) {
        //console.log('storeSecretAnswer: '+ strSecretAnswerEncypted);
        localStorage.setItem(wittyConfig.preferences.password.itemSecretAnswer,
            strSecretAnswerEncypted);
        this.passwordSecretAnswerEncrypted = strSecretAnswerEncypted;
    },

    hasSecretAnswerEncrypted: function() {
        var bHasSecretAnswerEncrypted = false;

        if (this.passwordSecretAnswerEncrypted) {
            if (this.passwordSecretAnswerEncrypted.length > 0) {
                bHasSecretAnswerEncrypted = true;
            }
        }
        return bHasSecretAnswerEncrypted;
    },

    getSecretQuestion: function() {
        return this.passwordSecretQuestion;
    },

    getSecretAnswer: function() {
        return this.passwordSecretAnswerEncrypted;
    }
};
