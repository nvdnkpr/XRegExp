/*!
 * XRegExp BackCompat 3.0.0-pre
 * <http://xregexp.com/>
 * Steven Levithan � 2012 MIT License
 */

/**
 * Provides backward compatibility with XRegExp 1.x.x.
 */
(function (XRegExp) {
    'use strict';

    var REGEX_DATA = 'xregexp';

/**
 * XRegExp 2.0.0 doesn't override native methods or allow syntax extensions by default.
 */
    XRegExp.install('natives extensibility');

/**
 * @deprecated As of XRegExp 2.0.0. Replaced by {@link #XRegExp.globalize}.
 */
    XRegExp.copyAsGlobal = XRegExp.globalize;

/**
 * @deprecated As of XRegExp 2.0.0. Replaced by {@link #XRegExp.exec}.
 */
    XRegExp.execAt = XRegExp.exec;

/**
 * @deprecated As of XRegExp 2.0.0. Replaced by {@link #XRegExp.forEach}.
 */
    XRegExp.iterate = XRegExp.forEach;

/**
 * @deprecated As of XRegExp 2.0.0. No replacement.
 */
    XRegExp.freezeTokens = function () {
        XRegExp.uninstall('extensibility');
        delete XRegExp.install;
    };

/**
 * @deprecated As of XRegExp 2.0.0. Replaced by {@link #XRegExp.prototype.apply} in addon.
 */
    RegExp.prototype.apply = function (context, args) {
        return this.test(args[0]);
    };

/**
 * @deprecated As of XRegExp 2.0.0. Replaced by {@link #XRegExp.prototype.call} in addon.
 */
    RegExp.prototype.call = function (context, str) {
        return this.test(str);
    };

/**
 * @deprecated As of XRegExp 1.5.0. Replaced by {@link #XRegExp.matchChain}.
 */
    XRegExp.matchWithinChain = XRegExp.matchChain;

/**
 * @deprecated As of XRegExp 1.5.0. No replacement.
 */
    RegExp.prototype.addFlags = function (flags) {
        var regex = XRegExp(
                this.source,
                /\/([a-z]*)$/i.exec(String(this))[1] + (flags || '')
            ),
            captureNames = this[REGEX_DATA] ? this[REGEX_DATA].captureNames : null;
        regex[REGEX_DATA] = {
            captureNames: captureNames ? captureNames.slice(0) : null,
            isNative: false // Always passed through `XRegExp`
        };
        return regex;
    };

/**
 * @deprecated As of XRegExp 1.5.0. No replacement.
 */
    RegExp.prototype.forEachExec = function (str, callback, context) {
        XRegExp.forEach(str, this, callback, context);
    };

/**
 * @deprecated As of XRegExp 1.5.0. No replacement.
 */
    RegExp.prototype.validate = function (str) {
        var regex = new RegExp(
            '^(?:' + this.source + ')$(?!\\s)',
            /\/([a-z]*)$/i.exec(String(this))[1]
        );
        if (this.global) {
            this.lastIndex = 0;
        }
        return str.search(regex) === 0;
    };

/**
 * @deprecated As of XRegExp 1.2.0. No replacement.
 */
    RegExp.prototype.execAll = function (str) {
        return XRegExp.forEach(str, this, function (match) {
            this.push(match);
        }, []);
    };

}(XRegExp));
