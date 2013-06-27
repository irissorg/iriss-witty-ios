/**
 * @fileoverview Configuration object to store defaults, ids, classes, colours
 * @author lesley.duff@iriss.org.uk (Lesley Duff)
 */

'use strict';

var wittyConfig = {
    app: {
        version: '1.0'
    },
	
	preferences:{
        password: {
            itemSecretQuestion: 'witty.preferences.password.secretquestion',
            itemSecretAnswer:   'witty.preferences.password.secretanswer',
            
            secretQuestionDefault:
                'Name the first school you attended'
        }

	},
    
    database: {
        // User database data is stored in sqlite db in /Documents folder
        // Database name for user data
        wittyMapsDBName:    'wittyuser.db',
         // Table holding User Maps
        wittyMapsTableName: 'wittyusermaps'
   },
    
    mobileinit: {
        buttonMarkupHoverDelay: 50
    },
    
    // CSS ids
    id: {
        // Home page
        indexPage:                      '#indexPage',
        indexCreateMapButton:           '#indexCreateMapButton',
        indexLoadMapButton:             '#indexLoadMapButton',

        // Map Details dialog
        mapDetailsDialog:               '#mapDetailsDialog',
        mapDetailsForm:                 '#mapDetailsForm',
        mapDetailsName:                 '#mapDetailsName',
        mapDetailsPassword:             '#mapDetailsPassword',
        mapDetailsLocked:               '#mapDetailsLocked',
        mapDetailsSaveButton:           '#mapDetailsSaveButton',
        mapDetailsDeleteButton:         '#mapDetailsDeleteButton',
        mapDetailsPasswordFields:       '#mapDetailsPasswordFields',
        mapDetailsLockImage:            '#mapDetailsLockImage',
        mapDetailsDateText:             '#mapDetailsDateText',
        mapDetailsDescription:          '#mapDetailsDescription',
        mapDetailsDateCreated:          '#mapDetailsDateCreated',
        mapDetailsDateModified:         '#mapDetailsDateModified',

        // Map password dialog (for unlocking map)
        enterPasswordDialog:            '#enterPasswordDialog',
        enterPasswordForm:              '#enterPasswordForm',
        enterPasswordPassword:          '#enterPasswordPassword',
        enterPasswordThumbImage:        '#enterPasswordThumbImage',
        enterPasswordForgotPasswordLink:'#enterPasswordForgotPasswordLink',
        enterPasswordForgotPasswordLinkText:
            '#enterPasswordForgotPasswordLinkText',

        // Delete map dialog (from delete button on map details)
        deleteMapDialog:                '#deleteMapDialog',
        deleteMapConfirmButton:         '#deleteMapConfirmButton',
  
        // Map page
        mapPage:                        '#mapPage',
        mapTitleBar:                    '#mapTitleBar',
        mapAssetAddButton:              '#mapAssetAddButton',
        mapAssetRemoveButton:           '#mapAssetRemoveButton',

        // Open map page
        loadMapPage:                    '#loadMapPage',
        loadMapList:                    '#loadMapList',

        // Add asset page (pick icon)
        assetIconsPage:                 '#assetIconsPage',
        assetIconsList:                 '#assetIconsList',
        
        // Page to show all text notes for a map
        allNotesPage:                   '#allNotesPage',
        allNotesList:                   '#allNotesList',
        allNotesTitleBar:               '#allNotesTitleBar',
        allNotesEmailButton:            '#allNotesEmailButton',
        allNotesEmail:                  '#allNotesEmail',
        allNotesText:                   '#allNotesText',

        // Map options (from map page)
        optionsDialog:                  '#optionsDialog',
        optionsScreenshotButton:        '#optionsScreenshotButton',
        optionsPreferencesButton:       '#optionsPreferencesButton',
        optionsBackgroundImageSelect:   '#optionsBackgroundImageSelect',
        optionsBackgroundColourSelect:  '#optionsBackgroundColourSelect',

        // Application preferences
        appPreferencesDialog:               '#appPreferencesDialog',
        appPreferencesForm:                 '#appPreferencesForm',
        appPreferencesPasswordSecurity:     '#appPreferencesPasswordSecurity',
        appPreferencesSecretQuestion:       '#appPreferencesSecretQuestion',
        appPreferencesSecretQuestionText:   '#appPreferencesSecretQuestionText',
        appPreferencesSecretAnswer:         '#appPreferencesSecretAnswer',
        appPreferencesSecretAnswerText:     '#appPreferencesSecretAnswerText',
        appPreferencesOKButton:             '#appPreferencesOKButton',
        appPreferencesCancelButton:         '#appPreferencesCancelButton',
        
        // If user has forgotten map password show security question
        forgotPasswordDialog:               '#forgotPasswordDialog',
        forgotPasswordForm:                 '#forgotPasswordForm',
        forgotPasswordPasswordSecurity:     '#forgotPasswordPasswordSecurity',
        forgotPasswordPadlockImage:         '#forgotPasswordPadlockImage',
        forgotPasswordSecretQuestion:       '#forgotPasswordSecretQuestion',
        forgotPasswordSecretQuestionText:   '#forgotPasswordSecretQuestionText',
        forgotPasswordSecretAnswer:         '#forgotPasswordSecretAnswer',
        forgotPasswordSecretAnswerText:     '#forgotPasswordSecretAnswerText',
        forgotPasswordOKButton:             '#forgotPasswordOKButton',
        forgotPasswordCancelButton:         '#forgotPasswordCancelButton',

    // Asset settings addnote popup
        addNotePopup:                   '#addNotePopup',
        addNoteSaveNoteButton:          '#addNoteSaveNoteButton',
        addNoteTextarea:                '#addNoteTextarea',
        
        // Asset settings edit note popup
        updateNotePopup:                '#updateNotePopup',
        updateNoteTextarea:             '#updateNoteTextarea',
        updateNoteButton:               '#updateNoteButton',

        // add asset text icon page
        assetTextIconPage:              '#assetTextIconPage',
        assetTextIconTextarea:          '#assetTextIconTextarea',
        assetTextIconAddTextButton:     '#assetTextIconAddTextButton',
        assetTextIconFontList:          '#assetTextIconFontList',
        assetTextIconFontPopup:         '#assetTextIconFontPopup',
        assetTextIconAlignList:         '#assetTextIconAlignList',
        assetTextIconColourTabsInline2: '#assetTextIconColourTabsInline2',
        assetTextIconBoldCheckbox:      '#assetTextIconBoldCheckbox',
        assetTextIconItalicCheckbox:    '#assetTextIconItalicCheckbox',
       
        // Asset settings page (change title/colour)
        assetSettingsPage:              '#assetSettingsPage',
        assetSettingsTitleText:         '#assetSettingsTitleText',
        assetSettingsTitleForm:         '#assetSettingsTitleForm',
        assetSettingsNoteList:          '#assetSettingsNotesList',
        assetSettingsColourTabsInline:  '#assetSettingsColourTabsInline',
        assetSettingsAddNoteButton:     '#assetSettingsAddNoteButton',
        // ***

        aboutDiaLog:                    '#aboutDialog',
        aboutVersionText:               '#aboutVersion',
        aboutCopyrightText:             '#aboutCopyright',
        
        creditsDiaLog:                  '#creditsDialog',
        creditsIconAttributionList:     '#creditsIconAttributionList'
    },
    
    // CSS classes
    classes: {
        headerLink:             'headerLink',
        
        // Padlock
        //    used in map header
        headerPadlock:          'header-padlock',
        padlockLockedSmall:     'ui-icon-padlock-locked-small',
        padlockUnlockedSmall:   'ui-icon-padlock-unlocked-small',
        padlockLockedMedium:    'ui-icon-padlock-locked-medium',
        padlockUnlockedMedium:  'ui-icon-padlock-unlocked-medium',
        padlockLockedLarge:     'ui-icon-padlock-locked-large',
        padlockUnlockedLarge:   'ui-icon-padlock-unlocked-large',
        
        assetSettingsNoNotes:   'nonotes',
        
        mapcountbadge:          'mapcountbadge'
    },
    
    uitext: {
        assetSettingsDeleteNote:    'Delete Note',

        mapAllNotesPageTitle:       'All map notes',
        mapAllNotesEmailSubject:    '[Witty]',
        
        iriss:                      'IRISS, http://www.iriss.org.uk'
    },
    
    images: {
        mapBackground:          'images/canvas/background.svg',
        lockedPadlockMedium:    'images/ui/witty-ui-locked-36.png',
        unlockedPadlockMedium:  'images/ui/witty-ui-unlocked-36.png',
        lockedPadlockLarge:     'images/ui/witty-ui-locked-80.png',
        unlockedPadlockLarge:   'images/ui/witty-ui-unlocked-80.png'
    },
    
    colours: {
        mapBackgroundLight: '#fffff0',
        mapBackgroundDark:  '#303639',
        loadMapBackground:  '#eeeeee'
    },
    
    // Icons representing assets
    iconList: [
        // [0]=Title, [1]=url to image [2]= attribution of source of image
        // [3]= Synonyms for Title field
        ['Aeroplane', 'images/assets/noun_project_11047.svg', '<a href="http://thenounproject.com/noun/airplane/#icon-No11047" target="_blank">Airplane</a> designed by <a href="http://thenounproject.com/Simon%20Child/" target="_blank">Simon Child</a> from The Noun Project','airplane plane transport travel vehicle'],
        ['Bicycle', 'images/assets/noun_project_2418.svg', '', 'bike cycle transport travel vehicle'],
        ['Bird watching', 'images/assets/noun_project_8434.svg', '<a href="http://thenounproject.com/noun/bird-watching/#icon-No8434" target="_blank">Bird Watching</a> designed by <a href="http://thenounproject.com/tart2000" target="_blank">Arthur Schmitt</a> from The Noun Project', 'birding twitching'],
        ['Firework', 'images/assets/noun_project_8481.svg', '<a href="http://thenounproject.com/noun/bottle-rocket/#icon-No8481" target="_blank">Bottle Rocket</a> designed by <a href="http://thenounproject.com/ambarbhusari" target="_blank">Ambar Bhusari</a> from The Noun Project', 'bang explosive rocket'],
        ['Bowling ball', 'images/assets/noun_project_657.svg', '<a href="http://thenounproject.com/noun/bowling-ball/#icon-No657" target="_blank">Bowling Ball</a> from The Noun Project', 'bowls game sphere sport'],
        ['Butterfly', 'images/assets/noun_project_623.svg', '<a href="http://thenounproject.com/noun/butterfly/#icon-No623" target="_blank">Butterfly</a> from The Noun Project', 'animal insect'],
        ['Coffee cup', 'images/assets/noun_project_2391.svg', '<a href="http://thenounproject.com/noun/cafe/#icon-No2391" target="_blank">Cafe</a> Designed by <a href="http://thenounproject.com/samanbb" target="_blank">Saman Bemel-Benrud</a>', 'drink mug tea'],
        ['Cat', 'images/assets/noun_project_6985.svg', '<a href="http://thenounproject.com/noun/cat/#icon-No6985" target="_blank">Cat</a> designed by <a href="http://thenounproject.com/adamatmullin" target="_blank">Adam  Mullin</a> from The Noun Project', 'animal kitten moggy pet'],
        ['Celebrating', 'images/assets/noun_project_6215.svg', '<a href="http://thenounproject.com/noun/celebration/#icon-No6215" target="_blank">Celebration</a> designed by <a href="http://thenounproject.com/iconify" target="_blank">Scott Lewis</a> from The Noun Project', 'happy joy party perform'],
        ['Church', 'images/assets/noun_project_598.svg', '<a href="http://thenounproject.com/noun/chapel/#icon-No598" target="_blank">Chapel</a> designed by Unknown Designer Collaboration by Jack Biesek, Gladys Brenner, Margaret Faye, Healther Merrifield, Kate Keating, Wendy Olmstead, Todd Pierce, Jamie Cowgill & Jim Bolek', 'building chapel christian god religion'],
        ['Clapper board', 'images/assets/noun_project_313.svg', '<a href="http://thenounproject.com/noun/cinema/#icon-No313" target="_blank">Cinema</a> from The Noun Project', 'film video wood'],
        ['Climbing', 'images/assets/noun_project_526.svg', '', 'country hillwalking mountaineering rise travel up'],
        ['Mortar board', 'images/assets/noun_project_2402.svg', '<a href="http://thenounproject.com/noun/college/#icon-No2402" target="_blank">College</a> designed by <a href="http://thenounproject.com/samanbb" target="_blank">Saman Bemel-Benrud</a>', 'academic cap college education hat square university'],
        ['Gardening', 'images/assets/noun_project_6396.svg', '<a href="http://thenounproject.com/noun/community-garden/#icon-No6396" target="_blank">Community Garden</a> designed by <a href="http://thenounproject.com/Iconathon1" target="_blank">Iconathon</a>', 'agriculture digging flower growing horticulture outdoors plant weeding'],
        ['CD', 'images/assets/noun_project_1231.svg', '<a href="http://thenounproject.com/noun/compact-disc/#icon-No1231" target="_blank">Compact Disc</a> designed by <a href="http://thenounproject.com/johncaserta" target="_blank">John Caserta</a> from The Noun Project', 'audio data music'],
        ['Discussing', 'images/assets/noun_project_9490.svg', '<a href="http://thenounproject.com/noun/conversation/#icon-No9490" target="_blank">Conversation</a> designed by <a href="http://thenounproject.com/mvsuriano" target="_blank">Michael V. Suriano</a> from The Noun Project', 'argument chat communication onversation dispute meeting talking'],
        ['Saucepan', 'images/assets/noun_project_941.svg', '<a href="http://thenounproject.com/noun/cooking-pan/#icon-No941" target="_blank">Cooking Pan</a> designed by <a href="http://thenounproject.com/Nick%20Levesque" target="_blank">Nick Levesque</a>', 'cook food metal pan'],
        ['Dancing', 'images/assets/noun_project_11090.svg', '<a href="http://thenounproject.com/noun/dancer/#icon-No11090" target="_blank">Dancer</a> designed by <a href="http://thenounproject.com/jmkeuning" target="_blank">James Keuning</a>', 'active move party'],
        ['Dice', 'images/assets/noun_project_10541.svg', '<a href="http://thenounproject.com/noun/dice/#icon-No10541" target="_blank">Dice</a> designed by <a href="http://thenounproject.com/alexfuller" target="_blank">Alex Fuller</a> from The Noun Project', 'cube gambling'],
        ['Doughnut', 'images/assets/noun_project_4120.svg', '<a href="http://thenounproject.com/noun/doughnut/#icon-No4120" target="_blank">Doughnut</a> designed by <a href="http://thenounproject.com/jacob" target="_blank">Jacob Halton</a> from The Noun Project', 'food pastry ring'],
        ['Dress', 'images/assets/noun_project_3603.svg', '<a href="http://thenounproject.com/noun/dress/#icon-No3603" target="_blank">Dress</a> designed by <a href="http://thenounproject.com/desbenoit" target="_blank">Sébastien Desbenoit</a> from The Noun Project', 'clothing garment'],
        ['Exercising', 'images/assets/noun_project_318.svg', '', 'activity exercise fitness gym movement workout'],
        ['Film', 'images/assets/noun_project_4630.svg', '<a href="http://thenounproject.com/noun/film/#icon-No4630" target="_blank">Film</a> designed by <a href="http://thenounproject.com/iconify" target="_blank">Scott Lewis</a> from The Noun Project', 'cinema movies photograph recording video'],
        ['Fishing', 'images/assets/noun_project_662.svg', '', 'angling catching'],
        ['Game controller', 'images/assets/noun_project_444.svg', '<a href="http://thenounproject.com/noun/game/#icon-No444" target="_blank">Game</a> from The Noun Project', 'gaming nintendo playstation xbox'],
        ['Flower', 'images/assets/noun_project_2424.svg', '<a href="http://thenounproject.com/noun/garden/#icon-No2424" target="_blank">Garden</a> designed by <a href="http://thenounproject.com/samanbb" target="_blank">Saman Bemel-Benrud</a>', 'floral plant'],
        ['Giraffe', 'images/assets/noun_project_2425.svg', '<a href="http://thenounproject.com/noun/giraffe/#icon-No2425" target="_blank">Giraffe</a> designed by <a href="http://thenounproject.com/samanbb" target="_blank">Saman Bemel-Benrud</a>', 'africa animal neck tall'],
        ['Golfing', 'images/assets/noun_project_673.svg', '', 'activity club game grass green outdoors putting sport'],
        ['Guitar', 'images/assets/noun_project_1099.svg', '<a href="http://thenounproject.com/noun/guitar/#icon-No1099" target="_blank">Guitar</a> designed by <a href="http://thenounproject.com/dimewar" target="_blank">Gustavo Perez Rangel</a> from The Noun Project', 'band instrument music strings'],
        ['Hair dryer', 'images/assets/noun_project_10406.svg', '<a href="http://thenounproject.com/noun/hair-dryer/#icon-No10406" target="_blank">Hair Dryer</a> designed by <a href="http://thenounproject.com/rodfarqs" target="_blank">Rod</a> from The Noun Project', 'air blow care grooming heat hot self styling'],
        ['Haircut', 'images/assets/noun_project_17.svg', '<a href="http://thenounproject.com/noun/haircut/#icon-No17" target="_blank">Haircut</a> designed by Unknown Designer Collaboration by Roger Cook & Don Shanosky', 'brush care comb cut grooming self scissors trim'],
        ['Hamburger', 'images/assets/noun_project_10990.svg', '<a href="http://thenounproject.com/noun/hamburger/#icon-No10990" target="_blank">Hamburger</a> designed by <a href="http://thenounproject.com/skatakila" target="_blank">Ricardo Moreira</a> from The Noun Project', 'beef bun burger eat fast food mcdonalds meat roll takeaway'],
        ['Handshake', 'images/assets/noun_project_6216.svg', '<a href="http://thenounproject.com/noun/handshake/#icon-No6216" target="_blank">Handshake</a> designed by <a href="http://thenounproject.com/iconify" target="_blank">Scott Lewis</a> from The Noun Project', 'agreement contact greet hand hello introduction meet reception welcome'],
        ['Headphones', 'images/assets/noun_project_10408.svg', '<a href="http://thenounproject.com/noun/headphones/#icon-No10408" target="_blank">Headphones</a> designed by <a href="http://thenounproject.com/Stephanie%20Wauters/" target="_blank">Stephanie Wauters</a> from The Noun Project', 'audio ear head hear listen music podcast sound stereo'],
        ['Heart', 'images/assets/noun_project_11521.svg', '<a href="http://thenounproject.com/noun/heart/#icon-No11521" target="_blank">Heart</a> designed by <a href="http://thenounproject.com/megan.sheehan" target="_blank">Megan Sheehan</a> from The Noun Project', 'blood cardiac chest courage emotion health love organ'],
        ['Horse riding', 'images/assets/noun_project_2082.svg', '<a href="http://thenounproject.com/noun/horse-riding/#icon-No2082" target="_blank">Horse Riding</a> designed by <a href="http://thenounproject.com/serre.marc" target="_blank">Marc Serre</a> from The Noun Project', 'animal carry country outdoors pony racing support transport travel trek'],
        ['iPod', 'images/assets/noun_project_415.svg', '<a href="http://thenounproject.com/noun/ipod/#icon-No415" target="_blank">iPod</a> from The Noun Project', 'app listen music mobile personal portable sound stereo'],
        ['Kettle', 'images/assets/noun_project_9507.svg', '<a href="http://thenounproject.com/noun/kettle/#icon-No9507" target="_blank">Kettle</a> designed by <a href="http://thenounproject.com/sketchybear" target="_blank">James Kindred</a> from The Noun Project', 'boil coffee container cook heat liquid metal tea water'],
        ['Knitting needles', 'images/assets/noun_project_1464.svg', '<a href="http://thenounproject.com/noun/knitting-needles/#icon-No1464" target="_blank">Knitting Needles</a> designed by <a href="http://thenounproject.com/Connor Cesa" target="_blank">Connor Cesa</a> from The Noun Project', 'fabric garment heal join stitch wool yarn'],
        ['Yoga', 'images/assets/noun_project_4867.svg', '<a href="http://thenounproject.com/noun/yoga/#icon-No4867" target="_blank">Yoga</a> designed by <a href="http://thenounproject.com/jchrisa" target="_blank">James Christopher</a> from The Noun Project', 'activity buddhism breathing destress exercise flexibility meditation peace pose posture spiritual sport stretch wellbeing'],
        ['Mascara brush', 'images/assets/noun_project_2561.svg', '<a href="http://thenounproject.com/noun/mascara-brush/#icon-No2561" target="_blank">Mascara Brush</a> designed by <a href="http://thenounproject.com/andrew.mckinley" target="_blank">Andrew McKinley</a> from The Noun Project', 'care colour cosmetic eye makeup personal'],
        ['Meditating', 'images/assets/noun_project_2467.svg', '<a href="http://thenounproject.com/noun/meditation/#icon-No2467" target="_blank">Meditation</a> designed by <a href="http://thenounproject.com/cawillia" target="_blank">Carl Williamson</a> from The Noun Project', 'consider contemplate destress mindfulness reflect religious sitting spiritual'],
        ['Microphone', 'images/assets/noun_project_1844.svg', '<a href="http://thenounproject.com/noun/microphone/#icon-No1844" target="_blank">Microphone</a> designed by <a href="http://thenounproject.com/dill" target="_blank">Jakub Ukrop</a>', 'audio recording singing sound'],
        ['Music', 'images/assets/noun_project_7181.svg', '<a href="http://thenounproject.com/noun/music/#icon-No7181" target="_blank">Music</a> designed by <a href="http://thenounproject.com/andreas.bjurenborg" target="_blank">Andreas Bjurenborg</a> from The Noun Project', 'audio notes perform rhythm sing song sound tune'],
        ['Nail polish', 'images/assets/noun_project_10123.svg', '<a href="http://thenounproject.com/noun/nail-polish/#icon-No10123" target="_blank">Nail Polish</a> designed by <a href="http://thenounproject.com/jsoderberg91" target="_blank">Julia Soderberg</a> from The Noun Project', 'beauty care colour cosmetic finger hand makeup nail personal toenail'],
        ['Paint brush', 'images/assets/noun_project_7890.svg', '<a href="http://thenounproject.com/noun/paint-brush/#icon-No7890" target="_blank">Paint Brush</a> designed by <a href="http://thenounproject.com/DmitryBaranovskiy" target="_blank">Dmitry Baranovskiy</a> from The Noun Project', 'coat cover decorating diy'],
        ['Paint palette', 'images/assets/noun_project_3991.svg', '<a href="http://thenounproject.com/noun/paint-palette/#icon-No3991" target="_blank">Paint Palette</a> designed by <a href="http://thenounproject.com/bitsnbobs" target="_blank">James Fenton</a> from The Noun Project', 'board choice choose colours decorating diy'],
        ['Paint roller', 'images/assets/noun_project_475.svg', '<a href="http://thenounproject.com/noun/paint-roller/#icon-No475" target="_blank">Paint Roller</a> from The Noun Project', 'coat cover cylinder decorating diy'],
        ['Pencil', 'images/assets/noun_project_11202.svg', '<a href="http://thenounproject.com/noun/pencil/#icon-No11202" target="_blank">Pencil</a> designed by <a href="http://thenounproject.com/johncaserta" target="_blank">John Caserta</a> from The Noun Project', 'drawing lead sketch wood write writing'],
        ['Penguin', 'images/assets/noun_project_923.svg', '<a href="http://thenounproject.com/noun/penguin/#icon-No923" target="_blank">Penguin</a> designed by <a href="http://thenounproject.com/cbertoco" target="_blank">Camila Bertoco</a> from The Noun Project', 'antarctica bird black cold south sea swim white'],
        ['Picnic table', 'images/assets/noun_project_666.svg', '', 'bench drink eat food meal outdoors seat wood'],
        ['Table tennis', 'images/assets/noun_project_3528.svg', '<a href="http://thenounproject.com/noun/ping-pong/#icon-No3528" target="_blank">Ping Pong</a> designed by <a href="http://thenounproject.com/bochkovphilipp" target="_blank">Philipp Bochkov</a> from The Noun Project', 'ball bat exercise game paddle ping pong sport'],
        ['Place setting', 'images/assets/noun_project_982.svg', '<a href="http://thenounproject.com/noun/place-setting/#icon-No982" target="_blank">Place Setting</a> designed by <a href="http://thenounproject.com/iconify" target="_blank">Scott Lewis</a> from The Noun Project', 'cutlery eat food fork knife meal plate'],
        ['Plant', 'images/assets/noun_project_3382.svg', '<a href="http://thenounproject.com/noun/plant/#icon-No3382" target="_blank">Plant</a> designed by <a href="http://thenounproject.com/rick.diazgranados" target="_blank">Rick Diaz-Granados</a> from The Noun Project', 'gardening grow herb pot seed sow vegetable'],
        ['Jigsaw puzzle', 'images/assets/noun_project_8649.svg', '<a href="http://thenounproject.com/noun/puzzle/#icon-No8649" target="_blank">Puzzle</a> designed by <a href="http://thenounproject.com/dnlhtz" target="_blank">Daniel Heitz</a>', 'patience problem toy'],
        ['Reading', 'images/assets/noun_project_11537.svg', '<a href="http://thenounproject.com/noun/reading/#icon-No11537" target="_blank">Reading</a> designed by <a href="http://thenounproject.com/Luis" target="_blank">Luis Prado</a> from The Noun Project', 'book information learning look magazine newspaper paper print study'],
        ['Hammer and spanner', 'images/assets/noun_project_9352.svg', '<a href="http://thenounproject.com/noun/tools/#icon-No9352" target="_blank">Tools</a> designed by <a href="http://thenounproject.com/iconify" target="_blank">Scott Lewis</a> from The Noun Project'],
        ['Running', 'images/assets/noun_project_10322.svg', '<a href="http://thenounproject.com/noun/running/#icon-No10322" target="_blank">Running</a> designed by <a href="http://thenounproject.com/MyCall22" target="_blank">Michael Scott Fischer</a> from The Noun Project', 'activity administer escape exercise jogging hurry moving organisation quick race walking'],
        ['Sailing', 'images/assets/noun_project_461.svg', '<a href="http://thenounproject.com/noun/sail-boat/#icon-No461" target="_blank">Sail Boat</a> from The Noun Project', 'transport travel vehicle water yacht'],
        ['Bottle', 'images/assets/noun_project_9025.svg', '<a href="http://thenounproject.com/noun/scotch/#icon-No9025" target="_blank">Scotch</a> designed by <a href="http://thenounproject.com/iconify" target="_blank">Scott Lewis</a> from The Noun Project', 'alcohol drink glass wine'],
        ['Skateboarding', 'images/assets/noun_project_6326.svg', '<a href="http://thenounproject.com/noun/skate-park/#icon-No6326" target="_blank">Skate Park</a> designed by <a href="http://thenounproject.com/Iconathon1" target="_blank">Iconathon</a>', 'activity board riding skate sport transport tricks wood'],
        ['Football', 'images/assets/noun_project_1572.svg', '<a href="http://thenounproject.com/noun/soccer/#icon-No1572" target="_blank">Soccer</a> designed by <a href="http://thenounproject.com/DTB9" target="_blank">Derek Britton</a> from The Noun Project', 'activity kicking soccer sport'],
        ['Swimming', 'images/assets/noun_project_684.svg', '', 'activity dive exercise float move pool sport water'],
        ['Telescope', 'images/assets/noun_project_1646.svg', '<a href="http://thenounproject.com/noun/telescope/#icon-No1646" target="_blank">Telescope</a> designed by <a href="http://thenounproject.com/dill" target="_blank">Jakub Ukrop</a>', 'astronomy lense look moon night observation planet sky space stars'],
        ['Television modern', 'images/assets/noun_project_16078.svg', '<a href="http://thenounproject.com/noun/television/#icon-No16078" target="_blank">Television</a> designed by <a href="http://thenounproject.com/Javiercalvo1985" target="_blank">Javier Calvo Patiño</a> from The Noun Project', 'box broadcasting film image media rectangle screen tv video'],
        ['Television retro', 'images/assets/noun_project_416.svg', '<a href="http://thenounproject.com/noun/television/#icon-No416" target="_blank">Television</a> from The Noun Project', 'box broadcasting film image media rectangle screen tv video'],
        ['Tennis', 'images/assets/noun_project_8715.svg', '<a href="http://thenounproject.com/noun/tennis/#icon-No8715" target="_blank">Tennis</a> designed by <a href="http://thenounproject.com/jmkeuning" target="_blank">James Keuning</a>', 'activity ball court exercise game grass racquet sport'],
        ['Noughts and crosses', 'images/assets/noun_project_3983.svg', '<a href="http://thenounproject.com/noun/tic-tac-toe/#icon-No3983" target="_blank">Tic Tac Toe</a> designed by <a href="http://thenounproject.com/adamatmullin" target="_blank">Adam Mullin</a> from The Noun Project', 'cross game o tack tick toe zero'],
        ['Toast', 'images/assets/noun_project_4140.svg', '<a href="http://thenounproject.com/noun/toast/#icon-No4140" target="_blank">Toast</a> designed by <a href="http://thenounproject.com/jacob" target="_blank">Jacob Halton</a> from The Noun Project', 'bread breakfast brown cheese cook eat food grill heat morning'],
        ['River', 'images/assets/noun_project_6291.svg', '<a href="http://thenounproject.com/noun/urban-river/#icon-No6291" target="_blank">Urban River</a> designed by <a href="http://thenounproject.com/Iconathon1" target="_blank">Iconathon</a>', 'canal stream water'],
        ['Video camera', 'images/assets/noun_project_2116.svg', '<a href="http://thenounproject.com/noun/video-camera/#icon-No2116" target="_blank">Video Camera</a> designed by <a href="http://thenounproject.com/laar" target="_blank">Illarion Gordon</a>', 'film movie picture record sights tape'],
        ['Watering can', 'images/assets/noun_project_1387.svg', '<a href="http://thenounproject.com/noun/watering-can/#icon-No1387" target="_blank">Watering Can</a> designed by <a href="http://thenounproject.com/PKG" target="_blank">Proletkult Graphik</a> from The Noun Project', 'flower garden metal outdoors plant plastic spout water wet'],
        ['Wine', 'images/assets/noun_project_9420.svg', '<a href="http://thenounproject.com/noun/wine/#icon-No9420" target="_blank">Wine</a> designed by <a href="http://thenounproject.com/l3kn" target="_blank">Leon Rische</a> from The Noun Project', 'alcohol booze drink fluid liquid grapes spirits'],
        ['Man', 'images/assets/noun_project_2.svg', '<a href="http://thenounproject.com/noun/man/#icon-No2" target="_blank">Man</a> designed by Unknown Designer Collaboration by Roger Cook & Don Shanosky', 'boy boyfriend brother father gentleman grandfather he male mr people person spouse uncle'],
        ['Woman', 'images/assets/noun_project_5.svg', '<a href="http://thenounproject.com/noun/woman/#icon-No5" target="_blank">Woman</a> designed by Unknown Designer Collaboration by Roger Cook & Don Shanosky', 'aunt daughter female girl girlfriend grandmother lass miss mother mrs ms niece people person she sister spouse wife'],
        ['Baby', 'images/assets/noun_project_47.svg', '', 'bairn child infant juvenile kid neonatal people person toddler youth'],
        ['Group', 'images/assets/noun_project_2966.svg', '<a href="http://thenounproject.com/noun/group/#icon-No2966" target="_blank">Group</a> designed by <a href="/http://thenounproject.com/amarchadgar" target="_blank">Amar Chadgar</a> from The Noun Project', 'band company congregation crowd gang organisation people'],
        ['Broken heart', 'images/assets/noun_project_12310.svg', '<a href="http://thenounproject.com/noun/broken-heart/#icon-No12310" target="_blank">Broken Heart</a> designed by <a href="http://thenounproject.com/Luis.F.D.Martins" target="_blank">Luis Martins</a> from The Noun Project', 'blue crying depression emotion gloom grief grieving heartbreak sad sorrow tearful'],
        ['Snooker', 'images/assets/noun_project_9229.svg', '<a href="http://thenounproject.com/noun/pool-balls/#icon-No9229" target="_blank">Pool Balls</a> designed by <a href="http://thenounproject.com/eugene.dobrik" target="_blank">Eugene Dobrik</a> from The Noun Project', 'ball frame game obstruct pool sport'],
        ['House', 'images/assets/noun_project_6783.svg', '<a href="http://thenounproject.com/noun/house/#icon-No6783" target="_blank">House</a> designed by <a href="http://thenounproject.com/olynleroy" target="_blank">Olyn LeRoy</a> from The Noun Project', 'address building flat home rent mortgage'],
        ['Child', 'images/assets/noun_project_8201.svg', '<a href="http://thenounproject.com/noun/child/#icon-No8201" target="_blank">Child</a> designed by <a href="http://thenounproject.com/jens" target="_blank">Jens Tärning</a> from The Noun Project', 'bairn infant juvenile kid youth people person'],
        ['Water', 'images/assets/noun_project_15804.svg', '<a href="http://thenounproject.com/noun/water/#icon-No15804" target="_blank">Water</a> designed by <a href="http://thenounproject.com/adam.zubin" target="_blank">Adam Zubin</a> from The Noun Project', 'drink fluid rain wet'],
        ['Mountains', 'images/assets/noun_project_9021.svg', '<a href="http://thenounproject.com/noun/mountains/#icon-No9021" target="_blank">Mountains</a> designed by <a href="http://thenounproject.com/crisdobbins" target="_blank">Cris Dobbins</a> from The Noun Project', 'climbing country height hill large peak'],
        ['Motorcycle', 'images/assets/noun_project_7533.svg', '<a href="http://thenounproject.com/noun/motorcycle/#icon-No7533" target="_blank">Motorcycle</a> designed by <a href="http://thenounproject.com/misirlou" target="_blank">Benjamin Orlovski</a> from The Noun Project', 'bike harley motorbike transport travel vehicle'],
        ['Medicine', 'images/assets/noun_project_4007.svg', '<a href="http://thenounproject.com/noun/pill/#icon-No4007" target="_blank">Pill</a> designed by <a href="http://thenounproject.com/Andrew Kelly" target="_blank">Andrew Kelly</a> from The Noun Project', 'antibiotic cure drug heal health medication pill pharmaceutical prescription remedy tablet therapy treatment'],
        ['Computer', 'images/assets/noun_project_4734.svg', '<a href="http://thenounproject.com/noun/computer/#icon-No4734" target="_blank">Computer</a> designed by <a href="http://thenounproject.com/Olivier Guin" target="_blank">Olivier Guin</a> from The Noun Project', 'internet it machine pc mac web'],
        ['Computer', 'images/assets/noun_project_14875.svg', '<a href="http://thenounproject.com/noun/computer/#icon-No14875" target="_blank">Computer</a> designed by <a href="http://thenounproject.com/bravo" target="_blank">Juan Pablo Bravo</a> from The Noun Project', 'internet it machine pc mac web'],
        ['Computer', 'images/assets/noun_project_115.svg', '<a href="http://thenounproject.com/noun/computer/#icon-No115" target="_blank">Computer</a> from The Noun Project',  'internet it machine pc mac web'],
        ['Working', 'images/assets/noun_project_14894.svg', '<a href="http://thenounproject.com/noun/worker/#icon-No14894" target="_blank">Worker</a> designed by <a href="http://thenounproject.com/bravo" target="_blank">Juan Pablo Bravo</a> from The Noun Project', 'business busy effort employment job labour occupation task'],
        ['Family', 'images/assets/noun_project_8199.svg', '<a href="http://thenounproject.com/noun/family/#icon-No8199" target="_blank">Family</a> designed by <a href="http://thenounproject.com/jens" target="_blank">Jens Tärning</a> from The Noun Project', 'children father group mother parents people'],
        ['Family', 'images/assets/noun_project_11136.svg', '<a href="http://thenounproject.com/noun/family/#icon-No11136" target="_blank">Family</a> designed by <a href="http://thenounproject.com/Stephanie%20Wauters/" target="_blank">Stephanie Wauters</a> from The Noun Project', 'children father group mother parents people'],
        ['Family', 'images/assets/noun_project_11135.svg', '<a href="http://thenounproject.com/noun/family/#icon-No11135" target="_blank">Family</a> designed by <a href="http://thenounproject.com/Stephanie%20Wauters/" target="_blank">Stephanie Wauters</a> from The Noun Project', 'children father group mother parents people'],
        ['Pizza', 'images/assets/noun_project_3818.svg', '<a href="http://thenounproject.com/noun/pizza/#icon-No3818" target="_blank">Pizza</a> designed by <a href="http://thenounproject.com/marcusmichaels" target="_blank">Marcus Michaels</a> from The Noun Project', 'bread cheese disc dough eat fast food italian pie takeaway tomato'],
        ['Chips', 'images/assets/noun_project_9101.svg', '<a href="http://thenounproject.com/noun/french-fries/#icon-No9101" target="_blank">French Fries</a> designed by <a href="http://thenounproject.com/shk.kp" target="_blank">Lucas Saw</a> from The Noun Project', 'eating food french fries potato'],
        ['Rabbit', 'images/assets/noun_project_5354.svg', '<a href="http://thenounproject.com/noun/rabbit/#icon-No5354" target="_blank">Rabbit</a> from The Noun Project', 'animal bunny chatter talk'],
        ['Spider', 'images/assets/noun_project_175.svg', '<a href="http://thenounproject.com/noun/spider/#icon-No175" target="_blank">Spider</a> from The Noun Project', 'animal insect spin web'],
        ['Facebook', 'images/assets/noun_project_1307.svg', '<a href="http://thenounproject.com/noun/like/#icon-No1307" target="_blank">Like</a> designed by <a href="http://thenounproject.com/johncaserta" target="_blank">John Caserta</a> from The Noun Project', 'internet online networking social web'],
        ['Apple', 'images/assets/noun_project_5254.svg', '<a href="http://thenounproject.com/noun/apple/#icon-No5254" target="_blank">Apple</a> designed by <a href="http://thenounproject.com/mlaurence" target="_blank">Michell Laurence</a> from The Noun Project', 'fruit food'],
        ['Fruit', 'images/assets/noun_project_3378.svg', '<a href="http://thenounproject.com/noun/fruit/#icon-No3378" target="_blank">Fruit</a> designed by <a href="http://thenounproject.com/Jaymepayme" target="_blank">Jayme Davis</a> from The Noun Project', 'diet eating food'],
        ['Postcard', 'images/assets/noun_project_9497.svg', '<a href="http://thenounproject.com/noun/postbox/#icon-No9497" target="_blank">Postbox</a> designed by <a href="http://thenounproject.com/handsprings" target="_blank">Adam Williams</a> from The Noun Project', 'message note picture post'],
        ['Waiting room', 'images/assets/noun_project_3.svg', '<a href="http://thenounproject.com/noun/postbox/#icon-No3" target="_blank">Waiting Room</a> from The Noun Project', 'dentist doctor gp reception salon'],
        ['Train', 'images/assets/noun_project_67.svg', '<a href="http://thenounproject.com/noun/postbox/#icon-No67" target="_blank">Train</a> from The Noun Project', 'coach rail transport subway travel underground vehicle'],
        ['Car', 'images/assets/noun_project_72.svg', '<a href="http://thenounproject.com/noun/postbox/#icon-No72" target="_blank">Car</a> from The Noun Project', 'automobile motor transport travel vehicle'],
        ['Boat', 'images/assets/noun_project_85.svg', '<a href="http://thenounproject.com/noun/postbox/#icon-No85" target="_blank">Boat</a> from The Noun Project', 'transport travel vehicle water'],
        ['Mail', 'images/assets/noun_project_90.svg', '<a href="http://thenounproject.com/noun/postbox/#icon-No90" target="_blank">Mail</a> from The Noun Project', 'communication deliver email letter message package parcel post writing'],
        ['Dog', 'images/assets/noun_project_364.svg', '<a href="http://thenounproject.com/noun/postbox/#icon-No364" target="_blank">Dog</a> from The Noun Project', 'animal canine mongrel pet puppy'],
        ['Ferry', 'images/assets/noun_project_2420.svg', '<a href="http://thenounproject.com/noun/postbox/#icon-No2420" target="_blank">Ferry</a> from The Noun Project', 'movement transport travel vehicle water'],
        ['Pill', 'images/assets/noun_project_7773.svg', '<a href="http://thenounproject.com/noun/pill/#icon-No7773" target="_blank">Pill</a> from The Noun Project', 'capsule contraception cure drug heal health medication pharmaceutical prescription remedy therapy treatment'],
        ['Family', 'images/assets/noun_project_11182.svg', '<a href="http://thenounproject.com/noun/family/#icon-No11182" target="_blank">Family</a> from The Noun Project', 'children father group mother parents people'],
        ['Scotland', 'images/assets/noun_project_11476.svg', '<a href="http://thenounproject.com/noun/family/#icon-No11476" target="_blank">Scotland</a> from The Noun Project', 'country scottish'],
        ['Fireworks', 'images/assets/noun_project_1455.svg', '<a href="http://thenounproject.com/noun/fireworks/#icon-No1455" target="_blank">Fireworks</a> designed by <a href="http://thenounproject.com/nataliedoud" target="_blank">Natalie Doud</a> from The Noun Project', 'bang explosive rocket'],
        ['Nature', 'images/assets/noun_project_1169.svg', '<a href="http://thenounproject.com/noun/plant/#icon-No1169" target="_blank">Plant</a> designed by <a href="http://thenounproject.com/tak2101" target="_blank">Tak Imoto</a> from The Noun Project', 'animal country earth environment forest outdoors plant reserve tree'],
        ['Children', 'images/assets/noun_project_12531.svg', '<a href="http://thenounproject.com/noun/family/#icon-No12531" target="_blank">Children</a> from The Noun Project', 'bairn infant juvenile kid youth people'],
        ['Arrow up', 'images/assets/noun_project_38.svg', '<a href="http://thenounproject.com/noun/family/#icon-No38" target="_blank">Arrow Up</a> from The Noun Project'],
        ['Arrow down', 'images/assets/noun_project_35.svg', '<a href="http://thenounproject.com/noun/family/#icon-No35" target="_blank">Arrow Down</a> from The Noun Project'],
        ['Arrow left', 'images/assets/noun_project_41.svg', '<a href="http://thenounproject.com/noun/family/#icon-No41" target="_blank">Arrow Left</a> from The Noun Project'],
        ['Arrow right', 'images/assets/noun_project_34.svg', '<a href="http://thenounproject.com/noun/family/#icon-No34" target="_blank">Arrow Right</a> from The Noun Project'],
        ['Carrot','images/assets/noun_project_2122.svg','<a href="http://thenounproject.com/noun/carrot/#icon-No2122" target="_blank">Carrot</a> designed by <a href="http://thenounproject.com/kat3vogel" target="_blank">Kate Vogel</a> from The Noun Project', 'food vegetable'],
        ['Bed','images/assets/noun_project_5989.svg', '<a href="http://thenounproject.com/noun/bed/#icon-No5989" target="_blank">Bed</a> designed by <a href="http://thenounproject.com/toomanymao" target="_blank">Maurizio Pedrazzoli</a> from The Noun Project', 'health night sleep'],
        ['Bus','images/assets/noun_project_61.svg', '<a href="http://thenounproject.com/noun/bus/#icon-No61" target="_blank">Bed</a> designed by designed by Unknown Designer', 'automobile coach transport travel vehicle'],
        ['Walking','images/assets/noun_project_3516.svg','<a href="http://thenounproject.com/noun/walk/#icon-No3516" target="_blank">Walk</a> Designed by <a href="http://thenounproject.com/jthoburn/">James Thoburn</a>', 'activity exercise travel']
        ]
}