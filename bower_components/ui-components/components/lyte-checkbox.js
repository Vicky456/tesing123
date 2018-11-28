Lyte.Component.register('lyte-checkbox',{
_template:"<template tag-name=\"lyte-checkbox\">\t<template is=\"switch\" value=\"{{ltPropType}}\">\t\t<template case=\"default\">\t\t\t<label class=\"lyteCheckbox lyteDefault\" onmouseup=\"{{action('mup',event)}}\">\t\t\t\t<input type=\"checkbox\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{ltPropChecked}}\" disabled=\"{{ltPropDisabled}}\" class=\"\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('checkBoxClicked',event)}}\">\t\t\t\t<span class=\"{{ltPropClass}}\">\t\t\t\t\t<span class=\"{{ltPropLabelClass}}\">\t\t\t\t\t\t{{ltPropLabel}}\t\t\t\t\t</span>\t\t\t\t</span>\t\t\t</label>\t\t\t</template>\t\t<template case=\"primary\">\t\t\t<label class=\"lyteCheckbox lytePrimary\" onmouseup=\"{{action('mup',event)}}\">\t\t\t\t<input type=\"checkbox\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{ltPropChecked}}\" disabled=\"{{ltPropDisabled}}\" class=\"\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('checkBoxClicked',event)}}\">\t\t\t\t<span class=\"{{ltPropClass}}\">\t\t\t\t\t<span class=\"{{ltPropLabelClass}}\">\t\t\t\t\t\t{{ltPropLabel}}\t\t\t\t\t</span>\t\t\t\t</span>\t\t\t</label>\t\t\t</template>\t\t<template case=\"switch\">\t\t\t<label class=\"\" onmouseup=\"{{action('mup',event)}}\">\t\t\t\t<input type=\"checkbox\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{ltPropChecked}}\" disabled=\"{{ltPropDisabled}}\" class=\"lyteHide on-off-sw\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('checkBoxClicked',event)}}\">\t\t\t\t<span class=\"{{ltPropClass}}\">\t\t\t\t\t<span class=\"on-btn\"></span>\t\t\t\t</span>\t\t\t\t<span class=\"{{ltPropLabelClass}}\">\t\t\t\t\t{{ltPropLabel}}\t\t\t\t</span>\t\t\t</label>\t\t\t</template>\t\t<template case=\"slider\">\t\t\t<label class=\"lyteCheckSliderLabel\" onmouseup=\"{{action('mup',event)}}\">\t\t\t\t<input type=\"checkbox\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{ltPropChecked}}\" disabled=\"{{ltPropDisabled}}\" class=\"lyteHide\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('checkBoxClicked',event)}}\">\t\t\t\t<span class=\"{{ltPropClass}}\">\t\t\t\t\t<span class=\"{{ltPropLabelClass}}\">\t\t\t\t\t\t{{ltPropLabel}}\t\t\t\t\t</span>\t\t\t\t</span>\t\t\t\t\t\t\t</label>\t\t\t</template>\t</template></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"default":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"text","position":[1,3,1,1]}]},"primary":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"text","position":[1,3,1,1]}]},"switch":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"text","position":[1,5,1]}]},"slider":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"text","position":[1,3,1,1]}]}},"default":{}}],
_observedAttributes :["ltPropType","ltPropId","ltPropDisabled","ltPropChecked","ltPropLabel","ltPropName","ltPropValue","ltPropReadonly","ltPropFireOnInit","ltPropClass","ltPropLabelClass"],
data:function(){
    return {
		'ltPropType':Lyte.attr("string",{"default":'default'}),
		'ltPropId':Lyte.attr("string",{"default":undefined}),
		'ltPropDisabled':Lyte.attr("boolean",{"default":false}),
		'ltPropChecked':Lyte.attr("boolean",{"default":false}),
		'ltPropLabel':Lyte.attr("string",{"default":undefined}),
		'ltPropName':Lyte.attr("string",{"default":undefined}),
		'ltPropValue':Lyte.attr("string",{"default":undefined}),
		'ltPropReadonly':Lyte.attr("boolean",{"default":false}),
		'ltPropFireOnInit':Lyte.attr("boolean",{"default":false}),
		'ltPropClass':Lyte.attr("string",{"default":''}),
		'ltPropLabelClass':Lyte.attr("string",{"default":""})
	}
},
init:function(){
	if(this.getData('ltPropType') == 'switch' && this.getData('ltPropClass') == ''){
		this.setData('ltPropClass','lyteCheckSwitch')
	}
	else if(this.getData('ltPropType') == 'default' && this.getData('ltPropClass') == ''){
		this.setData('ltPropClass','lyteCheckBoxDefault')
	}
	else if(this.getData('ltPropType') == 'primary' && this.getData('ltPropClass') == ''){
		this.setData('ltPropClass','lyteCheckBoxPrimary')
	}
	else if(this.getData('ltPropType') == 'slider' && this.getData('ltPropClass') == ''){
		this.setData('ltPropClass','lyteCheckSlider')
	}
	if(this.getData('ltPropType') == 'slider' && this.getData('ltPropLabelClass') == ''){
		this.setData('ltPropLabelClass','lyteCheckSliderText')
	}
},
didConnect:function(){
	this.fireCallBacksFunction.call(this,undefined,true)
},
fireCallbacks:function(arg1,onrender){
	this.fireCallBacksFunction.call(this,arg1,onrender)
}.observes('ltPropChecked'),
fireCallBacksFunction:function(arg1,onrender){
	if(this.getData('ltPropChecked').toString().toLowerCase() == 'true'){
		this.$node.checked = true
	}
	else if(this.getData('ltPropChecked').toString().toLowerCase() == 'false'){
		this.$node.checked = false
	}
	if(this.getData('ltPropChecked') && this.getData('ltPropChecked').toString() == "true" && onrender /*!this.clicked*/){
		if(!this.getData('ltPropFireOnInit')){
			return ;
		}
		var input = this.$node.querySelector('input')
		if(this.getMethods('onBeforeChecked')){
			this.executeMethod('onBeforeChecked',input,this)
		}
		if(this.getMethods('onChecked')){
			this.executeMethod('onChecked',input,this)
		}
		if(this.getMethods('onChanged')){
			this.executeMethod('onChanged',input,this)
		}
	}
	else if(this.$node.checked == true && !onrender){
		var input = this.$node.querySelector('input')
		if(!this.clicked){
			if(this.getMethods('onBeforeChecked')){
			this.executeMethod('onBeforeChecked',input,this)
			}
		}
		input.checked = true
		if(this.getMethods('onChecked')){
			this.executeMethod('onChecked',input,this)
		}
		if(this.getMethods('onChanged')){
			this.executeMethod('onChanged',input,this)
		}
	}
	else if(this.$node.checked == false && !onrender){
		var input = this.$node.querySelector('input')
		if(!this.clicked){
			if(this.getMethods('onBeforeUnchecked')){
				this.executeMethod('onBeforeUnchecked',input)
			}
		}
		input.checked = false
		if(this.getMethods('onUnchecked')){
			this.executeMethod('onUnchecked',input,this)
		}
		if(this.getMethods('onChanged')){
			this.executeMethod('onChanged',input,this)
		}
	}
},
actions:{
	mup:function(event){
		if(this.getData('ltPropDisabled') && this.getData('ltPropDisabled').toString() == "true"){
			return ;
		}
		var checked
		var ele =  this.$node.querySelector('input')
		checked = ele.checked
		if(this.getMethods('onBeforeChecked') && !checked){
			this.executeMethod('onBeforeChecked',ele,this)
		}
		if(this.getMethods('onBeforeUnchecked') && checked){
			this.executeMethod('onBeforeUnchecked',ele,this)
		}
	},
	checkBoxClicked:function(event){
		this.clicked = true
		if(this.getData('ltPropDisabled')){
			event.preventDefault()
			return ;
		}
		var checked
		var ele = event.target
		checked = ele.checked
		if(checked==false){
			this.setData('ltPropChecked',false)
		}
		else{
			this.setData('ltPropChecked',true) //This was unchecked for some reason dk why
		}
		this.clicked = false
	}
}
});
