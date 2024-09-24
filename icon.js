async function icon() {
    const { UIApplication } = ObjC.classes;
    console.log("---------------------");
    var nil = ObjC.Object(ptr("0x0"));
    console.log(UIApplication.sharedApplication().setAlternateIconName_completionHandler_("AppIcon-2", nil));

    console.log("=====================");
}

icon();
