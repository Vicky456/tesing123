Lyte.Component.register("lyte-input",{
_template:"<template tag-name=\"lyte-input\">     <template is=\"switch\" value=\"{{ltPropType}}\">       <template case=\"password\">              <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\">                    <label for=\"{{ltPropId}}\" class=\"lyteLabel\">{{ltPropLabel}}</label>               </template></template>             <div class=\"lyteField\" style=\"{{ltPropWrapperStyle}}\">                 <input type=\"{{ltPropType}}\" value=\"{{lbind(ltPropValue)}}\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" maxlength=\"{{ltPropMaxlength}}\" name=\"{{ltPropName}}\" placeholder=\"{{ltPropPlaceholder}}\" autocomplete=\"{{ltPropAutocomplete}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" style=\"{{ltPropStyle}}\" readonly=\"{{ltPropReadonly}}\" onblur=\"{{action('blurThrow', event)}}\" onkeyup=\"{{action('keyup', event)}}\" onkeydown=\"{{action('keydown', event)}}\" onkeypress=\"{{action('keypress', event)}}\" onclick=\"{{action('click', event)}}\" onchange=\"{{action('onChange', event)}}\" onmouseover=\"{{action('onMouseover', event)}}\" onmouseout=\"{{action('onMouseout', event)}}\" onfocus=\"{{action('focus', event)}}\" onfocusout=\"{{action('focusout', event)}}\" onmouseup=\"{{action('onMouseup', event)}}\" onmousemove=\"{{action('onMousemove', event)}}\" onmouseleave=\"{{action('onMouseleave', event)}}\" onmouseenter=\"{{action('onMouseenter', event)}}\" onmousedown=\"{{action('onMousedown', event)}}\" ondblclick=\"{{action('dblclick', event)}}\" oncontextmenu=\"{{action('oncontextmenu', event)}}\">               </div>         </template>        <template case=\"number\">            <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\">                  <label for=\"{{ltPropId}}\" class=\"lyteLabel\">{{ltPropLabel}}</label>              </template></template>              <div class=\"lyteField\" style=\"{{ltPropWrapperStyle}}\">                 <input type=\"number\" value=\"{{lbind(ltPropValue)}}\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" maxlength=\"{{ltPropMaxlength}}\" name=\"{{ltPropName}}\" placeholder=\"{{ltPropPlaceholder}}\" autocomplete=\"{{ltPropAutocomplete}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" onblur=\"{{action('blurThrow', event)}}\" onkeyup=\"{{action('keyup', event)}}\" onkeydown=\"{{action('keydown', event)}}\" onkeypress=\"{{action('keypress', event)}}\" onclick=\"{{action('click', event)}}\" onchange=\"{{action('onChange', event)}}\" onfocus=\"{{action('focus', event)}}\" onfocusout=\"{{action('focusout', event)}}\" min=\"{{ltPropMin}}\" max=\"{{ltPropMax}}\" step=\"{{ltPropStep}}\" style=\"{{ltPropStyle}}\" onmouseover=\"{{action('onMouseover', event)}}\" onmouseout=\"{{action('onMouseout', event)}}\" onmouseup=\"{{action('onMouseup', event)}}\" onmousemove=\"{{action('onMousemove', event)}}\" onmouseleave=\"{{action('onMouseleave', event)}}\" onmouseenter=\"{{action('onMouseenter', event)}}\" onmousedown=\"{{action('onMousedown', event)}}\" ondblclick=\"{{action('dblclick', event)}}\" oncontextmenu=\"{{action('oncontextmenu', event)}}\">               </div>         </template>         <template case=\"file\">                <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\">                    <label for=\"{{ltPropId}}\" class=\"lyteLabel\">{{ltPropLabel}}</label>                </template></template>                   <div class=\"lyteField\" style=\"{{ltPropWrapperStyle}}\">                       <input type=\"file\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" name=\"{{ltPropName}}\" onchange=\"{{action('fileChange', event)}}\" multiple=\"{{ltPropMultiple}}\" accept=\"{{ltPropAccept}}\" style=\"{{ltPropStyle}}\">                       <div id=\"lytePreview\" style=\"display: inline-block;\" onclick=\"{{action('reset', event)}}\">                        <template is=\"if\" value=\"{{ltPropText}}\"><template case=\"true\">                            <span id=\"preview\"><label for=\"{{ltPropId}}\">{{ltPropText}}</label></span>                        </template></template>                             <div class=\"lyteFileUploadContainer\" style=\"display: none;\">                                <div class=\"lyteFileList\">                                    <ul>                                      <template is=\"for\" items=\"{{ltPropFilelist}}\" item=\"list\" index=\"indexval\">                                        <li>                                          <label class=\"visible\" for=\"{{ltPropId}}\">{{list.name}}</label>                                        </li>                                      </template>                                    </ul>                                     <span class=\"lyteSelectedFiles\">{{fileNo}} files selected</span>                               </div>                          </div>                    </div>                 </div>           </template>        <template case=\"time\">              <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\">                   <label for=\"{{ltPropId}}\" class=\"lyteLabel\">{{ltPropLabel}}</label>              </template></template>                <div onclick=\"{{action('click', event)}}\" id=\"{{ltPropId}}\" class=\"lyteField joinInput\" time=\"{{ltPropTime}}\" date=\"{{ltPropDate}}\" style=\"{{ltPropWrapperStyle}}\">                   <input type=\"text\" id=\"hour\" value=\"\" onkeydown=\"{{action('timeHour', event)}}\" onclick=\"{{action('hrClick', event)}}\" onkeyup=\"{{action('hourSet', event)}}\" onfocusout=\"{{action('timeCheck', event)}}\" maxlength=\"0\" style=\"float: left;width: 25%;padding-left: 0px;padding-right: 0px;min-width: 25px;\">                   <input type=\"text\" value=\":\" id=\"colon\" disabled=\"\" style=\"float: left;width: 10px;padding-left: 0px;padding-right: 0px;\">                   <input type=\"text\" value=\"\" onclick=\"{{action('minClick', event)}}\" onkeydown=\"{{action('timeMinute', event)}}\" onkeyup=\"{{action('minSet', event)}}\" onfocusout=\"{{action('timeCheck', event)}}\" maxlength=\"0\" id=\"minute\" style=\"float: left;width: 25%;padding-left: 0px;padding-right: 0px;min-width: 25px;\">                   <input type=\"text\" value=\"AM\" onclick=\"{{action('amClick', event)}}\" onkeydown=\"{{action('timeMeridian', event)}}\" onkeyup=\"{{action('AMset', event)}}\" onfocusout=\"{{action('timeCheck', event)}}\" maxlength=\"0\" id=\"meridian\" style=\"display: none; float: left;width: 25%;padding-left: 0px;padding-right: 0px;min-width: 25px;\">               </div>              <template is=\"if\" value=\"{{ltPropDropdown}}\"><template case=\"true\">                    <div id=\"lyteInputDropdown\" style=\"position: absolute;display:none;\">                        <lyte-dropdown lt-prop-tabindex=\"1\" lt-prop-user-value=\"name\" lt-prop-options=\"{{drop1data}}\" lt-prop-system-value=\"value\" on-option-selected=\"{{method('hourSelected')}}\"></lyte-dropdown>                        <lyte-dropdown lt-prop-tabindex=\"1\" lt-prop-user-value=\"name\" lt-prop-options=\"{{drop2data}}\" lt-prop-system-value=\"value\" on-option-selected=\"{{method('minuteSelected')}}\"></lyte-dropdown>                        <lyte-dropdown lt-prop-tabindex=\"1\" lt-prop-user-value=\"name\" lt-prop-options=\"{{drop3data}}\" lt-prop-system-value=\"value\" on-option-selected=\"{{method('meridianSelected')}}\"></lyte-dropdown>                    </div>                 </template></template>        </template>         <template case=\"textarea\">                <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\">                     <label for=\"{{ltPropId}}\" class=\"lyteLabel\">{{ltPropLabel}}</label>                </template></template>                <div class=\"lyteField\" style=\"{{ltPropWrapperStyle}}\">                  <textarea id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" value=\"{{lbind(ltPropValue)}}\" rows=\"{{ltPropRows}}\" cols=\"{{ltPropCols}}\" maxlength=\"{{ltPropMaxlength}}\" name=\"{{ltPropName}}\" placeholder=\"{{ltPropPlaceholder}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" style=\"{{ltPropStyle}}\" onblur=\"{{action('blurThrow', event)}}\" onkeyup=\"{{action('keyup', event)}}\" onkeydown=\"{{action('keydown', event)}}\" onkeypress=\"{{action('keypress', event)}}\" onclick=\"{{action('click', event)}}\" onchange=\"{{action('onChange', event)}}\" onfocus=\"{{action('focus', event)}}\" onfocusout=\"{{action('focusout', event)}}\" onmouseup=\"{{action('onMouseup', event)}}\" onmouseover=\"{{action('onMouseover', event)}}\" onmousemove=\"{{action('onMousemove', event)}}\" onmouseleave=\"{{action('onMouseleave', event)}}\" onmouseenter=\"{{action('onMouseenter', event)}}\" onmousedown=\"{{action('onMousedown', event)}}\" ondblclick=\"{{action('dblclick', event)}}\" oncontextmenu=\"{{action('oncontextmenu', event)}}\">{{lbind(ltPropValue)}}</textarea>                   <template is=\"if\" value=\"{{ltPropTextAreaResize}}\"><template case=\"true\">                    <span class=\"lyteTextareaResize\"></span>                      </template></template>              </div>             </template>          <template case=\"date\">              <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\">                  <label for=\"{{ltPropId}}\" class=\"lyteLabel\">{{ltPropLabel}}</label>              </template></template>                <div class=\"lyteField\" style=\"{{ltPropWrapperStyle}}\">                 <input type=\"text\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" name=\"{{ltPropName}}\" placeholder=\"{{ltPropPlaceholder}}\" autocomplete=\"{{ltPropAutocomplete}}\" value=\"{{lbind(ltPropValue)}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" onkeyup=\"{{action('keyup', event)}}\" onkeydown=\"{{action('keydown', event)}}\" onkeypress=\"{{action('keypress', event)}}\" onclick=\"{{action('click', event)}}\" onchange=\"{{action('onChange', event)}}\" onfocus=\"{{action('showcalendar', event)}}\" onfocusout=\"{{action('hidecalendar', event)}}\" onblur=\"{{action('blurThrow', event)}}\" style=\"{{ltPropStyle}}\" onmouseover=\"{{action('onMouseover', event)}}\" onmouseup=\"{{action('onMouseup', event)}}\" onmousemove=\"{{action('onMousemove', event)}}\" onmouseleave=\"{{action('onMouseleave', event)}}\" onmouseenter=\"{{action('onMouseenter', event)}}\" onmousedown=\"{{action('onMousedown', event)}}\" ondblclick=\"{{action('dblclick', event)}}\" oncontextmenu=\"{{action('oncontextmenu', event)}}\">              </div>            <lyte-wormhole>                  <template is=\"registerYield\" yield-name=\"lyte-content\">                      <div id=\"lyteCalendar\" class=\"lyteCalendarHidden\" style=\"position: absolute;z-index: 1000;\">                          <lyte-calendar lt-prop-format=\"{{ltPropFormat}}\" lt-prop-enddate=\"{{ltPropEnddate}}\" lt-prop-startdate=\"{{ltPropStartdate}}\" lt-prop-currentdate=\"{{ltPropCurrentdate}}\" lt-prop-year=\"{{ltPropYear}}\" lt-prop-monthheader=\"{{ltPropMonthheader}}\" on-date-selected=\"{{method('on-dateselected')}}\"></lyte-calendar>                       </div>                   </template>          </lyte-wormhole>          </template>         <template default=\"\">              <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\">                  <label for=\"{{ltPropId}}\" class=\"lyteLabel\">{{ltPropLabel}}</label>              </template></template>                <div class=\"lyteField\" style=\"{{ltPropWrapperStyle}}\">                 <input type=\"text\" value=\"{{lbind(ltPropValue)}}\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" maxlength=\"{{ltPropMaxlength}}\" name=\"{{ltPropName}}\" placeholder=\"{{ltPropPlaceholder}}\" autocomplete=\"{{ltPropAutocomplete}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" onblur=\"{{action('blurThrow', event)}}\" onkeyup=\"{{action('keyup', event)}}\" onkeydown=\"{{action('keydown', event)}}\" onkeypress=\"{{action('keypress', event)}}\" onclick=\"{{action('click', event)}}\" onchange=\"{{action('onChange', event)}}\" onfocus=\"{{action('focus', event)}}\" onfocusout=\"{{action('focusout', event)}}\" style=\"{{ltPropStyle}}\" onmouseover=\"{{action('onMouseover', event)}}\" onmouseout=\"{{action('onMouseout', event)}}\" onmouseup=\"{{action('onMouseup', event)}}\" onmousemove=\"{{action('onMousemove', event)}}\" onmouseleave=\"{{action('onMouseleave', event)}}\" onmouseenter=\"{{action('onMouseenter', event)}}\" onmousedown=\"{{action('onMousedown', event)}}\" ondblclick=\"{{action('dblclick', event)}}\" oncontextmenu=\"{{action('oncontextmenu', event)}}\">              </div>          <template is=\"break\"></template></template>           </template></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"password":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"}}}]},"number":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"}}}]},"file":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"}}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,0,0]}]}},"default":{}},{"type":"attr","position":[3,3,3,1,1,1]},{"type":"for","position":[3,3,3,1,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]}]},{"type":"text","position":[3,3,3,1,3,0]}]},"time":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1]},{"type":"attr","position":[3,5]},{"type":"attr","position":[3,7]},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"componentDynamic","position":[1,5]}]}},"default":{}}]},"textarea":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"}}},{"type":"text","position":[3,1,0]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]},"date":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"}}},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]}]},{"type":"componentDynamic","position":[5]}]}},"default":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"}}}]}}],
_observedAttributes :["ltPropDisabled","ltPropAutofocus","ltPropAutocomplete","ltPropMaxlength","ltPropName","ltPropPlaceholder","ltPropReadonly","ltPropValue","ltPropWidth","ltPropInterval","ltPropTimeFormat","ltPropHourInterval","ltPropRows","ltPropDefaultTime","ltPropCols","ltPropMinuteInterval","ltPropStartdate","ltPropEnddate","ltPropCurrentdate","ltPropMonthheader","ltPropType","ltPropAppearance","ltPropDirection","ltPropLabel","ltPropId","ltPropClass","ltPropAccept","ltPropMultiple","ltPropText","ltPropFilelist","ltPropMax","ltPropMin","ltPropStep","ltPropStyle","ltPropDropdown","ltPropStartTime","ltPropEndTime","iniHour","iniMinute","iniMeridian","finalHour","finalMinute","finalMeridian","ltPropText","fileNo","ltPropWrapperStyle","ltPropTextAreaResize","ltPropHeight","ltPropFlag","ltPropFormat","ltPropYear","ltPropMonthHeaderFormat","daysOfWeek","viewDate","drop1data","drop2data","drop3data","eventListeners","ltPropBoundary"],
	init:function(){ 
		  if(this.getData('ltPropType')=='file')
		  	{
		  		if(!this.getData('ltPropId'))
		  			{
		  				this.setData('ltPropId','lyteFile');
		  			}	
		  	}
		  this.$node.classList.add('lyteInput');
		  this.$node.classList.add('horizontal');
	},
	didConnect:function(){
		   if(this.getData('ltPropType') == 'date')
		    	{ 
		    		var func = this.calenderClickHide.bind(this)
		    		document.addEventListener('click', func, true);
		    		this.setData('eventListeners.calendar', func);
		    		var func1 = this.scrollFunc.bind(this);
		    		this.setData('eventListeners.scroll', func1);
		    		window.addEventListener('scroll', func1, true);
				}
		    var divIdInput= this.$node, lyteLabelDiv= $L('.lyteLabel', this.$node).e[0],lyteFieldDiv= $L('.lyteField', this.$node).e[0]; 
			if(this.getData('ltPropType')=='file')
				{
				  	if(this.getData('ltPropMultiple')==false)
				  		{
				 				$L('input',this.$node).e[0].removeAtribute('multiple')
			 			}
			 		$L('input',this.$node).e[0].style.display="none";	
		 		}	
	   	   this.$node.constructor._observers[4].value.call(this);
	   	   this.$node.constructor._observers[5].value.call(this);
		   var Type=this.getData('ltPropType')
		   if(this.getData('ltPropWidth'))
		        {
		      	   this.$node.constructor._observers[3].value.call(this);	
		        }
		    if(this.getData('ltPropHeight'))
		    	{
			    	this.$node.constructor._observers[2].value.call(this);	
		    	}  
		   if((Type=='time'))
			     {
			     	if(this.getData('ltPropId')=='')
			      		{
			      			this.setData('ltPropId','date');
			      		}
			      	this.$node.constructor._observers[1].value.call(this);
			     }
		   else if(Type=='textarea')
		      	{
		      		this.$node.constructor._observers[0].value.call(this);			
		   		}
	},
	didDestroy : function(){
		if(this.$node.calendarComp){
			this.$node.calendarComp.remove()
		}
		if(this.getData('ltPropType') == 'date'){
			document.removeEventListener('click', this.getData('eventListeners').calendar, true);
			window.removeEventListener('scroll', this.getData('eventListeners').scroll, true);
		}
		if(this.getData('eventListeners').hasOwnProperty('mouseup')){
			document.removeEventListener('mouseup', this.getData('eventListeners').mouseup);
		}
		if($L('style#lyteSearchHidden').e[0]){
			document.body.removeChild($L('style#lyteSearchHidden').e[0])
		}	
	},
	calenderClickHide : function(event){
			var calendarComp = this.$node.calendarDiv;
			if(event.target != $L('input', this.$node).e[0] && !calendarComp.contains(event.target))
		    	{
	 				calendarComp.classList.add('lyteCalendarHidden');
	 			}
	},

	scrollFunc : function(event){
		var thisCalendar = this.$node.calendarDiv;
		var xscroll = window.pageXOffset || document.documentElement.scrollLeft
		var yscroll = window.pageYOffset || document.documentElement.scrollTop
		if(!thisCalendar.classList.contains('lyteCalendarHidden'))
			{
 				var input= this.$node.getBoundingClientRect();
 				thisCalendar.classList.remove('lyteCalendarHidden')
 				thisCalendar.style.left = ($L('input', this.$node).e[0].getBoundingClientRect().left + xscroll) +'px';
 				thisCalendar.style.top = (input.top + input.height + yscroll)+'px';
 				var calBound = thisCalendar.getBoundingClientRect();
 				if(window.innerHeight < calBound.bottom)
 					{
 						var top = input.top - calBound.height
 						if(top >= 0)
 							{
 								thisCalendar.style.top = top + 'px';
 							}
 					}
 	     	}
 	     if(event && !thisCalendar.classList.contains('lyteCalendarHidden')){
 	     	var clientRect = this.$node.getBoundingClientRect();
			var boundary = this.getData('ltPropBoundary');
			if((boundary.hasOwnProperty('left') ? (clientRect.left < boundary.left) : false) || (boundary.hasOwnProperty('right') ? (clientRect.right > boundary.right) : false)  || (boundary.hasOwnProperty('top') ? (clientRect.top < boundary.top) : false)  || (boundary.hasOwnProperty('bottom') ? (clientRect.bottom > boundary.bottom) : false))		
				{	
					thisCalendar.classList.add('lyteCalendarHidden')
				}
 	     }	
	},

	textareaFunc : function () {
		var textarea=$L('textarea', this.$node).e[0], resizeFunc = this.textareaResize.bind(this), mouseup = this.mouseup.bind(this);
		this.setData('eventListeners.resizeFunc', resizeFunc);
		this.setData('eventListeners.mouseup', mouseup);
		if(textarea)
  			{
				var lyteLabel = $L('.lyteLabel', this.$node).e[0]
		  		if(this.getData('ltPropDirection')!='vertical' && lyteLabel)
		      		{
		      			height = this.$node.offsetHeight-( lyteLabel ? lyteLabel.offsetHeight : 0);
		      			lyteLabel.style.top='-' + height / 2 + 'px';
		      		}
		      	var lyteInput = this.getData('lyteInput')
		      	if (((navigator.userAgent.indexOf('Edge')) != -1)||((navigator.userAgent.indexOf('MSIE') || (navigator.userAgent.toLowerCase().indexOf('trident'))) != -1))	
		  			{
		  				var style=this.getData('ltPropStyle'),direction="both";
		  				if(style)
		  					{
		  						if(style.toString().indexOf('resize')!=-1)
		  							{
		  								style = style.slice(style.indexOf('resize:')+7);
		  								direction=style.slice(0,style.indexOf(';')!=-1?style.indexOf(';'):style.length).trim();
		  								if(direction!="none"&&direction.length)
		  									{
		  										this.setData('ltPropTextAreaResize',true);
		  										textarea.parentElement.style.width = "100%"
		  										var nodeName=$L('.lyteTextareaResize', this.$node).e[0];
		  										nodeName.direction=direction;
		  										nodeName.addEventListener('mousedown',function(event){
		  											this.xPos=textarea.clientWidth-event.clientX + textarea.offsetLeft;
													this.yPos=textarea.clientHeight-event.clientY + textarea.offsetTop;
		  											document.addEventListener('mousemove', resizeFunc)
		  										}.bind(this));
		  										document.addEventListener('mouseup',mouseup);
		  									}
		  							}
		  					}
		  			}
		  		else
		  			{
		  				textarea.parentElement.style.width = "100%"
		  				textarea.addEventListener('mousedown',function(event){
		  					document.addEventListener('mousemove', resizeFunc);
		  				}.bind(this));
		  				document.addEventListener('mouseup',mouseup);
		  			}	
		  		if(!textarea.style.minWidth)
		  			{
		  				textarea.style.setProperty('min-width','1em')
		  			}
		  		if(!textarea.style.minHeight)
		  			{
		  				textarea.style.setProperty('min-height','1em')
		  			}
			  }
  	}.observes('ltPropDirection','ltPropStyle'),

  	timefunc : function (){
  				this.initialTime.call(this);
		      	var mins,hr,mer;
		      	var regex = /([\w]+)/ig;
		      	if(this.getData("ltPropTimeFormat")==12)
                  { 
                     $L('input#meridian', this.$node).e[0].style.display='block'
                     var string=this.getData("ltPropDefaultTime")
                     if(!string)
                     	{
                     		string=this.getData("ltPropStartTime")
                     	}
                     if(string)
             	        {
	    					var valArr = string.match(regex);
             	        	hr = valArr[0];
             	         	mins = valArr[1];
             	         	mer = valArr[2];
             	        }
             	     else
             	        {
             	   	       var date =new Date()
             	   	       var valArr = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).match(regex);
             	   	       hr = valArr[0];
             	           mins = valArr[1];
             	           mer = valArr[2];
             	        }
             	        mins=(mins.length==2)?mins:'0'+mins
             	        hr=(hr.toString().length==2)?hr:'0'+hr
             	       this.setData('ltPropValue',(hr+':'+mins+' '+mer))
             	  }
              else
             	  {
             	  	$L('input#meridian', this.$node).e[0].style.display='none'
             	  	var time=this.getData("ltPropDefaultTime")
	                 if(!time)
	                 	{
	                 		time=this.getData("ltPropStartTime")
	                 	}
             	  	if(!time)
             	  	   {
             	  	   		var date =new Date()
             	  	   		var valArr = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).match(regex);
             	   	   		hr = valArr[0];
             	            mins = valArr[1];
             	   	   }
             	   	else
	             	   	{
	             	   		var valArr =  time.match(regex);
		             	   	hr = valArr[0];
             	            mins = valArr[1];
		             	}
             	   	hr=(hr.toString().length==2)?hr:'0'+hr
                    mins=(mins.length==2)?mins:'0'+mins
             	    this.setData('ltPropValue',(hr+':'+mins))
            	  }
             $L('input#minute', this.$node).e[0].value=mins             	        
             $L('input#meridian', this.$node).e[0].value=mer
             $L('input#hour', this.$node).e[0].value=hr
	      	if(this.getData('ltPropDropdown'))
	      	 	{
	      	 		this.setDropDown.call(this,0);
	      	 		this.setData('ltPropFlag', true)
	      	 	}
	      	this.initialTime.call(this) 	
  	}.observes('ltPropTimeFormat','ltPropDropdown','ltPropStartTime','ltPropDefaultTime','ltPropEndTime'),	

  	heightFunc : function (){
  		var ltPropType = this.getData('ltPropType');
  		if( ltPropType!= 'textarea')
	  		 {
	  		 	 var input = $L('input', this.$node).e[0], height = this.getData('ltPropHeight');
		  		 var lyteFieldDiv= $L('.lyteField', this.$node).e[0]
			     input.style.height = height;
			     if(ltPropType == 'search'){
			     	var bcr = input.getBoundingClientRect();
		   			var span = $L('span.searchIcon', this.$node).e[0];
		   			if(height)
		   				{
		   					if(!lyteFieldDiv.style.padding)
		   						{
		   							lyteFieldDiv.style.padding = '0px';
		   						}
		   				}
				    if(arguments[0] && arguments[0].type == 'change' && !span)	
				   		{
				   			this.$node.constructor._observers[4].value.call(this);	
				   		}
				   	if(input.offsetHeight == 0)	
				   		{
			   				span.style.top = ((parseInt(window.getComputedStyle(input).getPropertyValue('height')) - parseInt(window.getComputedStyle(span).getPropertyValue('height'))) / 2 + parseInt(getComputedStyle(input.parentElement).getPropertyValue('padding-top'))) + 'px'
				   		}
				   	else	
			   			{
			   				span.style.top = ((input.offsetHeight - span.offsetHeight) / 2 + input.offsetTop) + 'px'
			   			}
	   			}
	   		}
	   	else
	   		{
	   			$L('textarea', this.$node).e[0].style.width = this.getData('ltPropHeight');
	   		}	
	 }.observes('ltPropHeight'),

  	widthfun : function (){
	    this.$node.style.width = this.getData('ltPropWidth')
  	}.observes('ltPropWidth'),

  	appearanceFun : function () {
  		var type = this.getData('ltPropType'), lyteField = $L('.lyteField', this.$node).e[0]
  		if(this.getData('ltPropAppearance')=='box')
   			{
   				if(type =='search')
	   				{
	   					lyteField.classList.add('lyteInputBoxSearch');
	   				}
	   			var lyteInput = this.$node
	   			if(lyteInput)	
   					{
   						lyteInput.classList.add('lyteInputBox');
   						lyteInput.classList.remove('lyteInput');
   					}
   			}
   		else
   			{
   				if(type =='search')
	   				{
	   					lyteField.classList.remove('lyteInputBoxSearch');
	   				}
	   			var lyteInputBox = this.$node;	
	   			if(lyteInputBox)
	   				{
	   					lyteInputBox.classList.add('lyteInput');
	   					lyteInputBox.classList.remove('lyteInputBox');
	   				}
   			}	
   		if(type == 'search'){
   			if(!$L('.searchIcon', this.$node).e[0])
   				{
   					var span = document.createElement('span');
		   			span.classList.add('searchIcon');
		   			lyteField.appendChild(span);
		   			this.$node.constructor._observers[2].value.call(this);
		   		}
		   	if(arguments[0] && arguments[0].type == 'change')	
		   		{
		   			this.$node.constructor._observers[2].value.call(this);	
		   		}
   		}	
  	}.observes('ltPropAppearance'),
  	directionfun : function (){
  		var horizontal = this.$node;
  		if(horizontal)
		  	{
		  		if(this.getData('ltPropDirection')=='vertical')
		   			{
		   				horizontal.classList.add('vertical');
		   				horizontal.classList.remove('horizontal');
		   			}
		   		else 	
			   		{
			   			horizontal.classList.add('horizontal');
			   			horizontal.classList.remove('vertical');
			   		}
			 }	
	}.observes('ltPropDirection'),
	typeObs : function(arg){
		if(arg.newValue == 'search')
			{
				this.$node.constructor._observers[4].value.call(this);
				this.$node.constructor._observers[2].value.call(this);
			}
		else if(arg.oldValue == 'search')
			{
				var span = $L('span.searchIcon', this.$node).e[0];
				if(span)
					{
						span.parentElement.removeChild(span);
					}
			}	
	}.observes('ltPropType'),
	data : function(){
		return {
		    ltPropDisabled :  Lyte.attr("boolean",{"default" : false}),
		    ltPropAutofocus : Lyte.attr("boolean",{"default" : false}),
		    ltPropAutocomplete : Lyte.attr("string",{"default" : 'off'}),
		    ltPropMaxlength : Lyte.attr("number",{"default" : undefined}),
		    ltPropName : Lyte.attr("string",{"default" : ''}),
		    ltPropPlaceholder : Lyte.attr("string",{"default" : ''}),
		    ltPropReadonly : Lyte.attr("boolean",{"default" : false}),
		    ltPropValue : Lyte.attr("string",{"default" : ''}),
		    ltPropWidth : Lyte.attr("string",{"default" : ''}),
		    ltPropInterval : Lyte.attr("number",{"default" : undefined}),
		    ltPropTimeFormat : Lyte.attr("number",{"default" : 12}),
		    ltPropHourInterval : Lyte.attr("number",{"default" : 1}),
		    ltPropRows : Lyte.attr("number",{"default" : undefined}),
		    ltPropDefaultTime : Lyte.attr("string",{"default" : ''}),
     	    ltPropCols : Lyte.attr("number",{"default" : undefined}),
		    ltPropMinuteInterval : Lyte.attr("number",{"default" : 1}),
		    ltPropStartdate : Lyte.attr("string",{"default" : ''}),
		    ltPropEnddate : Lyte.attr("string",{"default" : ''}),
		    ltPropCurrentdate : Lyte.attr("string",{"default" : ''}),
		    ltPropMonthheader : Lyte.attr("string",{"default" : ''}),
		    ltPropType : Lyte.attr("string",{"default" : ''}),
		    ltPropAppearance : Lyte.attr("string",{"default" : ''}),
		    ltPropDirection : Lyte.attr("string",{"default" : 'vertical'}),
		    ltPropLabel : Lyte.attr("string",{"default" : ''}),
		    ltPropId : Lyte.attr("string",{"default" : ''}),
		    ltPropClass : Lyte.attr("string",{"default" : ''}),
		    ltPropAccept : Lyte.attr("string",{"default" : ''}),
		    ltPropMultiple : Lyte.attr("boolean",{"default" : true}),
		    ltPropText : Lyte.attr("string",{"default" : ''}),
		    ltPropFilelist : Lyte.attr("array",{"default" : []}),
		    ltPropMax : Lyte.attr("number",{"default" : undefined}),
		    ltPropMin : Lyte.attr("number",{"default" : undefined}),
		    ltPropStep : Lyte.attr("number",{"default" : 1}),
		    ltPropStyle : Lyte.attr("string",{"default" : ''}),
		    ltPropDropdown : Lyte.attr("boolean",{"default" : false}),
		    ltPropStartTime : Lyte.attr("string",{"default" : ''}),
		    ltPropEndTime : Lyte.attr("string",{"default" : ''}),
		    iniHour : Lyte.attr("string",{"default" : ''}),
		    iniMinute : Lyte.attr("string",{"default" : ''}),
		    iniMeridian : Lyte.attr("string",{"default" : ''}),
		    finalHour : Lyte.attr("string",{"default" : ''}),
		    finalMinute : Lyte.attr("string",{"default" : ''}),
		    finalMeridian : Lyte.attr("string",{"default" : ''}),
		    ltPropText : Lyte.attr("string",{"default" : 'upload'}),
		    fileNo : Lyte.attr("number",{"default" : undefined}),
		    ltPropWrapperStyle : Lyte.attr('string', {'default' : ''}),
		    ltPropTextAreaResize : Lyte.attr("boolean",{"default" : false}),
		    ltPropHeight : Lyte.attr("string",{"default" : ''}),
		    ltPropFlag : Lyte.attr('boolean', { 'default' : false}),
		    ltPropFormat : Lyte.attr("string",{"default":"MM/DD/YYYY"}),
			ltPropYear : Lyte.attr("boolean",{"default":true}),
			ltPropMonthHeaderFormat : Lyte.attr("string",{"default":'MMMM YYYY'}),
			daysOfWeek : Lyte.attr("array",{"default":['Sun','Mon','Tue','Wed','Thu','Fri','Sat']}),
			viewDate : Lyte.attr("object",{"default":{}}),
		    drop1data : Lyte.attr('array', {'default' : []}),
		    drop2data : Lyte.attr('array', {'default' : []}),
		    drop3data : Lyte.attr('array', {'default' : []}),
		    eventListeners : Lyte.attr('object', {default : {}}),
		    ltPropBoundary : Lyte.attr('object', { default : {}})
		}
	},
	mouseup : function(event){
		document.removeEventListener('mousemove', this.getData('eventListeners').resizeFunc);
	},
	textareaResize:function(event){
		var textarea=$L('textarea', this.$node).e[0];
		if (((navigator.userAgent.indexOf('Edge')) != -1)||((navigator.userAgent.indexOf('MSIE')) != -1))	
			 {
				var nodeName=$L('.lyteTextareaResize', this.$node).e[0];
				if(nodeName.direction=="horizontal"||nodeName.direction=="both")
					{	
						this.$node.style.width = (event.clientX + this.xPos - textarea.offsetLeft)+'px'
					}
			    if(nodeName.direction=="vertical"||nodeName.direction=="both")
					{	
						textarea.style.height=(event.clientY+this.yPos-textarea.offsetTop)+'px'
					}
				event.preventDefault();	
			}
		else
			{
				this.$node.style.width=textarea.style.width	
			}
	},
	initialTime:function(){
		var hr,mins,mer,hr1,mins1,mer1,regex = /([\w]+)/ig;
			if(this.getData("ltPropTimeFormat")==12)
                  { 
                     var string=this.getData("ltPropStartTime")
                     if(string)
             	        {
	    				   var valArr = string.match(regex);
             	           hr = valArr[0];
             	           mins = valArr[1];
             	           mer = valArr[2];
             	        }
             	        else
             	        {
             	   	       var date =new Date()
             	   	       var valArr = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).match(regex);
             	   	       hr = valArr[0];
             	           mins = valArr[1];
             	           mer = valArr[2];
             	        }
             	  }
              else
             	  {
             	  	var time=this.getData("ltPropStartTime")
             	  	if(time)
	             	   	{
		             	   var valArr = time.match(regex);
             	           hr = valArr[0];
             	           mins = valArr[1];
             	           mer = valArr[2];
		             	}
	             	else
	             		{
             	  	   	   var date =new Date()
             	   	       var valArr = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).match(regex);
             	   	       hr = valArr[0];
             	           mins = valArr[1];
             	           mer = valArr[2];
             	   	   }
            	  }
            	  if(this.getData('ltPropEndTime'))
            	  	{
            	  		string = this.getData('ltPropEndTime')
            	  		if(this.getData("ltPropTimeFormat")==12)
			                  { 
		             	            var valArr = string.match(regex);
             	           			hr1 = valArr[0];
             	           			mins1 = valArr[1];
             	           			mer1 = valArr[2];
			             	  }
			              else
			             	  {
			             	  	if(string)
			             	  	   {
					             	    var valArr = string.match(regex);
             	           				hr1 = valArr[0];
             	           				mins1 = valArr[1];
             	           				mer1 = valArr[2];
				             	   }
			            	  }
            	  	}
            	  		this.setData('iniHour',hr)
	                  	this.setData('iniMeridian',mer)
	                  	this.setData('iniMinute',mins)
            	  	if(this.getData("ltPropEndTime"))
	                  {
	                  	this.setData('finalHour',hr1)
	                  	this.setData('finalMeridian',mer1)
	                  	this.setData('finalMinute',mins1)
	                  }
	                else
	                  {
	                  	this.setData('finalHour',hr)
	                  	this.setData('finalMeridian',mer)
	                  	this.setData('finalMinute',(parseInt(mins)-1).toString())
	                  }
	},
	setDropDown:function(index){
				var dropdown=$L('lyte-dropdown', this.$node).e;
				var hour=[],minute=[],meridian=[{name:'AM',value:1},{name:'PM',value:2}];
				var hourInterval=parseInt(this.getData('ltPropHourInterval'));
				var minuteInterval=parseInt(this.getData('ltPropMinuteInterval'));
				timeFormat=this.getData('ltPropTimeFormat');
				var hr,mer,mins,hr1,mer1,min1,hourInput=$L('input#hour', this.$node).e[0],meridianInput;
				hr=this.getData('iniHour')
				mins=this.getData('iniMinute')
				mer=this.getData('iniMeridian')
				if(this.getData('ltPropEndTime'))
					{
						hr1=this.getData('finalHour')
						mins1=this.getData('finalMinute')
						mer1=this.getData('finalMeridian')
					}
				if(timeFormat==12)
					{
					  meridianInput = $L('input#meridian', this.$node).e[0]
					  temp=parseInt(hr);var temp=[];
					  if(!this.getData('ltPropEndTime'))
						  {
						  	hr1=hr;
						  	mins1=parseInt(mins)-1
						  	mer1=mer
						  }
						if(mer==mer1)
							{
								if(hr1<=hr)
									{
										hr1=parseInt(hr1)+24
									}
									var val=mer=='AM'?12:24;
								for(var i=parseInt(hr);i<=hr1;i+=hourInterval)
									{
										if(i==val)
												{
													temp[temp.length]=12;
												}
											else 
												{
													temp[temp.length]=i%12;
												}
									}
							}
						else
							{
								if(mer=='AM')
									{
										hr1=parseInt(hr1)+12;
										for(var i=parseInt(hr);i<=hr1;i+=hourInterval)	
										{
											if(i==12)
												{
													temp[temp.length]=i;
												}
											else
												{
													temp[temp.length]=i%12;
												}
										}
									}
								else
									{
										hr1=parseInt(hr1)+12;
										for(var i=parseInt(hr);i<=hr1;i+=hourInterval)	
										{
											if(i==24)
												{
													temp[temp.length]=i;
												}
											else
												{
													temp[temp.length]=i%12;
												}
										}
									}
							} 
						for(var j=0;j<temp.length;j++)
							{
								if(temp[j]!=12)
				  					{
				  						x={name:(temp[j]%12).toString(),value:hour.length}
				  					}
			  					else	
			  						{
			  							x={name:(temp[j]%13).toString(),value:hour.length}
			  						}
			  					if(x.name.length==1)
							  		{
							  			x.name='0'+x.name;
							  		}	
			  					hour.push(x);	
							}	 
					}
					else
					{
						 if(!this.getData('ltPropEndTime'))
					  		{
					  			hr1=hr
					  			mins1=parseInt(mins)-1
							}
						if(hr>=hr1)
					    	{
					    		hr1=parseInt(hr1)+24;
						    }
					temp=parseInt(hr);
					  for(var i=0;i<=24;i++)
					  	{
					  	if(temp>=parseInt(hr))
					  		{
						  		x={name:(temp%24).toString(),value:hour.length}
							  	if(x.name.length==1)
							  		{
							  			x.name='0'+x.name;
							  		}		
						  		hour.push(x);
						  		if(temp>=parseInt(hr1))
							  		{
							  			break
							  		}
						  		temp+=hourInterval;
						  	}
					  	}
					}
					if(parseInt(hr)==parseInt(hourInput.value))
						{
							if(this.getData('ltPropTimeFormat')==12)
								{
									meridianInput= $L('input#meridian', this.$node).e[0]
									if(mer==meridianInput.value)
										{
											if(hr==parseInt(hr1)%24)
											{
												temp=0;
												if(index==0)	
													{
														mins=this.getData('iniMinute');
														temp=parseInt(mins);
														mins1=0;
													}
												else if(index==24)
													{
														mins1=this.getData('finalMinute')
														mins=0;
														temp=parseInt(mins)
													}	
											}
											else
											{
												temp=parseInt(mins);
											}
										}
									else
										{
											temp=0;
											mins=0;
										}	
								}
								else
								{
									if(hr==parseInt(hr1)%24&&index!=0)
											{
												temp=0;
												if(index==0)	
													{
														mins=this.getData('iniMinute');
														temp=parseInt(mins);
														mins1=0;
													}
												else if(index==24)
													{
														mins1=this.getData('finalMinute')
														mins=0;
														temp=parseInt(mins)
													}
											}
											else
												{
													temp=parseInt(mins);
												}
								}
						}
						else
							{
								temp=0;
								mins=0;
							}
					  for(var i=0;i<=60;i++)
					  	{
					  		if(temp>=parseInt(mins))
					  		{
					  			if(temp<60)
						  			{
						  				x={name:(temp%60).toString(),value:minute.length}
						  			}
						  		if(x.name.length==1)
							  		{
							  			x.name='0'+x.name;
							  		}		
					  			minute.push(x);
					  			temp+=minuteInterval;
					  			var flag=false,flag1=false;
					  			if(this.getData('ltPropTimeFormat')==12)
						  			{
						  				if(hr1!=12)
							  				{
							  					hr1=parseInt(hr1)%12;
							  				}
						  				if(mer1==meridianInput.value&&((parseInt(hr1)==parseInt(hourInput.value) || (parseInt(hr1) == 12 && (parseInt(hr1)%12) ==parseInt(hourInput.value)))/*&&i!=0*/))
						  					{
						  						flag=true;
						  					}
						  				if(mer==meridianInput.value && (parseInt(hr1)==parseInt(hourInput.value) || (parseInt(hr1) == 12 && (parseInt(hr1)%12) ==parseInt(hourInput.value)))/*&&i!=0*/)
						  					{
						  						flag1=true;
						  					}	
							  		}
						  		else
							  		{
							  			if(parseInt(hr1%24)==parseInt(hourInput.value))
								  			{
								  				flag=true
								  			}
							  			if(parseInt(hr%24)==parseInt(hourInput.value))
								  			{
								  				flag1=true
								  			}
							  		}
						  		 if(temp > parseInt(mins1) && flag)
							  		{
						  				break
							  		}
						  		if(temp < parseInt(mins)&&flag1)
							  		{
						  				break
							  		}
						  		if(temp>59)
							  		{
							  			break
							  		}
						  	}
					  	}
				 this.setData('drop1data',hour);
				 this.setData('drop2data',minute);
				 if(this.getData('ltPropTimeFormat')!=24)
					 {
				  		this.setData('drop3data',meridian);
				  	 }
	},
	hourDecrease:function(){
		         var Interval=this.getData("ltPropHourInterval")
		         var meridianInput=$L('input#meridian',this.$node).e[0]
	 	     	 var hourInput=$L('input#hour',this.$node).e[0]
	 	     	 var minuteInput=$L('input#minute',this.$node).e[0]
	 	     	 var meridian=meridianInput.value
	 	     	 var hour=hourInput.value
	 	     	 var minute=minuteInput.value
	 	     	 var flag=false;
	 	     	if(hour==''||hour==""||hour>12)
	 	     		 {
	 	     		 	hour=0
	 	     		 }
	     		  hour=parseInt(hour);
     		   if(this.getData('iniHour')==this.getData('finalHour')&&this.getData('finalMeridian')==this.getData('iniMeridian'))
	 	     	  {
	 	     	  	var flag=false;
	 	     	  }
     		   else if((hour==parseInt(this.getData('iniHour'))+1)&&meridian==this.getData('iniMeridian'))
	     		   {
	     		   	if(minute>this.getData('iniMinute'))
	     		   		{
	     		   			flag=true;
	     		   		}
	     		   	else
		     		   	{
		     		   		flag=false;
		     		   	}
	     		   }
	     	   else if(hour==parseInt(this.getData('iniHour'))&&meridian==this.getData('iniMeridian')) 
			     	 {
			     	 	flag=true;
			     	 }
		        if(meridian=='AM'&&!flag)
	 	     		{
	 	     			hour=parseInt(hour)-Interval;
 	     				if(hour>=0)
	 	     				{
	 	     				    meridian='AM'
                            }
                        else
                            {
                               hour=(hour+24)%12;
                               meridian='PM'
                            }
                        hour=(hour>=10)?hour:'0'+hour
	 	     		}
	 	     	else if(meridian=='PM'&!flag)
	 	     		{
	 	     		   if(hour==12)
	 	     			  {
	 	     			  	hour=0
	 	     			  }
	 	     			hour=parseInt(hour)-Interval;
	 	     			if(hour==0)
		 	     			{
		 	     			   hour=12
		 	     			   meridian='PM'
		 	     			}
	 	     			else
		 	     			{
		 	     			  if(hour>0)
		 	     				   {
		 	     				     meridian='PM'
	                               }
	                           else
	                               {
	                                 hour=(hour+24)%12;
	                                 meridian='AM'
	                               }
	                        }
                        hour=(hour>=10)?hour:'0'+hour
	 	     	    }
	 	     	    if(hour==this.getData('iniHour')&&meridian==this.getData('iniMeridian'))
		     		  	 {
			     		   	if(minute<this.getData('iniMinute'))
			 	     		   	{
			 	     		   		minute=this.getData('iniMinute');
			 	     		   	}
		     		     } 
		     		  hour=(hour.toString().length==2)?hour:'0'+hour    
	 	     	    hourInput.value=hour;
	 	     	    meridianInput.value=meridian;
	 	     	    minuteInput.value=minute;
	 	     	    this.setData('ltPropValue',(hour+':'+minute+' '+meridian))
	},
	hourIncrease:function(){
	            var Interval=this.getData("ltPropHourInterval")
	            var meridianInput=$L('input#meridian',this.$node).e[0]
	 	     	var hourInput=$L('input#hour',this.$node).e[0]
	 	        var minuteInput=$L('input#minute',this.$node).e[0]
	 	     	var meridian=meridianInput.value
	 	     	var hour=hourInput.value
	 	     	var minute=minuteInput.value
	 	     	var flag=false
	 	     	if(hour==''||hour==""||hour>12)
	 	     	    {
	 	     	    	hour=0
	 	     	    }
	 	     	  hour=parseInt(hour);
	 	     	  if(this.getData('iniHour')==this.getData('finalHour')&&this.getData('finalMeridian')==this.getData('iniMeridian'))
		 	     	  {
		 	     	  	var flag=false;
		 	     	  }
	     		  else if(hour==parseInt(this.getData('finalHour'))-1&&meridian==this.getData('finalMeridian'))
		     		   {
		     		   		if(minute>this.getData('iniMinute'))
			     		   		{
			     		   			flag=true;
			     		   		}
			     		   	else
				     		   	{
				     		   		flag=false;
				     		   	}
		     		   } 
		     	 else if(hour==parseInt(this.getData('finalHour'))&&meridian==this.getData('finalMeridian')) 
			     	 {
			     	 	flag=true;
			     	 } 
		        if(meridian=='AM'&&!flag)
	 	     		{
	 	     		   hour=parseInt(hour)+Interval;
	 	     		   if(hour>12)
	 	     			    {
	 	     				   hour%=12;
	 	     				   meridian='PM'
	 	     				}
	 	     			else if(hour==12)
	 	     				{
	 	     				   	meridian='PM'
	 	     				}
                        hour=(hour>=10)?hour:'0'+hour
	 	     		}
	 	     	else if(meridian=='PM'&&!flag)
	 	     		{
	 	     		   if(hour<12)
	 	     			  {
	 	     				hour=parseInt(hour)+Interval
	 	     				if(hour>=12)
	 	     				  {
                                hour%=12;
	 	     				    meridian='AM'
	 	     				   }
	 	     			  }
	 	     			else if(hour==12)
	 	     			  {
	 	     				 hour=Interval
	 	     			  }
                        hour=(hour.toString().length==2)?hour:'0'+hour
	 	     		}
	 	     	if(hour==this.getData('finalHour')&&meridian==this.getData('finalMeridian'))
	     		  	 {
		     		   	if(minute>this.getData('finalMinute'))
		 	     		   	{
		 	     		   		minute=this.getData('finalMinute');
		 	     		   	}
	     		     } 	
	 	     	hourInput.value=hour;
	 	        meridianInput.value=meridian;
	 	        minuteInput.value=minute;
	 	   	    this.setData('ltPropValue',(hour+':'+minute+' '+meridian))
	},
	railwayIncrease:function(){
		        var Interval1=this.getData('ltPropHourInterval'),hourInput=$L('input#hour',this.$node).e[0];
	 	        var hour=hourInput.value
	 	        var flag=true
	 	     	if(hour==''||hour==""||hour>24)
	 	     	    { 
	 	     	    	hour=-Interval1
	 	     	    }
	 	     	if(parseInt(this.getData('finalHour'))-1==hour)
		 	     	{
		 	     		if(this.getData('finalMinute')>minute)
			 	     		{
			 	     			flag=true
			 	     		}
		 	     		else
		 	     			{
		 	     				flag=false;
		 	     			}
		 	     	}
		 	     else if(this.getData('finalHour')==hour)	
			 	     {
			 	     	flag=false;
			 	     }
			 	  if(this.getData('iniHour')==this.getData('finalHour'))
			 	  	{
			 	  		flag=true;
			 	  	}   
			 	 if(flag)    
	 	        	{
	 	        		hour=((parseInt(hour)+Interval1)%24)>=10?(parseInt(hour)+Interval1)%24:'0'+((parseInt(hour)+Interval1)%24)
	 	        	}
	 	        hourInput.value=hour;
	 	        this.setData('ltPropValue',(hour+':'+this.$node.querySelector('input#minute').value))
	},
	railwayDecrease:function(){
                var Interval1=this.getData('ltPropHourInterval'),hourInput=$L('input#hour',this.$node).e[0];
                var hour=hourInput.value
                if(hour==''||hour==""||hour>24)
	 	     	    {
	 	     	    	hour=Interval1
	 	     	    }
	 	     	  var flag=true;  
	 	     	 if(parseInt(this.getData('iniHour'))+1==hour)
		 	     	{
		 	     		if(this.getData('iniMinute')<minute)
			 	     		{
			 	     			flag=true
			 	     		}
		 	     		else
		 	     			{
		 	     				flag=false;
		 	     			}
		 	     	}
		 	     else if(this.getData('iniHour')==hour)	
			 	     {
			 	     	flag=false;
			 	     }
			 	 if(this.getData('iniHour')==this.getData('finalHour'))
			 	  	{
			 	  		flag=true;
			 	  	}       
	 	        if(flag)	
	 	        	{
	 	        		hour=(parseInt(hour)-Interval1+24)%24>=10?(parseInt(hour)-Interval1+24)%24:'0'+(parseInt(hour)-Interval1+24)%24;
	 	        	}
	 	        hourInput.value=hour;
	 	         this.setData('ltPropValue',(hour+':'+$L('input#minute',this.$node).e[0].value))
	},
	dropdownOpen : function(dropdown){
		if(!dropdown.component.childComp)
    		{
    			dropdown.toggle()
    			dropdown.toggle()
    		}
    	if(!dropdown.component.childComp.classList.contains('lyteDropdownHidden'))
    		{
    			dropdown.toggle()
    		}
	},
	methods:{
			"on-dateselected":function(evt){
                   var date= evt.target.getAttribute('data-date');
                   $L('input', this.$node).e[0].value=date;
                   this.set('ltPropValue',date);
                   this.$node.calendarDiv.classList.add('lyteCalendarHidden');
	         },
	         "hourSelected":function(event){
	         	if(event)
	         		{
	         			var meridianInput, hourInput=$L('input#hour',this.$node).e[0], defHr = hourInput.value, minuteInput=$L('input#minute',this.$node).e[0];
			         	var numb = parseInt(event.target.getAttribute('data-value'));
			         	hourInput.value=this.getData('drop1data')[numb].name;
			         	minute=minuteInput.value
						var flag=false,flag1=false;
						var hr=this.getData('iniHour')
						var mins=this.getData('iniMinute')
						var mer=this.getData('iniMeridian')
						var hr1=this.getData('finalHour')
						var mins1=this.getData('finalMinute')
						var mer1=this.getData('finalMeridian')
						var selectedHour=numb*this.getData('ltPropHourInterval');
						selectedHour+=parseInt(hr)%12;
						selectedHour%=24;
						if(this.getData('ltPropTimeFormat')==12)
							{
								meridianInput=$L('input#meridian',this.$node).e[0]
								if(selectedHour>11)
									{
										if(mer=='PM')
											{
												meridianInput.value='AM'
											}
										else
											{
												meridianInput.value='PM'
											}
									}
								else
									{
										meridianInput.value=mer
									}
								if(hr!=12)
									{
										hr=parseInt(hr)%12;
									}
								if(hr1!=12)
									{
										hr1=parseInt(hr1)%12;
									}
								if((hr==hourInput.value)&&(mer==meridianInput.value))
									{
										flag=true
									}
								if((hr1==hourInput.value)&&(mer1==meridianInput.value))
									{
										flag1=true
									}
								if(hr==hr1&&mer==mer1)
								{
									if(numb==0)
										{
											flag1=false
										}
									else
										{
											flag=false;
										}
								}
							}
						else
							{
								hr=parseInt(hr)%24;
								hr1=parseInt(hr1)%24;
								if((hr==hourInput.value) && hourInput.value !=24)
									{
										flag=true
									}
								if((hr1==hourInput.value))
									{
										flag1=true
									}
							}
						if(flag)
							{
								if(minute<mins)
									{
										minuteInput.value=mins
									}
							}
						if(flag1)
							{
								if(minute>mins1)
									{
										minuteInput.value=mins1
									}
							}
						 hour=hourInput.value;
						 minute =minuteInput.value;
			 	     	 if(this.getData('ltPropTimeFormat')==12)
				 	     	 {
				 	     	 	this.setData('ltPropValue',(hour+':'+minute+' '+meridian))
				 	     	 }
			 	     	 else
				 	     	 {
				 	     	 	this.setData('ltPropValue',(hour+':'+minute))
				 	     	 }
				 	     if(hourInput.value == hr1 || hourInput.value == hr || defHr == hr1 || defHr == hr)
							{
								this.setDropDown.call(this,numb);
							}	 
				 	 }
	         },
	         "minuteSelected":function(event){
	         	if(event)
			       {
			         	var minuteInput = $L('input#minute',this.$node).e[0]
			         	minuteInput.value = this.getData('drop2data')[parseInt(event.target.getAttribute('data-value'))].name;
			         	hour=$L('input#hour',this.$node).e[0].value;
						 minute =minuteInput.value;
			 	     	 if(this.getData('ltPropTimeFormat')==12)
				 	     	 {
				 	     	 	meridian =$L('input#meridian',this.$node).e[0].value;
				 	     	 	this.setData('ltPropValue',(hour+':'+minute+' '+meridian))
				 	     	 }
			 	     	 else
				 	     	 {
				 	     	 	this.setData('ltPropValue',(hour+':'+minute))
				 	     	 }
				   }
	         },
	         "meridianSelected":function(event){
	         	if(event)
			        {
			         	var meridianInput = $L('input#meridian',this.$node).e[0]
			         	meridianInput.value = this.getData('drop3data')[parseInt(event.target.getAttribute('data-value')) - 1].name;
			         	var hour = $L('input#hour',this.$node).e[0].value;
			         	if(hour == this.getData('finalHour') || hour == this.getData('iniHour'))
							{
								this.setDropDown.call(this, hour);
							}
						var minuteInput =$L('input#minute',this.$node).e[0];
						if(hour == this.getData('iniHour') && meridianInput.value == this.getData('iniMeridian') && parseInt(this.getData('iniMinute')) > minuteInput.value)
							{
								minuteInput.value = parseInt(this.getData('iniMinute'))
							}
						else if(hour == this.getData('finalHour') && meridianInput.value == this.getData('finalMeridian') && parseInt(this.getData('finalMinute')) < minuteInput.value)
							{
								minuteInput.value = parseInt(this.getData('iniMinute'))
							}	
		 	     	 	
		 	     	 	this.setData('ltPropValue',(hour + ':' + minuteInput.value + ' ' + meridian))
		 	     	}
	         }
},
iniDrop : function(inputhr, i)
	{
		var xscroll = window.pageXOffset || document.documentElement.scrollLeft
		var yscroll = window.pageYOffset || document.documentElement.scrollTop
		var input = $L(inputhr, this.$node).e[0], joinInput = $L('.lyteField.joinInput', this.$node).e[0];
		var lyteDropdownContainer = $L('lyte-dropdown',this.$node).e[i].component.childComp
     	lyteDropdownContainer.style.left = (input.getBoundingClientRect().left + xscroll) + 'px'
     	lyteDropdownContainer.style.width = input.clientWidth + 'px'
     	lyteDropdownContainer.style.minWidth = '40px';
     	lyteDropdownContainer.style.top = (joinInput.getBoundingClientRect().top + yscroll + joinInput.clientHeight) + 'px'
     	if(lyteDropdownContainer.getBoundingClientRect().top + lyteDropdownContainer.clientHeight > window.innerHeight)
     		{
     			lyteDropdownContainer.style.top = (lyteDropdownContainer.getBoundingClientRect().top - lyteDropdownContainer.clientHeight - joinInput.clientHeight) + 'px'
     		}
   },
   valUpdate : function(){
   		var ltPropType = this.getData('ltPropType');
     	if(ltPropType !="time" && ltPropType != "textarea")
     		{
     			this.setData('ltPropValue',$L('input',this.$node).e[0].value);
     		}
     	else if(ltPropType = "textarea")		
     		{
     			this.setData('ltPropValue',$L('textarea',this.$node).e[0].value);
     		}
   },
	actions: {
			 wormholeDidConnect : function(){
			 	this.$node.calendarComp = $L('lyte-wormhole',this.$node).e[0];
			 	LyteComponent.appendChild(document.body,this.$node.calendarComp);
			 	this.$node.calendarComp.nodeN=this.$node;
			 	this.$node.calendarDiv = $L('div#lyteCalendar', this.$node.calendarComp).e[0];
			 },
	 	     "blurThrow":function(event){
	 	     	this.valUpdate.call(this);
	 	     	if(this.getMethods("onBlur"))
		 	     	  {
		 	     	  	this.executeMethod('onBlur', event, this)
		 	     	  }
	 	     },
	 	     "hrClick" : function (event){
	 	     	if(this.getData('ltPropDropdown'))
		 	     	{
		 	     		var dropdown = $L('lyte-dropdown',this.$node).e[0]
		 	     		dropdown.toggle()
		 	     		this.iniDrop.call(this,'input#hour',0)
			 	     	event.stopPropagation();
			 	    }
	 	     },
	 	     "minClick" : function (event){
	 	     	if(this.getData('ltPropDropdown'))
		 	     	{
		 	     		var dropdown = $L('lyte-dropdown',this.$node).e[1]
		 	     		dropdown.toggle()
		 	     		this.iniDrop.call(this,'input#minute',1)
		 	     		event.stopPropagation();
			 	    }
	 	     },
	 	     "amClick" : function (event){
				if(this.getData('ltPropDropdown'))
		 	     	{
		 	     		var dropdown = $L('lyte-dropdown',this.$node).e[2]
		 	     		dropdown.toggle()
		 	     		this.iniDrop.call(this,'input#meridian',2)
			 	     	event.stopPropagation();
					}
	 	     },
	 	     "keyup":function(event){
	 	     	if(event.keyCode != 9)
	 	     		{
	 	     			this.valUpdate.call(this);
	 	     		}
	 	     	if(this.getMethods("onKeyup"))
	 	     	  {
	 	     	  	this.executeMethod('onKeyup', event, this)
	 	     	  }
	 	     },
	 	     "onMouseup":function(event){
	 	     	if(this.getMethods("onMouseup"))
	 	     	  {
	 	     	  	this.executeMethod('onMouseup', event, this)
	 	     	  }
	 	     },
	 	      "onMousemove":function(event){
	 	     	if(this.getMethods("onMousemove"))
	 	     	  {
	 	     	  	this.executeMethod('onMousemove', event, this)
	 	     	  }
	 	     },
	 	     "onMouseover":function(event){
	 	     	if(this.getMethods("onMouseover"))
	 	     	  {
	 	     	  	this.executeMethod('onMouseover', event, this)
	 	     	  }
	 	     },
	 	      "onMouseleave":function(event){
	 	     	if(this.getMethods("onMouseleave"))
	 	     	  {
	 	     	  	this.executeMethod('onMouseleave', event, this)
	 	     	  }
	 	     },
	 	      "onMouseenter":function(event){
	 	     	if(this.getMethods("onMouseenter"))
	 	     	  {
	 	     	  	this.executeMethod('onMouseenter', event, this)
	 	     	  }
	 	     },
	 	      "onMousedown":function(event){
	 	     	if(this.getMethods("onMousedown"))
	 	     	  {
	 	     	  	this.executeMethod('onMousedown', event, this)
	 	     	  }
	 	     },
	 	      "dblclick":function(event){
	 	     	if(this.getMethods("onDblclick"))
	 	     	  {
	 	     	  	this.executeMethod('onDblclick', event, this)
	 	     	  }
	 	     },
	 	      "oncontextmenu":function(event){
	 	     	if(this.getMethods("onContextmenu"))
	 	     	  {
	 	     	  	this.executeMethod('onContextmenu', event, this)
	 	     	  }
	 	     },
	 	     "onMouseout":function(event){
	 	     	if(this.getMethods("onMouseout"))
	 	     	  {
	 	     	  	this.executeMethod('onMouseout', event, this)
	 	     	  }
	 	     },
	 	     "focus":function(event){
	 	     	if(this.getMethods("onFocus"))
	 	     	  {
	 	     	  	this.executeMethod('onFocus', event, this)
	 	     	  }
	 	     },
	 	     "focusout":function(event){
	 	     	if(this.getMethods("onFocusout"))
	 	     	  {
	 	     	  	this.executeMethod('onFocusout', event, this)
	 	     	  }
	 	     },
	 	     "keypress":function(event){
                if(this.getMethods("onKeypress"))
	 	     	   {
	 	     	   		this.executeMethod('onKeypress', event, this)
	 	     	   }
	 	     },
	 	     "keydown":function(event){
                if(this.getMethods("onKeydown"))
	 	         	{
	 	         		this.executeMethod('onKeydown', event, this)
	 	         	}	
	 	     },
	 	     "onChange":function(event){
                if(this.getMethods("onChange"))
	 	         	{
	 	         		this.executeMethod('onChange', event, this)
	 	         	}
	 	     },
	 	     "click":function(event){
                if(this.getMethods("onClick"))
	 	         	{
	 	         		this.executeMethod('onClick', event,this)
	 	         	}
	 	     },
	 	     "hidecalendar":function(event){
				if(this.getMethods("onFocusout"))
		 	     	  {
		 	     	  	this.executeMethod('onFocusout', event, this)
		 	     	  }	
	 	     },
	 	     "showcalendar":function(event){
	 	     	wormhole=$L('lyte-wormhole').e;
				for(var i=0;i<wormhole.length;i++)
					{
						var calendar=$L('div#lyteCalendar',wormhole[i]).e[0];
						if(calendar)
							{
								if(!calendar.classList.contains('lyteCalendarHidden'))
									{
										calendar.classList.add('lyteCalendarHidden');
									}
							}
					}
				 this.$node.calendarDiv.classList.remove('lyteCalendarHidden')
				 this.scrollFunc.call(this)
		 	     if(this.getMethods("onFocus"))
		 	     	  {
		 	     	  	this.executeMethod('onFocus', event, this)
		 	     	  }
		 	    event.preventDefault();
		 	    event.stopPropagation(); 	  	  
	 	     },
	 	     "timeCheck":function(event){
	 	     		   var meridianInput=$L('input#meridian',this.$node).e[0]
	 	     		   var hourInput=$L('input#hour',this.$node).e[0]
	 	     	 	   var minuteInput=$L('input#minute',this.$node).e[0]
	 	     		   var meridian=meridianInput.value
                   	   var hour=hourInput.value
                   	   var minute=minuteInput.value;
                   	   iniHour=this.getData('iniHour');finalHour=this.getData('finalHour');finalMeridian=this.getData('finalMeridian');iniMeridian=this.getData('iniMeridian');
                   	   var flag=true;
                   	   if(this.getData('ltPropTimeFormat')==12)
                   	   {
	                   	   if(!(iniHour==finalHour&&finalMeridian==iniMeridian))
	                   	   {
			 	     	  			if(meridian==iniMeridian)
			 	     	  				{
			 	     	  					if(hour<iniHour)
			 	     	  						{
			 	     	  							hour=iniHour;
			 	     	  						}
			 	     	  					else if(hour==iniHour)
			 	     	  						{
			 	     	  							if(minute<this.getData('iniMinute'))
			 	     	  							{
			 	     	  								minute=this.getData('iniMinute');
			 	     	  							}
			 	     	  						}	
			 	     	  				}
			 	     	  		    if(meridian==finalMeridian)
			 	     	  				{
			 	     	  					if(hour>finalHour)
			 	     	  						{
			 	     	  							hour=finalHour;
			 	     	  						}
			 	     	  					else if(hour==finalHour)
			 	     	  						{
			 	     	  							if(minute>this.getData('finalMinute'))
			 	     	  							{
			 	     	  								minute=this.getData('finalMinute');
			 	     	  							}
			 	     	  						}	
			 	     	  				}	
			 	     	  		}
			 	     	 }
			 	     	 else
			 	     	 {
			 	     	 	if(iniHour!=finalHour)
			 	     	 	{
			 	     	 		if(hour<iniHour)
 	     	  						{
 	     	  							hour=iniHour;
 	     	  						}
 	     	  					else if(hour==iniHour)
 	     	  						{
 	     	  							if(minute<this.getData('iniMinute'))
 	     	  							{
 	     	  								minute=this.getData('iniMinute');
 	     	  							}
 	     	  						}
 	     	  					if(hour>finalHour)
 	     	  						{
 	     	  							hour=finalHour;
 	     	  						}
 	     	  					else if(hour==finalHour)
 	     	  						{
 	     	  							if(minute>this.getData('finalMinute'))
 	     	  							{
 	     	  								minute=this.getData('finalMinute');
 	     	  							}
 	     	  						}			
			 	     	 	}
			 	     	 }
		 	     	    hourInput.value=hour;
			 	        meridianInput.value=meridian;
			 	      	minuteInput.value=minute;
			 	   	    this.setData('ltPropValue',(hour+':'+minute+' '+meridian))		
	 	     },
	 	     "AMset":function(event){
	 	     	 var meridianInput=$L('input#meridian',this.$node).e[0]
	     		 var hourInput=$L('input#hour',this.$node).e[0]
	     	 	 var minuteInput=$L('input#minute',this.$node).e[0]
	 	     	meridian=meridianInput.value
	 	     	hr=hourInput.value
	 	     	if(meridian == '' || meridian == '')
	 	     		{
	 	     			meridian = this.getData('iniMeridian')
	 	     		}
	 	        if(event.keyCode==37)
	              {
	              	minuteInput.focus();
                  }
                else if(event.keyCode==65)
                  {
                  	meridian='AM'
                  	if(hr=='12')
	                  	 {
	                  	 	hourInput.value='00'
	                  	 }
                  }
                  else if(event.keyCode==80)
	                  {
	                  	meridian='PM'
	                  	if(hr=='00')
		                  	 {
		                  	 	hourInput.value='12'
		                  	 }
	                  }
                  meridianInput.value=meridian
                  if(meridian.length==2)
                  	{
                  		this.setData('ltPropValue',hourInput.value+':'+hourInput.value+' '+meridian)
                  	}
	 	     },
	 	     "minSet":function(eventevent){
	 	     		 var minuteInput=$L('input#minute',this.$node).e[0]
	 	     	     minute=minuteInput.value
	 	     	     if(minute==''||minute==""||minute>59)
			      		{
			      	   		minute='00'
			     		}
	 	     	     if((event.keyCode!=8)&&(minute.length==2))
	 	     	       {
	 	     	          if(minute.length==2)
	 	     	            {
	 	     	                var val=minute.slice(1,2)
	 	     	                var c=event.keyCode-48;
	 	     	                if((c>=0)&&(c<=9))
	 	     	                   {
	 	     		                 if(val<=5)
	 	     		                   {
	 	     		                      minute = val+c.toString();
	 	     		                   }
	 	     		                 else
	 	     			               {
	 	     			               	   minute='0'+c.toString()
	 	     			               }
	 	                           }
	 	                    }
	 	                   else
	 	                     {
	 	    	                var c=event.keyCode-48;
	 	    	                minute='0'+c.toString();
	 	                     }
                   	   }
                   	 else if((minute.length==1)&&(event.keyCode!=8))
                   	   {
                   	   	if(event.keyCode>=48&&event.keyCode<=57)
                         	{
                         		var c=event.keyCode-48;
	 	     	                if((c>=0)&&(c<=9))
	 	     	                   {
	 	     		                 if(minute<=5)
	 	     		                   {
	 	     		                      minute = minute+c.toString();
	 	     		                   }
	 	     		                 else
	 	     			               {
	 	     			               	   minute='0'+c.toString()
	 	     			               }
	 	                           }
                         	}
                   	   }
                   	 else if((minute.length==0)&&(event.keyCode!=8))
                   	   {
                   	   	if(event.keyCode>=48&&event.keyCode<=57)
                         	{
                         		var c=event.keyCode-48;
	 	     	                if((c>=0)&&(c<=9))
	 	     	                   {
	 	     	                   	 minute='0'+c.toString()
 								   }
                         	}
                        }
                        if(event.keyCode!=8&&minute.toString().length!=2)
	            		 	{
	            		 		minute='0'+minute;
	            		 	}
		     	     if(event.keyCode==37)
	                    {
	         	           this.$node.querySelector('#hour').focus();
                        }
                     if(event.keyCode==39)
	                    {
	         	           this.$node.querySelector('#meridian').focus();
                        }
                      hour=$L('input#hour',this.$node).e[0].value;
                  	  meridian=$L('input#meridian',this.$node).e[0].value;
                  	  minuteInput.value=minute;
                  	  if(this.getData('ltPropTimeFormat')==12)
                  	  	{
                  	  		this.setData('ltPropValue',hour+':'+minute+' '+meridian)
                  	  	}
                  	  else
	                  	  {
	                  	  	this.setData('ltPropValue',hour+':'+minute);
	                  	  }
	 	    },
	 	     "hourSet":function(event){
	 	     	        var meridian='';
	 	     	        var hourInput=$L('input#hour',this.$node).e[0]
	 	     	        hour=hourInput.value;
	 	     	        if(hour==''||hour==""||hour>24)
				      		{
				      	   		hour=this.getData('iniHour')
				     		}
	 	     	        if(event.keyCode!=37)
	 	     	             {
	 	     	                if((event.keyCode!=8)&&(hour.length==2))
	 	     	                    {
	 	     	                       if(hour.length==2)
	 	     	                          {
	 	     	                            var val=hour.slice(1,2)
	 	     	                            var c=event.keyCode-48;
	 	     	                            if((c>=0)&&(c<=9))
	 	     	                                {
	 	     		                               if(this.getData('ltPropTimeFormat')==24)
	 	     	                                      {
	 	     		                                     if(val<=2)
	 	     		                                        {
	 	     			                                       if((val==2)&&(c>3))
	 	     		                                               {
	 	     		                                               		hour= '0'+c.toString();
	 	     		                                               	}
	 	     		                                           else
	 	     		  	                                           {
	 	     		  	                                           		hour=val+c.toString()
	 	     		  	                                           }

	 	     		                                        }
	 	     		                                      else
	 	     			                                    {
	 	     			                                    	hour='0'+c.toString()
	 	     			                                    }
	 	     	                                      }
	 	     	                                   else
	 	     	                                      {
                                                         if(val<=1)
	 	     		                                        {
	 	     			                                       if((val==1)&&(c>2))
	 	     		                                               {
	 	     		                                               		hour= '0'+c.toString();
	 	     		                                               }
	 	     		                                           else
	 	     		                                               {
	 	     		                                               		hour=val+c.toString()
	 	     		                                               }
	 	     		                                        }
	 	     		                                     else
	 	     			                                    {
	 	     			                                    	hour='0'+c.toString()
	 	     			                                    }   
	 	     	                                      }
	 	                                        }
	 	                                  }
	 	                               else
	 	                                  {
	 	                                  	if(event.keyCode>=48&&event.keyCode<=57)
	 	    	                             	{
	 	    	                             		var c=event.keyCode-48;
	 	    	                             		hour='0'+c.toString();
	 	    	                             	}
	 	                                  }
                   	 	            }
                   	 	        else if((hour.length==1)&&(event.keyCode!=8))
                   	 	            {
                   	 	            	if(event.keyCode>=48&&event.keyCode<=57)
                                       		{
                                       			var c=event.keyCode-48;
	 	     	               					if((c>=0)&&(c<=9))
	 	     	                   					{
	 	     			               	  				hour='0'+c.toString()
	 	                           					}
                                       		}
                   	 	            }
               	 	           else if((hour.length==0)&&(event.keyCode!=8))
                   	   				{
                   	   					if(event.keyCode>=48&&event.keyCode<=57)
                         					{
                         						var c=event.keyCode-48;
	 	     	                				if((c>=0)&&(c<=9))
	 	     	                   					{
	 	     	                   	 					hour='0'+c.toString()
 								   					}
                         					}
                        			}
                               if(hour=='00')
                                 	{
                                 		meridian='AM'
                                 	}
                                if(hour=='12')
                                	{
                                 		meridian='PM'
                               		}
                                if(event.keyCode==39)
	                                {
	         	                       this.$node.querySelector('#minute').focus();
                                    }
                                 minute=$L('input#minute',this.$node).e[0].value
                    	     	 meridian=$L('input#meridian',this.$node).e[0].value;
                  				 meridian=meridian?meridian:' '; 
                  				 hourInput.value = hour
                  				 if(this.getData('ltPropTimeFormat')==12)
                  	  				{
                  	  					this.setData('ltPropValue',hour+':'+minute+' '+meridian)
                  	  				}
                  	  			else
                  	  				{
                  	  					this.setData('ltPropValue',hour+':'+minute);
                  	  				}
                             }         
            },
	 	     "timeHour":function(event){ 
							var hour=$L('input#hour',this.$node).e[0].value
	 	     	           	x=this.getData("ltPropTimeFormat")
	 	     	            if(x==12)
	 	     	               {	 	     	
	 	     	               	  var Interval=this.getData("ltPropHourInterval")
	 	     		              if(hour==''||hour==""||hour>12)
	 	     					    	{
     					    				hour=0;
	 	     					    	} 
	 	     		              if(event.keyCode==40)
	 	     		                 {
	 	     		                   this.hourDecrease.call(this)
	 	     	                     }
	 	     	                  if(event.keyCode==38)
	 	     		                 {
	 	     		                   this.hourIncrease.call(this)
	 	     	                     }
	 	     	               }  
	 	     	            else if(x==24)
	 	     	               {	 	     	
	 	     	               	  var Interval=this.getData("ltPropHourInterval")
                                  if(event.keyCode==40)
                                    {
                  	                   this.railwayDecrease.call(this)
                                    }
	 	     	                  if(event.keyCode==38)
                                    {
	 	     			               this.railwayIncrease.call(this)
                                    }
	 	     	               }
	 	     	            if(this.getData('ltPropDropdown'))
		 	     	            {
		 	     	            	this.dropdownOpen.call(this, $L('lyte-dropdown', this.$node).e[0])
		 	     	            }   
	 	     },
	 	     	"timeMinute":function(event)
	 	     	             {	

	 	     	               	var meridianInput=$L('input#meridian',this.$node).e[0]
	     						var hourInput=$L('input#hour',this.$node).e[0]
	     	 	 				var minuteInput=$L('input#minute',this.$node).e[0]
     	               			minute=parseInt(minuteInput.value);
     	               			hour=parseInt(hourInput.value)
     	               			meridian=meridianInput.value
     		              		var Interval=this.getData("ltPropMinuteInterval");
     		              		var flag=false;
     	                  		if(event.keyCode==38)
                         		 {
                         			if(this.getData('ltPropTimeFormat')==12)
	 	     		              		{
	 	     		              			if(meridian==this.getData('finalMeridian'))
	 	     		              			{
	 	     		              				flag=true;
	 	     		              			}
	 	     		              		}
                         			if(hour==this.getData('finalHour')&&flag)
 	                      			 	{
 	                      			 		if(minute > this.getData('finalMinute') || minute < this.getData('finalMinute'))
 	                      			 			{
 	                      			 				minute=(parseInt(minute)+Interval)
 	                      			 			}
 	                      			 		else if(minute == this.getData('finalMinute'))
     	                      			 		{
     	                      			 			minute=parseInt(this.getData('finalMinute'))
     	                      			 		}	
 	                      			 	}
 	                      			 else
 	                      			 	{
 	                      			 		minute=(parseInt(minute)+Interval);
 	                      			 	}	
 	                       			if(minute>=60)
 	                          			{
 	                          				 minute%=60;
 	                          				minuteInput.value=minute;
 	                        				if(this.getData('ltPropTimeFormat')==24)
 	                              			  {
                                  				this.railwayIncrease.call(this)
 	  	                           			  }
 	                           				else
 	  	                           			  {
 	  	                           				this.hourIncrease.call(this)
 	  	                           			  }
 	  	                           			 if(this.getData('ltPropDropdown')){
 	  	                           			 	this.setDropDown.call(this)
 	  	                           			 } 
 	                             		 }
 	                             	else
 	                             		 {
 	                             		 	minute%=60;
 	                             		 }
                            		} 
     	                		if(event.keyCode==40)
                        		 {
                        		 	if(this.getData('ltPropTimeFormat')==12)
	 	     		              		{
	 	     		              			if(meridian==this.getData('iniMeridian'))
		 	     		              			{
		 	     		              				flag=false;
		 	     		              			}
	 	     		              		}
	 	     		              	if(hour==this.getData('iniHour')&&!flag)
     	                       				{	
     	                       					if(minute-Interval>=this.getData('iniMinute'))
     	                      			 			{
     	                       							minute=(parseInt(minute)-Interval)
     	                       						}
     	                       					else
     	                       						{
     	                       							minute=parseInt(this.getData('iniMinute'));
     	                       						}	
     	                       				}
     	                       			else
	     	                       			{
	     	                       				minute=(parseInt(minute)-Interval)
	     	                       			}	
     	                       			if(minute<0)
     	                          			{
     	                          				minute=(minute+60)%60
     	                          				minuteInput.value=minute;
     	                          				if(this.getData('ltPropTimeFormat')==24)
                                				{
                                  					this.railwayDecrease.call(this)
                                				}
                              				else
                                 				{
                                 					this.hourDecrease.call(this)
                                 				}
                            			 }
                            		else
                                		{
                                			minute=(minute+60)%60
                                		}	 
                            		 }
                        		  if(event.keyCode!=8&&minute.toString().length!=2)
                        		 	{
                        		 		minute='0'+minute;
                        		 	}
                      			hour=hourInput.value;
                     			meridian=meridianInput.value;
                      		    minuteInput.value=minute;
      			  			if(this.getData('ltPropTimeFormat')==12)
      	  						{
      	  							this.setData('ltPropValue',hour+':'+minute+' '+meridian)
      	  						}
      	 					else
      	  						{
      	  							this.setData('ltPropValue',hour+':'+minute);
      	 						}
      	 					if(this.getData('ltPropDropdown'))
		 	     	            {
	 	     	            		this.dropdownOpen.call(this, $L('lyte-dropdown', this.$node).e[1])
		 	     	            }	
	 	     },
	 	     "timeMeridian":function(event)
                   {
                   	   var meridianInput=$L('input#meridian',this.$node).e[0]	
                   	   var meridian=meridianInput.value
                   	   var hour=$L('input#hour',this.$node).e[0].value
                   	   var minute=$L('input#minute',this.$node).e[0].value;
 	                  if((event.keyCode==38)||(event.keyCode==40))
 	                     {
                            if(meridian=='AM')
                              {
                                 meridian="PM"
 	                             if(hour=='00')
                                     {
                                        hour='12'
                                     }
                	      }
                            else 
                              {
                                 meridian="AM"
 	                             if(hour=='12')
                                     { 
                                	    hour='00'
                                     }
                              }
                         }
                     meridianInput.value=meridian
                      if(meridian.length==2)
                          {
                          	this.setData('ltPropValue',hour+':'+minute+' '+meridian)
                          }
                      if(this.getData('ltPropDropdown'))
	     	            {
	     	            	this.dropdownOpen.call(this, $L('lyte-dropdown', this.$node).e[2])
	     	            	
	     	            }   
	         },
             "reset":function(){
             	$L('input',this.$node).e[0].value="";
             },
             "fileChange":function(event){
             	fileList=$L('input', this.$node).e[0].files;
             	var i;
             	ErrorMsg=$L('span#preview', this.$node).e[0];
             	div=$L('div#lytePreview', this.$node).e[0];
             	if(fileList.length)
	             	{
	             	   if(ErrorMsg)
	             	   	{
	             	  		ErrorMsg.style.display="none";
	             	  		$L('.lyteFileUploadContainer', this.$node).e[0].style.display="block";
	             	  	}
	             	  var temp=[];
	             	  for(i=0;i<fileList.length;i++)
	             	  	{
	             	  		temp.push(fileList[i])
	             	  	}
	             	  this.setData('ltPropFilelist',temp)
	             	  this.setData('fileNo',temp.length)
	                }
                if(this.getMethods("onChange"))
 	         		{
 	         			this.executeMethod('onChange', event, this)
 	         		}
             	}
     }
});