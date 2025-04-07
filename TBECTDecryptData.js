Interceptor.attach(Module.findExportByName(null, "TBECTDecryptData"), {
    onEnter: function(args) {
        console.log(ObjC.Object(args[0]));
        console.log(ObjC.Object(args[1]));
    },
    onLeave: function(retval) {
        console.log("\t[-] Type of return value: " + typeof retval);
        console.log("\t[-] Original Return Value: " + ObjC.Object(retval));
    },
})
