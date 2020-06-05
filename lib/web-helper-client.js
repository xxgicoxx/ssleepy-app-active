/*
 * Copyright (c) 2012 - 2015 Samsung Electronics Co., Ltd All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var WebHelperClient = {
    /**
     * @brief Initialize WebHelperClient object with registering a handler
     *        object.
     *
     * This is the function that initializes the WebHelperClient object. Before
     * using the functionality of WebHelperClient, make sure to call this
     * function passing the handler object as its parameter, which implements
     * callback functions that needs to be handled by the IME.
     *
     * @param handler
     *       The handler object implementing "on*" callback functions
     *
     * @code var WebHelperClientHandler = { onInit : function () { // Do what
     *       you want when your IME gets the INIT message } };
     *       WebHelperClient.initialize(WebHelperClientHandler);
     * @endcode
     * @since_tizen 2.3
     */
    initialize : function(handler) {
        this.handler = handler;
        if (this.impl === null) {
            this.impl = new this.WebHelperClientInternal(this);
        }
    },

    /**
     * IME to ISF requests The functions below, are used for sending request
     * messages to the ISF.
     */

    /**
     * @brief Leave a dlog message.
     * @since_tizen 2.3
     *
     * @param str
     *            The log message to display
     */
    log : function(str) {
        this.impl.log(str);
    },

    /**
     * @brief Commit a String to client application directly.
     * @since_tizen 2.3
     *
     * @param str
     *            The string to be committed
     */
    commitString : function(str) {
        this.impl.commitString(str);
    },
    /**
     * @brief Update a new string for preedit.
     * @since_tizen 2.3
     *
     * @param str
     *            The string to be updated
     */
    updatePreeditString : function(str) {
        this.impl.updatePreeditString(str);
    },
    /**
     * @brief Send a KeyEvent to an client application.
     * @since_tizen 2.3
     *
     * @param code
     *            The KeyEvent to be sent
     */
    sendKeyEvent : function(code) {
        this.impl.sendKeyEvent(code);
    },
    /**
     * @brief Forward a KeyEvent to client application directly, without
     *        translation by Keyboard Engine.
     *
     * The difference between the sendKeyEvent and forwardKeyEvent is that the
     * key event sent via forwardKeyEvent function will not be translated by
     * Keyboard Engine and will be delivered as it is.
     *
     * @since_tizen 2.3
     * @param code
     *            The KeyEvent to be forwarded
     */
    forwardKeyEvent : function(code) {
        this.impl.forwardKeyEvent(code);
    },
    /**
     * @brief Updates the keyboard window's geometry information
     * @since_tizen 2.3
     *
     * @param portraitWidth
     *            The width of keyboard, when in portrait mode
     * @param portraitHeight
     *            The height of keyboard, when in portrait mode
     * @param landscapeWidth
     *            The width of keyboard, when in landscape mode
     * @param landscapeHeight
     *            The height of keyboard, when in landscape mode
     */
    setKeyboardSizes : function(portraitWidth, portraitHeight, landscapeWidth,
            landscapeHeight) {
        this.impl.setKeyboardSizes(portraitWidth, portraitHeight,
                landscapeWidth, landscapeHeight);
    },
    /**
     * @brief Request to select text
     * @since_tizen 2.4
     *
     * @param start_index
     *            The start position in text
     * @param end_index
     *            The end position in text
     */
    setSelection : function(start_index, end_index) {
        this.impl.setSelection(start_index, end_index);
    },
    /**
     * @brief Request to get selected text With onUpdateSelection handler, you
     *        can get the text.
     *
     * @see onUpdateSelection
     * @since_tizen 2.4
     */
    getSelection : function() {
        this.impl.getSelection();
    },
    /**
     * @brief Request to get surrounding text. With onUpdateSurroundingText
     *        handler, you can get the text.
     *
     * @see onUpdateSurroundingText
     * @since_tizen 2.4
     *
     * @param maxlen_before
     *            The max length of before
     * @param maxlen_after
     *            The max length of after
     */
    getSurroundingText : function(maxlen_before, maxlen_after) {
        this.impl.getSurroundingText(maxlen_before, maxlen_after);
    },
    /**
     * @brief Request to delete surrounding text
     * @since_tizen 2.4
     *
     * @param offset
     *            The offset for cursor position
     * @param len
     *            The length for delete text
     */
    deleteSurroundingText : function(offset, len) {
        this.impl.deleteSurroundingText(offset, len);
    },

    /**
     * ISF to IME notifications The functions below, are called when IME needs
     * to be notified. You can implement these functions in a handler object and
     * pass it to initialize() function so that your handler functions can be
     * called on each events.
     */

    /**
     * @brief Event handler for initialization signal.
     * @since_tizen 2.3
     *
     * This signal is used to notify that the WebIME framework finished
     * initializing.
     */
    onInit : function() {
        if (typeof this.handler.onInit === 'function') {
            this.handler.onInit();
        }
    },
    /**
     * @brief Event handler for exit signal.
     * @since_tizen 2.3
     *
     * This signal is used to notify that this WebIME is about to be terminated.
     */
    onExit : function() {
        if (typeof this.handler.onExit === 'function') {
            this.handler.onExit();
        }
    },
    /**
     * @brief Event handler for focuse-in signal.
     *
     * This signal is used to do something when input context is focused in.
     *
     * @since_tizen 2.3
     * @param inputContext
     *            The handle of the client Input Context that sent this event
     */
    onFocusIn : function(inputContext) {
        if (typeof this.handler.onFocusIn === 'function') {
            this.handler.onFocusIn(inputContext);
        }
    },
    /**
     * @brief Event handler for focus-out signal.
     *
     * This signal is used to do something when input context is focused out.
     *
     * @since_tizen 2.3
     * @param inputContext
     *            The handle of the client Input Context that sent this event
     */
    onFocusOut : function(inputContext) {
        if (typeof this.handler.onFocusOut === 'function') {
            this.handler.onFocusOut(inputContext);
        }
    },

    /**
     * @brief Event handler is executed when the keyboard is shown.
     *
     * This signal is used on show keyboard.
     *
     * @since_tizen 2.3
     * @param inputContext
     *            The handle of the client Input Context that sent this event
     */
    onShow : function(inputContext) {
        if (typeof this.handler.onShow === 'function') {
            this.handler.onShow(inputContext);
        }
    },
    /**
     * @brief Event handler is executed when the keyboard is hidden.
     *
     * This signal is used on hide keyboard.
     *
     * @since_tizen 2.3
     * @param inputContext
     *            The handle of the client Input Context that sent this event
     */
    onHide : function(inputContext) {
        if (typeof this.handler.onHide === 'function') {
            this.handler.onHide(inputContext);
        }
    },

    /**
     * @brief Event handler for rotation signal.
     *
     * This signal is used to notify that the keyboard is being rotated.
     *
     * @since_tizen 2.3
     * @param degree
     *            The angle that this keyboard is being rotated to
     */
    onSetRotation : function(degree) {
        if (typeof this.handler.onSetRotation === 'function') {
            this.handler.onSetRotation(degree);
        }
    },

    /**
     * @brief Event handler is executed when the cursor position is changed.
     *
     * This signal is used to let the keyboard get the cursor position
     * information.
     *
     * @since_tizen 2.3
     * @param inputContext
     *            The handle of the client Input Context that sent this event
     * @param position
     *            The cursor position
     */
    onUpdateCursorPosition : function(inputContext, position) {
        if (typeof this.handler.onUpdateCursorPosition === 'function') {
            this.handler.onUpdateCursorPosition(inputContext, position);
        }
    },

    /**
     * @brief Event handler is called by the function getSurroundingText.
     *
     * This signal is used to let the keyboard get the surrounding text.
     *
     * @see getSurroundingText
     * @since_tizen 2.4
     * @param cursor
     *            The cursor position
     * @param text
     *            The surrounding text near the cursor
     */
    onUpdateSurroundingText : function(cursor, text) {
        if (typeof this.handler.onUpdateSurroundingText === 'function') {
            this.handler.onUpdateSurroundingText(cursor, text);
        }
    },

    /**
     * @brief Event handler is called by the function getSelection.
     *
     * This signal is used to let the keyboard get the selection.
     *
     * @see getSelection
     * @since_tizen 2.4
     * @param text
     *            The currently selected text
     */
    onUpdateSelection : function(text) {
        if (typeof this.handler.onUpdateSelection === 'function') {
            this.handler.onUpdateSelection(text);
        }
    },

    /**
     * @brief Event handler is executed when the language is changed.
     *
     * This signal is used to set input language.
     *
     * @since_tizen 2.3
     * @param language
     *            The language to be set
     */
    onSetLanguage : function(language) {
        if (typeof this.handler.onSetLanguage === 'function') {
            this.handler.onSetLanguage(language);
        }
    },

    /**
     * @brief Event handler is executed when the im data is set.
     *
     * This signal is used to send im data to keyboard.
     *
     * @since_tizen 2.3
     * @param imdata
     *            The imdata to be set
     */
    onSetImdata : function(imdata) {
        if (typeof this.handler.onSetImdata === 'function') {
            this.handler.onSetImdata(imdata);
        }
    },
    /**
     * @brief Event handler is executed when the im data is obtained.
     *
     * This signal is used to get im data from keyboard.
     *
     * @since_tizen 2.3
     * @return the current imdata value
     */
    onGetImdata : function() {
        var imdata = "";
        if (typeof this.handler.onGetImdata === 'function') {
            imdata = this.handler.onGetImdata();
        }
        this.impl.replyGetImdata(imdata);
    },

    /**
     * @brief Event handler is executed when the return key type is set.
     *
     * This signal is used to set return key type to keyboard.
     *
     * @since_tizen 2.3
     * @param type
     *            The type of return key to be set, among the following values
     *            "default", "done", "go", "join", "login", "next", "search",
     *            "send", "signin"
     */
    onSetReturnKeyType : function(type) {
        if (typeof this.handler.onSetReturnKeyType === 'function') {
            this.handler.onSetReturnKeyType(type);
        }
    },
    /**
     * @brief Event handler is executed when the return key type is obtained.
     *
     * This signal is used to get return key type from keyboard.
     *
     * @since_tizen 2.3
     * @return the current return key type value
     */
    onGetReturnKeyType : function() {
        if (typeof this.handler.onGetReturnKeyType === 'function') {
            this.handler.onGetReturnKeyType();
        }
    },

    /**
     * @brief Event handler is executed when the return key state is set.
     *
     * This signal is used to set return key disabled state to keyboard.
     *
     * @since_tizen 2.3
     * @param disabled
     *            The value that indicates whether the return key should be
     *            disabled or not
     */
    onSetReturnKeyDisable : function(disabled) {
        if (typeof this.handler.onSetReturnKeyDisable === 'function') {
            this.handler.onSetReturnKeyDisable(disabled);
        }
    },
    /**
     * @brief Event handler is executed when the return key state is obtained.
     *
     * This signal is used to get return key disabled state from keyboard.
     *
     * @since_tizen 2.3
     * @return the current return key disabled state value
     */
    onGetReturnKeyDisable : function() {
        if (typeof this.handler.onGetReturnKeyDisable === 'function') {
            this.handler.onGetReturnKeyDisable();
        }
    },

    /**
     * @brief Event handler is executed when the virtual keyboard layout is set.
     *
     * This signal is used to set virtual keyboard layout, among the following
     * values.
     *
     * @since_tizen 2.3
     * @param layout
     *            The virtual keyboard layout value to be set, "normal",
     *            "number", "email", "url", "phonenumber", "ip", "month",
     *            "numberonly", "password", "datetime"
     */
    onSetLayout : function(layout) {
        if (typeof this.handler.onSetLayout === 'function') {
            this.handler.onSetLayout(layout);
        }
    },
    /**
     * @brief Event handler is executed when the virtual keyboard layout is
     *        obtained.
     *
     * This signal is used to get virtual keyboard layout.
     *
     * @since_tizen 2.3
     * @return the current virtual keyboard layout value
     */
    onGetLayout : function() {
        if (typeof this.handler.onGetLayout === 'function') {
            this.handler.onGetLayout();
        }
    },

    /**
     * @brief Event handler is executed when the input context is resetted
     *        signal.
     *
     * This signal is used to reset keyboard input context.
     *
     * @since_tizen 2.3
     * @param inputContext
     *            The handle of the client Input Context that sent this event
     */
    onResetInputContext : function(inputContext) {
        if (typeof this.handler.onResetInputContext === 'function') {
            this.handler.onResetInputContext(inputContext);
        }
    },

    /**
     * @brief Handler for key event process signal.
     * @since_tizen 2.3
     *
     * @param code
     *            The key code of current key event
     * @param mask
     *            The key's modifier mask of current key event
     * @param layout
     *            The hardware keyboard layout identifier
     *
     * @return true if the event is processed, otherwise it will be forwarded to
     *         client application
     */
    onProcessKeyEvent : function(code, mask, layout) {
        var processed = false;
        if (typeof this.handler.onProcessKeyEvent === 'function') {
            processed = this.handler.onProcessKeyEvent(code, mask, layout);
        }
        this.impl.replyProcessKeyEvent(processed);
    },

    /**
     * @brief Keycode enumeration values used when invoking sendKeyEvent() or
     *        forwardKeyEvent() functions
     * @since_tizen 2.3
     */
    Keycode : {
        BACKSPACE : 0xff08,
        TAB : 0xff09,
        RETURN : 0xff0d,
        ESCAPE : 0xff1b,
        DELETE : 0xffff,
        HOME : 0xff50,
        LEFT : 0xff51,
        UP : 0XFf52,
        RIGHT : 0xff53,
        DOWN : 0xff54,
        PRIOR : 0xff55,
        PAGE_UP : 0xff55,
        NEXT : 0xff56,
        PAGE_DOWN : 0xff56,
        END : 0Xff57,
        INSERT : 0xff63,
        KP_SPACE : 0xff80,
        KP_TAB : 0xff89,
        KP_ENTER : 0xff8d,
        KP_F1 : 0xff91,
        KP_F2 : 0xff92,
        KP_F3 : 0xff93,
        KP_F4 : 0xff94,
        KP_HOME : 0xff95,
        KP_LEFT : 0xff96,
        KP_UP : 0xff97,
        KP_RIGHT : 0xff98,
        KP_DOWN : 0xff99,
        KP_PRIOR : 0xff9a,
        KP_PAGE_UP : 0xff9a,
        KP_NEXT : 0xff9b,
        KP_PAGE_DOWN : 0xff9b,
        KP_END : 0xff9c,
        KP_BEGIN : 0xff9d,
        KP_INSERT : 0xff9e,
        KP_DELETE : 0xff9f,
        KP_EQUAL : 0xffbd,
        KP_MULTIPLY : 0xffaa,
        KP_ADD : 0xffab,
        KP_SEPARATOR : 0xffac,
        KP_SUBTRACT : 0xffad,
        KP_DECIMAL : 0xffae,
        KP_DIVIDE : 0xffaf,
        KP_0 : 0xffb0,
        KP_1 : 0xffb1,
        KP_2 : 0xffb2,
        KP_3 : 0xffb3,
        KP_4 : 0xffb4,
        KP_5 : 0xffb5,
        KP_6 : 0xffb6,
        KP_7 : 0xffb7,
        KP_8 : 0xffb8,
        KP_9 : 0xffb9,
        F1 : 0xffbe,
        F2 : 0xffbf,
        F3 : 0xffc0,
        F4 : 0xffc1,
        F5 : 0xffc2,
        F6 : 0xffc3,
        F7 : 0xffc4,
        F8 : 0xffc5,
        F9 : 0xffc6,
        F10 : 0xffc7,
        F11 : 0xffc8,
        F12 : 0xffc9,
        SHIFT_L : 0xffe1,
        SHIFT_R : 0xffe2,
        CONTROL_L : 0xffe3,
        CONTROL_R : 0xffe4,
        CAPS_LOCK : 0xffe5,
        SHIFT_LOCK : 0xffe6,
        META_L : 0xffe7,
        META_R : 0xffe8,
        ALT_L : 0xffe9,
        ALT_R : 0xffea,
        SUPER_L : 0xffeb,
        SUPER_R : 0xffec,
        HYPER_L : 0xffed,
        HYPER_R : 0xffee,
        SPACE : 0x020,
        EXCLAM : 0x021,
        QUOTEDBL : 0x022,
        NUMBERSIGN : 0x023,
        DOLLAR : 0x024,
        PERCENT : 0x025,
        AMPERSAND : 0x026,
        APOSTROPHE : 0x027,
        QUOTERIGHT : 0x027,
        PARENLEFT : 0x028,
        PARENRIGHT : 0x029,
        ASTERISK : 0x02a,
        PLUS : 0x02b,
        COMMA : 0x02c,
        MINUS : 0x02d,
        PERIOD : 0x02e,
        SLASH : 0x02f,
        0 : 0X030,
        1 : 0X031,
        2 : 0X032,
        3 : 0X033,
        4 : 0X034,
        5 : 0X035,
        6 : 0X036,
        7 : 0X037,
        8 : 0X038,
        9 : 0X039,
        COLON : 0x03a,
        SEMICOLON : 0x03b,
        LESS : 0x03c,
        EQUAL : 0x03d,
        GREATER : 0x03e,
        QUESTION : 0x03f,
        AT : 0x040,
        A : 0X041,
        B : 0X042,
        C : 0X043,
        D : 0X044,
        E : 0X045,
        F : 0X046,
        G : 0X047,
        H : 0X048,
        I : 0x049,
        J : 0x04a,
        K : 0x04b,
        L : 0x04c,
        M : 0x04d,
        N : 0x04e,
        O : 0x04f,
        P : 0x050,
        Q : 0x051,
        R : 0x052,
        S : 0x053,
        T : 0x054,
        U : 0x055,
        V : 0x056,
        W : 0x057,
        X : 0x058,
        Y : 0x059,
        Z : 0x05a,
        BRACKETLEFT : 0x05b,
        BACKSLASH : 0x05c,
        BRACKETRIGHT : 0x05d,
        ASCIICIRCUM : 0x05e,
        UNDERSCORE : 0x05f,
        GRAVE : 0x060,
        QUOTELEFT : 0x060,
        a : 0x061,
        b : 0x062,
        c : 0x063,
        d : 0x064,
        e : 0x065,
        f : 0x066,
        g : 0x067,
        h : 0x068,
        i : 0x069,
        j : 0x06a,
        k : 0x06b,
        l : 0x06c,
        m : 0x06d,
        n : 0x06e,
        o : 0x06f,
        p : 0x070,
        q : 0x071,
        r : 0x072,
        s : 0x073,
        t : 0x074,
        u : 0x075,
        v : 0x076,
        w : 0x077,
        x : 0x078,
        y : 0x079,
        z : 0x07a,
        BRACELEFT : 0x07b,
        BAR : 0x07c,
        BRACERIGHT : 0x07d,
        ASCIITILDE : 0x07e
    },

    /*
     * The code below is only for internal implementation and not for keyboard
     * developers
     */
    impl : null,
    handler : null,
    WebHelperClientInternal : function(client) {
        this.CLIENT_VERSION = "1.11";

        this.MessageTypes = {
            PLAIN : "plain",
            QUERY : "query",
            REPLY : "reply"
        };

        this.MessageCommands = {
            INIT : "init",
            EXIT : "exit",

            FOCUS_IN : "focus_in",
            FOCUS_OUT : "focus_out",
            SHOW : "show",
            HIDE : "hide",
            SET_ROTATION : "set_rotation",
            UPDATE_CURSOR_POSITION : "update_cursor_position",
            UPDATE_SURROUNDING_TEXT : "update_surrounding_text",
            UPDATE_SELECTION : "update_selection",
            SET_LANGUAGE : "set_language",
            SET_IMDATA : "set_imdata",
            GET_IMDATA : "get_imdata",
            SET_RETURN_KEY_TYPE : "set_return_key_type",
            GET_RETURN_KEY_TYPE : "get_return_key_type",
            SET_RETURN_KEY_DISABLE : "set_return_key_disable",
            GET_RETURN_KEY_DISABLE : "get_return_key_disable",
            SET_LAYOUT : "set_layout",
            GET_LAYOUT : "get_layout",
            RESET_INPUT_CONTEXT : "reset_input_context",
            PROCESS_KEY_EVENT : "process_key_event",

            LOG : "log",
            COMMIT_STRING : "commit_string",
            UPDATE_PREEDIT_STRING : "update_preedit_string",
            SEND_KEY_EVENT : "send_key_event",
            FORWARD_KEY_EVENT : "forward_key_event",
            SET_KEYBOARD_SIZES : "set_keyboard_sizes",
            SET_SELECTION : "set_selection",
            GET_SELECTION : "get_selection",
            GET_SURROUNDING_TEXT : "get_surrounding_text",
            DELETE_SURROUNDING_TEXT : "delete_surrounding_text",
            LOGIN : "login"
        };

        this.log = function(str) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.PLAIN + " " +
                        this.MessageCommands.LOG + " " + str);
            }
        };
        this.commitString = function(str) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.PLAIN + " " +
                        this.MessageCommands.COMMIT_STRING + " " + str);
            }
        };
        this.updatePreeditString = function(str) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.PLAIN + " " +
                        this.MessageCommands.UPDATE_PREEDIT_STRING + " " +
                        str);
            }
        };
        this.sendKeyEvent = function(code) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.PLAIN + " " +
                        this.MessageCommands.SEND_KEY_EVENT + " " + code);
            }
        };
        this.forwardKeyEvent = function(code) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.PLAIN + " " +
                        this.MessageCommands.FORWARD_KEY_EVENT + " " + code);
            }
        };
        this.setKeyboardSizes = function(portraitWidth, portraitHeight,
                landscapeWidth, landscapeHeight) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.PLAIN + " " +
                        this.MessageCommands.SET_KEYBOARD_SIZES + " " +
                        portraitWidth + " " + portraitHeight + " " +
                        landscapeWidth + " " + landscapeHeight);
            }
        };
        this.setSelection = function(startIndex, endIndex) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.PLAIN + " " +
                        this.MessageCommands.SET_SELECTION + " " + startIndex +
                        " " + endIndex);
            }
        };
        this.getSelection = function() {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.PLAIN + " " +
                        this.MessageCommands.GET_SELECTION);
            }
        };
        this.getSurroundingText = function(maxLenBefore, maxLenAfter) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.PLAIN + " " +
                        this.MessageCommands.GET_SURROUNDING_TEXT + " " +
                        maxLenBefore + " " + maxLenAfter);
            }
        };
        this.deleteSurroundingText = function(offset, len) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.PLAIN + " " +
                        this.MessageCommands.DELETE_SURROUNDING_TEXT + " " +
                        offset + " " + len);
            }
        };
        this.replyGetImdata = function(data) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.REPLY + " " +
                        this.MessageCommands.GET_IMDATA + " " + data);
            }
        };
        this.replyProcessKeyEvent = function(ret) {
            if (this.socket !== null && this.socket !== "undefined") {
                this.socket.send(this.MessageTypes.REPLY + " " +
                        this.MessageCommands.PROCESS_KEY_EVENT + " " + ret);
            }
        };
        this.defaultHandler = function(data) {
            var items = data.split(" "), text_array;

            switch (items[1]) {
            case this.MessageCommands.INIT:
                client.onInit();
                break;
            case this.MessageCommands.EXIT:
                client.onExit();
                break;
            case this.MessageCommands.FOCUS_IN:
                client.onFocusIn(parseInt(items[2], 10));
                break;
            case this.MessageCommands.FOCUS_OUT:
                client.onFocusOut(parseInt(items[2], 10));
                break;
            case this.MessageCommands.SHOW:
                client.onShow(parseInt(items[2], 10));
                break;
            case this.MessageCommands.HIDE:
                client.onHide(parseInt(items[2], 10));
                break;
            case this.MessageCommands.SET_ROTATION:
                client.onSetRotation(parseInt(items[2], 10));
                break;
            case this.MessageCommands.UPDATE_CURSOR_POSITION:
                client.onUpdateCursorPosition(parseInt(items[2], 10), parseInt(
                        items[3], 10));
                break;
            case this.MessageCommands.UPDATE_SURROUNDING_TEXT:
                text_array = items.slice(3);
                client.onUpdateSurroundingText(parseInt(items[2], 10),
                        text_array.join(' '));
                break;
            case this.MessageCommands.UPDATE_SELECTION:
                client.onUpdateSelection(items[2]);
                break;
            case this.MessageCommands.SET_LANGUAGE:
                client.onSetLanguage(items[2]);
                break;
            case this.MessageCommands.SET_IMDATA:
                client.onSetImdata(items[2], items[3]);
                break;
            case this.MessageCommands.GET_IMDATA:
                client.onGetImdata();
                break;
            case this.MessageCommands.SET_RETURN_KEY_TYPE:
                client.onSetReturnKeyType(items[2]);
                break;
            case this.MessageCommands.GET_RETURN_KEY_TYPE:
                client.onGetReturnKeyType();
                break;
            case this.MessageCommands.SET_RETURN_KEY_DISABLE:
                client.onSetReturnKeyDisable(items[2]);
                break;
            case this.MessageCommands.GET_RETURN_KEY_DISABLE:
                client.onGetReturnKeyDisable();
                break;
            case this.MessageCommands.SET_LAYOUT:
                client.onSetLayout(items[2]);
                break;
            case this.MessageCommands.GET_LAYOUT:
                client.onGetLayout();
                break;
            case this.MessageCommands.RESET_INPUT_CONTEXT:
                client.onResetInputContext(parseInt(items[2], 10));
                break;
            case this.MessageCommands.PROCESS_KEY_EVENT:
                client.onProcessKeyEvent(parseInt(items[2], 10), parseInt(
                        items[3], 10), parseInt(items[4], 10));
                break;
            }
        };

        this.getAppropriateWsUrl = function() {
            return "ws://localhost:7681";
        };

        this.connectWebSocket = function() {
            // if running mozilla then use built-in WebSocket
            window.WebSocket = window.WebSocket || window.MozWebSocket;
            if (window.WebSocket !== null && window.WebSocket !== "undefined") {
                this.socket = new window.WebSocket(this.getAppropriateWsUrl(),
                        "keyboard-protocol");
            }
        };

        this.prepare = function(key) {
            this.magicKey = key;
            return this.CLIENT_VERSION;
        };
        this.activate = function() {
            this.connectWebSocket();
            this.registerHandlers(this);
        };

        this.registerHandlers = function(handler) {
            try {
                this.socket.onopen = function() {
                    this.send(handler.MessageTypes.PLAIN + " " +
                            handler.MessageCommands.LOGIN + " " +
                            handler.magicKey);
                };

                this.socket.onmessage = function(msg) {
                    handler.defaultHandler(msg.data);
                };
            } catch (exception) {
                alert(exception);
            }
        };
    }
};
