// var socket = Module.findExportByName("libsystem_kernel.dylib", "connect");
// Interceptor.attach(socket, {
//     onEnter: function(args) {
//         console.log("connect called with args: " + args[0] + ", " + args[1] + ", " + args[2]);
//     },
//     onLeave: function(retval) {
//         console.log("connect returned: " + retval);
//     }
// });


var recvfrom = Module.findExportByName("libsystem_kernel.dylib", "recvfrom");
Interceptor.attach(recvfrom, {
    onEnter: function(args) {
        this.gargs = new Array(6);
        for (var i = 0; i < 6; i++) this.gargs[i] = args[i];
    },
    onLeave: function(retval) {
        var args = this.gargs;
        var sockfd = args[0].toInt32();
        var buf = args[1];
        var len = retval.toInt32();
        var dest_addr = args[4];
        if (dest_addr.equals(0)) {
            dest_addr = Memory.alloc(16);
            var addr_len = Memory.alloc(4);
            Memory.writeU32(addr_len, 16);
            var getpeername = new NativeFunction(Module.findExportByName("libsystem_kernel.dylib", "getpeername"), "int", ["int", "pointer", "pointer"]);
            getpeername(sockfd, dest_addr, addr_len);
        }
        var sin_family = Memory.readU8(dest_addr.add(1));
        // if (sin_family != 2) return;
        if (sin_family === 32) return;
        if (sin_family === 0) return;
        if (sin_family === 1) return;

        var sin_port = Memory.readU16(dest_addr.add(2));
        sin_port = ((sin_port&0xff)<<8)|((sin_port>>8)&0xff);
        var sin_addr = Memory.readU32(dest_addr.add(4));
        var sin_ip = (sin_addr&0xff).toString() + '.' + ((sin_addr>>8)&0xff).toString() + '.' + ((sin_addr>>16)&0xff).toString() + '.' + ((sin_addr>>24)&0xff).toString();
        console.log("================================================================================================================");
        console.log("recvfrom(sockfd=" + args[0] + ",buflen=" + len + ",family=" + sin_family + ",ip=" + sin_ip + ",port=" + sin_port + ")");
        // console.log(hexdump(buf,{length:len,header:false}));
        console.log('\n recvfrom called from:\n' +Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
    }
});

var sendto = Module.findExportByName("libsystem_kernel.dylib", "sendto");
Interceptor.attach(sendto, {
    onEnter: function(args) {
        this.gargs = new Array(6);
        for (var i = 0; i < 6; i++) this.gargs[i] = args[i];
    },
    onLeave: function(retval) {
        var args = this.gargs;
        var sockfd = args[0].toInt32();
        var buf = args[1];
        var len = retval.toInt32();
        var dest_addr = args[4];
        if (dest_addr.equals(0)) {
            dest_addr = Memory.alloc(16);
            var addr_len = Memory.alloc(4);
            Memory.writeU32(addr_len, 16);
            var getpeername = new NativeFunction(Module.findExportByName("libsystem_kernel.dylib", "getpeername"), "int", ["int", "pointer", "pointer"]);
            getpeername(sockfd, dest_addr, addr_len);
        }
        var sin_family = Memory.readU8(dest_addr.add(1));
        // if (sin_family != 2) return;
        if (sin_family === 32) return;
        if (sin_family === 0) return;
        if (sin_family === 1) return;

        var sin_port = Memory.readU16(dest_addr.add(2));
        sin_port = ((sin_port&0xff)<<8)|((sin_port>>8)&0xff);
        var sin_addr = Memory.readU32(dest_addr.add(4));
        var sin_ip = (sin_addr&0xff).toString() + '.' + ((sin_addr>>8)&0xff).toString() + '.' + ((sin_addr>>16)&0xff).toString() + '.' + ((sin_addr>>24)&0xff).toString();
        console.log("================================================================================================================");
        console.log("sendto(sockfd=" + args[0] + ",buflen=" + len + ",family=" + sin_family + ",ip=" + sin_ip + ",port=" + sin_port + ")");
        // console.log(hexdump(buf,{length:len,header:false}));
        console.log('\n sendto called from:\n' +Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
    }
});


var bind = Module.findExportByName("libsystem_kernel.dylib", "bind");
Interceptor.attach(bind, {
    onEnter: function(args) {
        this.gargs = new Array(3);
        for (var i = 0; i < 3; i++) this.gargs[i] = args[i];
    },
    onLeave: function(retval) {
        var args = this.gargs;
        var sockfd = args[0].toInt32();
        var dest_addr = args[1];
        if (dest_addr.equals(0)) {
            dest_addr = Memory.alloc(16);
            var addr_len = Memory.alloc(4);
            Memory.writeU32(addr_len, 16);
            var getpeername = new NativeFunction(Module.findExportByName("libsystem_kernel.dylib", "getpeername"), "int", ["int", "pointer", "pointer"]);
            getpeername(sockfd, dest_addr, addr_len);
        }
        var sin_family = Memory.readU8(dest_addr.add(1));
        // if (sin_family != 2) return;
        if (sin_family === 32) return;
        if (sin_family === 0) return;
        if (sin_family === 1) return;

        var sin_port = Memory.readU16(dest_addr.add(2));
        sin_port = ((sin_port&0xff)<<8)|((sin_port>>8)&0xff);
        var sin_addr = Memory.readU32(dest_addr.add(4));
        var sin_ip = (sin_addr&0xff).toString() + '.' + ((sin_addr>>8)&0xff).toString() + '.' + ((sin_addr>>16)&0xff).toString() + '.' + ((sin_addr>>24)&0xff).toString();
        console.log("================================================================================================================");
        console.log("bind(int=" + args[0] + ",family=" + sin_family + ",ip=" + sin_ip + ",port=" + sin_port + ")");
        // console.log(hexdump(buf,{length:len,header:false}));
        console.log('\n bind called from:\n' +Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
    }
});


var connect = Module.findExportByName("libsystem_kernel.dylib", "connect");
Interceptor.attach(connect, {
    onEnter: function(args) {
        this.gargs = new Array(3);
        for (var i = 0; i < 3; i++) this.gargs[i] = args[i];
    },
    onLeave: function(retval) {
        var args = this.gargs;
        var sockfd = args[0].toInt32();
        var dest_addr = args[1];
        if (dest_addr.equals(0)) {
            dest_addr = Memory.alloc(16);
            var addr_len = Memory.alloc(4);
            Memory.writeU32(addr_len, 16);
            var getpeername = new NativeFunction(Module.findExportByName("libsystem_kernel.dylib", "getpeername"), "int", ["int", "pointer", "pointer"]);
            getpeername(sockfd, dest_addr, addr_len);
        }
        var sin_family = Memory.readU8(dest_addr.add(1));
        // if (sin_family != 2) return;
        if (sin_family === 32) return;
        if (sin_family === 0) return;
        if (sin_family === 1) return;

        var sin_port = Memory.readU16(dest_addr.add(2));
        sin_port = ((sin_port&0xff)<<8)|((sin_port>>8)&0xff);
        var sin_addr = Memory.readU32(dest_addr.add(4));
        var sin_ip = (sin_addr&0xff).toString() + '.' + ((sin_addr>>8)&0xff).toString() + '.' + ((sin_addr>>16)&0xff).toString() + '.' + ((sin_addr>>24)&0xff).toString();
        console.log("================================================================================================================");
        console.log("connect(int=" + args[0] + ",family=" + sin_family + ",ip=" + sin_ip + ",port=" + sin_port + ")");
        // console.log(hexdump(buf,{length:len,header:false}));
        console.log('\n connect called from:\n' +Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
    }
});

var connect = Module.findExportByName("libsystem_kernel.dylib", "__sendmsg_nocancel");
Interceptor.attach(connect, {
    onEnter: function(args) {
        console.log(
            hexdump(args[1], {
                offset: 0,
                length: 1024,
                header: false,
                ansi: false,
            })
        );

        const msgPtr = args[1];
        const msg_name = Memory.readPointer(msgPtr.add(0)); 
        console.log("msg_name: " + msg_name);

        const msgNameLen = Memory.readU32(msgPtr.add(8)); 
        console.log("msg_namelen: " + msgNameLen);

        const iovPtr = Memory.readPointer(msgPtr.add(16)); 
        console.log("iovPtr: " + iovPtr);

        const iovLen = Memory.readU32(msgPtr.add(20)); 
        console.log("msg_iovlen: " + iovLen);

        const msg_control = Memory.readPointer(msgPtr.add(32));
        console.log("msg_control: " + msg_control);

        const msg_controllen = Memory.readU32(msgPtr.add(40)); 
        console.log("msg_controllen: " + msg_controllen);

        const msg_flags = Memory.readU32(msgPtr.add(44)); 
        console.log("msg_flags: " + msg_flags);

        if ( msg_name != 0x0 ) {
            const msg_name_ss_len = Memory.readU8(msg_name); 
            console.log("msg_name_ss_len: " + msg_name_ss_len);
            const msg_name_ss_family = Memory.readU8(msg_name.add(1)); 
            console.log("msg_name_ss_family: " + msg_name_ss_family);
            const msg_name_ss_pad1 = Memory.readCString(msg_name.add(2)); 
            console.log("msg_name_ss_pad1: " + msg_name_ss_pad1);
            const msg_name_ss_align = Memory.readU64(msg_name.add(8)); 
            console.log("msg_name_ss_align: " + msg_name_ss_align);
            const msg_name_ss_pad2 = Memory.readCString(msg_name.add(16)); 
            console.log("msg_name_ss_pad2: " + msg_name_ss_pad2);

            var dest_addr = msg_name;
            var sin_family = Memory.readU8(dest_addr.add(1));
            var sin_port = Memory.readU16(dest_addr.add(2));
            sin_port = ((sin_port&0xff)<<8)|((sin_port>>8)&0xff);
            var sin_addr = Memory.readU32(dest_addr.add(4));
            var sin_ip = (sin_addr&0xff).toString() + '.' + ((sin_addr>>8)&0xff).toString() + '.' + ((sin_addr>>16)&0xff).toString() + '.' + ((sin_addr>>24)&0xff).toString();
            console.log(sin_family, sin_port, sin_ip);
        }

        console.log("================================================================================================================");

    },
    onLeave: function(retval) {

    }
});
