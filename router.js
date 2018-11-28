// Lyte.Router.configureDefaults({baseURL:'',history : "html5"});

Lyte.Router.configureRoutes(function(){
	this.route('index',{path:'/'},function () {
        this.route("home",{ path :"/home"});
    });

});

Lyte.Router.beforeRouteTransition = function() {
	console.log('before Route Change');
}

Lyte.Router.afterRouteTransition = function() {
	console.log('after Route Change');
}

