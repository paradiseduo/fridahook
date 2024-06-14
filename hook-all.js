function hook_class_method(class_name, method_name)
{
    var hook = ObjC.classes[class_name][method_name];
        Interceptor.attach(hook.implementation, {
            onEnter: function(args) {
                console.log(ObjC.Object(args[3]));
                // console.log(Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
            // console.log("[*] Detected call to: " + class_name + " -> " + method_name);
        },
        onLeave: function (retval) {
            // console.log(retval)
            // console.log("[*] Return call to: " + class_name + " -> " + method_name + " -> " + retval);
        }
    });
}

function hook_class_method2(class_name, method_name)
{
    var hook = ObjC.classes[class_name][method_name];
        Interceptor.attach(hook.implementation, {
            onEnter: function(args) {
                console.log(ObjC.Object(args[2]));
                // console.log(Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
            // console.log("[*] Detected call to: " + class_name + " -> " + method_name);
        },
        onLeave: function (retval) {
            // console.log(retval)
            retval = ObjC.Object(ptr("0x0"));
            // console.log("[*] Return call to: " + class_name + " -> " + method_name + " -> " + retval);
        }
    });
}

function run_hook_all_methods_of_specific_class(className_arg)
{
    console.log("[*] Started: Hook all methods of a specific class");
    console.log("[+] Class Name: " + className_arg);
    var className = className_arg;
    var methods = ObjC.classes[className].$ownMethods;
    for (var i = 0; i < methods.length; i++)
    {
        console.log("[-] "+methods[i]);
        // console.log("\t[*] Hooking into implementation");
        var className2 = className;
        var funcName2 = methods[i];
        hook_class_method(className2, funcName2);
        console.log("\t[*] Hooking successful");
    }
    console.log("[*] Completed: Hook all methods of a specific class");
}

function hook_all_methods_of_specific_class(className_arg)
{
    setImmediate(run_hook_all_methods_of_specific_class,[className_arg])
}

hook_all_methods_of_specific_class("")
hook_class_method("XXXXX", "- XXXXX:")
