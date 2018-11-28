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


Lyte.Router.registerRoute("home",{
	// queryParams : [] to refresh route for any change in given qp.
	//forceFetch : false(boolean) to fetch models of routes sequential without waiting for resources and dependencies
	getResources : function() { //render Template hook waits for resources to be fetched.

	},
	getDependencies : function() { //before model hook waits for dependencies to be fetched

	},
	beforeModel : function(params)	{
		//All permission checks and route redirections can be done here.
	},
	model : function(params)	{		
		//Data request is initiated here.
	},
	afterModel : function(model,params)	{
		//Any changes to model before rendering can be done here.		
	},
	redirect : function() {

	},
	renderTemplate : function(model,params)	{
		return {outlet : "#homeoutlet",component : "list-comp"}
	},
	afterRender : function(model,params){
	},
	actions: {//action that can be bubbled to parent by returning true
		onError : function(error,pausedTrans,params,hook) {
			// will be called on error in model hooks, transition can be resumed or redirected.
		},
		willTransition : function() {
			//will be called before any transition is made from this route.
		},
		didTransition : function() {
			//will be called after a transition is done.
		}
	},
	beforeExit :function() {
		//will be called before this route is going to exit from view.
	}
});

Lyte.Router.registerRoute("index.home",{
	// queryParams : [] to refresh route for any change in given qp.
	//forceFetch : false(boolean) to fetch models of routes sequential without waiting for resources and dependencies
	getResources : function() { //render Template hook waits for resources to be fetched.

	},
	getDependencies : function() { //before model hook waits for dependencies to be fetched

	},
	beforeModel : function(params)	{
		//All permission checks and route redirections can be done here.
	},
	model : function(params)	{		
		//Data request is initiated here.
        store.findAll("users")
		return{
        	dataf:store.model.users.data,
		}
	},
	afterModel : function(model,params)	{
		//Any changes to model before rendering can be done here.		
	},
	redirect : function() {

	},
	renderTemplate : function(model,params)	{
		return {outlet : "#homeoutlet",component : "list-comp"}
	},
	afterRender : function(model,params){
	},
	actions: {//action that can be bubbled to parent by returning true
		onError : function(error,pausedTrans,params,hook) {
			// will be called on error in model hooks, transition can be resumed or redirected.
		},
		willTransition : function() {
			//will be called before any transition is made from this route.
		},
		didTransition : function() {
			//will be called after a transition is done.
		}
	},
	beforeExit :function() {
		//will be called before this route is going to exit from view.
	}
});

Lyte.Router.registerRoute('index',{
	getResources : function(params) {
		
	},
	getDependencies : function(params) {

	},
	beforeModel : function(params)	{

	},
	model : function(params)	{

		return {features : [{module : 'Router',url : 'http://lyte/#/doc/route/introduction'},
							{module : 'Components',url : 'http://lyte/#/doc/components/introduction'},
							{module : 'Data',url : 'http://lyte/#/doc/data/introduction'},
							{module : 'CLI',url : 'http://lyte/#/doc/cli/introduction'}
							]}
				
							// {module : 'testing',url : 'http://lyte:3000/index.html#Routing/Introduction'}
	},
	afterModel : function(model,params)	{

	},
	redirect : function(model,params) {

	},
	renderTemplate : function(model,params)	{
		return {outlet : '#outlet',component:'welcome-comp'};
	},
	afterRender : function(model,params){

	},
	actions: {
		"willTransition" : function() {
		},
		"didTransition" : function(){
		}
	},
	beforeExit : function(model,params)	{
	}
	
});

Lyte.Component.register("list-comp", {
_template:"<template tag-name=\"list-comp\">\n<h1>hgsfjhsdhg</h1>\n    <template is=\"for\" items=\"{{dataf}}\" item=\"item\" index=\"index\">\n    <a href=\"{{item.id}}\" target=\"_blank\">{{item.email}}</a>\n    </template>\n\n    <a href=\"/\">home</a>\n\n</template>",
_dynamicNodes : [{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}],

	data : function(){
		return {

		}		
	}
});

Lyte.Component.register("welcome-comp",{
_template:"<template tag-name=\"welcome-comp\">\n\t<h1>Available features of LYTE</h1>\n\t<ul>\t\n\t\t<template is=\"for\" items=\"{{features}}\" item=\"item\" index=\"index\">\n\t\t\t<li><a href=\"{{item.url}}\" target=\"_blank\">{{item.module}}</a></li>\n\t\t</template>\n\t</ul>\n\n\n</template>",
_dynamicNodes : [{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,0,0]}]}],
_observedAttributes :["features"],
	data : function(){
		return {
			features : Lyte.attr("array")
		}
	}
});

