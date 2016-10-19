# Angular VWO for Visual Web Optimizer

Angular 1.x module for easy use of [Visual Web Optimizer][vwo] A/B Testing software. 
The integration is performed as described in "[Using VWO with single page apps][vwo-spa]".

## Installation

Use bower:

    $ bower install angular-vwo --save
    
Include the next line into your html file:

    <script src="bower-components/assets/angular-vwo.js"></script>
    
Add ```vwo``` to your modules dependencies:

    angular.module('app', [..., 'tracking.vwo'])
    
## Usage

Initialize module by providing your VWO account ID during the configuration phase onf your application:

    angular
        .module('app', ['tracking.vwo'])
        .config(['vwoProvider', function (vwoProvider) {
            vwoServiceProvider.init(<Your VWO Account ID>);
        }]);

Trigger VWO tracking code after your page has loaded or changed:

    angular
        .module('app')
        .controller(['vwo', function (vwo) {
            ...
            vwo.trackPage(); 
            // or: 
            // vwo.trackPage(<URL>);
        }]);
        
Custom defined conversions can be tracked by executing the following code:

    vwo.trackConversion(<Conversion Code>);

## License

MIT license. See [LICENSE.md][license]. The code snippet of VWO is property of VWO.


[vwo]: https://vwo.com/
[vwo-spa]: https://vwo.com/knowledge/use-vwo-on-single-page-apps/
[license]: LICENSE.md
