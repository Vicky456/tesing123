(function( window ) {

	if($L){	
		
		$L.prototype.draggable = function(object) {
			var data = object ? object : {};

			//Parent Element
			data._element = this.e;
			$L(data._element).addClass('draggable-element');

			var _handleElement;
			var _initialPos = {};
			var _offset = [0,0];
			var _marginTop = 0;
			var _marginLeft = 0;
			var _mousePosition;
			//Data initialization
			data.containment = (data.containment === undefined) ? document : $L(data.containment).e;
			data.orientation = (data.orientation === undefined) ? "default" : data.orientation;
			data.handle = (data.handle === undefined) ? this.e : data.handle;
			

			

			function mouseDownEvent(event){
				// event.preventDefault();

				//Disable right click on the sortable elements to avoid unwanted behaviour
				if(event.which == 3){
					return;
				}
				var _handleElement = event.target.closest('.draggable-handle-element');
				if(_handleElement){
					var data = _handleElement._draggableData;
					var elem = data._element;
					var width = elem.getBoundingClientRect().width;
					var height = elem.getBoundingClientRect().height;
					data._offParent = elem.offsetParent;
					data._parent = elem.parentElement;

					//Callback fired
					if(data.onStart){
						onStart(data);
					}

					_initialPos = {
						x : elem.offsetLeft,
						y : elem.offsetTop
					};
					if(event.type == "mousedown"){
						_offset = [
							event.clientX - elem.getBoundingClientRect().left,
							event.clientY - elem.getBoundingClientRect().top
						];
					}
					else if(event.type == "touchstart"){
						_offset = [
							event.touches[0].clientX - elem.getBoundingClientRect().left,
							event.touches[0].clientY - elem.getBoundingClientRect().top
						];

						//Binding touch events
						$L(elem).bind("touchmove",data.__mousemove);
						$L(elem).bind("touchend",data.__mouseup);
					}
					
					if(window.getComputedStyle(elem).marginTop){
						_marginTop = window.getComputedStyle(elem).marginTop;
					}
					if(window.getComputedStyle(elem).marginLeft){
						_marginLeft = window.getComputedStyle(elem).marginLeft;
					}
					// var parent = elem.offsetParent;

					data._isDown = true;
					data._initialPos = _initialPos;
					data._offset = _offset;
					data._marginLeft = _marginLeft;
					data._marginTop = _marginTop;
					$L(_handleElement).addClass('selected-element');
					
					//Set the current element for manager to manage draggables and droppables
					if(typeof managerDD !== "undefined"){
						managerDD._current = data._element;
					}
				}
				// console.log(event.target, "selected");
			}

			mouseMoveEvent = function(event){
				if(event.type == "touchmove"){
					event.preventDefault();
				}
				var target = event.target;
				while(target){
					if($L(target).hasClass("selected-element")){
						_handleElement = target;
						break;
					}
					target = target.parentElement;
				}
				if(_handleElement){
					// console.log(event.target, "moving");
					var data = _handleElement._draggableData;
					if(data && data._isDown){
						var elem = data._element;
						_offset = data._offset;
						_marginLeft = data._marginLeft;
						_marginTop = data._marginTop;
						orientation = data.orientation;
						var parent = data._offParent;

						if(!data._isMoved){
							elem.style.top = elem.getBoundingClientRect().top - parent.getBoundingClientRect().top /*- parseInt(cellSpacing)*/ - parseInt(_marginTop) + 'px';
							elem.style.left = elem.getBoundingClientRect().left - parent.getBoundingClientRect().left - parseInt(_marginLeft) + 'px';
							elem.style.zIndex = 200000;
							elem.style.width = elem.getBoundingClientRect().width +'px';
							elem.style.height = elem.getBoundingClientRect().height +'px';
							elem.style.position = "absolute";
						}

						if(event.type == "mousemove"){
							data._mousePosition = {
								x : event.clientX,
								y : event.clientY
							};
						}
						else if(event.type == "touchmove"){
							data._mousePosition = {
								x : event.touches[0].clientX,
								y : event.touches[0].clientY
							};
						}

						//Callback fired
						if(data.onDrag){
							onDrag(data,_handleElement);
						}

						if(orientation === "vertical"){
							elem.style.top = data._mousePosition.y - data._offset[1] - parent.getBoundingClientRect().top - parseInt(_marginTop) + 'px';
						}
						else if(orientation === "horizontal"){
							elem.style.left = data._mousePosition.x - data._offset[0] - parent.getBoundingClientRect().left - parseInt(_marginLeft) + 'px';
						}
						else if(orientation === "default"){
							elem.style.left = data._mousePosition.x - _offset[0] - parent.getBoundingClientRect().left - parseInt(_marginLeft) + 'px';
							elem.style.top = data._mousePosition.y - _offset[1] - parent.getBoundingClientRect().top - parseInt(_marginTop) + 'px';
						}
						
						//Check for any droppable element and if present execute its drag function
						if(typeof managerDD !== "undefined"){
							managerDD._drag(event);
						}
						data._isMoved = true;
					}
				}
			}

			mouseUpEvent = function(event){
				// event.preventDefault();
				var _handleElement = event.target.closest('.selected-element') ? event.target.closest('.selected-element') : document.querySelector('.selected-element');
				if(_handleElement){
					var data = _handleElement._draggableData;
					if(data && data._isDown){
						data._isDown = false;
						var elem = data._element;
						if(data._isMoved){
							data._isMoved = false;
							_initialPos = data._initialPos;
							_marginTop = parseInt(data._marginTop);
							_marginLeft = parseInt(data._marginLeft);
							
							var returnVal = true;
							
							//Callback fired
							if(data.onStop){
								returnVal = onStop(data);
							}
							if(!returnVal){
								elem.style.left = "";
								elem.style.top = "";
							}

							//Check for any droppable element & if present execute its drop function
							if(typeof managerDD !== "undefined"){
								managerDD._drop(event);
							}
						}
						elem.style.zIndex = "";
						$L(_handleElement).removeClass('selected-element');

						//Unbinding touch events
						if(event.type == "touchend"){
							$L(elem).unbind('touchmove',data.__mousemove);
							$L(elem).unbind('touchend',data.__mouseup);
						}
					}
				}
			}

			/*---------------Callbacks Start--------------*/
			onReady = function(data){
				data.onReady(data._element);
			}

			onStart = function(data){
				data.onStart(data._element);
				// return ( returnVal === undefined) ? true : returnVal;
			}

			onDrag = function(data, _handleElement){
				data.onDrag(data._element,_handleElement);
			}

			onStop = function(data){
				returnVal = data.onStop(data._element);
				return (returnVal === undefined) ? true : returnVal;
			}
			/*---------------Callbacks End--------------*/

			
			//Bind events
			data.__mousemove = mouseMoveEvent;
			data.__mouseup = mouseUpEvent;
			if(typeof data.handle !== "string" && data.handle.length){
				data.handle.forEach(function(item){
					ele = $L(item).e;
					ele._draggableData = data;
					$L(ele).addClass('draggable-handle-element');
					$L(ele).bind("mousedown",mouseDownEvent);
					$L(ele).bind("touchstart",mouseDownEvent);
				});
			}
			else{
				data.handle._draggableData = data; 
				$L(data.handle).addClass('draggable-handle-element');
				$L(data.handle).bind("mousedown",mouseDownEvent);
				$L(data.handle).bind("touchstart",mouseDownEvent);
			}
			$L(data.containment).bind("mousemove",mouseMoveEvent);
			$L(data.containment).bind("mouseup",mouseUpEvent);

			//Callback fired
			if(data.onReady){
				onReady(data);
			}

			calculateHeight = function(element) {
				var cs = getComputedStyle(element);

				var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

				var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

				// Element height minus padding and border
				elementHeight = element.offsetHeight - paddingY - borderY;
				return elementHeight;
			};

			calculateWidth = function(element) {
				var cs = getComputedStyle(element);

				var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);

				var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);

				// Element width minus padding and border
				elementWidth = element.offsetWidth - paddingX - borderX;
				return elementWidth;
			};
		}
	}

})( window );