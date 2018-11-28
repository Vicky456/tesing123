Lyte.Component.register('lyte-slider',{
_template:"<template tag-name=\"lyte-slider\">\t<div class=\"lyteSlide\">\t\t<template is=\"if\" value=\"{{lyteUiHeaderCheck(ltPropArrow)}}\">\t\t\t<template case=\"false\">\t\t\t\t<div class=\"lyteRangeSlider\" onclick=\"{{action('click',event)}}\" tabindex=\"0\" onkeydown=\"{{action('keydown', event)}}\">\t\t\t\t\t<div class=\"lyteSliderFill\"></div>\t\t\t\t\t<div class=\"lyteSliderHandler\" tabindex=\"0\"></div>\t\t\t\t\t<template is=\"if\" value=\"{{ltPropRangeHandler}}\"><template case=\"true\">\t\t\t\t\t\t\t<div class=\"lyteSliderHandler\" tabindex=\"0\"></div>\t\t\t\t\t\t</template></template><template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\">\t\t\t\t\t\t<lyte-yield yield-name=\"yield\"></lyte-yield>\t\t\t\t\t</template><template case=\"false\">\t\t\t\t\t\t<div class=\"lyteScaleOption\">\t\t\t\t\t\t\t<template is=\"for\" items=\"{{divLength}}\" index=\"indexVal\">\t\t\t\t\t\t\t\t<span class=\"lyteScaleLine\" style=\"{{item}}\">\t\t\t\t\t\t\t\t\t<span></span>\t\t\t\t\t\t\t\t\t<span class=\"lyteScalLable\">{{scaleVal[indexVal]}}</span>\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t</template>\t\t\t\t\t\t</div>\t\t\t\t\t </template></template>\t\t\t\t\t</div>\t\t\t</template>\t\t\t<template case=\"true\">\t\t\t\t<div class=\"lyteRangeSlider\" onclick=\"{{action('click',event)}}\" tabindex=\"0\" onkeydown=\"{{action('keydown', event)}}\">\t\t\t\t\t<div class=\"lyteSliderFill\"></div>\t\t\t\t\t<div class=\"lyteSliderHandler\" tabindex=\"0\"></div>\t\t\t\t\t<template is=\"if\" value=\"{{ltPropRangeHandler}}\"><template case=\"true\">\t\t\t\t\t\t\t<div class=\"lyteSliderHandler\" tabindex=\"0\"></div>\t\t\t\t\t\t</template></template><template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\">\t\t\t\t\t\t<lyte-yield yield-name=\"yield\"></lyte-yield>\t\t\t\t\t</template><template case=\"false\">\t\t\t\t\t\t<div class=\"lyteScaleOption\">\t\t\t\t\t\t\t<template is=\"for\" items=\"{{divLength}}\" index=\"indexVal\">\t\t\t\t\t\t\t\t<span class=\"lyteScaleLine\" style=\"{{item}}\">\t\t\t\t\t\t\t\t\t<span></span>\t\t\t\t\t\t\t\t\t<span class=\"lyteScalLable\">{{scaleVal[indexVal]}}</span>\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t</template>\t\t\t\t\t\t</div>\t\t\t\t\t</template></template>\t\t\t\t\t</div>\t\t\t</template>\t\t</template>\t</div>\t</template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,6]},{"type":"if","position":[1,6],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item"}}},{"type":"text","position":[1,3,0]}]}]}},"default":{}}]},"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,6]},{"type":"if","position":[1,6],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item"}}},{"type":"text","position":[1,3,0]}]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["divLength","scaleVal","ltPropMin","ltPropMax","ltPropScaleInterval","ltPropStep","ltPropHandler","ltPropArrow","ltPropDirection","ltPropWidth","ltPropFillColor","ltPropNonFillColor","ltPropHeight","ltPropValue","ltPropDiscrete","ltPropContent","ltPropRangeHandler","ltPropMinValue","ltPropMaxValue","ltPropDisabled","ltPropFlag","ltPropSelectedValue1","ltPropSelectedValue2","ltPropYield","eventListener"],
		init:function(){
			this.$node.constructor._observers[2].value.call(this)
		},

		didDestroy : function(){
			document.removeEventListener('mouseup', this.getData('eventListener').mouseup);
		},

		watchFun:function(){
			var lyteSlide=$L('div.lyteSlide',this.$node).e[0];
			if(this.getData('ltPropDisabled'))
				{
					lyteSlide.classList.add('lyteSliderDisabled')
				}
			else
				{
					lyteSlide.classList.remove('lyteSliderDisabled')
				}
			lyteSlide = null;		
		}.observes('ltPropDisabled'),

		heightSet : function (){
		    if(this.getData('ltPropDirection').indexOf('Horizontal')!=-1)
					{
						if(!this.getData('ltPropWidth'))
							{
								this.setData('ltPropWidth','200px')
							}
						if(!this.getData('ltPropHeight'))
							{
								this.setData('ltPropHeight','30px')
							}
					}
			else
				{
					if(!this.getData('ltPropWidth'))
							{
								this.setData('ltPropWidth','30px')
							}
						if(!this.getData('ltPropHeight'))
							{
								this.setData('ltPropHeight','200px')
							}
				}
		   if(this.getData('ltPropWidth'))
		      {
			      this.$node.style.width=this.getData('ltPropWidth')
		      }
		   if(this.getData('ltPropHeight'))
		      {
			      this.$node.style.height=this.getData('ltPropHeight')
		      } 
		   this.$node.constructor._observers[4].value.call(this)   
		}.observes('ltPropWidth','ltPropHeight'),

		initialWork : function (){
			var ltPropContent = this.getData('ltPropContent').slice();
			if(this.getData('ltPropDiscrete'))
				{
					this.setData('ltPropStep',this.getData('ltPropDiscrete'));
					this.setData('ltPropScaleInterval',this.getData('ltPropDiscrete'));					
				}	
			if(!ltPropContent.length)
				{
					if(parseFloat(this.getData('ltPropValue'))<parseFloat(this.getData('ltPropMin')) || isNaN(parseFloat(this.getData('ltPropValue'))))
						{	
							this.setData('ltPropValue',this.getData('ltPropMin'));
						}
					else if(parseFloat(this.getData('ltPropValue'))>parseFloat(this.getData('ltPropMax')))
						{
							this.setData('ltPropValue',this.getData('ltPropMax'));
						}
					this.setData('ltPropSelectedValue1', this.getData('ltPropValue'));	
				}
			else if(ltPropContent.length)
				{
					this.setData('ltPropMax','100');
					this.setData('ltPropScaleInterval',''+parseFloat(100/(ltPropContent.length-1))+'')
					this.setData('ltPropStep',this.getData('ltPropScaleInterval'))
					this.setData('ltPropDiscrete',this.getData('ltPropScaleInterval'))
					if(!this.getData('ltPropValue'))
						{
							this.setData('ltPropValue',this.getData('ltPropContent')[0])
							this.setData('ltPropSelectedValue1', this.getData('ltPropValue'));	
						}	
				}	
			else if(!this.getData('ltPropDiscrete')&&!this.getData('ltPropStep'))
				{
					this.setData('ltPropStep','1');
					this.setData('ltPropScaleInterval',''+(0.1*parseFloat(this.getData('ltPropMax'))))
					if(this.getData('ltPropContent').length)
						{
							this.setData('ltPropDiscrete',''+(0.1*parseFloat(this.getData('ltPropMax'))))
						}
				}
			var array = []
			var scale = []
			if(!this.getData('ltPropYield'))	
				{
				if(this.getData('ltPropHandler').indexOf('Arrow')!=-1)
					{
						this.setData('ltPropArrow',true);
						if(this.getData('ltPropDirection').indexOf('Horizontal')!=-1)
							{	
								temp=parseFloat(this.getData('ltPropMin'));
								for(var i=0;temp<=parseFloat(this.getData('ltPropMax'));i++)
									{
										array.push('left:'+(((temp-parseFloat(this.getData('ltPropMin')))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin'))))*100)+'%');
										if(this.getData('ltPropContent').length)
											{
												scale.push(ltPropContent[i])
											}
										else	
											{
												scale.push(temp);
											}	
										temp+=parseFloat(this.getData('ltPropScaleInterval'));
									}
								maxVal = ltPropContent.length ? ltPropContent[ltPropContent.length-1] : this.getData('ltPropMax');
								if(scale[scale.length-1]!=maxVal)
									{
										array.push('left:'+(100)+'%');
										if(ltPropContent.length)
											{
												scale.push(ltPropContent[ltPropContent.length - 1])
											}
										else	
											{
												scale.push(this.getData('ltPropMax'));	
											}
									}	
							}
						else
							{
								temp=parseFloat(this.getData('ltPropMin'));
								for(var i=0;temp<=parseInt(this.getData('ltPropMax'));i++)
									{
										array.push('top:'+(((temp-parseFloat(this.getData('ltPropMin')))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin'))))*100)+'%');
										if(ltPropContent.length)
											{
												scale.push(ltPropContent[i])
											}
										else	
											{
												scale.push(temp);
											}
										temp+=parseInt(this.getData('ltPropScaleInterval'));
									}
								maxVal = ltPropContent.length ? ltPropContent[ltPropContent.length - 1] : this.getData('ltPropMax');
								if(scale[scale.length-1]!=maxVal)
									{
										array.push('top:'+(100)+'%');
										if(ltPropContent.length)
											{
												scale.push(ltPropContent[ltPropContent.length - 1])
											}
										else	
											{
												scale.push(this.getData('ltPropMax'));		
											}
									}	
							}
					}
				else
					{
						if(this.getData('ltPropDirection').indexOf('Horizontal')!=-1)
							{
								array.push('left:'+0+'%');
								array.push('left:'+100+'%');
								scale=this.MaxMinSet.call(this)
							}
						else
							{
								array.push('top:'+0+'%');
								array.push('top:'+100+'%');
								scale=this.MaxMinSet.call(this)
							}
						this.setData('scaleVal',scale);			
					}
			}
			this.setData('scaleVal', scale);
			this.setData('divLength', array);	
		}.observes('ltPropContent','ltPropMax','ltPropMin','ltPropScaleInterval','ltPropDiscrete','ltPropStep','ltPropValue'),

		colorSet : function () {
			if(this.getData('ltPropFillColor'))
		    	{
		    		$L('div.lyteSliderFill', this.$node).e[0].style.backgroundColor=this.getData('ltPropFillColor');
		    	}
		    if(this.getData('ltPropNonFillColor'))
		    	{
		    		$L('div.lyteRangeSlider', this.$node).e[0].style.backgroundColor=this.getData('ltPropNonFillColor');
		    	}
		    }.observes('ltPropFillColor','ltPropNonFillColor'),

		didConnectWrk : function () {
			var lyterangeFlag,handlers,nodeName,lyteRangeSlider= $L('div.lyteRangeSlider', this.$node).e[0], lyteSlide= $L('div.lyteSlide', this.$node).e[0];
			var handlers = $L('div.lyteSliderHandler', this.$node).e;
			if(this.getData('ltPropRangeHandler'))
				{
					var content =  this.getData('ltPropContent')
					if(!this.getData('ltPropMinValue'))
						{
							this.setData('ltPropMinValue',content ? content[0] : this.getData('ltPropMin'));
							this.setData('ltPropSelectedValue1',this.getData('ltPropMinValue'));
						}
					if(!this.getData('ltPropMaxValue'))
						{
							this.setData('ltPropMaxValue',content ? content[content.length - 1] : this.getData('ltPropMax'));
							this.setData('ltPropSelectedValue2',this.getData('ltPropMaxValue'))
						}
				handlers[1].addEventListener('mousedown',this.eventListener,true);
				handlers[1].node=this			
				}
				handlers[0].addEventListener('mousedown',this.eventListener,true);
				handlers[0].node=this
			lyteRangeSlider.className = 'lyteRangeSlider ' + this.getData('ltPropDirection');
			var handler= $L('div.lyteSliderHandler', this.$node).e
			if(!this.getData('ltPropYield'))
				{
					if($L('div.lyteScaleOption', this.$node).e[0])
						{
							$L('div.lyteScaleOption', this.$node).e[0].classList.add(this.getData('ltPropHandler'))
						}
				}
			for(var j=0;j<handler.length;j++)
				{
					handler[j].className = 'lyteSliderHandler ' + this.getData('ltPropHandler') + ' lyteHandler' + (j + 1);
				}
			if($L('.lyteScaleOption').e[0])	
			  	{
			  		$L('.lyteScaleOption').e[0].className = 'lyteScaleOption ' + this.getData('ltPropHandler');
			  	}	
		      var lyteSliderFill= $L('div.lyteSliderFill', this.$node).e[0];
		      if(this.getData('ltPropContent').length)
					{
						var index1,index2,index = this.getData('ltPropContent').indexOf(this.getData('ltPropValue'));
						node= $L('div.lyteSliderHandler', this.$node).e;
						index = index > -1 ? index : 0 ;
						if(this.getData('ltPropRangeHandler'))
							{
								index1=this.getData('ltPropContent').indexOf(this.getData('ltPropMinValue'));
								index1=index1!=-1?index1:0;
								index2=this.getData('ltPropContent').indexOf(this.getData('ltPropMaxValue'));
								index2=index2!=-1?index2:this.getData('ltPropContent').length-1;
							}
						if(this.getData('ltPropDirection').indexOf('Horizontal')!=-1)
							{
								if(this.getData('ltPropRangeHandler'))
									{
										this.rangeInitialSet.call(this,node[0],'left','ltPropWidth','clientWidth',index1)
										this.rangeInitialSet.call(this,node[1],'left','ltPropWidth','clientWidth',index2)
										this.rangeSliderFill.call(this);
									}
								else	
									{
										this.rangeInitialSet.call(this,node[0],'left','ltPropWidth','clientWidth',index)
										lyteSliderFill.style.width=(index/(this.getData('ltPropContent').length-1) * (lyteSlide.clientWidth ? lyteSlide.clientWidth : parseInt(this.getData('ltPropWidth'))))+'px';
									}
							}
						else
							{
								if(this.getData('ltPropRangeHandler'))
									{
										this.rangeInitialSet.call(this,node[0],'top','ltPropHeight','clientHeight',index1)
										this.rangeInitialSet.call(this,node[1],'top','ltPropHeight','clientHeight',index2)
										this.rangeSliderFill.call(this);
										var evt = new Event('click');
										evt.clientY = node[0].getBoundingClientRect().top - 2;
										evt.flag = true;
										$L('.lyteRangeSlider', this.$node).e[0].dispatchEvent(evt);
										evt.clientY = node[1].getBoundingClientRect().top - 2;
										$L('.lyteRangeSlider', this.$node).e[0].dispatchEvent(evt);
									}								
								else
									{
										this.rangeInitialSet.call(this,node[0],'top','ltPropHeight','clientHeight',index)
										lyteSliderFill.style.height=(index/(this.getData('ltPropContent').length-1) * (lyteSlide.clientHeight ? lyteSlide.clientHeight : parseInt(this.getData('ltPropHeight'))))+'px';
									}
							}	
					}
				else if(!this.getData('ltPropRangeHandler'))
					{
						this.initialValueSet.call(this, $L('div.lyteSliderHandler', this.$node).e[0],parseFloat(this.getData('ltPropValue')))
					    if(this.getData('ltPropDirection').indexOf('Horizontal')!=-1)
							{
								lyteSliderFill.style.width=((parseFloat(this.getData('ltPropValue'))-parseFloat(this.getData('ltPropMin')))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))* (lyteSlide.clientWidth ? lyteSlide.clientWidth : parseInt(this.getData('ltPropWidth'))))+'px';
							}
						else
							{
								lyteSliderFill.style.height=((parseFloat(this.getData('ltPropValue'))-parseFloat(this.getData('ltPropMin')))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))* (lyteSlide.clientHeight ? lyteSlide.clientHeight : parseInt(this.getData('ltPropHeight'))))+'px';
							}
					}
				else
					{
						this.initialValueSet.call(this, $L('div.lyteHandler1', this.$node).e[0],parseFloat(this.getData('ltPropMinValue')))
						this.initialValueSet.call(this, $L('div.lyteHandler2', this.$node).e[0],parseFloat(this.getData('ltPropMaxValue')))
						this.rangeSliderFill.call(this);
					}
		}.observes('ltPropScaleInterval','ltPropValue','ltPropMin','ltPropMax','ltPropMinValue','ltPropMaxValue','ltPropContent','ltPropHandler','ltPropRangeHandler'),  

		directionObs : function(){
			var lyteSliderHandler = $L('.lyteSliderHandler', this.$node).e[0];
			lyteSliderHandler.style.removeProperty('left');
			lyteSliderHandler.style.removeProperty('top');
			var lyteSliderFill = $L('.lyteSliderFill', this.$node).e[0];
			lyteSliderFill.style.removeProperty('width');
			lyteSliderFill.style.removeProperty('height');
			this.$node.constructor._observers[1].value.call(this);
			this.$node.constructor._observers[2].value.call(this);
			this.$node.constructor._observers[4].value.call(this);
		}.observes('ltPropDirection'),

		MaxMinSet:function(){
				var scale=[];
				if(this.getData('ltPropContent').length)
					{
						scale.push(this.getData('ltPropContent')[0]);
						scale.push(this.getData('ltPropContent')[this.getData('ltPropContent').length-1])
					}
				else	
					{
						scale.push(this.getData('ltPropMin'));
						scale.push(this.getData('ltPropMax'));
					}
				return scale;	
		},
		selectedVal:function(offsetHeight,ltPropHeight,node,left){
			var selectedVal, lyteSlide = $L('div.lyteSlide', this.$node).e[0];
			if(node)
				{
					selectedVal=(((node.getBoundingClientRect()[left]+node[offsetHeight]/2- lyteSlide.getBoundingClientRect()[left])/lyteSlide[offsetHeight])*(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))+parseFloat(this.getData('ltPropMin'))).toFixed(2);
				}
			else	
				{
					selectedVal=(($L('div.lyteSliderFill',this.$node).e[0][offsetHeight]/lyteSlide[offsetHeight])*(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))+parseFloat(this.getData('ltPropMin'))).toFixed(2);
		  		}
		  	if(this.getData('ltPropContent').length)
		  		{
		  			numb = parseFloat(selectedVal)/parseFloat(this.getData('ltPropScaleInterval'));
		  			if(selectedVal>100)
		  				{
		  					selectedVal=this.getData('ltPropContent')[this.getData('ltPropContent').length - 1];
		  				}
		  			else
		  				{
		  					selectedVal=this.getData('ltPropContent')[parseInt(parseFloat(numb).toFixed(0))];
		  				}
		  		}
		  	return selectedVal;	
		},
		onSelect:function(flag){
			if(this.getMethods('onChange')||this.getMethods('onSelect'))
				{
					if(!this.getData('ltPropRangeHandler'))
						{
							if(this.getMethods('onChange'))	
								{
									this.executeMethod('onChange',this.getData('ltPropSelectedValue1'), this.$node)	
								}
							if(this.getMethods('onSelect') && flag)	
								{
									this.executeMethod('onSelect',this.getData('ltPropSelectedValue1'), this.$node)	
								}
						}
					else
						{
							if(this.getMethods('onChange'))	
								{
									this.executeMethod('onChange', this.getData('ltPropSelectedValue1'), this.getData('ltPropSelectedValue2'), this.$node);	
								}
							if(this.getMethods('onSelect') && flag)	
								{
									this.executeMethod('onSelect', this.getData('ltPropSelectedValue1'), this.getData('ltPropSelectedValue2'), this.$node);	
								}
						}
				}			
			},
		scroll:function(widthVal,offWidth){
				var discrete=parseFloat(this.getData('ltPropDiscrete'));
				var flag=false,flag1=false,flag2=false;
				if(widthVal>=parseFloat(this.getData('ltPropMax'))-(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))%discrete)
					{
						discrete=(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))%discrete;
						flag1=true;
						flag=true;
					}
				else if(widthVal-parseFloat(this.getData('ltPropDiscrete'))/2<(parseFloat(this.getData('ltPropMin'))))
					{
						flag=true;
						flag2=true;
					}
				if(flag)									
					{
						if(widthVal>parseFloat(this.getData('ltPropMax'))-discrete/2)
							{
								if(flag1)
									{
										widthVal=parseFloat(this.getData('ltPropMax'))
									}
								else
									{
										widthVal=widthVal-(widthVal-parseFloat(this.getData('ltPropMin')))%discrete+discrete;
									}
							}
						else
							{
								discrete=parseFloat(this.getData('ltPropDiscrete'))
								if(flag2)
									{
										widthVal=parseFloat(this.getData('ltPropMin'))
									}
								else
									{
										widthVal=widthVal-(widthVal-parseFloat(this.getData('ltPropMin')))%discrete;
									}
							}
					}
				else
					{
						if((widthVal-parseFloat(this.getData('ltPropMin')))%discrete>=parseFloat(this.getData('ltPropDiscrete'))/2)
							{
								widthVal=widthVal-(widthVal-parseFloat(this.getData('ltPropMin')))%discrete+discrete;
							}
						else
							{
								widthVal=widthVal-(widthVal-parseFloat(this.getData('ltPropMin')))%discrete;
							}
					}		
				width=((widthVal-parseFloat(this.getData('ltPropMin')))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))*offWidth)
				return width;
		},	
		ScrollCheck:function(node,left1,width1,clientX,offsetWidth,clientWidth,ltPropWidth,offsetLeft, event){
			var step,flag=true,lyteHandler2,lyteHandler1,lyteRangeSlider, lyteSlide = $L('div.lyteSlide',this.$node).e[0];;
			if(!this.getData('ltPropRangeHandler'))
				{	
					width=event[clientX]- $L('div.lyteSliderFill', this.$node).e[0].getBoundingClientRect()[left1];
				}
			else
				{
				    lyteHandler2= $L('div.lyteHandler2', this.$node).e[0],lyteHandler1= $L('div.lyteHandler1', this.$node).e[0], lyteRangeSlider=$L('div.lyteRangeSlider', this.$node).e[0];
					if((lyteHandler2.getBoundingClientRect()[left1]-lyteHandler1.getBoundingClientRect()[left1])<=0)	
						{
							if(lyteRangeSlider.node)
								{
									if(lyteRangeSlider.node.classList.contains('lyteHandler1'))
										{
											if(event[clientX]<(lyteHandler1.getBoundingClientRect()[left1]+lyteHandler1.clientWidth)&&(lyteHandler2.getBoundingClientRect()[left1]-lyteHandler1.getBoundingClientRect()[left1])==0)
												{
													flag=true;
												}
											else
												{	
													if(event.type=='mousemove')
														{
															flag=false
														}
												}	
										}
									else if(lyteRangeSlider.node.classList.contains('lyteHandler2'))
										{
											if(event[clientX]>(lyteHandler2.getBoundingClientRect()[left1])&&(lyteHandler2.getBoundingClientRect()[left1]-lyteHandler1.getBoundingClientRect()[left1])==0)
												{   
													flag=true;
												}
											else
												{
													if(event.type=='mousemove')
														{
															flag=false
														}
												}	
										}
								}		
							else
								{
									if(event.type=='mousemove')
										{
											flag=false
										}
								}	
						}	
					else
						{
							step=this.getData('ltPropDiscrete')?parseFloat(this.getData('ltPropDiscrete')):0;
						}	
				width=event[clientX]-lyteRangeSlider.getBoundingClientRect()[left1];	
				}
			if(this.getData('ltPropContent').length&&event.type=='click')
				{
					if(this.getData('ltPropRangeHandler'))
						{
							if(parseInt(lyteHandler2.getBoundingClientRect()[left1]-lyteHandler1.getBoundingClientRect()[left1])<1/(this.getData('ltPropContent').length-1) * this.$node[ltPropWidth] &&event[clientX]<(lyteHandler2.getBoundingClientRect()[left1]+lyteHandler2[clientWidth])&&event[clientX]>(lyteHandler1.getBoundingClientRect()[left1]+lyteHandler1[clientWidth]))
								{
									flag=false
								}
						}
				}		
			var discrete=parseFloat(this.getData('ltPropDiscrete')),lyteSliderHandler= $L('div.lyteSliderHandler', this.$node).e[0];
			if(this.getData('ltPropDiscrete'))
				{	
					widthVal=((width/lyteSlide[clientWidth])*(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))+parseFloat(this.getData('ltPropMin')))
					width=this.scroll.call(this,widthVal, lyteSlide[clientWidth]);		
				}
				width=width < lyteSlide[clientWidth] ? width : lyteSlide[clientWidth];
				width=width>0?width:0;	
				left=(width-node[clientWidth]/2);
				left=left>(lyteSlide[clientWidth] -lyteSliderHandler[clientWidth]/2) ? lyteSlide[clientWidth] - lyteSliderHandler[clientWidth]/2:left;
				left=left>-node.clientWidth/2?left:-node.clientWidth/2;
				if(this.getData('ltPropRangeHandler'))
					{
						if(node.classList.contains('lyteHandler1'))
							{	
								if(lyteHandler2[offsetLeft]<left)
									{
										flag=false
									}
							}
						else
							{
								if(lyteHandler1[offsetLeft]>left)
									{
										flag=false
									}
							}	
					}
				if(flag)
					{
						node.style[left1]=left+'px';
						if(!this.getData('ltPropRangeHandler'))
							{
								$L('div.lyteSliderFill',this.$node).e[0].style[width1]=width+'px';
							}
						else
							{
								this.rangeSliderFill.call(this);
							}
					}
			this.selectedValFind.call(this)				
			node.focus();	
			event.stopPropagation();
			event.preventDefault();
		},

		selectedValFind : function(){
			if(!this.getData('ltPropRangeHandler'))
				{
					if(this.getData('ltPropDirection').indexOf('Horizontal')==-1)
						{
							this.setData('ltPropValue',this.selectedVal.call(this,'clientHeight','ltPropHeight').toString());
						}
					else
						{
							this.setData('ltPropValue',this.selectedVal.call(this,'clientWidth','ltPropWidth').toString());
						}
					this.setData('ltPropSelectedValue1',this.getData('ltPropValue'));	
				}
			else
				{
					if(this.getData('ltPropDirection').indexOf('Horizontal')==-1)
						{
							this.setData('ltPropMinValue',this.selectedVal.call(this,'clientHeight','ltPropHeight', $L('div.lyteHandler1', this.$node).e[0], 'top').toString());
							this.setData('ltPropMaxValue',this.selectedVal.call(this,'clientHeight','ltPropHeight', $L('div.lyteHandler2', this.$node).e[0],'top').toString());
						}
					else
						{
							this.setData('ltPropMinValue', this.selectedVal.call(this,'clientWidth','ltPropWidth', $L('div.lyteHandler1', this.$node).e[0],'left').toString());
							this.setData('ltPropMaxValue',selectedVal2=this.selectedVal.call(this,'clientWidth','ltPropWidth', $L('div.lyteHandler2', this.$node).e[0],'left').toString());
						}
					this.setData('ltPropSelectedValue1',this.getData('ltPropMinValue'));
					this.setData('ltPropSelectedValue2',this.getData('ltPropMaxValue'));	
				}	
		},

		initialValueSet:function(node,value){
			var lyteSlide = $L('div.lyteSlide', this.$node).e[0],lyteSliderHandler = $L('div.lyteSliderHandler', this.$node).e[0]
			if(this.getData('ltPropDirection').indexOf('Horizontal')!=-1)
				{
					node.style.left=(((value-parseFloat(this.getData('ltPropMin')))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))* (lyteSlide.offsetWidth ? lyteSlide.offsetWidth : parseInt(this.getData('ltPropWidth'))))- (lyteSliderHandler.clientWidth ? lyteSliderHandler.clientWidth : 12) / 2)+'px';
				}
			else
				{
					node.style.top=(((value-parseFloat(this.getData('ltPropMin')))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))* (lyteSlide.offsetHeight ? lyteSlide.offsetHeight : parseInt(this.getData('ltPropHeight'))))- (lyteSliderHandler.clientWidth ? lyteSliderHandler.clientWidth : 12) / 2)+'px';
				}
		},
		rangeSliderFill:function(){
			var lyteHandler2= $L('div.lyteHandler2', this.$node).e[0],lyteHandler1= $L('div.lyteHandler1', this.$node).e[0],lyteRangeSlider= $L('div.lyteRangeSlider', this.$node).e[0], lyteSliderFill= $L('div.lyteSliderFill', this.$node).e[0];
			if(this.getData('ltPropDirection').indexOf('Horizontal')!=-1)
				{
					lyteSliderFill.style.left=(lyteHandler1.getBoundingClientRect().left-lyteRangeSlider.getBoundingClientRect().left+lyteHandler1.offsetWidth/2)+'px'
					lyteSliderFill.style.width=Math.abs(lyteHandler2.getBoundingClientRect().left-lyteHandler1.getBoundingClientRect().left)+'px'
				}
			else
				{
					lyteSliderFill.style.top=(lyteHandler1.getBoundingClientRect().top-lyteRangeSlider.getBoundingClientRect().top+lyteHandler1.offsetHeight/2)+'px'
					lyteSliderFill.style.height=Math.abs(lyteHandler2.getBoundingClientRect().top-lyteHandler1.getBoundingClientRect().top)+'px'
				}
		},
		keyCheck:function(node,width1,left1,clientWidth,ltPropWidth){
			var flag=true,lyteSliderFill = $L('div.lyteSliderFill', this.$node).e[0];
			if((event.keyCode==37&&this.getData('ltPropDirection').indexOf('Horizontal')!=-1)||(event.keyCode==38)&&this.getData('ltPropDirection').indexOf('Horizontal')==-1)
				{
					if(this.getData('ltPropDiscrete'))
						{
							if(lyteSliderFill[clientWidth] == this.$node[clientWidth])
								{
									var x=(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))%parseFloat(this.getData('ltPropDiscrete'));
									this.setData('ltPropStep',x!=0?x:this.getData('ltPropDiscrete'));												}
							else
								{
									this.setData('ltPropStep',this.getData('ltPropDiscrete'));
								}	
						}
					if(!this.getData('ltPropRangeHandler'))
						{
							width=parseFloat(lyteSliderFill.style[width1])-(parseFloat(this.getData('ltPropStep'))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin'))) * this.$node[clientWidth]);
							lyteSliderFill.style[width1]=(width>0?width:0)+'px';
						}
					else
						{
							if(node.getBoundingClientRect()[left1]-this.$node.querySelector('div.lyteHandler1').getBoundingClientRect()[left1]<(parseFloat(this.getData('ltPropStep'))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin'))) * this.$node[clientWidth]) &&!node.classList.contains('lyteHandler1'))
								{
									flag=false;
								}
							else
								{
									width=node.getBoundingClientRect()[left1]+node[clientWidth]/2-this.$node.querySelector('div.lyteRangeSlider').getBoundingClientRect()[left1]-(parseFloat(this.getData('ltPropStep'))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin'))) * this.$node[clientWidth]);
								}
						}
					if(flag)		
						{
							left=width>0?width:0;
							node.style[left1]=(left>0?left-node[clientWidth]/2:-node[clientWidth]/2)+'px';
						}
				}
			else if((event.keyCode==39&&this.getData('ltPropDirection').indexOf('Horizontal')!=-1)||(event.keyCode==40)&&this.getData('ltPropDirection').indexOf('Horizontal')==-1)
				{
					var lyteRangeSlider= $L('div.lyteRangeSlider', this.$node).e[0]
					if(!this.getData('ltPropRangeHandler'))
						{
							width=parseFloat(lyteSliderFill.style[width1])+(parseFloat(this.getData('ltPropStep'))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin'))) * this.$node[clientWidth])
							lyteSliderFill.style[width1]=(width > this.$node[clientWidth] ? this.$node[clientWidth] : width)+'px';
						}
					else
						{
							if($L('div.lyteHandler2', this.$node).e[0].getBoundingClientRect()[left1]-node.getBoundingClientRect()[left1]<(parseFloat(this.getData('ltPropStep'))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin'))) * this.$node[clientWidth]) && !node.classList.contains('lyteHandler2'))
								{
									flag=false
								}
							else
								{
									width=node.getBoundingClientRect()[left1]+node[clientWidth]/2-lyteRangeSlider.getBoundingClientRect()[left1]+(parseFloat(this.getData('ltPropStep'))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin'))) * this.$node[clientWidth]);
								}
						}	
					if(flag)	
						{
							width=width<lyteRangeSlider[clientWidth]?width:lyteRangeSlider[clientWidth];	
							node.style[left1]=(width-node[clientWidth]/2)+'px';
						}
				}
			this.selectedValFind.call(this)				
			if(this.getData('ltPropRangeHandler'))
				{
					this.rangeSliderFill.call(this);
				}
		},
		mousemove:function(event){
			var node = this.parentElement.parentElement;
			var left,width,clientX,offsetWidth,clientWidth,ltPropWidth
			if(node.getData('ltPropDirection').indexOf('Horizontal')!=-1)
				{
					left='left',width='width',clientX='clientX',offsetWidth='offsetWidth',clientWidth='clientWidth',ltPropWidth='ltPropWidth',offsetLeft='offsetLeft';
				}
			else
				{
					left='top',width='height',clientX='clientY',offsetWidth='offsetHeight',clientWidth='clientHeight',ltPropWidth='ltPropHeight',offsetLeft='offsetTop';
				}		
				node.component.ScrollCheck.call(node.component,this.node,left,width,clientX,offsetWidth,clientWidth,ltPropWidth,offsetLeft, event);
			if(node.component.getMethods('onChange'))	
				{
					node.component.onSelect.call(node.component);	
				}
		},
		eventListener:function(event){
			var node=this.node;
			if(!node.getData('ltPropDisabled'))
				{
					node.setData('ltPropFlag',true)
					var xPos=event.clientX,lyteRangeSlider=$L('div.lyteRangeSlider', node.$node).e[0];
					if(xPos>lyteRangeSlider.getBoundingClientRect().left)
						{
							width=xPos-lyteRangeSlider.getBoundingClientRect().left-parseFloat(lyteRangeSlider.offsetWidth-parseFloat(lyteRangeSlider.clientWidth/2));
							if(width>0)
								{
									event.preventDefault();
								}
						}
					else
						{
							event.preventDefault();
						}
					var yPos=event.clientY;
					if(yPos>=lyteRangeSlider.getBoundingClientRect().top)
						{
							height=yPos-lyteRangeSlider.getBoundingClientRect().top-parseFloat(lyteRangeSlider.offsetHeight-parseFloat(lyteRangeSlider.clientHeight/2));
							if(height>0)
								{
									event.preventDefault();
								}
						}
					else
						{
							event.preventDefault();
						}
					lyteRangeSlider.addEventListener('mousemove',node.mousemove,true);
					lyteRangeSlider.node=this;
				}	
		}, 
		rangeInitialSet:function(node,left1,ltPropWidth,clientWidth,index){
			node.style[left1]=(index/(this.getData('ltPropContent').length-1) * this.$node[clientWidth] - $L('div.lyteSliderHandler', this.$node).e[0][clientWidth]/2)+'px';
		},
		didConnect:function(){
			this.$node.constructor._observers[0].value.call(this)
			this.$node.constructor._observers[1].value.call(this)
			this.$node.constructor._observers[4].value.call(this)			  
		    this.$node.constructor._observers[3].value.call(this)
		    this.setData('eventListener.mouseup',this.mouseup.bind(this))
		    document.addEventListener('mouseup',this.getData('eventListener').mouseup);	
		    this.valueSelected.call(this);	
		},
		valueSelected : function(){
			if(this.getData('ltPropRangeHandler'))
				{
					this.setData('ltPropSelectedValue1', this.getData('ltPropMinValue'));
					this.setData('ltPropSelectedValue2', this.getData('ltPropMaxValue'));
				}
			else
				{
					this.setData('ltPropSelectedValue1', this.getData('ltPropValue'));
				}	
		},
		mouseup : function(event){
			var handler=$L('div.lyteRangeSlider', this.$node).e[0];
			if(handler)
			  {
				if(handler.node)
					{	
						if(this.getData('ltPropFlag'))
							{
								this.onSelect(handler.node);
							}
						delete handler.node	
					}
				handler.removeEventListener('mousemove',this.mousemove,true);
		 	 }
		},

		data:function(){
			return {
				divLength:Lyte.attr("array",{"default":[]}),
				scaleVal:Lyte.attr("array",{"default":[]}),
				ltPropMin:Lyte.attr("string",{"default":'0'}),
				ltPropMax:Lyte.attr("string",{"default":''}),
				ltPropScaleInterval:Lyte.attr("string",{"default":''}),
				ltPropStep:Lyte.attr("string",{"default":''}),
				ltPropHandler:Lyte.attr("string",{"default":'lyteArrow'}),
				ltPropArrow:Lyte.attr("boolean",{"default": false}),
				ltPropDirection:Lyte.attr("string",{"default":'lyteHorizontal'}),
				ltPropWidth:Lyte.attr("string",{"default":''}),
				ltPropFillColor:Lyte.attr("string",{"default":''}),
				ltPropNonFillColor:Lyte.attr("string",{"default":''}),
				ltPropHeight:Lyte.attr("string",{"default":''}),
				ltPropValue:Lyte.attr("string",{"default":''}),
				ltPropDiscrete:Lyte.attr("string",{"default":''}),
				ltPropContent:Lyte.attr("array",{"default":[]}),
				ltPropRangeHandler:Lyte.attr("boolean",{"default": false}),
				ltPropMinValue:Lyte.attr("string",{"default":''}),
				ltPropMaxValue:Lyte.attr("string",{"default":''}),
				ltPropDisabled:Lyte.attr("boolean",{"default": false}),
				ltPropFlag:Lyte.attr("boolean",{"default": false}),
				ltPropSelectedValue1 : Lyte.attr('string', {default : ''}),
				ltPropSelectedValue2 : Lyte.attr('string', {default : ''}),
				ltPropYield : Lyte.attr('boolean', {default : false}),
				//system data
				eventListener : Lyte.attr('object', {default : {}})
			}
		},
		actions:{
			"click":function(event){
					if(this.getData('ltPropDirection').indexOf('Horizontal')==-1)
						{
							if(!this.getData('ltPropRangeHandler'))
								{
									this.ScrollCheck.call(this, $L('div.lyteSliderHandler', this.$node).e[0],'top','height','clientY','offsetHeight','clientHeight','ltPropHeight','offsetTop', event);
								}
							else
								{
									YPos= event.clientY;
									node1= $L('div.lyteHandler1', this.$node).e[0]
									node2= $L('div.lyteHandler2', this.$node).e[0]
									if(Math.abs(node1.getBoundingClientRect().top-node2.getBoundingClientRect().top)>0)
										{
											if(node1.getBoundingClientRect().top+node1.clientHeight+Math.abs(node1.getBoundingClientRect().top-node2.getBoundingClientRect().top)/2<YPos)
												{
													this.ScrollCheck.call(this,node2,'top','height','clientY','offsetHeight','clientHeight','ltPropHeight','offsetTop', event);
												}
											else if(node1.getBoundingClientRect().top+node1.clientHeight+Math.abs(node1.getBoundingClientRect().top-node2.getBoundingClientRect().top)/2!=YPos)
												{
													this.ScrollCheck.call(this,node1,'top','height','clientY','offsetHeight','clientHeight','ltPropHeight','offsetTop', event);
												}	
										}
									else if(node1.getBoundingClientRect().top==node2.getBoundingClientRect().top)		
										{	
											if(YPos<node1.getBoundingClientRect().top)	
												{
													this.ScrollCheck.call(this,node1,'top','height','clientY','offsetHeight','clientHeight','ltPropHeight','offsetLeft', event);
												}
											else
												{
													this.ScrollCheck.call(this,node2,'top','height','clientY','offsetHeight','clientHeight','ltPropHeight','offsetLeft', event);
												}	
										}
								}	
						}
					else
						{
							if(!this.getData('ltPropRangeHandler'))
								{
									this.ScrollCheck.call(this,this.$node.querySelector('div.lyteSliderHandler'),'left','width','clientX','offsetWidth','clientWidth','ltPropWidth','offsetLeft', event);
								}
							else
								{
									xPos=event.clientX;
									node1= $L('div.lyteHandler1', this.$node).e[0]
									node2= $L('div.lyteHandler2', this.$node).e[0]
									if(Math.abs(node1.getBoundingClientRect().left-node2.getBoundingClientRect().left)>0)
										{
											if(node1.getBoundingClientRect().left+node1.clientWidth+Math.abs(node1.getBoundingClientRect().left-node2.getBoundingClientRect().left)/2<xPos)
												{
													this.ScrollCheck.call(this,node2,'left','width','clientX','offsetWidth','clientWidth','ltPropWidth','offsetLeft', event);
												}
											else
												{
													this.ScrollCheck.call(this,node1,'left','width','clientX','offsetWidth','clientWidth','ltPropWidth','offsetLeft', event);
												}	
										}
									else if(node1.getBoundingClientRect().left==node2.getBoundingClientRect().left)	
										{
											if(xPos<node1.getBoundingClientRect().left)	
												{
													this.ScrollCheck.call(this,node1,'left','width','clientX','offsetWidth','clientWidth','ltPropWidth','offsetLeft', event);
												}
											else
												{
													this.ScrollCheck.call(this,node2,'left','width','clientX','offsetWidth','clientWidth','ltPropWidth','offsetLeft', event);
												}	
										}	
								}	
						}
					if(!(event.target.classList.contains('lyteSliderHandler')) && !event.flag)		
						{
							this.onSelect.call(this, true);	
						}
					else if(event){
						event.stopPropagation();
						event.stopImmediatePropagation();
						event.preventDefault();
					}	
			},
			"keydown":function(event){
					if(this.getData('ltPropDiscrete'))
						{
							this.setData('ltPropStep',this.getData('ltPropDiscrete'));
						}
					var node = event.target;
					if(this.getData('ltPropDirection').indexOf('Horizontal')!=-1)
						{
							if(!this.getData('ltPropRangeHandler'))
								{
									this.keyCheck.call(this, $L('div.lyteSliderHandler', this.$node).e[0],'width','left','clientWidth','ltPropWidth')
								}
							else
								{
									this.keyCheck.call(this,node,'width','left','clientWidth','ltPropWidth')	
								}	
						}	
					else
						{
							if(!this.getData('ltPropRangeHandler'))
								{
									this.keyCheck.call(this, $L('div.lyteSliderHandler', this.$node).e[0],'height','top','clientHeight','ltPropHeight')
								}
							else
								{
									this.keyCheck.call(this,node,'height','top','clientHeight','ltPropHeight')
									var evt = new Event('click');
									evt.clientY = node.getBoundingClientRect().top - 2;
									evt.flag = true;
									$L('.lyteRangeSlider').e[0].dispatchEvent(evt);
								}	
						}
					if(((event.keyCode==37||event.keyCode==39) && this.getData('ltPropDirection').indexOf('Horizontal') != -1)||((event.keyCode==38||event.keyCode==40) && this.getData('ltPropDirection').indexOf('Horizontal') == -1))
						{
							this.onSelect.call(this,true);
							event.preventDefault();	
						}
			}
		}
	});