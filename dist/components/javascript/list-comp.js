Lyte.Component.register("list-comp", {
_template:"<template tag-name=\"list-comp\">\n<h1>hgsfjhsdhg</h1>\n    <template is=\"for\" items=\"{{dataf}}\" item=\"item\" index=\"index\">\n    <a href=\"{{item.id}}\" target=\"_blank\">{{item.email}}</a>\n    </template>\n\n    <a href=\"/\">home</a>\n\n</template>",
_dynamicNodes : [{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}],

	data : function(){
		return {

		}		
	}
});
