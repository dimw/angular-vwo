'use strict';

angular
    .module('tracking.vwo', [])
    .provider('vwo', function () {
        var vwoService;

        return {
            init: function (accountId) {
                vwoService = new VwoService();
                vwoService.setAccountId(accountId);
            },

            $get: function () {
                return vwoService;
            }
        };
    });

function VwoService() {
    var _accountId;
    var _trackingExecuted = false;

    function executeTrackingCode(hide) {
        if (!_accountId) {
            console.error('VWO account ID is not provided!');
            return;
        }

        _trackingExecuted = true;

        var $ = window.vwo_$ || window.$ || window.jQuery;
        $ && $('.vwo_loaded').removeClass('vwo_loaded');
        window._vwo_code=(function(){
            var account_id=_accountId,
                settings_tolerance=2000,
                library_tolerance=2500,
                url = window._vis_opt_url || document.URL,
                use_existing_jquery=false,
                // DO NOT EDIT BELOW THIS LINE
                f=false,d=document;return{use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){var settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);this.load('//dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(url)+'&r='+Math.random());var a=d.createElement('style'),b=hide?hide + '{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}':'',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);return settings_timer;}};}());window._vwo_settings_timer=_vwo_code.init();
    }

    function setAccountId(accountId) {
        _accountId = accountId;
    }

    function trackPage(url) {
        if (url) {
            window._vis_opt_url = url;
        }

        executeTrackingCode();
    }

    function trackConversion(conversionCode) {
        if (_accountId) {
            if (!_trackingExecuted) {
                executeTrackingCode();
            }

            window._vis_opt_queue = window._vis_opt_queue || [];
            window._vis_opt_queue.push(function() {_vis_opt_goal_conversion(conversionCode);});
        }
    }

    return {
        setAccountId: setAccountId,
        trackPage: trackPage,
        trackConversion: trackConversion
    };
}
