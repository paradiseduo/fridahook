var _SC_sockaddr_to_string = new NativeFunction(Module.findExportByName(null, "_SC_sockaddr_to_string"), "void", ["pointer", "pointer", "int"]); // void _SC_sockaddr_to_string(const struct sockaddr *address, char *buf, size_t bufLen)  https://github.com/darlinghq/darling/blob/203af1f604727e13032df1870e3491572e7d6704/src/configd/SystemConfiguration.fproj/SCDPrivate.c#L143
var nw_endpoint_get_port_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_get_port"); 
var nw_endpoint_get_port = new NativeFunction(nw_endpoint_get_port_pointer, "int", ["pointer"]);

var nw_endpoint_get_address_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_get_address"); 
var nw_endpoint_get_address = new NativeFunction(nw_endpoint_get_address_pointer, "pointer", ["pointer"]);

var nw_endpoint_create_host_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_create_host"); 
var nw_endpoint_create_host = new NativeFunction(nw_endpoint_create_host_pointer, "pointer", ["pointer", "pointer"]);

var nw_endpoint_create_address_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_create_address"); 
var nw_endpoint_create_address = new NativeFunction(nw_endpoint_create_address_pointer, "pointer", ["pointer"]);

var nw_endpoint_get_hostname_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_get_hostname");
var nw_endpoint_get_hostname = new NativeFunction(nw_endpoint_get_hostname_pointer, "pointer", ["pointer"]);

var nw_connection_send_pointer = Module.findExportByName("libnetwork.dylib", "nw_connection_send"); 
var nw_connection_send = new NativeFunction(nw_connection_send_pointer, "void", ["pointer", "pointer", "bool", "pointer"]);

var nw_connection_receive_pointer = Module.findExportByName("libnetwork.dylib", "nw_connection_receive"); 
var nw_connection_receive = new NativeFunction(nw_connection_receive_pointer, "void", ["pointer", "int", "int", "pointer"]);

var nw_endpoint_copy_address_string_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_copy_address_string");
var nw_endpoint_copy_address_string = new NativeFunction(nw_endpoint_copy_address_string_pointer, "pointer", ["pointer"]);

var nw_connection_create_pointer = Module.findExportByName("libnetwork.dylib", "nw_connection_create"); 
var nw_connection_create = new NativeFunction(nw_connection_create_pointer, "pointer", ["pointer", "pointer"]);

var nw_endpoint_get_type_pointer = Module.findExportByName("libnetwork.dylib", "nw_endpoint_get_type");
var nw_endpoint_get_type = new NativeFunction(nw_endpoint_get_type_pointer, "pointer", ["pointer"]);


function dump_endpoint(endpoint) {
    var endpoint_type = nw_endpoint_get_type(endpoint);
    var hostname = nw_endpoint_get_hostname(endpoint);
    var port = nw_endpoint_get_port(endpoint);
    var address = nw_endpoint_get_address(endpoint);

    var endpoint_type_str = ["INVALID", "ADDRESS", "HOST", "BONJOUR"];

    if (address.equals(0)) {
        console.log(endpoint_type_str[endpoint_type.toUInt32()], Memory.readCString(hostname), port);
    } else {
        console.log(endpoint_type_str[endpoint_type.toUInt32()], Memory.readCString(hostname), port, address);
    }
}


// const struct sockaddr * nw_endpoint_get_address(nw_endpoint_t endpoint);
// Interceptor.attach(nw_endpoint_get_address_pointer, {
//     onEnter: function(args) {

//     },
//     onLeave: function(retval) {
//         var buf = Memory.alloc(64);
//         _SC_sockaddr_to_string(retval, buf, 64);
//         console.log(Memory.readCString(buf));
//     }
// });

// uint16_t nw_endpoint_get_port(nw_endpoint_t endpoint);
// Interceptor.attach(nw_endpoint_get_port_pointer, {
//     onEnter: function(args) {

//     },
//     onLeave: function(retval) {
//         console.log(retval.toUInt16());
//     }
// });

// char * nw_endpoint_copy_address_string(nw_endpoint_t endpoint);
// Interceptor.attach(nw_endpoint_copy_address_string_pointer, {
//     onEnter: function(args) {

//     },
//     onLeave: function(retval) {
//         console.log(Memory.readCString(retval));
//     }
// });

// nw_endpoint_t nw_endpoint_create_address(const struct sockaddr *address);
// Interceptor.attach(nw_endpoint_create_address_pointer, {
//     onEnter: function(args) {
//         var buf = Memory.alloc(64);
//         _SC_sockaddr_to_string(args[0], buf, 64);
//         console.log(Memory.readCString(buf));
//     },
//     onLeave: function(retval) {
        
//     }
// });

// const char * nw_endpoint_get_hostname(nw_endpoint_t endpoint);
// Interceptor.attach(nw_endpoint_get_hostname, {
//     onEnter: function(args) {
        
//     },
//     onLeave: function(retval) {
//         console.log(Memory.readCString(retval));
//     }
// });

// void nw_connection_send(nw_connection_t connection, _Nullable dispatch_data_t content, nw_content_context_t context, bool is_complete, nw_connection_send_completion_t completion);
// Interceptor.attach(nw_connection_send_pointer, {
//     onEnter: function(args) {
        
//     },
//     onLeave: function(retval) {
//         console.log(Memory.readCString(retval));
//     }
// });

// void nw_connection_receive(nw_connection_t connection, uint32_t minimum_incomplete_length, uint32_t maximum_length, nw_connection_receive_completion_t completion);
// Interceptor.attach(nw_connection_receive_pointer, {
//     onEnter: function(args) {
        
//     },
//     onLeave: function(retval) {
//         console.log(Memory.readCString(retval));
//     }
// });

// nw_endpoint_t nw_endpoint_create_host(const char *hostname, const char *port);
// Interceptor.attach(nw_endpoint_create_host_pointer, {
//     onEnter: function(args) {
//         console.log(Memory.readCString(args[0]), Memory.readCString(args[1]));
//     },
//     onLeave: function(retval) {

//     }
// });

// nw_endpoint_type_t nw_endpoint_get_type(nw_endpoint_t endpoint);
// Interceptor.attach(nw_endpoint_get_type_pointer, {
//     onEnter: function(args) {
        
//     },
//     onLeave: function(retval) {
        
//     }
// });

// nw_connection_t nw_connection_create(nw_endpoint_t endpoint, nw_parameters_t parameters);
Interceptor.attach(nw_connection_create_pointer, {
    onEnter: function(args) {
        dump_endpoint(args[0]);
    },
    onLeave: function(retval) {

    }
});
