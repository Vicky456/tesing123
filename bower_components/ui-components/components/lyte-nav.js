Lyte.Component.register("lyte-nav",{
_template:"<template tag-name=\"lyte-nav\"></template>",
_dynamicNodes : [],
_observedAttributes :["arrowTop","arrowBot","ltPropClick","ltPropAlignment"],
	didDestroy : function(){
		var allNodes = this.$node.querySelectorAll('lyte-nav-item')
		for(var i=0;i<allNodes.length;i++){
			var curValue = allNodes[i].getAttribute('lyte-shortcut')
			if(curValue){
				allNodes[i].setAttribute('lyte-shortcut',JSON.stringify({}))
			}
		}
	},
	didConnect:function(){
		if(this.getData('ltPropAlignment') == "vertical"){
			var nonScrollableDiv = document.createElement('div')
			nonScrollableDiv.setAttribute('class','lyteNavDiv')
			var children = this.$node.children
			nonScrollableDiv.style.overflow = "hidden"
			var length = children.length
			var arrows = this.$node.querySelectorAll('lyte-arrow')
			if(arrows.length != 0){
				for(var i=0;i<arrows.length;i++){
					arrows[i].style.display = "none"
				}
			}
			for(var i=0;i<length;i++){
				LyteComponent.appendChild(nonScrollableDiv,children[0])
			}
			LyteComponent.appendChild(this.$node,nonScrollableDiv)
			var arrows = this.$node.querySelectorAll('lyte-arrow')
			if(arrows.length == 0){
				this.addArrow('arrow-up')
				this.addArrow('arrow-down')
			}
			else{
				this.$node.insertBefore(arrows[0],this.$node.children[0])
				this.$node.appendChild(arrows[1])
			}
			arrows = this.$node.querySelectorAll('lyte-arrow')
			this.dispArrow.call(this)
			var arrowDownId,arrowUpId;
			var div = this.$node.querySelector('.lyteNavDiv');
			var that = this
			arrows[0].addEventListener('mouseenter',this.moveup.bind(this))

			arrows[1].addEventListener('mouseenter',this.movedown.bind(this))


			div.addEventListener('wheel',function(e){
				e.preventDefault()
				if(Math.floor(div.scrollHeight) == Math.floor(div.getBoundingClientRect().height)){
					return ;
				}
				if (e.deltaY < 0) {	
    				div.scrollTop = div.scrollTop - 6
    				if(that.$node.querySelectorAll('lyte-arrow')[1].style.display == 'none'){
    					that.$node.querySelectorAll('lyte-arrow')[1].style.display = "inline-block"
    					var topHeight = arrows[0].getBoundingClientRect().height
    					var botHeight = arrows[1].getBoundingClientRect().height
    					var total = topHeight + botHeight
    					div.style.height = "calc(100% - "+total+"px)"
    				}
    				if(div.scrollTop == 0){
    					that.$node.querySelector('lyte-arrow').style.display = "none"
    					var botHeight = arrows[1].getBoundingClientRect().height
    					div.style.height = "calc(100% - "+botHeight+"px)"
    				}
  				}
  				if (e.deltaY > 0) {
    				div.scrollTop = div.scrollTop + 6
    				if(that.$node.querySelector('lyte-arrow').style.display == 'none'){
    					that.$node.querySelector('lyte-arrow').style.display = "inline-block"
    					var topHeight = arrows[0].getBoundingClientRect().height
    					var botHeight = arrows[1].getBoundingClientRect().height
    					var total = topHeight + botHeight
    					div.style.height = "calc(100% - "+total+"px)"
    				}
    				if(Math.floor(div.getBoundingClientRect().height) + Math.floor(div.scrollTop) == Math.floor(div.scrollHeight) || Math.floor(div.getBoundingClientRect().height) + Math.floor(div.scrollTop) == Math.floor(div.scrollHeight) - 1){
    					var topHeight = arrows[0].getBoundingClientRect().height
    					that.$node.querySelectorAll('lyte-arrow')[1].style.display = "none"
    					div.style.height = "calc(100% - "+topHeight+"px)"
    				}
  				}
  				
			})




			

			arrows[0].addEventListener('mouseleave',this.removeup.bind(this))
			arrows[1].addEventListener('mouseleave',this.removedown.bind(this))

			
		}
	},
	removedown:function(){
		clearInterval(this.getData('arrowdid'))
	},
	movedown:function(){
		var div = this.$node.querySelector('.lyteNavDiv')
		if(Math.floor(div.getBoundingClientRect().height) === Math.floor(div.scrollHeight)){
			return ;
		}
		this.$node.querySelector('lyte-arrow').style.display = "inline-block"
		var arrows = this.$node.querySelectorAll('lyte-arrow')
		var topHeight = arrows[0].getBoundingClientRect().height
		var botHeight = arrows[1].getBoundingClientRect().height
		var total = topHeight + botHeight
		div.style.height = "calc(100% - "+total+"px)"
		var that = this
		var arrowDownId = setInterval(function(){
			if(div.scrollTop < div.scrollHeight){
				div.scrollTop = div.scrollTop + 1
			}
    		if(Math.floor(div.getBoundingClientRect().height) + Math.floor(div.scrollTop) == div.scrollHeight || Math.floor(div.getBoundingClientRect().height) + Math.floor(div.scrollTop) == Math.floor(div.scrollHeight) - 1){
    			that.$node.querySelectorAll('lyte-arrow')[1].style.display = "none"
    			div.style.height = "calc(100% - "+botHeight+"px)"
    		}
		},1)
		this.setData('arrowdid',arrowDownId)
	},
	removeup:function(){
		clearInterval(this.getData('arrowuid'))
	},
	moveup:function(){
		var div = this.$node.querySelector('.lyteNavDiv')
		if(Math.floor(div.getBoundingClientRect().height) === Math.floor(div.scrollHeight)){
			return ;
		}
		this.$node.querySelectorAll('lyte-arrow')[1].style.display = "inline-block"
		var arrows = this.$node.querySelectorAll('lyte-arrow')
		var topHeight = arrows[0].getBoundingClientRect().height
		var botHeight = arrows[1].getBoundingClientRect().height
		var total = topHeight + botHeight
		div.style.height = "calc(100% - "+ total +"px)"
		var that = this
		var arrowUpId = setInterval(function(){
			if(div.scrollTop != 0){
				div.scrollTop = div.scrollTop - 1
			}
   			if(div.scrollTop == 0){
   				that.$node.querySelector('lyte-arrow').style.display = "none"
   				div.style.height = "calc(100% - " + topHeight + "px)"
   			}
		},1)
		this.setData('arrowuid',arrowUpId)
	},
	addArrow:function(clsname){
		var iTag = document.createElement('i')
		var lyteArrowTag = document.createElement('lyte-arrow')
		lyteArrowTag.style.display = 'none'
		iTag.setAttribute('class',clsname)
		lyteArrowTag.appendChild(iTag)
		if(clsname.indexOf('up') != - 1){
			this.$node.insertBefore(lyteArrowTag,this.$node.children[0])
		}
		else{
			this.$node.appendChild(lyteArrowTag)
		}
	},
	dispArrow:function(){
		var arrows = this.$node.querySelectorAll('lyte-arrow')
		var div = this.$node.querySelector('.lyteNavDiv')
		var which = 0;
		var topHeight,botHeight
		if(this.getData('arrowTop')){
			arrows[0].style.display = "inline-block"
			topHeight = arrows[0].getBoundingClientRect().height
			which = 1;
		}
		if(this.getData('arrowBot')){
			arrows[1].style.display = "inline-block"
			botHeight = arrows[1].getBoundingClientRect().height
			if(which == 1){
				which = 3
			}
			else{
				which = 2
			}
		}
		switch(which){
			case 1:
				div.style.height = "calc(100% - "+ topHeight +"px)"
				arrows[1].style.display = "none"
				break;
			case 2:
				div.style.height = "calc(100% - "+ botHeight +"px)"
				arrows[0].style.display = "none"
				break
			case 3:
				var total = topHeight + botHeight
				div.style.height = "calc(100% - "+ total +"px)"
				break;
		}
	},
	data:function(){
		return {
			'arrowTop':Lyte.attr('boolean',{"default":false}),
			'arrowBot':Lyte.attr('boolean',{"default":false}),
			'ltPropClick':Lyte.attr('string',{"default":"lyteNavActive"}),
			'ltPropAlignment':Lyte.attr('string',{"default":"horizontal"})
		}
	}
})



Lyte.createCustomElement("lyte-nav-item", {
	constructor : function() {
		var parent = this
    	while(parent.tagName != 'LYTE-NAV' && parent.tagName != 'HTML'){
      		parent = parent.parentElement
    	}
    	if(parent.tagName == 'HTML'){
    		return ;
  		}
    	var component = parent.component
    	if(component.getData('ltPropAlignment') == "vertical"){
        	var div = this
        	while(!div.classList.contains('lyteNavDiv')){
          		div = div.parentElement
        	}  
   	 	}
    	if(this.hasAttribute('selected') && this.getAttribute('selected')){
        	if(component.getData('ltPropAlignment') == 'vertical'){   
          		var offsetTop = this.offsetTop
          		div.scrollTop = offsetTop
          		if(offsetTop != 0){
            		component.setData('arrowTop',true)
          		}  
          		component.setData('arrowBot',false)
        	}
        	this.classList.add(component.getData('ltPropClick'))
    	}
    	else if(component.getData('ltPropAlignment') == 'vertical'){
      		var newElemOffset = this.offsetTop
      		if(newElemOffset + this.getBoundingClientRect().height > div.getBoundingClientRect().height + div.scrollTop){
           		component.setData('arrowBot',true)    
        	}
    	}
    	this.addEventListener('click',function(){
      		this.setAttribute('selected',true)
    	}.bind(this))
	},
	static : {
		"observedAttributes" : {
			get : function() {
				return ['selected', 'lyte-shortcut'];
			}
		}
	},
	"attributeChangedCallback" : function(attributeName, oldValue, newValue, namespace) {
		if (attributeName === 'lyte-shortcut') {
        	if (typeof shortcut === 'function') {
          		if (!newValue) {
            		return;
         	 	}
          		newValue = JSON.parse(newValue);
          		oldValue = oldValue ? JSON.parse(oldValue) : {};
          		shortcut.push({
           			newKey: newValue.key,
            		type: newValue.type,
            		wait: newValue.wait,
            		oldKey: oldValue.key,
            		value: this
          		});
        	}
      	} 
      	else if (attributeName == 'selected' && newValue) {
        	var val = this.getAttribute('selected');
        	var parent = this;
        	while (parent.tagName != 'LYTE-NAV' && parent.tagName != 'HTML') {
          		parent = parent.parentElement;
        	}
        	if (parent.tagName == 'HTML') {
          		return;
        	}
        	var component = parent.component;
        	var click = component.getData('ltPropClick');
        	var prevSelected = parent.querySelector('.' + click);
        	if (prevSelected && prevSelected != this) {
          		prevSelected.setAttribute('selected', '');
        	}
        	if (val) {
          		this.classList.add(click);
          		if(component.getMethods('onItemSelected')){
          			component.executeMethod('onItemSelected',this,component)
          		}
        	}
      	} 
      	else if (attributeName == 'selected') {
        	var parent = this;
        	while (parent.tagName != 'LYTE-NAV' && parent.tagName != 'HTML') {
          		parent = parent.parentElement;
        	}
        	if (parent.tagName == 'HTML') {
          		return;
        	}
        	var component = parent.component;
        	var click = component.getData('ltPropClick');
        	this.classList.remove(click);
      	}
	}
});
