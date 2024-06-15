async function hook_request() {
    const resolver = new ApiResolver("objc");
    resolver.enumerateMatches("-[NSURLSessionTask resume]", {
        onMatch: function (i) {
            Interceptor.attach(i.address, {
                onEnter(args) {
                    if (args !== null) {
                        const { UIApplication } = ObjC.classes;
                        const receiver = ObjC.Object(args[0]);
                        const request = receiver.originalRequest();
                        const NSString = ObjC.classes.NSString;
                        var body = "";
                        if ( request.HTTPBody() !== null) {
                            body = request.HTTPBody().base64EncodedStringWithOptions_(0);
                        }
                        var status = UIApplication.sharedApplication().applicationState();
                        console.log(request.URL().absoluteString() + "ƒ" + request.allHTTPHeaderFields() + "ƒ" + request.HTTPMethod() + "ƒ" + body + "ƒ" + status);
                    }
                }
            });
        },
        onComplete: function () {

        }
    });
}

hook_request();
