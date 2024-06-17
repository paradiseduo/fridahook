1、spawn - 冷启动#
$ frida-trace -U -f com.apple.ExampleCode -m "+[NSURL URLWithString:]"

2、attach - 热启动#
$ frida-trace -UF -m "+[NSURL URLWithString:]"

3、Hook类方法#
$ frida-trace -UF -m "+[NSURL URLWithString:]"

4、Hook实例方法#
$ frida-trace -UF -m "-[NSURL host]"

5、Hook类的所有方法#
$ frida-trace -UF -m "*[NSURL *]"

6、模糊Hook类的所有方法#
$ frida-trace -UF -m "*[*service* *]"

7、模糊Hook所有类的特定方法#
$ frida-trace -UF -m "*[* *sign*]"

8、模糊Hook所有类的特定方法并忽略大小写#
假设我们要hook所有类中包含getSign或getsign关键词的方法

$ frida-trace -UF -m "*[* get?ign]"
9、模糊Hook所有类的特定方法并排除viewDidLoad方法#
$ frida-trace -UF -m "*[DetailViewController *]" -M "-[DetailViewController viewDidLoad]"

10、Hook某个动态库#
$ frida-trace -UF -I "libcommonCrypto*"

11、Hook get或post的接口地址#
$ frida-trace -UF -m "+[NSURL URLWithString:]"
js代码如下：

{
  onEnter(log, args, state) {
    var args2 = new ObjC.Object(args[2]);
    log(`-[NSURL URLWithString:${args2}]`);
  },
  onLeave(log, retval, state) {
  }
}

12、Hook post的body#
$ frida-trace -UF -m "-[NSMutableURLRequest setHTTPBody:]"
js代码如下：

{
  onEnter(log, args, state) {
    var args2 = new ObjC.Object(args[2]);
    log(`-[NSMutableURLRequest setHTTPBody:${args2.bytes().readUtf8String(args2.length())}]`);
  },
  onLeave(log, retval, state) {
  }
}

13、Hook即将显示页面#
$ frida-trace -UF -m "-[UINavigationController pushViewController:animated:]" -m "-[UIViewController presentViewController:animated:completion:]"
pushViewController:animated:方法的js代码如下：

{
  onEnter(log, args, state) {
    var args2 = new ObjC.Object(args[2]);
    log(`-[UINavigationController pushViewController:${args2.$className} animated:${args[3]}]`);
  },
  onLeave(log, retval, state) {
  }
}
presentViewController:animated:completion:方法对应的js代码如下：

{
  onEnter(log, args, state) {
    var args2 = new ObjC.Object(args[2]);
    log(`-[UIViewController presentViewController:${args2.$className} animated:${args[3]} completion:${args[4]}]`);
  },
  onLeave(log, retval, state) {
  }
}

14、Hook MD5函数#
$ frida-trace -UF -i "CC_MD5"
js代码如下：

{
  onEnter(log, args, state) {
    this.args0 = args[0];	// 入参
    this.args2 = args[2];	// 返回值指针
  },
  onLeave(log, retval, state) {
    var ByteArray = Memory.readByteArray(this.args2, 16);
    var uint8Array = new Uint8Array(ByteArray);

    var str = "";
    for(var i = 0; i < uint8Array.length; i++) {
        var hextemp = (uint8Array[i].toString(16))
        if(hextemp.length == 1){
            hextemp = "0" + hextemp
        }
        str += hextemp;
    }
    log(`CC_MD5(${this.args0.readUtf8String()})`);   	// 入参
    log(`CC_MD5()=${str}=`);													// 返回值
  }
}

15、Hook Base64编码方法#
$ frida-trace -UF -m "-[NSData base64EncodedStringWithOptions:]"
js代码如下：

{
  onEnter(log, args, state) {
    this.self = args[0];
  },
  onLeave(log, retval, state) {
    var before = ObjC.classes.NSString.alloc().initWithData_encoding_(this.self, 4);
    var after = new ObjC.Object(retval);
    log(`-[NSData base64EncodedStringWithOptions:]before=${before}=`);
    log(`-[NSData base64EncodedStringWithOptions:]after=${after}=`);
  }
}

16、Hook Base64解码方法#
$ frida-trace -UF -m "-[NSData initWithBase64EncodedData:options:]" -m "-[NSData initWithBase64EncodedString:options:]"
initWithBase64EncodedData:options:方法对应的js代码如下：

{
  onEnter(log, args, state) {
    this.arg2 = args[2];
  },
  onLeave(log, retval, state) {
    var before = ObjC.classes.NSString.alloc().initWithData_encoding_(this.arg2, 4);
    var after = ObjC.classes.NSString.alloc().initWithData_encoding_(retval, 4);
    log(`-[NSData initWithBase64EncodedData:]before=${before}=`);
    log(`-[NSData initWithBase64EncodedData:]after=${after}=`);
  }
}

initWithBase64EncodedString:options:方法对应的js代码如下：

{
  onEnter(log, args, state) {
    this.arg2 = args[2];
  },
  onLeave(log, retval, state) {
    var before = new ObjC.Object(this.arg2);
    var after = ObjC.classes.NSString.alloc().initWithData_encoding_(retval, 4);
    log(`-[NSData initWithBase64EncodedString:]before=${before}=`);
    log(`-[NSData initWithBase64EncodedString:]after=${after}=`);
  }
}

17、Hook加密函数AES、DES、3DES#
frida-trace -UF -i CCCrypt
js代码如下：

{
	onEnter: function(log, args, state) {
		this.op = args[0]
		this.alg = args[1]
		this.options = args[2]
		this.key = args[3]
		this.keyLength = args[4]
		this.iv = args[5]
		this.dataIn = args[6]
		this.dataInLength = args[7]
		this.dataOut = args[8]
		this.dataOutAvailable = args[9]
		this.dataOutMoved = args[10]

		log('CCCrypt(' +
			'op: ' + this.op + '[0:加密,1:解密]' + ', ' +
			'alg: ' + this.alg + '[0:AES128,1:DES,2:3DES]' + ', ' +
			'options: ' + this.options + '[1:ECB,2:CBC,3:CFB]' + ', ' +
			'key: ' + this.key + ', ' +
			'keyLength: ' + this.keyLength + ', ' +
			'iv: ' + this.iv + ', ' +
			'dataIn: ' + this.dataIn + ', ' +
			'inLength: ' + this.inLength + ', ' +
			'dataOut: ' + this.dataOut + ', ' +
			'dataOutAvailable: ' + this.dataOutAvailable + ', ' +
			'dataOutMoved: ' + this.dataOutMoved + ')')

		if (this.op == 0) {
			log("dataIn:")
			log(hexdump(ptr(this.dataIn), {
				length: this.dataInLength.toInt32(),
				header: true,
				ansi: true
			}))
			log("key: ")
			log(hexdump(ptr(this.key), {
				length: this.keyLength.toInt32(),
				header: true,
				ansi: true
			}))
			log("iv: ")
			log(hexdump(ptr(this.iv), {
				length: this.keyLength.toInt32(),
				header: true,
				ansi: true
			}))
		}
	},
	onLeave: function(log, retval, state) {
		if (this.op == 1) {
			log("dataOut:")
			log(hexdump(ptr(this.dataOut), {
				length: Memory.readUInt(this.dataOutMoved),
				header: true,
				ansi: true
			}))
			log("key: ")
			log(hexdump(ptr(this.key), {
				length: this.keyLength.toInt32(),
				header: true,
				ansi: true
			}))
			log("iv: ")
			log(hexdump(ptr(this.iv), {
				length: this.keyLength.toInt32(),
				header: true,
				ansi: true
			}))
		} else {
			log("dataOut:")
			log(hexdump(ptr(this.dataOut), {
				length: Memory.readUInt(this.dataOutMoved),
				header: true,
				ansi: true
			}))
		}
		log("CCCrypt did finish")
	}
}

18、Hook加密函数RSA#
rsa加密有公钥加密和私钥加密两种方式

$ frida-trace -UF -i "SecKeyEncrypt" -i "SecKeyRawSign"
SecKeyEncrypt公钥加密函数对应的js代码如下：

{
  onEnter(log, args, state) {
    // 由于同一条加密信息可能会多次调用该函数，故在这输出该函数的调用栈。可根据栈信息去分析上层函数
    log(`SecKeyEncrypt()=${args[2].readCString()}=`);
    log('SecKeyEncrypt called from:\n' +
        Thread.backtrace(this.context, Backtracer.ACCURATE)
        .map(DebugSymbol.fromAddress).join('\n') + '\n');
  },
  onLeave(log, retval, state) {
  }
}
SecKeyRawSign私钥加密函数对应的js代码如下：

{
  onEnter(log, args, state) {
    log(`SecKeyRawSign()=${args[2].readCString()}=`);
    log('SecKeyRawSign called from:\n' +
        Thread.backtrace(this.context, Backtracer.ACCURATE)
        .map(DebugSymbol.fromAddress).join('\n') + '\n');
  },
  onLeave(log, retval, state) {
  }
}

19、修改方法的入参#
$ frida-trace -UF -m "-[DetailViewController setObj:]"
js代码如下：

{
  onEnter(log, args, state) {
    var self = new ObjC.Object(args[0]);  // 当前对象
    var method = args[1].readUtf8String();  // 当前方法名
    log(`[${self.$className} ${method}]`);

    // 字符串
    // var str = ObjC.classes.NSString.stringWithString_("hi wit!")  // 对应的oc语法：NSString *str = [NSString stringWithString:@"hi with!"];
    // args[2] = str  // 修改入参为字符串

    // 数组
    // var array = ObjC.classes.NSMutableArray.array();  // 对应的oc语法：NSMutableArray array = [NSMutablearray array];
    // array.addObject_("item1");  // 对应的oc语法：[array addObject:@"item1"];
    // array.addObject_("item2");  // 对应的oc语法：[array addObject:@"item2"];
    // args[2] = array; // 修改入参为数组

    // 字典
    // var dictionary = ObjC.classes.NSMutableDictionary.dictionary(); // 对应的oc语法:NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
    // dictionary.setObject_forKey_("value1", "key1"); // 对应的oc语法：[dictionary setObject:@"value1" forKey:@"key1"]
    // dictionary.setObject_forKey_("value2", "key2"); // 对应的oc语法：[dictionary setObject:@"value2" forKey:@"key2"]
    // args[2] = dictionary; // 修改入参为字典

    // 字节
    var data = ObjC.classes.NSMutableData.data(); // 对应的oc语法：NSMutableData *data = [NSMutableData data];
    var str = ObjC.classes.NSString.stringWithString_("hi wit!")  // 获取一个字符串。 对应的oc语法：NSString *str = [NSString stringWithString:@"hi with!"];
    var subData = str.dataUsingEncoding_(4);  // 将str转换为data,编码为utf-8。对应的oc语法：NSData *subData = [str dataUsingEncoding:NSUTF8StringEncoding];
    data.appendData_(subData);  // 将subData添加到data。对应的oc语法：[data appendData:subData];
    args[2] = data; // 修改入参字段

    // 更多数据类型：https://developer.apple.com/documentation/foundation
  },

  onLeave(log, retval, state) {

  }
}

20、修改方法的返回值#
$ frida-trace -UF -m "-[DetailViewController Obj]"
js代码如下：

{
  onEnter(log, args, state) {

  },
  onLeave(log, retval, state) {
    // 字符串
    var str = ObjC.classes.NSString.stringWithString_("hi wit!")  // 对应的oc语法：NSString *str = [NSString stringWithString:@"hi with!"];
    retval.replace(str)  // 修改返回值
    var after = new ObjC.Object(retval); // 打印出来是个指针时，请用该方式转换后再打印
    log(`before:=${retval}=`);
    log(`after:=${after}=`);
  }
}

21、打印字符串、数组、字典#
$ frida-trace -UF -m "-[DetailViewController setObj:]"
js代码如下：

{
  onEnter(log, args, state) {
    var self = new ObjC.Object(args[0]);  // 当前对象
    var method = args[1].readUtf8String();  // 当前方法名
    log(`[${self.$className} ${method}]`);

    var before = args[2];
    // 注意，日志输出请直接使用log函数。不要使用console.log()
    var after = new ObjC.Object(args[2]); // 打印出来是个指针时，请用该方式转换后再打印
    log(`before:=${before}=`);
    log(`after:=${after}=`);
  },
  onLeave(log, retval, state) {

  }
}

22、打印NSData#
$ frida-trace -UF -m "-[DetailViewController setObj:]"
js代码如下：

{
  onEnter(log, args, state) {
    var self = new ObjC.Object(args[0]);  // 当前对象
    var method = args[1].readUtf8String();  // 当前方法名
    log(`[${self.$className} ${method}]`);

    var before = args[2];

    // 注意，日志输出请直接使用log函数。不要使用console.log()
   
    var after = new ObjC.Object(args[2]); // 打印NSData
    var outValue = after.bytes().readUtf8String(after.length()) // 将data转换为string
    log(`before:=${before}=`);
    log(`after:=${outValue}=`);
  },
  onLeave(log, retval, state) {

  }
}

23、打印对象的所有属性和方法#
$ frida-trace -UF -m "-[DetailViewController setObj:]"
js代码如下：

{
  onEnter(log, args, state) {
    var self = new ObjC.Object(args[0]);  // 当前对象
    var method = args[1].readUtf8String();  // 当前方法名
    log(`[${self.$className} ${method}]`);

    var customObj = new ObjC.Object(args[2]); // 自定义对象
    // 打印该对象所有属性
    var ivarList = customObj.$ivars;
    for (key in ivarList) {
       log(`key${key}=${ivarList[key]}=`);
    }

    // 打印该对象所有方法
    var methodList = customObj.$methods;
    for (var i=0; i<methodList.length; i++) {
       log(`method=${methodList[i]}=`);
    }
  },
  onLeave(log, retval, state) {

  }
}

24、打印调用栈#
$ frida-trace -UF -m "+[NSURL URLWithString:]"
js代码如下：

{
  onEnter(log, args, state) {
    var url = new ObjC.Object(args[2]);
    log(`+[NSURL URLWithString:${url}]`);
    log('NSURL URLWithString: called from:\n' +
        Thread.backtrace(this.context, Backtracer.ACCURATE)
        .map(DebugSymbol.fromAddress).join('\n') + '\n');
  },
  onLeave(log, retval, state) {
  }
}

25、日志输出到文件#
$ frida-trace -UF -m "+[NSURL URLWithString:]" -o run.log
