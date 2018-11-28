Lyte.Component.register('lyte-menu',{
_template:"<template tag-name=\"lyte-menu\">\t<lyte-menu-box>\t<template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\">\t\t\t<lyte-menu-body id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" tabindex=\"1\">\t\t\t\t<template is=\"for\" items=\"{{ltPropContent}}\" item=\"menu\" index=\"indexVal\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(menu)}}\"><template case=\"true\">\t\t\t\t\t\t\t        <lyte-menu-group elemorder=\"{{indexVal}}\">\t\t\t\t\t\t\t           <lyte-menu-header><b>{{lyteUiReturnOnlyKey(menu)}}</b></lyte-menu-header>\t\t\t\t\t\t\t              <template is=\"for\" items=\"{{lyteUiReturnOnlyValue(menu)}}\" item=\"menu1\" index=\"indexVal1\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(menu1),'==',false)}}\"><template case=\"true\">\t\t\t\t\t\t                                   <lyte-menu-item grporder=\"{{indexVal}}\" elemorder=\"{{indexVal1}}\" data-value=\"{{menu1}}\">\t\t\t\t\t\t                                          <lyte-menu-label>{{menu1}}</lyte-menu-label>\t\t\t\t\t\t                                    </lyte-menu-item>\t\t\t\t\t\t\t                          </template><template case=\"false\">\t\t\t\t\t                                      <lyte-menu-item grporder=\"{{indexVal}}\" elemorder=\"{{indexVal1}}\" id=\"{{menu1.id}}\" class=\"{{menu1.class}}\" data-value=\"{{menu1[ltPropSystemValue]}}\">\t\t\t\t\t                                          <lyte-menu-label>{{menu1[ltPropUserValue]}}</lyte-menu-label>\t\t\t\t\t                                              <template is=\"if\" value=\"{{menu1[ltPropDescription]}}\"><template case=\"true\">\t\t\t\t\t                                                  <lyte-menu-description> {{menu1[ltPropDescription]}}</lyte-menu-description>\t\t\t\t\t                                              </template></template>\t\t\t\t\t                                      </lyte-menu-item>\t\t\t\t\t                                </template></template></template>\t\t\t\t\t\t\t      </lyte-menu-group>\t\t\t\t\t      </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(menu),'==',false)}}\"><template case=\"true\">\t\t\t                         <lyte-menu-item elemorder=\"{{indexVal}}\" data-value=\"{{menu}}\">\t\t\t                                <lyte-menu-label>{{menu}}</lyte-menu-label>\t\t\t                          </lyte-menu-item>\t\t\t\t                  </template><template case=\"false\">\t\t\t\t                        <lyte-menu-item elemorder=\"{{indexVal}}\" id=\"{{menu.id}}\" class=\"{{menu.class}}\" data-value=\"{{menu[ltPropSystemValue]}}\">\t\t\t\t                            <lyte-menu-label>{{menu[ltPropUserValue]}}</lyte-menu-label>\t\t\t\t                                <template is=\"if\" value=\"{{menu[ltPropDescription]}}\"><template case=\"true\">\t\t\t\t                                    <lyte-menu-description> {{menu[ltPropDescription]}}</lyte-menu-description>\t\t\t\t                                </template></template>\t\t\t\t                        </lyte-menu-item>\t\t\t\t                  </template></template></template></template></template>\t\t    </lyte-menu-body>\t      </template><template case=\"false\">\t   \t\t\t<lyte-yield yield-name=\"yield\"></lyte-yield>\t   \t   </template></template>\t   </lyte-menu-box>\t   \t    </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropContent","ltPropId","ltPropClass","ltPropQuery","ltPropEvent","ltPropYield","ltPropUserValue","ltPropSystemValue","ltPropCallout","ltPropPosition","ltPropDescription","ltPropTabIndex","ltPropFreeze","ltPropWidth","ltPropHeight","ltPropQueryClass","ltPropBoundary","ltPropScope","ltPropPreventInsideClick","eventListeners"],
init : function(){
	var event = this.getData('ltPropEvent');
	var evt = this.checkElementForMenu.bind(this);
	this.setData('eventListeners.event', evt);
	this.setData('eventListeners.keydown', this.traverseList.bind(this));
	document.addEventListener(event == 'mouseenter' ? 'mousemove' : event, evt, true);
	this.menuNodes = [];
	if(!document.querySelector('.lytemenufreezelayer')){
			this.appendFreeze.call(this, 'lytemenufreezelayer left lyteMenuHidden')
			this.appendFreeze.call(this, 'lytemenufreezelayer top lyteMenuHidden')
			this.appendFreeze.call(this, 'lytemenufreezelayer bottom lyteMenuHidden')
			this.appendFreeze.call(this, 'lytemenufreezelayer right lyteMenuHidden')
			this.appendFreeze.call(this, 'lytemenufreezelayer nogroup lyteMenuHidden')
			$L('div.nogroup.lytemenufreezelayer').e[0].addEventListener('wheel', this.preventEvent);
		}
	if(!document.hasOwnProperty('_lyteMenu')){
		document.documentElement.addEventListener('click', lyteCloseMenu, true);
		document.documentElement.addEventListener('keydown', this.keydownCheck, true);
		window.addEventListener('resize', this.resizeFunc);
		document._lyteMenu = {};
		document._lyteMenu.eventFlag = true;
	}		
},
 
 arrayFrom : function(nodeList){
 	var arrayList = [];
 	for(var i = 0; i < nodeList.length; i++)
 		{
 			arrayList.push(nodeList[i]);
 		}
 	return arrayList.slice();	
 },

heightChange : function(){
	this.childComp.style.height = this.getData('ltPropHeight');	
}.observes('ltPropHeight'),

appendFreeze : function(className){
	var freezeLayer ;
	freezeLayer = document.createElement('div')
	freezeLayer.setAttribute('class', className)
	document.body.appendChild(freezeLayer)
},

resizeFunc : function(event){
	var activeMenu = $L('lyte-menu:not(.lyteMenuClosed)').e
	for(var i = 0; i < activeMenu.length; i++){
		if(!activeMenu[i].component.hasOwnProperty('parentMenu')){
				activeMenu[i].component.setCss.call(activeMenu[i].component)
				while(activeMenu[i].component.childMenu)
					{
						activeMenu[i].component = activeMenu[i].component.childMenu
						activeMenu[i].component.setCss.call(activeMenu[i].component)
					}
				 var temp = activeMenu[i].component;
				 if(temp.getData('ltPropFreeze')  && !temp.parentMenu)
					{
						temp.setZIndex.call(temp);
					}
				temp.heightCheck.call(temp, temp.childComp);
		}
	}
},

keydownCheck : function(event){
	if(event.keyCode == 27){
		lyteCloseMenu(event, undefined, true);
	}
},

didDestroy : function(){
		var allNodes = this.childComp.querySelectorAll('lyte-menu-item')
		for(var i=0;i<allNodes.length;i++){
			var curValue = allNodes[i].getAttribute('lyte-shortcut')
			if(curValue){
				allNodes[i].setAttribute('lyte-shortcut',JSON.stringify({}))
			}
		}
		var removeEvents = this.getData('eventListeners'), event = this.getData('ltPropEvent');
	if(this.childComp)
		{
			this.childComp.parentElement.removeChild(this.childComp);
		}
	if($L('lyte-menu').e.length == 0)
		{
			var freezeLayers = $L('div.lytemenufreezelayer').e
			for(var i = 0; i < freezeLayers.length; i++)
				{
					document.body.removeChild(freezeLayers[i]);
				}
		}
	if(document._lyteMenu && $L('lyte-menu').e.length == 0)
		{
			delete document._lyteMenu
			document.documentElement.removeEventListener('keydown', this.keydownCheck, true);
			document.documentElement.removeEventListener('click', lyteCloseMenu, true);
			window.removeEventListener('resize', this.resizeFunc);
		}
	ltPropQuery = this.getData('ltPropQuery'), nodeList = document.querySelectorAll(ltPropQuery);
	document.removeEventListener(event == 'mouseenter' ? 'mousemove' : event, removeEvents.event, true);
	for(var i = 0; i < nodeList.length; i++)
		{
			nodeList[i].removeEventListener('keydown', removeEvents.keydown);
			delete nodeList[i].menu;
		}
	delete this.menuNodes;	
},

closestFind : function(path, query){
	var elements = this.arrayFrom.call(this, document.querySelectorAll(query));
	for(var i = 0; i < path.length; i++)
		{
			if(Array.prototype.indexOf.call(elements, path[i]) != -1)
				{
					return path[i];
				}
		}
	return null;	
},

checkElementForMenu : function(event){
	if(!event.menuFlag)
		{
			var query = this.getData('ltPropQuery');
			var closetElem = this.closestFind.call(this, event.path ? event.path : this.composePath.call(this, event), query);
			if(closetElem != null)
				{
				    if(!this.childComp.classList.contains('lyteMenuHidden')  && this.$node.element != closetElem)
						{
							this.hideMenu.call(this, true, event);
						}
					this.$node.element = closetElem;
					closetElem.menu = this.$node;
					if(!this.parentMenu)
						{
							closetElem.addEventListener('keydown', this.getData('eventListeners').keydown);
							this.$node.toggle(event);
						}
					// event.preventDefault();
					// event.stopPropagation();
					// event.stopImmediatePropagation();
					// var evt = new Event(event.type, {bubbles : true});
					event.menuFlag = true;
					// event.target.dispatchEvent(evt);		
				}		
		}
},

didConnect : function(){
	var menuBody = $L('lyte-menu-body', this.$node).e[0],menuBox = $L('lyte-menu-box', this.$node).e[0];
	this.$node.toggle = function(event, flag){
		if(!event.menuFlag)
			{
				if(this.childComp.classList.contains('lyteMenuHidden') || flag )
					{
						if(['mousedown', 'mouseup'].indexOf(event.type) > -1)
							{
								document._lyteMenu.preventClick = false;
							}
						this.openMenu.call(this, event)
					}
				else
					{
						if(!this.childMenu && event.type.indexOf('mouse') == -1)
							{
								this.hideMenu.call(this, true, event)
							}
					}	
		   }
	}.bind(this);
	menuBody.addEventListener('click', this.optionSelect.bind(this));
	menuBody.parent = this.$node;
	menuBox.parent = this.$node;
	this.childComp = menuBox;
	this.menuBody = menuBody;
	menuBox.classList.add('lyteMenuHidden');
	this.$node.classList.add('lyteMenuClosed');
	var span = document.createElement('span');
	span.setAttribute('class','lyteArrow');
	menuBody.insertBefore(span,menuBody.children[0]);
	menuBox.style.width = this.getData('ltPropWidth');
	LyteComponent.appendChild(document.body, menuBox);
	this.$node.constructor._observers[0].value.call(this);
},

data : function(){
	return{
		// user data
		ltPropContent : Lyte.attr('array',{ 'default' : []}),
		ltPropId : Lyte.attr('string',{'default' : ''}),
		ltPropClass : Lyte.attr('string', { 'default' : ''}),
		ltPropQuery : Lyte.attr('string', {'default' : ''}),
		ltPropEvent : Lyte.attr('string', {'default' : 'click'}),
		ltPropYield : Lyte.attr('boolean', {'default' : false}),
		ltPropUserValue : Lyte.attr('string', {'default' : ''}),
		ltPropSystemValue : Lyte.attr('string', {'default' : ''}),
		ltPropCallout : Lyte.attr('boolean', {'default' : false}),
		ltPropPosition : Lyte.attr('string', { 'default' : 'down'}),
		ltPropDescription : Lyte.attr('string', {'default' : ''}),
		ltPropTabIndex : Lyte.attr('number',{'default' : 0}),
		ltPropFreeze : Lyte.attr('boolean',{'default' : true}),
		ltPropWidth : Lyte.attr('string',{'default' : 'auto'}),
		ltPropHeight : Lyte.attr('string',{'default' : 'auto'}),
		ltPropQueryClass : Lyte.attr('string', {'default' : 'lyteMenuSelected'}),
		ltPropBoundary : Lyte.attr('object', {'default' : {}}),
		ltPropScope : Lyte.attr('string', {'default' : ''}),
		ltPropPreventInsideClick : Lyte.attr('boolean', {default : false}),

		// system data 
		eventListeners : Lyte.attr('object', { 'default' : {}})
	}
},

contentChange : function(){
	if(!this.childComp.classList.contains('lyteMenuHidden'))
		{
			this.setCss.call(this);
			this.menuBody.style.removeProperty('height');
		}
}.observes('ltPropContent'),

setContextCss : function(evt, position){
	var element = this.$node.element;
	var menuBody = this.childComp;
	if(!position)
		{
			position = this.getData('ltPropPosition')
		}
	switch(position)
		{
			case 'top' :{
				menuBody.style.left = evt.clientX + 'px';
				menuBody.style.top = (evt.clientY - menuBody.getBoundingClientRect().height) + 'px';
				if(menuBody.getBoundingClientRect().top < 0)
					{
						menuBody.style.top = evt.clientY + 'px';
					}
				if(menuBody.getBoundingClientRect().bottom > window.innerHeight)
					{
						menuBody.style.top = (evt.clientY - menuBody.getBoundingClientRect().height) + 'px';
					}	
				break;
			}
			default : {
				menuBody.style.left = evt.clientX + 'px';
				menuBody.style.top = evt.clientY + 'px';
				if(menuBody.getBoundingClientRect().bottom > window.innerHeight)
					{
						menuBody.style.top = (evt.clientY - menuBody.getBoundingClientRect().height) + 'px';
					}
				if(menuBody.getBoundingClientRect().top < 0)
					{
						menuBody.style.top = evt.clientY + 'px';
					}	
			}
		}
	if(menuBody.getBoundingClientRect().left < 0)
		{
			menuBody.style.left = evt.clientX + 'px';
		}
	else if(menuBody.getBoundingClientRect().right > window.innerWidth)
		{
			menuBody.style.left = (evt.clientX - menuBody.getBoundingClientRect().width) + 'px';
		}				

},

openMenu : function(event){
	var onBeforeOpen, targetDiv = this.targetElem.call(this, event.target);
	if(this.getMethods('onBeforeOpen'))
		{
			onBeforeOpen = this.executeMethod('onBeforeOpen', this.$node, event);
		}
	if(onBeforeOpen != false)
		{
			this.childComp.classList.remove('lyteMenuHidden')
			this.$node.classList.remove('lyteMenuClosed');
			this.childComp.style.display = 'block'
			if(!this.parentMenu)
				{
					this.$node.element.classList.add(this.getData('ltPropQueryClass'))
				}
			this.menuBody.style.removeProperty('height');
			this.childComp.scrollTop = 0;			
			if(this.getData('ltPropEvent') == 'contextmenu')
				{
					this.setContextCss.call(this, event);
				}	
			else
				{	
					this.setCss.call(this);
				}
			if(targetDiv[0])
				{
					 if(targetDiv[1].tagName == 'LYTE-MENU')
						{
							targetDiv[1].component.childMenu = this
							this.parentMenu = targetDiv[1].component
							targetDiv[1].component.childComp.addEventListener('mousemove',this.mouseleave)
						}
				}
			if(!this.parentMenu)
				{
					lyteCloseMenu(event, this.$node)
				}
			if(this.getData('ltPropFreeze')  && !this.parentMenu)
				{
					this.setZIndex.call(this)
				}
			else if(!document.menu)
				{
					window.addEventListener('scroll',this.addScrollPos, true)
					document.menu = this
				}
			if((event.type == 'mouseenter' || event.type == 'mouseover' || event.type == 'mousemove') && !this.childMenu && !this.parentMenu)
				{
					var evt = this.hoverClose.bind(this);
					this.setData('eventListeners.hoverClose', evt)
					document.addEventListener('mousemove', evt);
					this.$node.element.addEventListener('mousemove', this.preventEvent);
					this.menuBody.addEventListener('mousemove', this.preventEvent);
				}
			this.heightCheck.call(this, this.menuBody);	
			if(this.getMethods('onOpen'))
				{
				   this.executeMethod('onOpen', this.$node, event);
				}
		}
	// try{	
	// 	if(event.type == 'click' || event.type == 'contextmenu' || event.type == 'dblclick')
	// 		{
	// 			event.stopPropagation();
	// 			var evt = new Event(event.type, {bubbles : true});
	// 			evt.menuFlag = true;
	// 			event.target.dispatchEvent(evt);
	// 		}
	// 	}
	// 	catch(err){
	// }
},

heightCheck : function(menuBody){
	var clientRect = menuBody.getBoundingClientRect();
	this.menuBody.addEventListener('wheel', this.preventEvent, true);
	this.menuBody.style.height = this.getData('ltPropHeight');
	if(clientRect.bottom > window.innerHeight)
		{
			this.menuBody.style.height = (window.innerHeight - clientRect.top) + 'px';
		}		
	if(clientRect.top < 0)
		{
			this.menuBody.style.height = clientRect.bottom + 'px';
			this.childComp.style.top = '0px';
		}	
},

composePath : function(event){
		var arr = [], node = event.target;
		while(node.tagName != 'HTML')
			{
				arr.push(node);
				node = node.parentElement;
			}
		return arr;	
},

elementsFromPointCal : function(x, y){
		var arr = [], element = document.elementFromPoint(x, y);
		while(element != document && element != document.documentElement && element != document.body && element.tagName != 'LYTE-MENU-BODY' )
			{
				element.style.pointerEvents = 'none';
				arr.push(element);
				element = document.elementFromPoint(x, y);
			}
		for(var i = 0; i < arr.length; i++)
			{
				arr[i].style.pointerEvents = 'initial';
			}
		return arr;		
},

hoverClose : function(event){
	if(this.$node)
		{
			if((document.elementsFromPoint ? document.elementsFromPoint(event.clientX, event.clientY) : this.elementsFromPointCal.call(this, event.clientX, event.clientY)).indexOf(this.$node.element) == -1)
				{
					this.hideMenu.call(this, true, event);
					var evt = this.getData('eventListeners.hoverClose');
					this.$node.element.removeEventListener('mousemove', this.preventEvent);
					this.menuBody.removeEventListener('mousemove', this.preventEvent);
					this.menuBody.removeEventListener('wheel', this.preventEvent, true);
					document.removeEventListener('mousemove', evt);
				}
		}
},

mouseleave : function(event){
	var component = this.parent.component, target = component.targetElem.call(component, event.target);
	if(component.childMenu)
		{
			if(target[1] == component.$node && target[0] != component.childMenu.$node.element && target[0])
				{
					this.removeEventListener('mousemove',component.childMenu.mouseleave)	
					component.childMenu.hideMenu.call(component.childMenu, true, event)
				}
		}
},

hideMenu : function(flag, event){
	var onBeforeClose;
		if(this.getMethods('onBeforeClose'))
			{ 
			   onBeforeClose = this.executeMethod('onBeforeClose', this.$node, event);
		    }
	if(onBeforeClose != false)	
		{
			if(this.childMenu)
				{
					this.childMenu.hideMenu.call(this.childMenu, flag, event);
				}
			if(this.parentMenu)	
				{
					delete this.parentMenu.childMenu 
					delete this.parentMenu
				}
			else 
				{	
					this.$node.element.classList.remove(this.getData('ltPropQueryClass'))	
					delete document.menu 
					window.removeEventListener('scroll',this.addScrollPos, true)
				}
			this.childComp.classList.add('lyteMenuHidden')
			this.$node.classList.add('lyteMenuClosed');
			if(this.getData('ltPropFreeze') && !this.parentMenu)
				{
					this.setZIndex.call(this, flag)
				}
			if(this.getMethods('onClose'))
				{
				 	this.executeMethod('onClose', this.$node, event);
				}
		}
},

targetElem : function(nodeName){
	var currNode
	while(nodeName.tagName != 'LYTE-MENU-BODY' && nodeName.tagName != 'BODY')
		{
			if(nodeName.tagName == 'LYTE-MENU-ITEM')
				{
					currNode = nodeName
				}
			nodeName = nodeName.parentElement;
		}
	return [currNode, nodeName.parent]	
},

optionSelect : function(event){
	var nodeName = this.targetElem.call(this, event.target)[0], flag
	if((event.ctrlKey == true || event.metaKey == true || event.which == 2) && event.target.href != undefined && event.target.href.indexOf('javascript:') != -1 && event.target.target == '_blank'){return false;}
	if(this.getMethods('onMenuClick') && nodeName)
        {
          var value;
          if(this.getData('ltPropYield'))
              {
                value = nodeName.getAttribute('data-value')
              }
           else
              {
                var ltPropContent = this.getData('ltPropContent')
                if(nodeName.hasAttribute('grporder'))
	                  {
	                     var grp = ltPropContent[parseInt(nodeName.getAttribute('grporder'))]
	                     value = grp[Object.keys(grp)[0]][parseInt(nodeName.getAttribute('elemorder'))]
	                  }
	              else
	                  {
	                      value = ltPropContent[parseInt(nodeName.getAttribute('elemorder'))]
	                  }    
              }   
           flag = this.executeMethod('onMenuClick', value, event, this.$node);
       }
    if(this.childMenu && !flag)
    	{
    		event.stopPropagation()
    	}
    if(nodeName || (!nodeName && this.getData('ltPropPreventInsideClick')))
    	{
    		lyteCloseMenu(event,undefined, true)
    	}	
  },
	/*
		Calculate left of dropdown container when it has to come below/above the select element when it exceeds window.innerWidth and there is space to the right
	*/
	setLeftExceedForDown:function(element,container,bcr,containerbcr,xscroll){
		var scrolledLeft = xscroll
		var elementBCR = bcr
		var elementLeft = elementBCR.left
		var elementWidth = elementBCR.width
		var containerBCR = containerbcr
		var containerWidth = containerBCR.width
		var total = scrolledLeft + elementLeft + elementWidth - containerWidth
		return total
	},
	/*
		Calculate left of dropdown container when it has to come below/above the select element when it doesn't exceed window.innerWidth
	*/
	setLeftNotExceedForDown:function(element,bcr,xscroll){
		var scrolledLeft = xscroll
		var elementBCR = bcr
		var elementLeft = elementBCR.left
		var total = scrolledLeft + elementLeft
		return total
	},
	/*
		Calculate top of dropdown container when it has to come above the select element
	*/
	setTopAboveForDown:function(element,container,bcr,containerbcr,yscroll){
		var scrolledHeight = yscroll
		var elementBCR = bcr
		var elementTop = elementBCR.top
		var containerBCR =  containerbcr
		var containerHeight = containerBCR.height
		var total = scrolledHeight + elementTop  - containerHeight
		return total
	},
	/*
		Calculate top of dropdown container when it has to come below the select element
	*/
	setTopBelowForDown:function(element,bcr,yscroll){
		var scrolledHeight = yscroll
		var elementBCR = bcr
		var elementTop = elementBCR.top
		var elementHeight = elementBCR.height
		var total = scrolledHeight + elementTop + elementHeight
		return total
	},
	/*
		Calculate left of dropdown container when it has to come to right of the select element
	*/
	setLeftForRight:function(element,bcr,xscroll){
		var scrolledWidth = xscroll
		var elementBCR = bcr
		var elementLeft = elementBCR.left
		var elementWidth = elementBCR.width
		var total = scrolledWidth + elementLeft + elementWidth
		return total
	},
	/*
		Calculate right of dropdown container when it has to come to left of the select element of right dropdown
	*/
	setRightForRight:function(element,container,bcr,elembcr,xscroll){
		var scrolledWidth = xscroll 
		var elementBCR = bcr
		var containerBCR = elembcr
		var elementLeft = elementBCR.left
		var containerWidth = containerBCR.width
		var total = scrolledWidth + elementLeft - containerWidth
		return total
	},
	/*
		Calculate top of dropdown container when it has to come to right of dropdown and there is space below
	*/
	setTopForRight:function(element,bcr,yscroll){
		var scrolledHeight = yscroll
		var elementBCR = bcr
		var elementTop = elementBCR.top
		var total = scrolledHeight + elementTop
		return total
	},
	/*
		Calculate top of dropdown container when it has to come to right of dropdown and there is no space below
	*/
	setTopForRightAbove:function(element,container,bcr,elembcr,yscroll){
		var scrolledHeight = yscroll
		var elementBCR = bcr
		var elementTop = elementBCR.top 
		var elementHeight = elementBCR.height
		var containerBCR = elembcr
		var containerHeight = containerBCR.height
		var total = scrolledHeight + elementTop + elementHeight - containerHeight
		return total
	},
	/**
		Remove wrong arrow and append proper arrow
		@param string correct - the correct class
	*/
	setCorrectClass:function(correct){
		var arrowDiv = this.childComp.querySelector('.lyteArrow')
		var arrowClass = arrowDiv.classList
		for(var i=0;i<arrowClass.length;i++){
			if(arrowClass[i] == 'lyteArrow' || arrowClass[i] == correct){
				continue
			}
			else{
				arrowDiv.classList.remove(arrowClass[i])
				i--;
			}
		}
		arrowDiv.classList.add(correct)
		arrowDiv.classList.add('lyteArrowIcon')
	},
	/**
	 * Set the CSS for your dropdown
	 * refer commit ID 583ee6ccbeaa6b3729178bf9df0139032b016d19 and previous for the previous stable setCSS function.
	 * commit ID 583ee6ccbeaa6b3729178bf9df0139032b016d19 also gives a better understanding about the hard coded values in this function.
	 */
	setCss:function(onlyScroll){
		if(!this.childComp || this.childComp.classList.contains('lyteMenuHidden')){
			return;
		}
		var dummy
		var xscroll = window.pageXOffset || document.documentElement.scrollLeft
		var yscroll = window.pageYOffset || document.documentElement.scrollTop
		var parNode = this.$node.element;
		var bcr = parNode.getBoundingClientRect()

		var elem1= this.childComp
		var elembcr = elem1.getBoundingClientRect()
		var ewidth=elem1.offsetWidth, wwidth, wheight;
		var query = this.getData('ltPropScope'), flag;
		if(query)
			{
				var temp = {target : parNode};
				var elemm = this.closestFind.call(this, this.composePath.call(this, temp), query);
				if(elemm)
					{
						var rec = elemm.getBoundingClientRect();
						wwidth =  window.innerWidth > rec.right ? rec.right : window.innerWidth;
						wheight =  window.innerHeight /*> rec.bottom ? rec.bottom : window.innerHeight;*/
						flag = true
					}
			}
		if(!flag)
			{
				wwidth = window.innerWidth
				wheight= window.innerHeight
			}	
		var eheight=elem1.offsetHeight
		var arrow = this.childComp.querySelector('.lyteArrow')
		if(this.getData('ltPropPosition') == 'down'){
			var downflag = true
			var top = bcr.top + bcr.height 
			if(top+eheight>wheight && bcr.top>eheight){
				downflag = false
						
			}
			else{
				downflag = true
			}
			var rightflag = true
			var left = bcr.left
			if(left+ewidth>wwidth && left>bcr.left+bcr.width-elem1.offsetWidth){
				rightflag = false
				
			}
			else if(bcr.left+ewidth<=wwidth){
				rightflag = true
			}
			if(bcr.width > ewidth){      //Think this is for multiselect(CODE HELP)
				arrow.style.left = ((ewidth/2 - 0)/ewidth)*100 +"%" // Had arrow.offsetWidth/2 instead of 0
			}
			if(downflag){
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowTop')
					var arrowHeight = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					var pxpos = arrowHeight.indexOf('px')
					arrowHeight = Number(arrowHeight.substring(0,pxpos))
					
					elem1.style.top = this.setTopBelowForDown(parNode,bcr,yscroll) + arrowHeight + 'px'

				}
				else{ 
					elem1.style.top = this.setTopBelowForDown(parNode,bcr,yscroll) + 'px'
				}
				
			}
			else{
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowBottom')
					var arrowHeight = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					var pxpos = arrowHeight.indexOf('px')
					arrowHeight = Number(arrowHeight.substring(0,pxpos))
					elem1.style.top = this.setTopAboveForDown(parNode,elem1,bcr,elembcr,yscroll) - arrowHeight + 'px'
				}
				else {
					elem1.style.top = this.setTopAboveForDown(parNode,elem1,bcr,elembcr,yscroll) + 'px'
				}
			}
			if(rightflag){
				if(this.getData('ltPropCallout')){
					var widthToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					widthToAdd = Number(widthToAdd.substring(0,widthToAdd.indexOf('px')))
					var marginLeft = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginLeft
					marginLeft = Math.abs(Number(marginLeft.substring(0,marginLeft.indexOf('px'))))
					var num = bcr.width/2 - widthToAdd + marginLeft // We removed arrow.offsetWidth because it was giving width as 0 px
					var denom = ewidth/100
					var per = (num + 1)/denom
					arrow.style.left = per.toFixed(1) +"%" 
				}
				elem1.style.left= this.setLeftNotExceedForDown(parNode,bcr,xscroll) + 'px'
			}
			else{
				if(this.getData('ltPropCallout')){
					var widthToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					widthToAdd = Number(widthToAdd.substring(0,widthToAdd.indexOf('px')))
					var marginLeft = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginLeft
					marginLeft = Math.abs(Number(marginLeft.substring(0,marginLeft.indexOf('px'))))
					var denom = ewidth/100
					var num = ewidth - (bcr.width/2) - widthToAdd + marginLeft // We removed arrow.offsetWidth because it was giving width as 0 px
					var per = (num-1)/denom 
					arrow.style.left = per.toFixed(1) +"%" 
				}
				elem1.style.left = this.setLeftExceedForDown(parNode,elem1,bcr,elembcr,xscroll) + 'px'
			}
		}
		else if(this.getData('ltPropPosition') == 'right'){
			var rightflag = true
			if(bcr.left + bcr.width + ewidth > wwidth && bcr.left - elembcr.width > 0){   
				rightflag = false
				
			}
			else{
				rightflag = true
			}
			var downflag = true
			if(bcr.top + elembcr.height > wheight){
				downflag = false
				
			}
			else{
				downflag = true
			}
			if(rightflag){
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowLeft')
					var arrowWidth = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					var pxpos = arrowWidth.indexOf('px')
					arrowWidth = Number(arrowWidth.substring(0,pxpos))
					elem1.style.left = this.setLeftForRight(parNode,bcr,xscroll) + arrowWidth + "px"
				}
				else{
					elem1.style.left= this.setLeftForRight(parNode,bcr,xscroll) + 'px'
				}
			}
			else{
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowRight')
					var arrowWidth = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					var pxpos = arrowWidth.indexOf('px')
					arrowWidth = Number(arrowWidth.substring(0,pxpos))
					elem1.style.left = this.setRightForRight(parNode,elem1,bcr,elembcr,xscroll) - arrowWidth + "px"
				}
				else{
					elem1.style.left = this.setRightForRight(parNode,elem1,bcr,elembcr,xscroll) + "px"
				}
			}
			if(downflag){
				if(this.getData('ltPropCallout')){
					var heightToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					heightToAdd = Number(heightToAdd.substring(0,heightToAdd.indexOf('px')))
					var marginTop = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginTop
					marginTop = Math.abs(Number(marginTop.substring(0,marginTop.indexOf('px'))))
					var num = ((bcr.height/2) - heightToAdd  - marginTop) * 100 // Had arrow.getBoundingClientRect()/2 removed cos its value is 0
					var denom = elembcr.height
					var per = num/denom
					arrow.style.top = parseInt(per) + "%"
				}
				elem1.style.top = this.setTopForRight(parNode,bcr,yscroll) + 'px' 
			}
			else{
				if(this.getData('ltPropCallout')){
					var heightToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					heightToAdd = Number(heightToAdd.substring(0,heightToAdd.indexOf('px')))
					var marginTop = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginTop
					marginTop = Math.abs(Number(marginTop.substring(0,marginTop.indexOf('px'))))
					var num = (elembcr.height - bcr.height/2 - heightToAdd - marginTop) * 100 // Had arrow.getBoundingClientRect()/2 
					var denom = elembcr.height
					var per = num/denom
					arrow.style.top = parseInt(per)+"%"
				} 
				elem1.style.top = this.setTopForRightAbove(parNode,elem1,bcr,elembcr,yscroll) + "px"
			}
		}
		else if(this.getData('ltPropPosition') == 'top'){
			var topflag = true
			if(bcr.top - elembcr.height < this.wtop && bcr.top + bcr.height + eheight < wheight){
				topflag = false
			}
			else{
				topflag = true
			}
			var rightflag = true
			if(bcr.left + ewidth > wwidth && bcr.left > bcr.left + bcr.width - elem1.offsetWidth){
				rightflag = false
			}
			else if(bcr.left+ewidth<=wwidth){
				rightflag = true
			}
			if(bcr.width > ewidth){      //Think this is for multiselect(CODE HELP)
				arrow.style.left = ((ewidth/2 - 0)/ewidth)*100 +"%" // Had arrow.offsetWidth/2 removed cos its value is 0
			}
			if(topflag){
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowBottom')
					var arrowHeight = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					var pxpos = arrowHeight.indexOf('px')
					arrowHeight = Number(arrowHeight.substring(0,pxpos))
					elem1.style.top = this.setTopAboveForDown(parNode,elem1,bcr,elembcr,yscroll) - arrowHeight +"px"	
				}
				else{
					elem1.style.top = this.setTopAboveForDown(parNode,elem1,bcr,elembcr,yscroll) + 'px'
				}
			}
			else{
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowTop')
					var arrowHeight = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					var pxpos = arrowHeight.indexOf('px')
					arrowHeight = Number(arrowHeight.substring(0,pxpos))
					elem1.style.top = this.setTopBelowForDown(parNode,bcr,yscroll) + arrowHeight +"px"
				}
				else {
					elem1.style.top = this.setTopBelowForDown(parNode,bcr,yscroll) + 'px'
				}
			}
			if(rightflag){
				if(this.getData('ltPropCallout')){
					var widthToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					widthToAdd = Number(widthToAdd.substring(0,widthToAdd.indexOf('px')))
					var marginLeft = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginLeft
					marginLeft = Math.abs(Number(marginLeft.substring(0,marginLeft.indexOf('px'))))
					var num = bcr.width/2 + marginLeft - widthToAdd // We removed arrow.offsetWidth because it was giving width as 0 px
					var denom = ewidth/100
					var per = (num + 1)/denom
					arrow.style.left = per.toFixed(1) +"%" 
				}
				elem1.style.left= this.setLeftNotExceedForDown(parNode,bcr,xscroll) +'px'
			}
			else{
				if(this.getData('ltPropCallout')){
					var widthToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					widthToAdd = Number(widthToAdd.substring(0,widthToAdd.indexOf('px')))
					var marginLeft = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginLeft
					marginLeft = Math.abs(Number(marginLeft.substring(0,marginLeft.indexOf('px'))))
					var denom = ewidth/100
					var num = ewidth - (bcr.width/2) + marginLeft - widthToAdd // We removed arrow.offsetWidth because it was giving width as 0 px
					var per = (num-1)/denom 
					arrow.style.left = per.toFixed(1) +"%" 
				}
				elem1.style.left = this.setLeftExceedForDown(parNode,elem1,bcr,elembcr,xscroll) + 'px'
			}

		}
		else if(this.getData('ltPropPosition') == 'left'){
			var leftflag = true
			if(bcr.left - elembcr.width < 0 && bcr.left + elembcr.width < wwidth){
				leftflag = false	
			}
			else{
				leftflag = true
			}
			var downflag = true
			if(bcr.top + elembcr.height > wheight){
				downflag = false
				
			}
			else{
				downflag = true
			}
			if(leftflag){
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowRight')
					var arrowWidth = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					var pxpos = arrowWidth.indexOf('px')
					arrowWidth = Number(arrowWidth.substring(0,pxpos))
					elem1.style.left = this.setRightForRight(parNode,elem1,bcr,elembcr,xscroll) - arrowWidth + "px"
				}
				else{
					elem1.style.left = this.setRightForRight(parNode,elem1,bcr,elembcr,xscroll) + 'px'
				}	
			}
			else{
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowLeft')
					var arrowWidth = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					var pxpos = arrowWidth.indexOf('px')
					arrowWidth = Number(arrowWidth.substring(0,pxpos))
					elem1.style.left = this.setLeftForRight(parNode,bcr,xscroll) + arrowWidth + "px"
				}
				else{
					elem1.style.left = this.setLeftForRight(parNode,bcr,xscroll) + "px"
				}
			}
			if(downflag){
				if(this.getData('ltPropCallout')){
					var heightToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					heightToAdd = Number(heightToAdd.substring(0,heightToAdd.indexOf('px')))
					var marginTop = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginTop
					marginTop = Math.abs(Number(marginTop.substring(0,marginTop.indexOf('px'))))
					var num = ((bcr.height/2) - heightToAdd - marginTop) * 100 // Had arrow.getBoundingClientRect()/2 
					var denom = elembcr.height
					var per = num/denom
					arrow.style.top = parseInt(per) + "%"
				}
				elem1.style.top = this.setTopForRight(parNode,bcr,yscroll) + 'px'
			}
			else{
				if(this.getData('ltPropCallout')){
					var heightToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderLeftWidth
					heightToAdd = Number(heightToAdd.substring(0,heightToAdd.indexOf('px')))
					var marginTop = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginTop
					marginTop = Math.abs(Number(marginTop.substring(0,marginTop.indexOf('px'))))
					var num = (elembcr.height - bcr.height/2 - heightToAdd - marginTop) * 100 // Had arrow.getBoundingClientRect()/2 
					var denom = elembcr.height
					var per = num/denom
					arrow.style.top = parseInt(per) +"%" 
				}
				elem1.style.top = this.setTopForRightAbove(parNode,elem1,bcr,elembcr,yscroll) + "px"
			}
		}
			
	},
	setAlignment:function(){
		var parNode  = this.$node.querySelector('lyte-drop-button')
		var bcr = parNode.getBoundingClientRect()
		var elem1= this.childComp
		var eheight=elem1.offsetHeight
		var top= elem1.getBoundingClientRect().top
		var arrowval = 0
		if(this.getData('ltPropCallout')){
			arrowval = 9
		}
		if(top < bcr.top){
			//elem1.style.top = elem1.offsetTop + bcr.top -(top+eheight+this.childComp.querySelector('.lyteArrow').offsetHeight) + "px"
			elem1.style.top = bcr.top - eheight - arrowval + "px"
		}
	},

	checkForBoundary : function(menuBody){
		var clientRect = this.$node.element.getBoundingClientRect();
		var boundary = this.getData('ltPropBoundary');
		if((boundary.hasOwnProperty('left') ? (clientRect.left < boundary.left) : false) || (boundary.hasOwnProperty('right') ? (clientRect.right > boundary.right) : false)  || (boundary.hasOwnProperty('top') ? (clientRect.top < boundary.top) : false)  || (boundary.hasOwnProperty('bottom') ? (clientRect.bottom > boundary.bottom) : false))		
			{	
				this.hideMenu.call(this);
			}
	},

	traverseList:function(event){
		var kc = event.keyCode
		if((this.childComp && this.childComp.classList.contains('lyteMenuHidden'))||(kc != 13 && kc != 40 && kc != 38)){
				return
		}
		// event.preventDefault();
		var cursel = this.childComp.querySelector('.lyteMenuSelection')
		if(!cursel){
			var elem = this.childComp.querySelector('lyte-menu-item')
			if(elem){
				elem.classList.add('lyteMenuSelection')
				return ;
			}
		}
		
			var elements = this.childComp.querySelectorAll('lyte-menu-item')
			for(var i=0;i<elements.length;i++){
				if(elements[i].classList.contains('lyteMenuSelection')){
					break;
				}
			}
			if(kc == 13){
					elements[i].click()
			}
			else if(kc == 38 && i != 0){
					var j = i
					i=i-1
					for(;i>-1;i--){
						if(!elements[i].classList.contains('lyteMenuActive') && !elements[i].classList.contains('lyteMenuFiltered')){
							break;
						}
					}
					if(i != -1){
						elements[j].classList.remove('lyteMenuSelection')
						elements[i].classList.add('lyteMenuSelection')
					}							
			}
			else if(kc == 40 && i != elements.length -1){
					var j = i
					i=i+1
					for(;i<elements.length;i++){
						if(!elements[i].classList.contains('lyteMenuActive') && !elements[i].classList.contains('lyteMenuFiltered')){
							break;
						}
					}
					if(i != elements.length){
						elements[j].classList.remove('lyteMenuSelection')
						elements[i].classList.add('lyteMenuSelection')
					}
			}
		},
	setAlignment:function(){
		var parNode  = this.$node.element;
		var bcr = parNode.getBoundingClientRect()
		var elem1= this.childComp
		var eheight=elem1.offsetHeight
		var top= elem1.getBoundingClientRect().top
		var bcr = parNode.getBoundingClientRect()
		if(top < bcr.top){
			elem1.style.top = elem1.offsetTop + bcr.top -(top+eheight+this.childComp.querySelector('.lyteArrow').offsetHeight) + "px"
		}
	},
	setFreeze:function(nodeName){
		$L('.lytemenufreezelayer:not(.nogroup)').removeClass('lyteMenuHidden')
		var node = $L('.lytemenufreezelayer.left').e[0], rect = nodeName.getBoundingClientRect()
		node.style.height = rect.height +"px"
		node.style.width = rect.left + "px"
		node.style.top = rect.top + "px"
		document.body.style.overflow = 'hidden'
		node = $L('.lytemenufreezelayer.right').e[0]
		node.style.height = rect.height +"px"
		node.style.width = rect.left + "px"
		node.style.top = rect.top + "px"
		node = $L('.lytemenufreezelayer.top').e[0]
		node.style.height = rect.top +"px"
		node = $L('.lytemenufreezelayer.bottom').e[0]
		node.style.height = (window.innerHeight - (rect.top + rect.height)) +"px"
		document.addEventListener('wheel', this.preventEvent);
		document.addEventListener('keydown',this.preventEvent);
	},
	preventEvent : function(event){
		if(!(event.metaKey || event.shiftKey || event.ctrlKey))
			{
				if(this != document && event.type == 'wheel')
					{
						if(this.tagName = 'LYTE-MENU-BODY')
							{
								this.scrollTop += event.deltaY;
								var evt = new Event('scroll',{bubbles : true});
								this.dispatchEvent(evt)
							}
					}
				event.preventDefault();
				event.stopPropagation();
			}
	},
	addScrollPos : function(){
		var component = document.menu
		component.setCss.call(component)
		while(component.childMenu)
			{
				component = component.childMenu
				component.setCss.call(component)
			}
		component.checkForBoundary.call(component, component.childComp);			

	},
	removeFreeze : function(){
		if(!document.menu)
			{
				document.removeEventListener('wheel', this.preventEvent)
				document.removeEventListener('keydown',this.preventEvent)
				$L('.lytemenufreezelayer').addClass('lyteMenuHidden')
			}
	},
	setZIndex : function(flag){
		var nodeName = this.$node.element;
		if(nodeName)
			{
				while(nodeName.tagName != 'HTML')
					{
						if(nodeName.classList.contains('lyteMenuGroup'))
							{
								if(!flag)
									{
										this.setFreeze.call(this, nodeName)
									}
								else
									{
										this.removeFreeze.call(this)
									}
								break		
							}
						else
							{
								nodeName = nodeName.parentElement;
							}	
					}
				if(nodeName.tagName == 'HTML')
					{
						if(flag && !document.menu)
							{
								this.removeFreeze.call(this)
							}
						else 
							{	
								var freezeLayer = $L('.lytemenufreezelayer.nogroup').e[0];
								freezeLayer.classList.remove('lyteMenuHidden');
							}
					}	
			}

	}
});

  var lyteCloseMenu = function(event, element, flag){
  	if(event && !event.menuFlag || !event)
  		{
  			if(document._lyteMenu.preventClick != false || element)
			  	{
			  		if((event && event.button != 2) || element || flag)
						{
							var menus = $L('lyte-menu:not(.lyteMenuClosed)[lyte-rendered]').e;
							for(var i = 0; i < menus.length; i++)
								{
									if(menus[i] != element && !menus[i].component.childComp.classList.contains('lyteMenuHidden'))
										{
											if(flag || (!menus[i].component.childComp.contains(event.target)))
												{
													menus[i].component.hideMenu.call(menus[i].component, element ? false : true, event)
												}
										}
								}
						}
				}
		    if(event && event.type == 'click')
				{
					document._lyteMenu.preventClick = true;
				}	
		}
};




Lyte.createCustomElement("lyte-menu-item", {
	static : {
		"observedAttributes" : {
			get : function() {
				return ['lyte-shortcut'];
			}
		}
	},
	"attributeChangedCallback" : function(attributeName,oldValue,newValue) {
		if (typeof shortcut == "function") {
        	newValue = JSON.parse(newValue);
        	var newKey = newValue.key;
        	var type = newValue.type;
        	var wait = newValue.wait;
        	if (!oldValue) {
          		oldValue = {};
       		}
        	else{
        		oldValue = JSON.parse(oldValue)
        	}
       		shortcut.push({
          		newKey: newKey,
          		type: type,
          		wait: wait,
          		oldKey: oldValue.key,
          		value: this
        	});
      	}
	}
});
