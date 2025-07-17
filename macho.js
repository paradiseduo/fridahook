function hook_specific_method_of_class(className, funcName, baseAddress) {
    var hook = ObjC.classes[className][funcName];
    console.log(hook.implementation);
    console.log(`函数偏移：0x${(hook.implementation-baseAddress).toString(16)}`);
}

// Frida脚本：获取主Mach-O的起始内存地址
function getMainMachOBaseAddress() {
    // 枚举所有模块
    const modules = Process.enumerateModules();
    if (modules.length === 0) {
        console.log("未找到任何模块");
        return null;
    }
    
    // 主Mach-O通常是第一个模块（名称为App的可执行文件名）
    const mainModule = modules[0];
    console.log(`主Mach-O名称：${mainModule.name}`);
    console.log(`主Mach-O起始内存地址：0x${mainModule.base.toString(16)}`);
    
    return mainModule.base;
}

// 执行并获取地址
const base = getMainMachOBaseAddress();

//Your class name  and function name here
hook_specific_method_of_class("ViewController", "- viewDidLoad", base);
