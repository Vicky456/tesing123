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
