(function(){

	if($L) {

		$L.prototype.scroll = function(obj){
			obj = obj == undefined ? {} : obj;
			var element; 
			if(this.e.length == undefined) 
			 	{
			 		element = this.e;
			 	}
			 else
			 	{
			 		element = this.e[0];
			 	}
			var wrapperDiv = obj.wrapperDiv ? obj.wrapperDiv : element.parentElement;
			wrapperDiv.style.position = 'relative';
			wrapperDiv._element = element;

	            appendSpan = function(className, element){
		        	var outerDiv = document.createElement('div');
					outerDiv.classList.add('lyteScrollContainer');
					if(obj.containerClass)
						{
							outerDiv.classList.add(obj.containerClass);
						}
					var innerDiv = document.createElement('div');
					innerDiv.classList.add('lyteScrollDiv');
					if(obj.handlerClass)
						{
							innerDiv.classList.add(obj.handlerClass);
						}
					outerDiv.appendChild(innerDiv);
					outerDiv.classList.add(className);
					if(className == 'horizontalScroll')
						{
							innerDiv._direction = true;
							if(obj.horizontalContainerClass)
								{	
									outerDiv.classList.add(obj.horizontalContainerClass);
								}
							if(obj.horizontalHandlerClass)
								{
									innerDiv.classList.add(obj.horizontalHandlerClass);
								}	
						}
					else
						{
							if(obj.verticalContainerClass)
								{	
									outerDiv.classList.add(obj.verticalContainerClass);
								}
							if(obj.verticalHandlerClass)
								{
									innerDiv.classList.add(obj.verticalHandlerClass);
								}
						}
					wrapperDiv.appendChild(outerDiv);
					outerDiv.addEventListener('click', outerDivClick);
					innerDiv.addEventListener('mousedown', innerDivClick);
					outerDiv._element = element;	
					return outerDiv;
		        };

		        outerDivClick = function(event){
					var parent = this._element;
					var child = this.children[0];
					if(!child.dontAllow)
						{
							var iniX = child.getBoundingClientRect().left, iniY = child.getBoundingClientRect().top;
							var hgt = 'width', top1 = 'left', scrollTop = 'scrollLeft', scrollHeight = 'scrollWidth', maxScroll = 'maxScrollWidth', bottom = 'right', clientY = 'clientX';
							if(!child._direction){
								hgt = 'height', top1 = 'top', scrollTop = 'scrollTop', scrollHeight = 'scrollHeight', maxScroll = 'maxScrollHeight', bottom = 'bottom', clientY = 'clientY';
							}
							child.style[top1] = (event[clientY] - this.getBoundingClientRect()[top1] - child.getBoundingClientRect()[hgt]/2) + 'px';
							if(child.getBoundingClientRect()[bottom] > this.getBoundingClientRect()[bottom])
								{
									child.style[top1] = this.getBoundingClientRect()[hgt] - child.getBoundingClientRect()[hgt] + 'px';
								}
							 if(parseInt(parent[scrollTop]) <= parseInt((parent[scrollHeight] - parent.getBoundingClientRect()[hgt]).toFixed(0)))
								{
									var clientRect = child.getBoundingClientRect();
									parent[scrollTop] = parent[scrollHeight] * (clientRect[top1] - this.getBoundingClientRect()[top1]) / parent.getBoundingClientRect()[hgt];
								} 
							setScrollPos(this);
							triggerScroll(child.getBoundingClientRect().left - iniX, child.getBoundingClientRect().top - iniY, parent)
						}
					delete child.dontAllow;	
				};

				innerDivClick = function(event){
					document.scrollMousemove = mousemove.bind(this);
					document._scrollPlugin = this;
					document.addEventListener('mousemove', document.scrollMousemove);
					document.addEventListener('mouseup', mouseup);
					var parent = this.parentElement._element;
					if(this._direction)
						{
							this._offLeft = event.clientX;
							this.maxScrollWidth = parent.scrollWidth;
							this._iniScrollLeft = parent.scrollLeft;
						}
					else
						{
							this._offTop = event.clientY;
							this.maxScrollHeight = parent.scrollHeight;
							this._iniScrollTop = parent.scrollTop;
						}
					event.preventDefault();
					event.stopPropagation();
					document._scrollmousedown = true;	
				};

				mouseup = function(event){
					document.removeEventListener('mousemove', document.scrollMousemove);
					document._scrollPlugin.dontAllow = true;
					var comp = document._scrollPlugin.parentElement._element;
					document.removeEventListener('mouseup', mouseup);
					event.preventDefault();
					event.stopPropagation();
					delete document._scrollmousedown;
					delete document._scrollPlugin;
					delete document.scrollMousemove;
					if(!comp.contains(event.target))
						{
							mouseleave.call(comp.parentElement);
						}
						
				};

				mousemove = function(event){
					var parent = this.parentElement._element, scrollLevel1, scrollLevel2, fact = 1;
					var hgt = 'width', top1 = 'left', scrollTop = 'scrollLeft', scrollHeight = 'scrollWidth', maxScroll = 'maxScrollWidth';
					if(window.getComputedStyle(this).getPropertyValue('direction') == 'rtl')
						{
							fact = -1;
						}
					if(!this._direction){
						hgt = 'height', fact = 1, top1 = 'top', scrollTop = 'scrollTop', scrollHeight = 'scrollHeight', maxScroll = 'maxScrollHeight';
					}
					if(this._direction)
						{
							scrollLevel1 = event.clientX - this._offLeft;
							this._offLeft = event.clientX;
							if(navigator.userAgent.toLowerCase().indexOf('chrome') != -1 && fact == -1)
								{
									if(parent.scrollLeft > 0 && parseInt(parent.scrollWidth - parent.getBoundingClientRect().width) > parent.scrollLeft)
										{
											this.style.left = -(-this.getBoundingClientRect().right + this.parentElement.getBoundingClientRect().right - scrollLevel1) + 'px';
										}
								}
							else
								{	
									this.style.left = this.getBoundingClientRect().left - this.parentElement.getBoundingClientRect().left + scrollLevel1 + 'px';
								}
						}
					else	
						{
							scrollLevel2 = event.clientY - this._offTop;
							this._offTop = event.clientY;
							this.style.top = this.getBoundingClientRect().top - this.parentElement.getBoundingClientRect().top + scrollLevel2 + 'px';
						}
					var clientRect = this.getBoundingClientRect();
					 if(parseInt(parent[scrollTop]) <= parseInt(this[maxScroll] - parent.getBoundingClientRect()[hgt]) || (scrollLevel1 == -1 && scrollLevel1 != undefined) || (scrollLevel2 == -1 && scrollLevel2 != undefined))
						{
							if(window.getComputedStyle(this).getPropertyValue('direction') == 'rtl' && this.parentElement.classList.contains('horizontalScroll'))
								{
									parent.scrollLeft += (scrollLevel1 = scrollLevel1 ? scrollLevel1 : 0);
								}
							else	
								{
									var parentClientRect = this.parentElement.getBoundingClientRect();
									parent[scrollTop] = parent[scrollHeight] * (this.getBoundingClientRect()[top1] - parentClientRect[top1])/parentClientRect[hgt]
								}
						} 
					setScrollPos(this.parentElement);
					triggerScroll(scrollLevel1, scrollLevel2, parent);
					event.preventDefault();
					event.stopPropagation();
				};

		        triggerScroll = function(a, b, comp){
		        	var evt = new Event('scroll', {bubbles : true});
		        	evt.xScroll = a;
		        	evt.yScroll = b;
		        	comp.dispatchEvent(evt);
		        }; 

		        wheelEvent = function(event){
					var fact = 1;
					var a = event.deltaX, b = event.deltaY, divClientRect = this.getBoundingClientRect();
					var direction = window.getComputedStyle(this).getPropertyValue('direction');
					var factor = 1, scrollbars = $L('.lyteScrollContainer', this).e;
					if((navigator.userAgent.toLowerCase().indexOf('edge') != -1 && direction != 'rtl') || ((navigator.userAgent.toLowerCase().indexOf('trident') != -1 || navigator.userAgent.toLowerCase().indexOf('msie') != -1) && direction == 'rtl'))
						{
							factor = -1;
						}
					this.scrollLeft = parseInt(this.scrollLeft) + a * factor;
					this.scrollTop = parseInt(this.scrollTop) + (b > 100 ? 100 : b);
					var scrollbars = $L('.lyteScrollContainer', this.parentElement).e;
					for(var i = 0; i < scrollbars.length; i++)
						{
							setScrollPos(scrollbars[i]);
						}	
					var clientRect = this.getBoundingClientRect();	
					if((this.scrollWidth > clientRect.width || a == 0) || (this.scrollHeight > clientRect.height || b == 0))
			        	{
			        		event.preventDefault();
			        	}		
					triggerScroll(a * factor, b > 100 ? 100 : b, this)
				};

		         mouseenter = function(event){
		         	this.parentElement.style.position = 'relative';
					var element = this;
		        	var clientRect = element.getBoundingClientRect(), flag = false;
		        	if((element.scrollWidth - Math.round(parseInt(clientRect.width.toFixed(0)))) > 10 )
			        	{
			        		var divv = $L('.lyteScrollContainer.horizontalScroll', this.parentElement).e[0];
			        		if(divv)
			        			{
			        				// divv.style.display = 'block';
			        				divv.style.visibility = 'visible'
			        				flag = true;
			        				setScrollPos(divv);
			        			}
			        	}
			        if((element.scrollHeight - Math.round(parseInt(clientRect.height.toFixed(0)))) > 10 )
			        	{
			        		var divv = $L('.lyteScrollContainer.verticalScroll', this.parentElement).e[0]
			        		if(divv)
			        			{
			        				divv.style.visibility = 'visible'
			        				// divv.style.display = 'block';
			        				flag = true;
			        				setScrollPos(divv);
			        			}
			        	}	
			        if(flag){
			        	element.addEventListener('wheel', wheelEvent);
			        }	
	        };

	        setScrollPos = function(outerDiv){
	        	var element = outerDiv._element, fact = 1;
				var scrollBar = $L('.lyteScrollDiv', outerDiv).e[0];
				var scrollHeight = 'scrollHeight', scrollTop = 'scrollTop', scrollLeft = 'scrollLeft', height = 'height',top1 = 'top', left = 'bottom', offsetHeight = 'clientHeight';
				if(scrollBar._direction)
					{
						var direction = window.getComputedStyle(element).getPropertyValue('direction');
						if(direction == 'rtl')
							{	
								fact = -1;
							}
						scrollHeight = 'scrollWidth', scrollTop = 'scrollLeft', scrollLeft = 'scrollTop', height = 'width',top1 = 'left', left = 'right', offsetHeight = 'clientWidth';
					}
				var rect = parseInt(window.getComputedStyle(element)[height])				
				var scrollHeight1 = element[scrollHeight];
				var scrollTop1 = Math.abs(element[scrollTop]);
				var height1 = rect - Math.round(parseInt(window.getComputedStyle(outerDiv).getPropertyValue(top1)));
				scrollBar.style[height] = (height1/scrollHeight1 * 100) + '%';
				if(navigator.userAgent.toLowerCase().indexOf('chrome') != -1 && fact == -1)
					{
						scrollBar.style[top1] = -((element.scrollWidth - element.offsetWidth - scrollTop1)/scrollHeight1 * 100) + '%';
					}
				else if(fact == -1)
					{
						scrollBar.style[top1] = -(scrollTop1/scrollHeight1 * 100) + '%';
					}	
				else	
					{
						scrollBar.style[top1] = (scrollTop1/scrollHeight1 * height1) + 'px';
					}
	        };

	        mouseleave = function(event){
	        	if(event && event.type == 'mouseleave')
	        		{
	        			if(this._element.contains(event.relatedTarget)){
	        				return;
	        			}
	        		}
	        	if(!document._scrollmousedown)
	        		{
	        			if($L('.lyteScrollContainer', this._element.parentElement).e.length)
	        				{
	        					$L('.lyteScrollContainer', this._element.parentElement).css('visibility','hidden');
	        					this._element.removeEventListener('wheel', wheelEvent);
	        				}
	        		}
	        }
	        var outerDiv, outerDiv1;
	        if(!$L('.lyteScrollContainer', wrapperDiv).e.length)
		        {
		        	if(!obj.preventVertical)
						{
							outerDiv = appendSpan('verticalScroll', element);
							if(obj.verticalPosition == 'left')
								{
									outerDiv.classList.add('left');
									outerDiv._verticalPostition = 'left';
								}
						}
					if(!obj.preventHorizontal)	
						{
							outerDiv1 = appendSpan('horizontalScroll', element);
							if(obj.horizontalPostition == 'top')
								{
									outerDiv1.classList.add('top');
									outerDiv1._horizontalPostition = 'top';
								}
						}
				}
			else
				{
					outerDiv = $L('.verticalScroll', wrapperDiv).e[0];
					if(outerDiv && obj.verticalPosition == 'left')
						{
							outerDiv.classList.add('left');
							outerDiv._verticalPostition = 'left';
						}
					if(outerDiv)
						{
							outerDiv._element = element;
							outerDiv.addEventListener('click', outerDivClick);
							outerDiv.children[0].addEventListener('mousedown', innerDivClick);
							outerDiv.children[0]._direction = true;
						}	
					outerDiv1 = $L('.horizontalScroll', wrapperDiv).e[0];
					if(outerDiv1 && obj.horizontalPostition == 'top')
						{
							outerDiv1.classList.add('top');
							outerDiv1._horizontalPostition = 'top';
						}
					if(outerDiv1)
						{
							outerDiv1._element = element;
							outerDiv1.addEventListener('click', outerDivClick);
							outerDiv1.children[0].addEventListener('mousedown', innerDivClick);
						}	
				}	
			element.addEventListener('mouseenter', mouseenter);
			wrapperDiv.addEventListener('mouseleave', mouseleave);
			element.classList.add('lyteScrollBar');
			if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
				{
					element.scrollLeft = 0;
					element.scrollTop = 0;
				}
			if(outerDiv)		
				{
					setScrollPos(outerDiv);
				}
			if(outerDiv1)	
				{
					setScrollPos(outerDiv1);
				}	
			mouseleave.call(wrapperDiv);
		}
	}

})();