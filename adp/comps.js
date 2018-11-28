store.registerAdapter("application", {
    host : 'https://www.zohoapis.com',
    namespace : "crm/v2/",
    actionNamespace : "actions",
    headersForRequest:function(headers){
        return {
            "Authorization": "Bearer 1000.185463986b2de0222a43bf05a9d2bebb.37ed15e9971952e57a8a4b85213db7b7",
        };
    }
}, {mixins : ['adapterMixin']});


store.registerAdapter("users", {
    host : 'https://www.zohoapis.com',
    namespace : "crm/v2/",
    actionNamespace : "actions",
    headersForRequest:function(headers){
        return {
            "Authorization": "Bearer 1000.185463986b2de0222a43bf05a9d2bebb.37ed15e9971952e57a8a4b85213db7b7",
        };
    }
}, {mixins : ['adapterMixin']});


store.registerModel("users",{
    id:Lyte.attr('string'),
    email:Lyte.attr('string'),
    full_name:Lyte.attr('string'),

});