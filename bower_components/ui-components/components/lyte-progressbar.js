Lyte.Component.register('lyte-progressbar',{
_template:"<template tag-name=\"lyte-progressbar\">\t<template is=\"if\" value=\"{{lyteUiIfEquals(ltPropType,'circle')}}\">\t\t<template case=\"true\"><div class=\"lyteProgressBar lyteCircle\">\t\t\t<div class=\"lyteCircleType\">\t\t\t\t<svg class=\"svgValueEle\" width=\"{{lyteUiSetWH(ltPropRadius)}}\" height=\"{{lyteUiSetWH(ltPropRadius)}}\">\t\t\t\t    <circle cx=\"{{ltPropRadius}}\" cy=\"{{ltPropRadius}}\" r=\"{{lyteUiSetRadius(ltPropRadius,ltPropStroke)}}\" fill=\"none\" stroke=\"#DCE0E3\" stroke-width=\"{{ltPropStroke}}\"></circle>\t\t\t\t    <circle cx=\"{{ltPropRadius}}\" cy=\"{{ltPropRadius}}\" r=\"{{lyteUiSetRadius(ltPropRadius,ltPropStroke)}}\" fill=\"none\" stroke=\"{{ltPropBackground}}\" stroke-width=\"{{ltPropStroke}}\" stroke-dasharray=\"{{lyteUiSetDashArray(ltPropRadius,ltPropStroke)}}\" stroke-dashoffset=\"{{lyteUiSetOffset(ltPropRadius,ltPropStroke,ltPropValueCopy)}}\"></circle>\t\t\t\t</svg>\t\t\t\t<svg width=\"{{lyteUiSetWH(ltPropRadius)}}\" height=\"{{lyteUiSetWH(ltPropRadius)}}\" transform=\"{{lyteUiTextTransform(ltPropRadius)}}\" viewBox=\"{{lyteUiConcat('0 ','0 ',lyteUiSetWH(ltPropRadius),' ',lyteUiSetWH(ltPropRadius))}}\">\t\t\t\t\t<text font-size=\"1.5rem\" text-anchor=\"middle\" dy=\".2em\" x=\"50%\" y=\"50%\">{{lyteUiConcat(ltPropValueCopy,\"%\")}}</text>\t\t\t\t</svg>\t\t\t</div>\t\t</div></template>\t\t<template case=\"false\"><div class=\"lyteProgressBar lyteHorizontal\" style=\"{{lyteUiConcat('width:',ltPropWidth,';height:',ltPropHeight)}}\">\t\t\t<span class=\"lyteProgressStatus\" style=\"{{lyteUiConcat('width:',ltPropValueCopy,'%',';','background:',ltPropBackground)}}\">\t\t\t\t<template is=\"if\" value=\"{{ltPropAnimated}}\">\t\t\t\t\t<template case=\"true\"><span class=\"ltPropProgressAnimated progressMovingObj\"></span></template>\t\t\t\t</template>\t\t\t\t<template is=\"if\" value=\"{{ltPropShowPercentage}}\">\t\t\t\t\t<template case=\"true\"><span class=\"lyteProgressPercentage\">{{lyteUiConcat(ltPropValueCopy,\"%\")}}</span></template>\t\t\t\t</template>\t\t\t</span>\t\t</div></template>\t</template></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"attr","position":[0,1,1,1]},{"type":"attr","position":[0,1,1,3]},{"type":"attr","position":[0,1,3]},{"type":"text","position":[0,1,3,1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","';height:'","ltPropHeight"]}}}},{"type":"attr","position":[0,1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropValueCopy","'%'","';'","'background:'","ltPropBackground"]}}}},{"type":"attr","position":[0,1,1]},{"type":"if","position":[0,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[0,1,3]},{"type":"if","position":[0,1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropValue","ltPropType","ltPropProgressFillColor","ltPropCompletedFillColor","ltPropWidth","ltPropHeight","ltPropRadius","ltPropStroke","ltPropValueCopy","ltPropAnimated","ltPropShowPercentage"],
	didConnect: function(){
		this.setData('ltPropValueCopy',this.getData('ltPropValue'));
		this.setBackground();
	},
	data: function(){
		return {
			ltPropValue:Lyte.attr("string",{"default":'0'}),
			ltPropType:Lyte.attr("string",{"default":'bar'}),
			ltPropProgressFillColor:Lyte.attr("string",{"default":'#42a2eb'}),
			ltPropCompletedFillColor:Lyte.attr("string",{"default":'#3fbd5f'}),
			ltPropWidth:Lyte.attr("string",{"default":'100%'}),
			ltPropHeight:Lyte.attr("string",{"default":'12px'}),
			ltPropRadius:Lyte.attr("string",{"default":'50'}),
			ltPropStroke:Lyte.attr("string",{"default":'5'}),
			ltPropValueCopy:Lyte.attr("string",{"default":'0'}),
			ltPropAnimated:Lyte.attr("boolean",{"default": true}),
			ltPropShowPercentage:Lyte.attr("boolean",{"default": true})
		}
	},
	percentageChange : function(){
		this.setBackground();
	}.observes('ltPropValue'),
	setBackground : function(){
		this.setData('ltPropValue',Math.round(this.getData('ltPropValue')));
		this.setData('ltPropValueCopy',this.getData('ltPropValue'));
		if(this.getData('ltPropType') === 'circle'){
			if(this.getData('ltPropValue') >= 100){
				this.setData('ltPropValueCopy','100');
				var self = this;
				setTimeout(function(){
					self.$node.querySelector('.lyteProgressBar').classList.add('lyteProgressCompleted');
					self.setData('ltPropBackground',self.getData('ltPropCompletedFillColor'));
				},200);
			}
			else{
				this.$node.querySelector('.lyteProgressBar').classList.remove('lyteProgressCompleted');
				this.setData('ltPropBackground',this.getData('ltPropProgressFillColor'));
			}
		}
		else{
			this.setData('ltPropValue',Math.round(this.getData('ltPropValue')));
			if(this.getData('ltPropValue') >= 100){
				this.setData('ltPropValueCopy','100');
				var self = this;
				setTimeout(function(){
					self.$node.querySelector('.lyteProgressBar').classList.add('lyteProgressCompleted');
					self.setData('ltPropBackground',self.getData('ltPropCompletedFillColor'));
					if(self.getData('ltPropAnimated')){
						self.$node.querySelector('.lyteProgressBar .ltPropProgressAnimated').classList.remove('progressMovingObj');	
					}
				},200);
			}
			else{
				this.$node.querySelector('.lyteProgressBar').classList.remove('lyteProgressCompleted');
				this.setData('ltPropBackground',this.getData('ltPropProgressFillColor'));
				if(this.getData('ltPropAnimated')){
					this.$node.querySelector('.lyteProgressBar .ltPropProgressAnimated').classList.add('progressMovingObj');	
				}
			}
		}
	},
	setCircleStroke: function(circle,val){
		var per = circle.getAttribute('stroke-dasharray') * (1 - parseInt(val)/100);
		circle.setAttribute('stroke-dashoffset', per);
	},
	actions:{
		
	}
});