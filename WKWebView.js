const NSMutableDictionary = ObjC.classes.NSMutableDictionary;
const NSNumber = ObjC.classes.NSNumber;
const NSString = ObjC.classes.NSString;
const NSURLRequest = ObjC.classes.NSURLRequest;
const NSURLSession = ObjC.classes.NSURLSession;
const NSObject = ObjC.classes.NSObject;
const WKWebViewConfiguration = ObjC.classes.WKWebViewConfiguration;
const WKWebView = ObjC.classes.WKWebView;

const MyWKURLSchemeHandler = ObjC.registerClass({
    name: 'MyWKURLSchemeHandler',
    super: NSObject,
    protocols: [ObjC.protocols.WKURLSchemeHandler],
    methods: {
        '- init': function () {
            const self = this.super.init();
            if (self !== null) {
                console.log("init");
                ObjC.bind(self, {
                          cache: NSMutableDictionary.alloc().init()
                          });
            }
            return self;
        },
        '- dealloc': function () {
            ObjC.unbind(this.self);
            this.super.dealloc();
        },
        '- webView:startURLSchemeTask:': function (webView, urlSchemeTask) {
            console.log("startURLSchemeTask");
            this.data.cache.setObject_forKey_("1", urlSchemeTask.description());
            var handler = new ObjC.Block({
                retType: 'void',
                argTypes: ['object', 'object', 'object'],
                implementation: function (data, response, error) {
                    if (this.data.cache.objectForKey_(urlSchemeTask.description()) !== null) {
                        if (error) {
                            urlSchemeTask.didFailWithError_(error);
                        } else {
                            urlSchemeTask.didReceiveResponse_(response);
                            urlSchemeTask.didReceiveData_(data);
                            urlSchemeTask.didFinish();
                        }
                    }
                }
            });
            NSURLSession.sharedSession().dataTaskWithRequest_completionHandler_(urlSchemeTask.request(), handler).resume();
        },
        '- webView:stopURLSchemeTask:': function (webView, urlSchemeTask) {
            console.log("stopURLSchemeTask");
            this.data.cache.removeObjectForKey_(urlSchemeTask.description());
        }
    }
});

function hook_WKWebView1() {
     const resolver = new ApiResolver('objc');
     resolver.enumerateMatches("+[* handlesURLScheme:]", {
         onMatch: function (i) {
             Interceptor.attach(i.address, {
                 onEnter: function (args) {
                     this.pass = false;
                     var scheme = ObjC.Object(args[2]);
                     if (scheme.isEqualToString_("https") || scheme.isEqualToString_("http")) {
                         this.pass = true;
                     }
                 },
                 onLeave(retval) {
                     if (this.pass) {
                         retval.replace(0x0);
                     }
                 }
             });
         },
         onComplete: function () {
            hook_WKWebView2();
         }
     });
}


function hook_WKWebView2() {
    var hook = WKWebView['- initWithFrame:configuration:'];
    Interceptor.attach(hook.implementation, {
        onEnter: function (args) {
            var config = WKWebViewConfiguration.alloc().init();
            if (config !== null) {
                config = ObjC.Object(args[2]).copy();
            } else {
                config = WKWebViewConfiguration.alloc().init();
            }
            if (config.urlSchemeHandlerForURLScheme_("http") !== true && WKWebView.handlesURLScheme_("http") !== true) {
                config.setURLSchemeHandler_forURLScheme_(MyWKURLSchemeHandler.alloc().init(), "http");
            }
            if (config.urlSchemeHandlerForURLScheme_("https") !== true && WKWebView.handlesURLScheme_("https") !== true) {
                config.setURLSchemeHandler_forURLScheme_(MyWKURLSchemeHandler.alloc().init(), "https");
            }
            args[2] = config;
        }
    });
}


ObjC.schedule(ObjC.mainQueue, function () {
    hook_WKWebView1();
});
