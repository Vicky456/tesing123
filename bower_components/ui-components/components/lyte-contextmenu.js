Lyte.Component.register('lyte-contextmenu',{
_template:"<template tag-name=\"lyte-contextmenu\">\t<lyte-dropdown lt-prop-content-yield=\"{{ltPropItemYield}}\" lt-prop-type=\"button\" lt-prop-options=\"{{ltPropItems}}\" lt-prop-user-value=\"{{ltPropUserValue}}\" lt-prop-system-value=\"{{ltPropSystemValue}}\">\t\t<template is=\"registerYield\" yield-name=\"button\">\t\t</template>\t</lyte-dropdown></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropQuerySelector","ltPropItemYield","ltPropItems"],
	data:function(){
   		return {
			'ltPropQuerySelector':Lyte.attr("string",{"default":'body'}),
			'ltPropItemYield':Lyte.attr("boolean",{"default":false}),
			'ltPropItems':Lyte.attr("array",{"default":[]})
		}
	},
	init:function(){
		document.querySelector(this.getData('ltPropQuerySelector')).addEventListener('contextmenu',function(){
			var element = this.$node.querySelector('lyte-contextmenu')
			element.toggle()
			event.preventDefault()
		},true)
	}
});