Lyte.Component.register('lyte-navigator', {
_template:"<template tag-name=\"lyte-navigator\">\t<div class=\"lyteNavigator\" onclick=\"{{action('prevent', event)}}\">\t\t<div class=\"lyteNavigator lyteDoubleBack lyteIconDoubleBack\" onclick=\"{{action('goFirst',event)}}\"></div>\t\t<div class=\"lyteNavigator lyteSingleBack lyteIconSingleBack\" onclick=\"{{action('onBackward',event)}}\"></div>\t\t<div class=\"lyteNavigatorMidPoint\">{{startRecord}} <span class=\"lyteNavigatorText\">{{ltPropMiddleText}}</span> {{endRecord}}</div> \t\t<div class=\"lyteNavigator lyteSingleFront lyteIconSingleFront\" onclick=\"{{action('onForward',event)}}\"></div>\t\t<div class=\"lyteNavigator lyteDoubleFront lyteIconDoubleFront\" onclick=\"{{action('goLast',event)}}\"></div>\t</div></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,5,0]},{"type":"text","position":[1,5,2,0]},{"type":"text","position":[1,5,4]},{"type":"attr","position":[1,7]},{"type":"attr","position":[1,9]}],
_observedAttributes :["ltPropPerpage","ltPropValue","ltPropRecords","ltPropMoreRecords","ltPropMiddleText"],
	didConnect:function(){
		this.buttonDisable.call(this)
		this.$node.constructor._observers[0].value.call(this);
	}, 
	data: function(){
		return {
			ltPropPerpage:Lyte.attr("number", {"default":10}), 
			ltPropValue:Lyte.attr("number", {"default":0}), 
			ltPropRecords:Lyte.attr("number", {"default":undefined}), 
			ltPropMoreRecords:Lyte.attr("boolean", {"default":false}),
			ltPropMiddleText : Lyte.attr('string', {'default' : 'to'})
		}
	}, 
	buttonDisable:function(){
        if(!this.getMethods('onNext'))
        	{
        		$L('div.lyteSingleFront', this.$node).e[0].style.display = "none";
        	}
		if(!this.getMethods('onHome'))
        	{
        		$L('div.lyteDoubleBack', this.$node).e[0].style.display = "none";
        	}
		if(!this.getMethods('onEnd'))
        	{
        		$L('div.lyteDoubleFront', this.$node).e[0].style.display = "none";
        	}
		if(!this.getMethods('onPrevious'))
        	{
        		$L('div.lyteSingleBack', this.$node).e[0].style.display = "none";
        	}
	}, 
	checkButton:function(){
		var firstIndex = this.getData('ltPropValue'), perPage = this.getData('ltPropPerpage'), MaxRecords = this.getData('ltPropRecords')
		var singleFront = $L('div.lyteSingleFront', this.$node).e[0], singleBack = $L('div.lyteSingleBack', this.$node).e[0], doubleBack = $L('div.lyteDoubleBack', this.$node).e[0], doubleFront = $L('div.lyteDoubleFront', this.$node).e[0];
		if(firstIndex <= 0)
			{
				doubleBack.classList.add('lyteDisabled')
			}
		else
			{
				doubleBack.classList.remove('lyteDisabled')
			}	
		if(firstIndex <= 0)
			{
				singleBack.classList.add('lyteDisabled')
			}
		else
			{
				singleBack.classList.remove('lyteDisabled')
			}	
		if((firstIndex + perPage >= MaxRecords) && !this.getData('ltPropMoreRecords'))
			{
				singleFront.classList.add('lyteDisabled')
			}
		else
			{
				singleFront.classList.remove('lyteDisabled')
			}		
		if((firstIndex + perPage >= MaxRecords))
			{
				doubleFront.classList.add('lyteDisabled')
			}
		else
			{
				doubleFront.classList.remove('lyteDisabled')
			}	
		// if(this.getData('ltPropMoreRecords'))
		// 	{
				this.setData('startRecord', (firstIndex + 1) > MaxRecords ? MaxRecords : (firstIndex + 1))
				this.setData('endRecord', (firstIndex + perPage) > MaxRecords ? MaxRecords : firstIndex + perPage)
			// }
		// else
		// 	{	
		// 		this.setData('startRecord', Math.ceil((firstIndex + 1) / perPage))
		// 		this.setData('endRecord', Math.ceil(MaxRecords / perPage))
		// 		this.setData('middleText', 'of')
		// 	}
	}.observes('ltPropPerpage', 'ltPropValue', 'ltPropRecords', 'ltPropMoreRecords'), 
	actions : {
			  "onForward" : function(evt){
			       	var firstIndex = this.getData('ltPropValue'), perPage = this.getData('ltPropPerpage'), MaxRecords = this.getData('ltPropRecords')
			       	firstIndex += perPage
			       	z = (firstIndex) > MaxRecords ? MaxRecords : firstIndex;
			        var actionName = this.getMethods('onNext')
			        if(actionName)
				    	 {
				    		this.executeMethod('onNext', z, this.$node, evt)
				   		 }
				}, 			
			 "onBackward" : function(evt){
				    var firstIndex = parseInt(this.getData('ltPropValue')), perPage = parseInt(this.getData('ltPropPerpage'))
			        firstIndex -= perPage
			        z = (firstIndex) < 0 ? 0 : firstIndex;
			        if(this.getMethods('onPrevious'))
				    	 {
				    		this.executeMethod('onPrevious', z, this.$node, evt)
				    	}
				}, 
			 "goFirst" : function(evt){
				    this.setData('ltPropValue', 0, this.$node, evt);
			       if( this.getMethods('onHome'))
				    	 {
				    		this.executeMethod('onHome', this.getData('ltPropValue'), this.$node, evt);
				    	 }
				}, 
			 "goLast" : function(evt){
				    var firstIndex = this.getData('ltPropValue'), perPage = this.getData('ltPropPerpage'), MaxRecords = this.getData('ltPropRecords')
				    x = Math.floor(MaxRecords / perPage) * perPage >= MaxRecords ? MaxRecords - perPage : Math.floor(MaxRecords / perPage) * perPage;
			        if(this.getMethods('onEnd'))
				    	 {
				    		this.executeMethod('onEnd', x, this.$node, evt);
				    	}
				},
			'prevent' : function(evt){
					evt.preventDefault();
			   }	
	}
});