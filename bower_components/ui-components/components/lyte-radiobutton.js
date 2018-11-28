Lyte.Component.register('lyte-radiobutton',{
_template:"<template tag-name=\"lyte-radiobutton\">\t<template is=\"switch\" value=\"{{ltPropType}}\"><template case=\"default\"></template><template case=\"primary\"></template><template case=\"black\">\t\t\t<label class=\"{{radioclass}}\" onmouseup=\"{{action('mup',event)}}\">\t\t\t\t<input type=\"radio\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" class=\"lyteHide\" onclick=\"{{action('valueChanged',event)}}\" disabled=\"{{ltPropDisabled}}\" checked=\"{{ltPropChecked}}\">\t\t\t\t<span class=\"{{ltPropClass}}\">\t\t\t\t\t<span class=\"lyteRadioCheck\">\t\t\t\t\t</span>\t\t\t\t</span>\t\t\t\t<span class=\"{{ltPropLabelClass}}\">\t\t\t\t\t{{ltPropLabel}}\t\t\t\t</span>\t\t\t</label>\t\t\t</template><template case=\"switch\">\t\t\t<label class=\"\" onmouseup=\"{{action('mup',event)}}\">\t\t\t\t<input type=\"radio\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{unbound(ltPropChecked)}}\" disabled=\"{{ltPropDisabled}}\" class=\"lyteHide on-off-sw\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('valueChanged',event)}}\">\t\t\t\t<span class=\"{{ltPropClass}}\">\t\t\t\t\t<span class=\"on-btn\"></span>\t\t\t\t</span>\t\t\t\t<span class=\"{{ltPropLabelClass}}\">\t\t\t\t\t{{ltPropLabel}}\t\t\t\t</span>\t\t\t</label>\t\t\t</template><template case=\"slider\">\t\t\t<label class=\"lyteRadioSliderLabel\" onmouseup=\"{{action('mup',event)}}\">\t\t\t\t<input type=\"radio\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" value=\"{{ltPropValue}}\" checked=\"{{unbound(ltPropChecked)}}\" disabled=\"{{ltPropDisabled}}\" class=\"lyteHide\" readonly=\"{{ltPropReadonly}}\" onclick=\"{{action('valueChanged',event)}}\">\t\t\t\t<span class=\"{{ltPropClass}}\">\t\t\t\t\t<span class=\"{{ltPropLabelClass}}\">\t\t\t\t\t\t{{ltPropLabel}}\t\t\t\t\t</span>\t\t\t\t</span>\t\t\t\t\t\t\t</label>\t\t</template></template></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"default":{"dynamicNodes":[],"additional":{"next":"primary"}},"primary":{"dynamicNodes":[],"additional":{"next":"black"}},"black":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"text","position":[1,5,1]}]},"switch":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"text","position":[1,5,1]}]},"slider":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"text","position":[1,3,1,1]}]}},"default":{}}],
_observedAttributes :["ltPropType","ltPropName","ltPropDisabled","ltPropChecked","ltPropLabel","ltPropValue","ltPropFireOnInit","ltPropLabelClass","ltPropClass","ltPropColor"],
data: function(){
	return {
		'ltPropType':Lyte.attr("string",{"default":'default'}),
		'ltPropName':Lyte.attr("string",{"default":undefined}),
		'ltPropDisabled':Lyte.attr("boolean",{"default": false}),
		'ltPropChecked':Lyte.attr("boolean",{"default": false}),
		'ltPropLabel':Lyte.attr("string",{"default":undefined}),
		'ltPropValue':Lyte.attr("string",{"default":undefined}),
		'ltPropFireOnInit':Lyte.attr("boolean",{"default": false}),
		'ltPropLabelClass':Lyte.attr("string",{"default":''}),
		'ltPropClass':Lyte.attr("string",{"default":''}),
		'ltPropColor':Lyte.attr("string",{"default":'#72C98A'})
	}
},
changeStyle:function(){
	this.changeStyleFunction()
}.observes('ltPropType','ltPropChecked'),
changeStyleFunction: function(){
	if(this.getData('ltPropType').indexOf('slider') == -1 && this.getData('ltPropType').indexOf('switch') == -1 && this.getData('ltPropType').indexOf('default') == -1 && this.getData('ltPropType').indexOf('primary') == -1 && this.getData('ltPropType').indexOf('black') == -1){
		this.setData('ltPropType',this.getData('ltPropType')+" default")
	}
	if(this.getData('ltPropType').indexOf("default") != -1){
		this.setData('radioclass','lyteRadioBtn lyteDefault')
		this.setData('ltPropClass','lyteRadioLayer')
		this.setData('ltPropLabelClass','lyteRadioLabel')
	}
	else if(this.getData('ltPropType').indexOf("primary") != -1){
		this.setData('radioclass','lyteRadioBtn lytePrimary')
		this.setData('ltPropClass','lyteRadioLayer')
		this.setData('ltPropLabelClass','lyteRadioLabel')
	}
	else if(this.getData('ltPropType').indexOf("black") != -1){
		this.setData('radioclass','lyteRadioBtn lyteBlack')
		this.setData('ltPropClass','lyteRadioLayer')
		this.setData('ltPropLabelClass','lyteRadioLabel')
	}
	else if(this.getData('ltPropType').indexOf('switch') != -1){
		if(this.getData('ltPropClass') == ''){
			this.setData('ltPropClass','lyteRadioSwitch')	
		}	
	}
	else if(this.getData('ltPropType').indexOf('slider') != -1){
		if(this.getData('ltPropClass') == ''){
			this.setData('ltPropClass','lyteRadioSlider')	
		}	
		if(this.getData('ltPropLabelClass') == ''){
			this.setData('ltPropLabelClass','lyteRadioSliderText')	
		}
	}
	if(this.getData('ltPropChecked') != undefined && this.getData('ltPropChecked').toString().toLowerCase() == 'true'){
		this.$node.checked = true
	}
},
init:function(){
	this.changeStyleFunction()
},
didConnect:function(){
		if(this.getData('ltPropType').indexOf('switch') != -1 && this.getData('ltPropChecked')){
			var colorElement = this.$node.querySelector('.lyteRadioSwitch')
			if(colorElement){
				colorElement.style.backgroundColor = this.getData('ltPropColor')
			}
		}
	//this.$node.constructor._observers[1].value.call(this,true)
	this.callMethodsOnInit(true)
},
valueChanged:function(onrender){
	if(this.getData('block')){
		return ;
	}
	this.callMethodsOnInit.call(this,onrender)	
}.observes('ltPropType','ltPropChecked'),
callMethodsOnInit:function(onrender){
	if(onrender && !this.getData('ltPropFireOnInit')){
		return ;
	}
	if(this.getData('ltPropChecked') && this.getData('ltPropChecked').toString() == "true"){
		var element = this.$node.querySelector('input')
		var value = element.getAttribute('value')
		if(this.getMethods('onBeforeChecked')){
			this.executeMethod('onBeforeChecked',element,this)
		}
		if(this.getMethods('onChecked')){
			this.executeMethod('onChecked',element,this)
		}
		if(this.getMethods('onChanged')){
			this.executeMethod('onChanged',element,this)
		}
	}
},
actions:{
	mup:function(event){
			this.setData('shouldCallUnChecked',false)
			var allstuff = document.querySelectorAll('input[type="radio"][name="'+this.getData('ltPropName')+'"]')
			for(var i=0;i<allstuff.length;i++){
				if(allstuff[i].checked){
					this.setData('prev',allstuff[i].getAttribute('value'))
					this.setData('node',allstuff[i])
					this.setData('shouldCallUnChecked',true)
					break;
				}
			}
		var element = this.$node.querySelector('input')
		if(element.disabled){
			return;
		}
		var checked = element.checked
		if(!checked){
			if(this.getMethods('onBeforeChecked')){
				this.executeMethod('onBeforeChecked',element,this)	
			}
			var nodes = document.querySelectorAll('input[type="radio"][name="'+this.getData('ltPropName')+'"]')
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].checked){
					nodes[i].parentElement.parentElement.checked = false
					if(this.getMethods('onBeforeUnchecked')){
						this.executeMethod('onBeforeUnchecked',element,this)
					}
					this.setData('prev',nodes[i].getAttribute('value'))
					break;
				}
			}
		}
	},
	valueChanged:function(event){
		var ele
		ele=event.target
		if(ele.disabled){
			return ;
		}
		var parent = ele.parentElement.parentElement
		parent.checked = true
		var colorElement = this.$node.querySelector('.lyteRadioSwitch')
		if(colorElement){
			colorElement.style.backgroundColor = this.getData('ltPropColor')
		}
		if(ele.getAttribute('value') == this.getData('prev')){
			return ;
		}
		var node = this.getData('node')
		if(node){
			while(node.tagName != 'LYTE-RADIOBUTTON'){
				node = node.parentElement
			}
			node.ltProp('checked',false)
		}
		if(this.getData('node')){
			this.getData('node').nextElementSibling.style.backgroundColor = ''
			this.setData('node',undefined)
		}
		var prev = this.getData('prev')
		this.setData('block',true)
		this.setData('ltPropChecked',true)
		this.setData('block',false)
		if(this.getMethods('onUnchecked') && this.getData('shouldCallUnChecked')){
			this.executeMethod('onUnchecked',ele,this)
		}
		if(this.getMethods('onChecked')){
			this.executeMethod('onChecked',ele,this)
		}
		if(this.getMethods('onChanged')){
			this.executeMethod('onChanged',ele,this)
		}
		
	}
}
});
 
