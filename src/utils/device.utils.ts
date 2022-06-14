import * as _ from 'lodash';

export default class DeviceUtils {
    protected static desktop: boolean = false;
    public static iOS: boolean = false;

    public static isDesktop(): boolean {
        if (!this.desktop) {
            this._checkOS();
        }
        return this.desktop;
    }

    public static isMobile(): boolean {
        return !this.isDesktop();
    }

    private static _checkOS() {
        var ua = navigator.userAgent;

        if (/iP[ao]d|iPhone/i.test(ua)) {
            this.iOS = true;
        }

        var silk = /Silk/.test(ua); // detected in browsers

        if (
            /Windows/.test(ua) ||
            /Mac OS/.test(ua) ||
            (/Linux/.test(ua) && !silk) ||
            /CrOS/.test(ua)
        ) {
            this.desktop = true;
        }

        //  Windows Phone / Table reset
        if (
            /Windows Phone/i.test(ua) ||
            /IEMobile/i.test(ua) ||
            (/Windows NT/i.test(ua) && /Touch/i.test(ua))
        ) {
            this.desktop = false;
        }
    }

    public static getClientHeight(string: boolean = false): any {
        let height: number | string;
        if (DeviceUtils.iOS) {
            height = window.innerHeight;
        } else {
            height = document.documentElement.clientHeight;
        }
        if (string) {
            if (!_.isString(height)) {
                height = height + 'px';
            }
        }
        return height;
    }

    public static getClientWidth(string: boolean = false): any {
        let width: number | string;
        if (DeviceUtils.iOS) {
            width = window.innerWidth;
        } else {
            width = document.documentElement.clientWidth;
        }
        if (string) {
            if (!_.isString(width)) {
                width = width + 'px';
            }
        }
        return width;
    }
}
