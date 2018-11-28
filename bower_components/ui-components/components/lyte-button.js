Lyte.Component.register("lyte-button",{
_template:"<template tag-name=\"lyte-button\">\t<button type=\"{{ltPropType}}\" onclick=\"{{action('check',event)}}\" class=\"{{ltPropBClass}}\" value=\"{{ltPropValue}}\" tabindex=\"{{ltPropTabindex}}\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\">\t\t\t<lyte-yield yield-name=\"text\"></lyte-yield>\t\t</button></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]}],
_observedAttributes :["ltPropName","ltPropDisabled","ltPropAutofocus","ltPropAppearance","ltPropId","ltPropType","ltPropValue","ltPropTabindex","ltPropStyle","ltPropSize","ltPropBackgroundColor","ltPropColor","lyteShortcut","ltPropClass"],	
	data: function(){
		return {
			'ltPropName':Lyte.attr("string",{"default":undefined}),
			'ltPropDisabled': Lyte.attr("boolean",{"default":false}),
			'ltPropAutofocus': Lyte.attr("boolean",{"default":false}),
			'ltPropAppearance': Lyte.attr("string",{"default":'default'}),
			'ltPropId': Lyte.attr("string",{"default":undefined}),
			'ltPropType': Lyte.attr("string",{"default":'button'}),
			'ltPropValue': Lyte.attr("string",{"default":undefined}),
			'ltPropTabindex':Lyte.attr("string",{"default":undefined}),
			'ltPropStyle':Lyte.attr("string",{"default":undefined}),
			'ltPropSize':Lyte.attr("string",{"default":undefined}),
			'ltPropBackgroundColor':Lyte.attr("string",{"default":undefined}),
			'ltPropColor':Lyte.attr("string",{"default":undefined}),
			'lyteShortcut':Lyte.attr("object",{"default":{}}),
			'ltPropClass':Lyte.attr("string",{"default":''})
		}
	},
	init:function(){
		this.pushValue()
	},
	didDestroy:function(){
		var val = this.getData('lyteShortcut')
		if(val){
			if(typeof shortcut === 'function'){
				shortcut.push({
					newKey : undefined,
					type : undefined,
					wait : undefined,
					oldKey : val.key
				})
			}
		}
	},
	shortcutChanged:function(){
		this.pushValue()
	}.observes('lyteShortcut'),
	pushValue:function(){
		var key = this.getData('lyteShortcut')
		if(!key.key){
			return ;
		}
		var node = this.$node
		if(typeof shortcut === 'function'){
			shortcut.push({
				newKey : key.key,
				type : key.type,
				wait : key.wait,
				oldKey:undefined,
				value:node
			})
		}
	},
	changeClass:function(){
		this.setData('ltPropBStyle','')
		this.setData('ltPropBClass','lyte-button' + ' ' + this.getData('ltPropClass'))
		if(this.getData('ltPropBackgroundColor')){
			this.setData('ltPropBClass',this.getData('ltPropBClass') + ' lyteBackgroundColorBtn')
		}
		else if(this.getData('ltPropColor')){
			this.setData('ltPropBClass',this.getData('ltPropBClass') + ' lyteColorBtn')
		}
		else if(this.getData('ltPropAppearance').indexOf('default') != -1){
			this.setData('ltPropBClass',this.getData('ltPropBClass') + ' lyteDefaultBtn') 
		}
		else if(this.getData('ltPropAppearance').indexOf('primary') != -1){
			this.setData('ltPropBClass', this.getData('ltPropBClass') + ' lytePrimaryBtn')
		}
		if(this.getData('ltPropAppearance').indexOf('success') != -1){
			this.setData('ltPropBClass', this.getData('ltPropBClass') + " lyteSuccess")
		}
		else if(this.getData('ltPropAppearance').indexOf('failure') != -1){
			this.setData('ltPropBClass', this.getData('ltPropBClass') + " lyteFailure")
		}
		else if(this.getData('ltPropAppearance').indexOf('secondary') != -1){
			this.setData('ltPropBClass', this.getData('ltPropBClass') + " lyteSecondary")
		}
		if(this.getData('ltPropSize')){
			if(this.getData('ltPropSize').toLowerCase() == 'extra-small'){
				this.setData('ltPropBClass', this.getData('ltPropBClass') + ' lyteExsm')
			}
			else if(this.getData('ltPropSize').toLowerCase() == 'small'){
				this.setData('ltPropBClass', this.getData('ltPropBClass') + ' lyteSm')
			}
			else if(this.getData('ltPropSize').toLowerCase() == 'large'){
				this.setData('ltPropBClass', this.getData('ltPropBClass') + ' lyteLg')
			}
		}
		this.setData('ltPropBStyle','')
		if(this.getData('ltPropColor')){
			if(!this.getData('ltPropBackgroundColor')){
				this.setData('ltPropBStyle',this.getData('ltPropBStyle')+"color:"+this.getData('ltPropColor')+";border-color:"+this.getData('ltPropColor')+";")
			}
			else{
				this.setData('ltPropBStyle','background-color:'+this.getData('ltPropBackgroundColor')+"!important;border-color:"+this.getData('ltPropBackgroundColor')+";color:" + this.getData('ltPropColor') + ";")
			}
		}
		else if(this.getData('ltPropBackgroundColor')){
			this.setData('ltPropBStyle','background-color:'+this.getData('ltPropBackgroundColor')+"!important;border-color:"+this.getData('ltPropBackgroundColor')+";color:white;")
		}
		if(this.getData('ltPropStyle')){
			this.setData('ltPropBStyle',this.getData('ltPropBStyle')+this.getData('ltPropStyle'))
		}
		if(this.$node.querySelector('button')){
			this.setStyle();
		}
	}.observes('ltPropClass','ltPropIcon','ltPropBackgroundColor','ltPropColor','ltPropStyle','ltPropAppearance').on('init'),
	didConnect:function(){
		this.setStyle();
	},
	setStyle:function(){
		this.$node.querySelector('button').setAttribute('style',this.getData('ltPropBStyle'))
	},
	actions:{
		check:function(event){
			var button = this.$node.querySelector('button')
			if(button.disabled){
				event.stopPropagation()
			}
		}
	}
});
