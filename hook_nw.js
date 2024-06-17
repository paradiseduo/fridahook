var _SC_sockaddr_to_string = new NativeFunction(Module.findExportByName(null, "_SC_sockaddr_to_string"), "void", ["pointer", "pointer", "int"]); // void _SC_sockaddr_to_string(const struct sockaddr *address, char *buf, size_t bufLen)  https://github.com/darlinghq/darling/blob/203af1f604727e13032df1870e3491572e7d6704/src/configd/SystemConfiguration.fproj/SCDPrivate.c#L143

var nw_endpoint_get_port_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_get_port"); 
var nw_endpoint_get_port = new NativeFunction(nw_endpoint_get_port_pointer, "int", ["pointer"]); // uint16_t nw_endpoint_get_port(nw_endpoint_t endpoint);

var nw_endpoint_get_address_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_get_address"); 
var nw_endpoint_get_address = new NativeFunction(nw_endpoint_get_address_pointer, "pointer", ["pointer"]); // const struct sockaddr * nw_endpoint_get_address(nw_endpoint_t endpoint);

var nw_endpoint_create_host_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_create_host"); 
var nw_endpoint_create_host = new NativeFunction(nw_endpoint_create_host_pointer, "pointer", ["pointer", "pointer"]); // nw_endpoint_t nw_endpoint_create_host(const char *hostname, const char *port);

var nw_endpoint_create_address_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_create_address"); 
var nw_endpoint_create_address = new NativeFunction(nw_endpoint_create_address_pointer, "pointer", ["pointer"]); // nw_endpoint_t nw_endpoint_create_address(const struct sockaddr *address);

var nw_endpoint_get_hostname_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_get_hostname");
var nw_endpoint_get_hostname = new NativeFunction(nw_endpoint_get_hostname_pointer, "pointer", ["pointer"]); // const char * nw_endpoint_get_hostname(nw_endpoint_t endpoint);

var nw_connection_send_pointer = Module.findExportByName("libnetwork.dylib", "nw_connection_send"); 
var nw_connection_send = new NativeFunction(nw_connection_send_pointer, "void", ["pointer", "pointer", "bool", "pointer"]); // void nw_connection_send(nw_connection_t connection, _Nullable dispatch_data_t content, nw_content_context_t context, bool is_complete, nw_connection_send_completion_t completion);

var nw_connection_receive_pointer = Module.findExportByName("libnetwork.dylib", "nw_connection_receive"); 
var nw_connection_receive = new NativeFunction(nw_connection_receive_pointer, "void", ["pointer", "int", "int", "pointer"]); // void nw_connection_receive(nw_connection_t connection, uint32_t minimum_incomplete_length, uint32_t maximum_length, nw_connection_receive_completion_t completion);

var nw_endpoint_copy_address_string_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_copy_address_string");
var nw_endpoint_copy_address_string = new NativeFunction(nw_endpoint_copy_address_string_pointer, "pointer", ["pointer"]); // char * nw_endpoint_copy_address_string(nw_endpoint_t endpoint);

var nw_connection_create_pointer = Module.findExportByName("libnetwork.dylib", "nw_connection_create"); 
var nw_connection_create = new NativeFunction(nw_connection_create_pointer, "pointer", ["pointer", "pointer"]); // nw_connection_t nw_connection_create(nw_endpoint_t endpoint, nw_parameters_t parameters);

var nw_endpoint_get_type_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_get_type");
var nw_endpoint_get_type = new NativeFunction(nw_endpoint_get_type_pointer, "pointer", ["pointer"]); // nw_endpoint_type_t nw_endpoint_get_type(nw_endpoint_t endpoint);

var nw_connection_copy_endpoint_pointer = Module.findExportByName("libnetwork.dylib", "nw_connection_copy_endpoint");
var nw_connection_copy_endpoint = new NativeFunction(nw_connection_copy_endpoint_pointer, "pointer", ["pointer"]); // nw_endpoint_t nw_connection_copy_endpoint(nw_connection_t connection);

var nw_connection_copy_current_path_pointer = Module.findExportByName("libnetwork.dylib", "nw_connection_copy_current_path");
var nw_connection_copy_current_path = new NativeFunction(nw_connection_copy_current_path_pointer, "pointer", ["pointer"]); // nw_path_t nw_connection_copy_current_path(nw_connection_t connection);

var nw_connection_copy_description_pointer = Module.findExportByName("libnetwork.dylib", "nw_connection_copy_description");
var nw_connection_copy_description = new NativeFunction(nw_connection_copy_description_pointer, "pointer", ["pointer"]); // char * nw_connection_copy_description(nw_connection_t connection);

var nw_path_get_status_pointer = Module.findExportByName("libnetwork.dylib", "nw_path_get_status");
var nw_path_get_status = new NativeFunction(nw_path_get_status_pointer, "pointer", ["pointer"]); // nw_path_status_t nw_path_get_status(nw_path_t path);

var nw_path_is_expensive_pointer = Module.findExportByName("libnetwork.dylib", "nw_path_is_expensive");
var nw_path_is_expensive = new NativeFunction(nw_path_is_expensive_pointer, "bool", ["pointer"]); // bool nw_path_is_expensive(nw_path_t path);

var nw_path_has_ipv4_pointer = Module.findExportByName("libnetwork.dylib", "nw_path_has_ipv4");
var nw_path_has_ipv4 = new NativeFunction(nw_path_has_ipv4_pointer, "bool", ["pointer"]); // bool nw_path_has_ipv4(nw_path_t path);

var nw_path_has_ipv6_pointer = Module.findExportByName("libnetwork.dylib", "nw_path_has_ipv6");
var nw_path_has_ipv6 = new NativeFunction(nw_path_has_ipv6_pointer, "bool", ["pointer"]); // bool nw_path_has_ipv6(nw_path_t path);

var nw_path_has_dns_pointer = Module.findExportByName("libnetwork.dylib", "nw_path_has_dns");
var nw_path_has_dns = new NativeFunction(nw_path_has_dns_pointer, "bool", ["pointer"]); // bool nw_path_has_dns(nw_path_t path);

var nw_path_enumerate_interfaces_pointer = Module.findExportByName("libnetwork.dylib", "nw_path_enumerate_interfaces");
var nw_path_enumerate_interfaces = new NativeFunction(nw_path_enumerate_interfaces_pointer, "void", ["pointer", "pointer"]); // void nw_path_enumerate_interfaces(nw_path_t path, NW_NOESCAPE nw_path_enumerate_interfaces_block_t enumerate_block);

var nw_path_copy_effective_local_endpoint_pointer = Module.findExportByName("libnetwork.dylib", "nw_path_copy_effective_local_endpoint");
var nw_path_copy_effective_local_endpoint = new NativeFunction(nw_path_copy_effective_local_endpoint_pointer, "pointer", ["pointer"]); // NW_RETURNS_RETAINED _Nullable nw_endpoint_t nw_path_copy_effective_local_endpoint(nw_path_t path);

var nw_path_copy_effective_remote_endpoint_pointer = Module.findExportByName("libnetwork.dylib", "nw_path_copy_effective_remote_endpoint");
var nw_path_copy_effective_remote_endpoint = new NativeFunction(nw_path_copy_effective_remote_endpoint_pointer, "pointer", ["pointer"]); // NW_RETURNS_RETAINED _Nullable nw_endpoint_t nw_path_copy_effective_remote_endpoint(nw_path_t path);

var nw_interface_get_index_pointer = Module.findExportByName("libnetwork.dylib", "nw_interface_get_index");
var nw_interface_get_index = new NativeFunction(nw_interface_get_index_pointer, "int", ["pointer"]); //uint32_t nw_interface_get_index(nw_interface_t interface);

var nw_interface_get_name_pointer = Module.findExportByName("libnetwork.dylib", "nw_interface_get_name");
var nw_interface_get_name = new NativeFunction(nw_interface_get_name_pointer, "pointer", ["pointer"]); //const char * nw_interface_get_name(nw_interface_t interface);

var nw_interface_get_type_pointer = Module.findExportByName("libnetwork.dylib", "nw_interface_get_type");
var nw_interface_get_type = new NativeFunction(nw_interface_get_type_pointer, "pointer", ["pointer"]); // nw_interface_type_t nw_interface_get_type(nw_interface_t interface);

function dump_endpoint(endpoint) {
    var endpoint_type = nw_endpoint_get_type(endpoint);
    var hostname = nw_endpoint_get_hostname(endpoint);
    var port = nw_endpoint_get_port(endpoint);
    var address = nw_endpoint_get_address(endpoint);

    var endpoint_type_str = ["INVALID", "ADDRESS", "HOST", "BONJOUR"];

    if (address.equals(0)) {
        return endpoint_type_str[endpoint_type.toUInt32()] + '  ' + Memory.readCString(hostname) + ":" + port;
    } else {
        var buf = Memory.alloc(64);
        _SC_sockaddr_to_string(address, buf, 64);
        return endpoint_type_str[endpoint_type.toUInt32()]+ '  ' + Memory.readCString(hostname) + "  " + Memory.readCString(buf) + ":" + port;
    }
}

function dump_interface(intf) {
    var index = nw_interface_get_index(intf);
    var name = nw_interface_get_name(intf);
    var type = nw_interface_get_type(intf);
    var interface_type_str = ["OTHER", "WIFI", "CELLULAR", "WIRED", "LOOPBACK"];

    return index + " " + name + " " + interface_type_str[type.toUInt32()];
}

function dump_path(path) {
    var path_status = nw_path_get_status(path);
    var path_status_str = ["INVALID", "SATISFIED", "UNSATISFIED", "SATISFIABLE"];

    var status = path_status_str[path_status.toUInt32()];
    var expensive = nw_path_is_expensive(path);
    var ipv4 = nw_path_has_ipv4(path);
    var ipv6 = nw_path_has_ipv6(path);
    var dns = nw_path_has_dns(path);
    var handler = new ObjC.Block({
        retType: 'bool',
        argTypes: ['pointer'],
        implementation: function (intf) {
            console.log("dump_interface = " + dump_interface(intf));
            return true;
        }
    });
    var interfaces = nw_path_enumerate_interfaces(path, handler);
    console.log(status, expensive, ipv4, ipv6, dns, dump_endpoint(nw_path_copy_effective_local_endpoint(path)), dump_endpoint(nw_path_copy_effective_remote_endpoint(path)));
}


function dump_connection(connection) {
    var remote = nw_connection_copy_endpoint(connection);
    var path = nw_connection_copy_current_path(connection);
    
    return dump_endpoint(remote) + " -> " + dump_path(path);
}


Interceptor.attach(nw_endpoint_get_address_pointer, {
    onEnter: function(args) {

    },
    onLeave: function(retval) {
        var buf = Memory.alloc(64);
        _SC_sockaddr_to_string(retval, buf, 64);
        console.log("nw_endpoint_get_address = " + Memory.readCString(buf));
    }
});


Interceptor.attach(nw_endpoint_get_port_pointer, {
    onEnter: function(args) {

    },
    onLeave: function(retval) {
        console.log("nw_endpoint_get_port = " + retval.toUInt32());
    }
});


Interceptor.attach(nw_endpoint_copy_address_string_pointer, {
    onEnter: function(args) {

    },
    onLeave: function(retval) {
        console.log("nw_endpoint_copy_address_string = " + Memory.readCString(retval));
    }
});


Interceptor.attach(nw_endpoint_create_address_pointer, {
    onEnter: function(args) {
        var buf = Memory.alloc(64);
        _SC_sockaddr_to_string(args[0], buf, 64);
        console.log("nw_endpoint_create_address = " + Memory.readCString(buf));
    },
    onLeave: function(retval) {
        
    }
});


Interceptor.attach(nw_endpoint_get_hostname_pointer, {
    onEnter: function(args) {
        
    },
    onLeave: function(retval) {
        console.log("nw_endpoint_get_hostname = " + Memory.readCString(retval));
    }
});


Interceptor.attach(nw_endpoint_create_host_pointer, {
    onEnter: function(args) {
        console.log("nw_endpoint_create_host_pointer = " + Memory.readCString(args[0]), Memory.readCString(args[1]));
    },
    onLeave: function(retval) {

    }
});



Interceptor.attach(nw_connection_send_pointer, {
    onEnter: function(args) {
        // console.log("nw_connection_send = " + dump_connection(args[0]));
        console.log("nw_connection_send = " + Memory.readCString(nw_connection_copy_description(args[0])));
    },
    onLeave: function(retval) {
        
    }
});


Interceptor.attach(nw_connection_receive_pointer, {
    onEnter: function(args) {
        // console.log("nw_connection_receive = " + dump_connection(args[0]));
        console.log("nw_connection_receive = " + Memory.readCString(nw_connection_copy_description(args[0])));
    },
    onLeave: function(retval) {
        
    }
});


Interceptor.attach(nw_connection_create_pointer, {
    onEnter: function(args) {
        // console.log(args[1]);
    },
    onLeave: function(retval) {
        console.log("nw_connection_create = " + dump_connection(retval));
        // console.log("nw_connection_create = " + Memory.readCString(nw_connection_copy_description(retval)));
    }
});
