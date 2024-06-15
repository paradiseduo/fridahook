const NSMutableDictionary = ObjC.classes.NSMutableDictionary;
const NSData = ObjC.classes.NSData;
const NSString = ObjC.classes.NSString;
const UILabel = ObjC.classes.UILabel;
const UIView = ObjC.classes.UIView;
const UIViewController = ObjC.classes.UIViewController;
const UIApplication = ObjC.classes.UIApplication;
const UIScreen = ObjC.classes.UIScreen;
const NSTimer = ObjC.classes.NSTimer;
const paradise_labelDic = NSMutableDictionary.alloc().init();

function screenshot(labelText, className) {
    paradise_labelDic.setObject_forKey_(labelText, className);
    const handler = new ObjC.Block({
        retType: 'void',
        argTypes: ['object'],
        implementation() {
            var getNativeFunction = function (ex, retVal, args) {
                return new NativeFunction(Module.findExportByName('UIKit', ex), retVal, args);
            };
            var api = {
                UIWindow: ObjC.classes.UIWindow,
                UIGraphicsBeginImageContextWithOptions: getNativeFunction('UIGraphicsBeginImageContextWithOptions', 'void', [['double', 'double'], 'bool', 'double']),
                UIGraphicsBeginImageContextWithOptions: getNativeFunction('UIGraphicsBeginImageContextWithOptions', 'void', [['double', 'double'], 'bool', 'double']),
                UIGraphicsEndImageContext: getNativeFunction('UIGraphicsEndImageContext', 'void', []),
                UIGraphicsGetImageFromCurrentImageContext: getNativeFunction('UIGraphicsGetImageFromCurrentImageContext', 'pointer', []),
                UIImagePNGRepresentation: getNativeFunction('UIImagePNGRepresentation', 'pointer', ['pointer']),
                UIImageJPEGRepresentation: getNativeFunction('UIImageJPEGRepresentation', 'pointer', ['pointer', 'double'])
            };
            var view = api.UIWindow.keyWindow();
            var bounds = view.bounds();
            var size = bounds[1];
            api.UIGraphicsBeginImageContextWithOptions(size, 0, 0);
            view.drawViewHierarchyInRect_afterScreenUpdates_(bounds, true);
    
            var image = api.UIGraphicsGetImageFromCurrentImageContext();
            api.UIGraphicsEndImageContext();
    
            var png = new ObjC.Object(api.UIImageJPEGRepresentation(image, 0.5));
            var str = png.base64EncodedStringWithOptions_(0);
            console.log(className + "ƒ" + labelText + "ƒ" + str);
        }
    });
    ObjC.schedule(ObjC.mainQueue, function () {
        NSTimer.scheduledTimerWithTimeInterval_repeats_block_(0.25, 0x0, handler);
    });
}

function hook_layoutSubview() {
    var hook = UIView['- layoutSubviews'];
    Interceptor.attach(hook.implementation, {
        onEnter: function (args) {
            var self = ObjC.Object(args[0]);
            if (self.class().isSubclassOfClass_(UILabel.class())) {
                var s = self.text();
                var next = self.nextResponder();
                while (next !== null) {
                    if (next.isKindOfClass_(UIViewController.class()) || next.$className === "UIApplication") {
                        var className = next.class().toString()
                        if (paradise_labelDic.valueForKey_(className) === null) {
                            if (s.containsString_("隐私权政策")) {
                                screenshot("隐私权政策", className);
                            }
                            if (s.containsString_("用户名")) {
                                screenshot("用户名", className);
                                paradise_labelDic.setObject_forKey_("1", next.class().toString());
                            }
                            if (s.containsString_("密码")) {
                                screenshot("密码", className);
                            }
                        }
                        break;
                    }
                    next = next.nextResponder();
                }
            }
        }
    });
}

ObjC.schedule(ObjC.mainQueue, function () {
    hook_layoutSubview();
});
