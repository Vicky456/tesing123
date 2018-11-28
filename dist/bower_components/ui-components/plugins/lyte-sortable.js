(function( window ) {

	if($L){	
		
		manageSortable = {
			countSortable : 0,
			isEqual : function (value, other) {
				if(value.length != other.length){
					return false;
				}
				for(var i = 0 ; i < value.length ; i++){
					if(other.indexOf(value[i]) == -1){
						return false;
					}
				}
				// If nothing failed, return true
				return true;
			},

			convertToArrayOfItems : function(selector){
				if(typeof selector != "string" && selector.length > 0){
					return selector;
				}
				var selectorArray = selector.split(',');
				var retArray = [];
				selectorArray.forEach(function(item,indexVal){
					var items = $L(item.trim()).e;
					if(items.length){
						for(var i=0;i < items.length ;i++){
							if(retArray.indexOf(items[i]) == -1){
								retArray.push(items[i]);
							}
						}
					}
					else{
						if(retArray.indexOf(items) == -1){
							retArray.push(items);
						}
					}
				});
				return retArray;
			}
		};

		$L.prototype.sortable = function(object) {
			var data = object ? object : {};
			var element = this.e.length == undefined ? this.e : this.e[0];
			if(this.e.length){
				var elemArray = this.e;
				if(!data.changed){
					++manageSortable.countSortable;
					data.changed = true;
				}
				for(var i = 0 ; i < elemArray.length ; i++){
					$L(elemArray[i]).sortable(Object.assign({},data));
				};
				return;
			}

			if(this.e._sortableData){
				var _sortableData = this.e._sortableData;
				data._parentElem = data._parentElem == undefined ? _sortableData._parentElem : data._parentElem;

				//Data overriding
				data.containment = data.containment ? data.containment : _sortableData.containment;
				data.connected = data.connectedWith ? manageSortable.isEqual(data.connectedWith, _sortableData.connectedWith) : _sortableData.connected;
				data.connectedWith = data.connectedWith ? data.connectedWith : _sortableData.connectedWith;
				data.orientation = data.orientation ? data.orientation : _sortableData.orientation;
				data.droppable = (data.droppable == undefined) ? _sortableData.droppable : data.droppable;
				data.draggable = (data.draggable == undefined) ? _sortableData.draggable : data.draggable;
				data.sortableElemClass = _sortableData.sortableElemClass;	
				data.placeholder = data.placeholder ? data.placeholder : _sortableData.placeholder;
				data.disabled = data.disabled ? data.disabled : _sortableData.disabled;
				data.onReady = data.onReady ? data.onReady : _sortableData.onReady;
				data.onSelect = data.onSelect ? data.onSelect : _sortableData.onSelect;
				data.onDrag = data.onDrag ? data.onDrag : _sortableData.onDrag;
				data.onPlaceholder = data.onPlaceholder ? data.onPlaceholder : _sortableData.onPlaceholder;
				data.onBeforeDrop = data.onBeforeDrop ? data.onBeforeDrop : _sortableData.onBeforeDrop;
				data.onDrop = data.onDrop ? data.onDrop : _sortableData.onDrop;
				data.cancel = data.cancel == undefined ? _sortableData.cancel : data.cancel instanceof Array ? data.cancel : data.cancel.split(",") ;
				data.tolerance = data.tolerance ? data.tolerance : _sortableData.tolerance;
				data.items = data.items == undefined ? _sortableData.items : data.items instanceof Array ? data.items : data.items.split(",");
				data.cursorAt = data.cursorAt == undefined ? _sortableData.cursorAt : data.cursorAt;
				data.restrict = data.restrict == undefined ? _sortableData.restrict : data.restrict instanceof Array ? data.restrict : data.restrict.split(",");

				if(data.executeOnReady){
					data._parentElem.executedOnReady = false;
				}
			}
			else{

				if(!data.connected && !data.changed){
					// console.log(data,++manageSortable.countSortable);
					++manageSortable.countSortable;
					data.changed = true;
				}
				//Parent Element
				data._parentElem = this.e;
				var element = this.e;
				$L(data._parentElem).addClass('sortable-parent');

				//Data initialization
				data.containment = data.containment;
				data.connectedWith = data.connectedWith ? data.connectedWith : [];
				data.orientation = data.orientation ? data.orientation : "vertical";
				data.droppable = (data.droppable == undefined) ? true : data.droppable;
				data.draggable = (data.draggable == undefined) ? true : data.draggable;
				data.sortableElemClass = (data.orientation === "horizontal") ? "sortable-element-h"+manageSortable.countSortable : "sortable-element-v"+manageSortable.countSortable;
				data.placeholder = data.placeholder ? data.placeholder : "lyteSortablePlaceholder";
				data.disabled = data.disabled ? data.disabled : "lyteSortableDisabledPlaceholder";
				data.cancel = data.cancel == undefined ? [] : data.cancel instanceof Array ? data.cancel : data.cancel.split(",");
				data.tolerance = data.tolerance ? data.tolerance : "intersect";
				data.items = data.items == undefined ? [] : data.items instanceof Array ? data.items : data.items.split(",");
				data.cursorAt = data.cursorAt;
				data.restrict = data.restrict == undefined ? [] : data.restrict instanceof Array ? data.restrict : data.restrict.split(",");
			}


			var _offset = [0,0];
			var _isDown = false;
			var _isMoved = false;
			var _mousePosition;
			var _elemBelow;
			var _droppablePlace;
			var _marginTop = 0;
			var _marginLeft = 0;
			var _sortableElemClass;
			var _sortableElem;
			var _placeholder = "";
			var _div = "";		

			


			function mouseDownEvent(event){
				// event.preventDefault();
		
				//Disable right click on the sortable elements to avoid unwanted behaviour
				if(event.which == 3){
					return;
				}
				
				var target = event.target;

				while(target){
					if($L(target).hasClass("sortable-element")){
						_sortableElem = target;
						break;
					}
					target = target.parentElement;
				}

				if(_sortableElem && checkForSortable(_sortableElem._sortableData || _sortableElem.parentElement._sortableData, event.target) && checkForItems(_sortableElem._sortableData || _sortableElem.parentElement._sortableData, event.target)){
					if(!$L(_sortableElem).hasClass(_sortableElem.parentElement._sortableData.sortableElemClass)){
						$L(_sortableElem).addClass(_sortableElem.parentElement._sortableData.sortableElemClass)
					}

					var data = _sortableElem._sortableData || _sortableElem.parentElement._sortableData;
					_placeholder = _sortableElem.cloneNode(true);
					data._div = _div = _sortableElem;
					var returnVal = true;

					//Callback fired
					if(data.onSelect){
						returnVal = onSelect(data);
					}

					
					if(returnVal){
						$L(_div).addClass("sortable-element-selected");
						$L(_div).addClass('lyteSortableElem');
						// data._previousEle = _div.previousElementSibling ? _div.previousElementSibling : null;
						// data._nextEle = _div.nextElementSibling ? _div.nextElementSibling : null;
						if(window.getComputedStyle(_sortableElem).marginTop){
							_marginTop = window.getComputedStyle(_sortableElem).marginTop;
						}
						if(window.getComputedStyle(_sortableElem).marginLeft){
							_marginLeft = window.getComputedStyle(_sortableElem).marginLeft;
						}
						if(event.type == "mousedown"){
							_offset = [
								event.clientX - _div.getBoundingClientRect().left,
								event.clientY - _div.getBoundingClientRect().top
							];
						}
						else if(event.type == "touchstart"){
							_offset = [
								event.touches[0].clientX - _div.getBoundingClientRect().left,
								event.touches[0].clientY - _div.getBoundingClientRect().top
							];
							
							//Binding eventlistener for touch
							$L(_sortableElem).bind('touchmove',data._parentElem.__mouseMoveEvent);
							$L(_sortableElem).bind('touchend',data._parentElem.__mouseUpEvent);
						}

						//set containment properties
						if(data.containment){
							data.containmentDimensions = setContainment(data,_sortableElem);
						}
						else{
							data.containmentDimensions = null;
						}

						//Binding the values to the draggable element
						data._isDown = true;
						data._placeholder = _placeholder;
						data._offset = _offset;
						data._marginTop = _marginTop;
						data._marginLeft = _marginLeft;
						data._event = event;
						data._placedPlaceholder = false;

						if(!_sortableElem._sortableData){
							_sortableElem._sortableData = data;
						}
						_placeholder = null;
						_div = null;
						_sortableElem = null;
						
					}
				}
			}

			mouseMoveEvent = function(event){
				if(event.type == "touchmove"){
					event.preventDefault();
				}
				var target = event.target;
				while(target){
					if($L(target).hasClass("sortable-element-selected")){
						_sortableElem = target;
						break;
					}
					target = target.parentElement;
				}
				
				if(_sortableElem){

					var data = _sortableElem._sortableData;
					if(data && data._isDown){
						event.preventDefault();
						if(typeof document.body.style.MozUserSelect!="undefined"){
							document.body.style.MozUserSelect = "none";
						}
						_div = data._div;
						_placeholder = data._placeholder;
						_offset = data._offset;
						_marginTop = data._marginTop;
						_marginLeft = data._marginLeft;
						_sortableElemClass = data.sortableElemClass; 

						if(!data._placedPlaceholder){
							var width = _sortableElem.getBoundingClientRect().width;
							var height = _sortableElem.getBoundingClientRect().height;
							var cellSpacing = 0;
							var parent = _sortableElem.offsetParent;
							if(parent.tagName.toLowerCase() == "table"){
								cellSpacing = parent.cellSpacing;
								if(cellSpacing == ""){
									cellSpacing = 2;
								}
							}
							while((parent.tagName.toLowerCase() == "table" || parent.tagName.toLowerCase() == "lyte-table-structure") && parent.style.position == ""){
								parent = parent.offsetParent;
							}
							var relativeParent = getRelativeParent(_div);
							if(relativeParent && !(parent.isEqualNode(relativeParent))){
								parent = relativeParent;
							}
							_div.style.top = _sortableElem.getBoundingClientRect().top - parent.getBoundingClientRect().top - parseInt(cellSpacing) - parseInt(_marginTop) + 'px';
							_div.style.left = _sortableElem.getBoundingClientRect().left - parent.getBoundingClientRect().left - parseInt(_marginLeft) + 'px';
							_div.style.boxSizing = "border-box";
							_div.style.zIndex = 3001;
							$L(_div).width(width);
							$L(_div).height(height);
							
							if(_sortableElem.tagName.toLowerCase() == "tr" || _sortableElem.tagName.toLowerCase() == "lyte-tr"){
								fixWidth(_sortableElem);
							}
							
							//Create placeholder and append it to the DOM
							$L(_placeholder).html("");
							$L(_placeholder).attr('id','dummy');
							$L(_placeholder).removeClass('sortableElem');
							$L(_placeholder).width(_sortableElem.getBoundingClientRect().width /*calculateWidth(_sortableElem)*/);
							$L(_placeholder).height(_sortableElem.getBoundingClientRect().height /*calculateHeight(_sortableElem)*/);
							_placeholder.style.padding = "0px";

							//Insert the placeholder in the DOM and make the selected element's position absolute
							// _div.parentElement.insertBefore(_placeholder,_div);
							LyteComponent.insertBefore(_div,_placeholder)
							_div.style.position = "absolute";
							data._placedPlaceholder = true;
							// if(window.getComputedStyle(_placeholder).display == "inline"){
							// 	_placeholder.style.display = "inherit";
							// }
							data._div = _div;
							data._placeholder = _placeholder;
							data._prevTop = event.clientY;

						}

						//Find scroll div
						var scrollDiv = findScrollDiv(_placeholder);

						if(event.type == "mousemove"){
							_mousePosition = {
								x : event.clientX,
								y : event.clientY
							};
						}
						else if(event.type == "touchmove"){
							_mousePosition = {
								x : event.touches[0].clientX,
								y : event.touches[0].clientY
							};
						}
						
						var parent = _div.offsetParent;
						var relativeParent = getRelativeParent(_div);
						if(relativeParent && !(parent.isEqualNode(relativeParent))){
							parent = relativeParent;
						}


						var leftVal;
						var topVal;
						if(data.cursorAt){
							leftVal = _mousePosition.x - data.cursorAt.left - parent.getBoundingClientRect().left - parseInt(_marginLeft);
							topVal = _mousePosition.y - data.cursorAt.top - parent.getBoundingClientRect().top - parseInt(_marginTop);

							if(data.containment){
								if(leftVal >= data.containmentDimensions.offsetLeft && leftVal <= (data.containmentDimensions.offsetLeft + (data.containmentDimensions.width - _div.getBoundingClientRect().width))){
									_div.style.left = leftVal + 'px';
								}
								if(topVal >= data.containmentDimensions.offsetTop && topVal <= (data.containmentDimensions.offsetTop + (data.containmentDimensions.height - _div.getBoundingClientRect().height))){
									_div.style.top = topVal + 'px';
								}
							}
							else{
								_div.style.left = leftVal + 'px';
								_div.style.top = topVal + 'px';
							}
						}
						else{
							leftVal = _mousePosition.x - _offset[0] - parent.getBoundingClientRect().left - parseInt(_marginLeft);
							topVal = _mousePosition.y - _offset[1] - parent.getBoundingClientRect().top - parseInt(_marginTop);
							if(data.containment){
								if(leftVal >= data.containmentDimensions.offsetLeft && leftVal <= (data.containmentDimensions.offsetLeft + (data.containmentDimensions.width - _div.getBoundingClientRect().width))){
									_div.style.left = leftVal + 'px';
								}
								if(topVal >= data.containmentDimensions.offsetTop && topVal <= (data.containmentDimensions.offsetTop + (data.containmentDimensions.height - _div.getBoundingClientRect().height))){
									_div.style.top = topVal + 'px';
								}
							}
							else{
								_div.style.left = leftVal + 'px';
								_div.style.top = topVal + 'px';
							}
						}

						if(scrollDiv && (_div.getBoundingClientRect().left <= scrollDiv.getBoundingClientRect().right) && (_div.getBoundingClientRect().right >= scrollDiv.getBoundingClientRect().left)){
							if(_div.getBoundingClientRect().top < scrollDiv.getBoundingClientRect().top){
								if((scrollDiv.scrollTop > 0) && 
									(scrollDiv.scrollTop <= scrollDiv.scrollHeight - scrollDiv.getBoundingClientRect().height)){
									// console.log("scrollTop",scrollDiv.scrollTop);
									scrollDiv.scrollTop -= (scrollDiv.getBoundingClientRect().top - _div.getBoundingClientRect().top);
								}
							}
							if(_div.getBoundingClientRect().bottom > scrollDiv.getBoundingClientRect().bottom){
								if(scrollDiv.scrollTop < scrollDiv.scrollHeight - scrollDiv.getBoundingClientRect().height){
									// console.log("scrollBottom",scrollDiv.scrollTop);
									scrollDiv.scrollTop += (_div.getBoundingClientRect().bottom - scrollDiv.getBoundingClientRect().bottom);
								}
							}
						}
						
						// $L(_div).hide();
						_div.style.display = "none";
						_elemBelow = document.elementFromPoint(_mousePosition.x,_mousePosition.y);
						_div.style.display = "";
						

						if(!_elemBelow){
							return;
						}

						droppablePlace = _elemBelow.closest('.'+_sortableElemClass);

						if(droppablePlace && checkDroppable(droppablePlace,_sortableElem.parentElement,_sortableElem,data.connectedWith,data.containmentDimensions,_mousePosition)){
							
							if($L(_elemBelow).hasClass('sortable-parent') && checkParentDroppable(_elemBelow,_sortableElem.parentElement,_sortableElem,data.connectedWith,data.containmentDimensions,_mousePosition) && checkForIntersect(_elemBelow,_mousePosition) && checkForBetween(_elemBelow,_mousePosition,_sortableElem)){
								// $L(_elemBelow).append(_placeholder);
								LyteComponent.appendChild(_elemBelow,_placeholder);
							}
							else{
								if(data.tolerance == "pointer"){
									if(event.clientY < data._prevTop){
										LyteComponent.insertBefore(droppablePlace,_placeholder);
									}
									else{
										LyteComponent.insertAfter(droppablePlace,_placeholder);
									}
									data._prevTop = event.clientY;
								}
								if(data.tolerance == "intersect"){
									if(_div.getBoundingClientRect().top < (droppablePlace.getBoundingClientRect().top)){
										// $L(droppablePlace).insertBefore(_placeholder);
										LyteComponent.insertBefore(droppablePlace,_placeholder);
									}
									else if(_div.getBoundingClientRect().bottom > (droppablePlace.getBoundingClientRect().bottom)){
										// $L(droppablePlace).insertAfter(_placeholder);
										LyteComponent.insertAfter(droppablePlace,_placeholder);
									}
								}
							}
						}
						else if(_elemBelow && $L(_elemBelow).hasClass('sortable-parent') && checkParentDroppable(_elemBelow,_sortableElem.parentElement,_sortableElem,data.connectedWith,data.containmentDimensions,_mousePosition) && checkForIntersect(_elemBelow,_mousePosition) && checkForBetween(_elemBelow,_mousePosition,_sortableElem)){
							// $L(_elemBelow).append(_placeholder);
							LyteComponent.appendChild(_elemBelow,_placeholder);
						}
						// else{
						// 	console.log("checkParentDroppable",checkParentDroppable(_elemBelow,data._parentElem,_sortableElem,data.connectedWith));
						// 	console.log("checkForIntersect",checkForIntersect(_elemBelow,_mousePosition));
						// 	console.log("came here",_elemBelow);
						// }
						if(!data.onPlaceholder || checkValidDroppable(data,_elemBelow)){
							if($L(_placeholder).hasClass(data.disabled)){
								$L(_placeholder).removeClass(data.disabled);
							}
							$L(_placeholder).addClass(data.placeholder);
						}
						else{
							if($L(_placeholder).hasClass(data.placeholder)){
								$L(_placeholder).removeClass(data.placeholder);
							}
							$L(_placeholder).addClass(data.disabled);
						}

						//Callback fired
						if(data.onDrag){
							onDrag(data,droppablePlace,_elemBelow);
						}

						data._isMoved = true;
						droppablePlace = null;
						_elemBelow = null;
					}
				}
			}

			mouseUpEvent = function(event){
				var target = event.target;

				while(target){
					if($L(target).hasClass("sortable-element-selected")){
						_sortableElem = target;
						break;
					}
					target = target.parentElement;
				}
				if(_sortableElem){
					var data = _sortableElem._sortableData;
					// debugger
					if(data._isDown){
						data._isDown = false;
						_div = data._div;
						_placeholder = data._placeholder;
						if(data._isMoved){
							data._isMoved = false;
							var returnVal = true;

							if($L(_placeholder).hasClass(data.disabled)){
								callRevertBack(data);
								return;
							}

							//Callback fired
							if(data.onBeforeDrop){
								returnVal = onBeforeDrop(data);
							}

							if(!returnVal){
								callRevertBack(data);
								return;
							}
							
							var sibling = (findPreviousElem(_placeholder) ? findPreviousElem(_placeholder) : findNextElem(_placeholder));
							var elementData = sibling ? sibling._sortableData : _placeholder.parentElement._sortableData;
							// $L(_placeholder).replace(_div);
							LyteComponent.replaceWith(_placeholder, _div);
							removeStyle(_div);

							_placeholder = null;

							//Callback fired
							if(data.onDrop){
								onDrop(data);
							}
							_div._sortableData = elementData;
							if(!elementData.draggable){
								$L(_div).unbind("mousedown",mouseDownEvent);
							}
							
						}
						else{
							// _placeholder.parentElement.replaceChild(_div,_placeholder);
							removeStyle(_div);
							if(_sortableElem.tagName.toLowerCase() == 'a'){
								window.location.href = _sortableElem.href;
							}
						}
						data._div = null;
						data._placeholder = null;
						data._placedPlaceholder = false;

						//Unbinding the eventlisteners for touch
						if(event.type == "touchend"){
							$L(_sortableElem).unbind('touchmove',data._parentElem.__mouseMoveEvent);
							$L(_sortableElem).unbind('touchend',data._parentElem.__mouseUpEvent);
						}
					}
					$L(_sortableElem).removeClass("sortable-element-selected");
					_offset = null;
					_isDown = null;
					_isMoved = null;
					_mousePosition = null;
					_elemBelow = null;
					_droppablePlace = null;
					_marginTop = null;
					_marginLeft = null;
					_sortableElemClass = null;
					_sortableElem = null;
					_placeholder = null;
					_div = null;
				}
			}

			element.addToSortable = function(elem){
				elem._sortableData = element._sortableData;
				$L(elem).addClass("sortable-element",element._sortableData.sortableElemClass);
				// $L(elem).bind("mousedown",mouseDownEvent);
			};

			element.getSortableClass = function(){
				return element._sortableData.sortableElemClass;
			};

			isNotRestricted = function(data,targetElem){
				for(var i = 0; i<data.restrict.length ; i++){
					var elements = document.querySelectorAll(data.restrict[i]);
					for(var j = 0; j<elements.length; j++){
						if(elements[j].isEqualNode(targetElem)){
							return false;
						}
					}
				}
				return true;
			}

			checkForSortable = function(data,targetElem){
				for(var i = 0; i<data.cancel.length ; i++){
					var elements = document.querySelectorAll(data.cancel[i]);
					for(var j = 0; j<elements.length ; j++){
						if(elements[j].isEqualNode(targetElem)){
							return false;
						}
						// else{
						// 	var elem = targetElem;
						// 	while(elem.parentElement){
						// 		elem = elem.parentElement;
						// 		if(elements[j].isEqualNode(elem)){
						// 			return false;
						// 		}
						// 		if($L(elem).hasClass('sortable-element')){
						// 			break;
						// 		}
						// 	}
						// }
					}
				}
				return true;
			};

			checkDroppedItemPosition = function(ele,siblings){
				for(var i = 0; i<siblings.length; i++){
					if(siblings[i].tagName != "TEMPLATE" && ele.isEqualNode(siblings[i])){
						return i;
					}
				}
			};

			/*---------------Callbacks Start--------------*/
			onReady = function(data){
				data.onReady(data._parentElem);
			}

			onSelect = function(data){
				var returnVal = data.onSelect(data._div, data._parentElem.children, data._parentElem);
				return ( returnVal == undefined) ? true : returnVal;
			}

			onDrag = function(data,droppableElem,elemBelow){

				var elem = droppableElem || elemBelow;
				data.onDrag(data._div,elem);
			}

			onBeforeDrop = function(data){
				var returnVal = data.onBeforeDrop(data._div);
				return (returnVal == undefined) ? true : returnVal;
			}

			onDrop = function(data){
				data.onDrop(data._div, data._parentElem,checkDroppedItemPosition(data._div,data._parentElem.children));
			}
			/*---------------Callbacks End--------------*/

			checkValidDroppable = function(data,destination){
				if(destination.id && destination.id == "dummy"){
					destination = destination.parentElement;
				}
				else{
					while(destination){
						if($L(destination).hasClass('sortable-parent')){
							break;
						}
						destination = destination.parentElement;
					}
				}
				var returnVal = data.onPlaceholder(data._div,data._placeholder,data._parentElem,destination);
				return (returnVal == undefined) ? true : returnVal;
			}


			//Bind events to the child elements that will be sortable
			var childrens = data._parentElem.children;
			data._parentElem.__mouseMoveEvent = mouseMoveEvent;
			data._parentElem.__mouseUpEvent = mouseUpEvent;
			data._parentElem._sortableData = data;
			for(var i = 0 ; i < childrens.length ; i++){
				if(childrens[i].tagName != "TEMPLATE" && isNotRestricted(data,childrens[i])){
					childrens[i]._sortableData = data;
					$L(childrens[i]).addClass("sortable-element",data.sortableElemClass);
				}
			}
			if(data.draggable){
				$L(data._parentElem).bind("mousedown",mouseDownEvent);
				$L(data._parentElem).bind("touchstart",mouseDownEvent);
			}
			else{
				if(data._parentElem._mousedown){
					$L(data._parentElem).unbind("mousedown",mouseDownEvent);
					$L(data._parentElem).unbind("touchstart",mouseDownEvent);
				}
			}
			$L(document).bind("mousemove",mouseMoveEvent);
			$L(document).bind("mouseup",mouseUpEvent);

			
			
			//Check whether the arrays are connected or not and has connectedWith
			if(!data.connected && data.connectedWith.length > 0){
				data.connectedWith = manageSortable.convertToArrayOfItems(data.connectedWith);
				data.connectedWith.forEach(function(id){
					var connectedWith = data.connectedWith.concat();
					index = connectedWith.indexOf(id);
					connectedWith.splice(index,1);
					connectedWith.push(data._parentElem);
					$L(id).sortable({
						_parentElem : $L(id).e,
						connectedWith : connectedWith,
						connected : true,
						droppable : data.droppable,
						draggable : data.draggable,
						placeholder : data.placeholder,
						disabled : data.disabled,
						orientation : data.orientation,
						cancel : data.cancel,
						items : data.items,
						cursorAt : data.cursorAt,
						restrict : data.restrict
					});
				});
				
			}

			if(data.onReady && !data._parentElem.executedOnReady){
				onReady(data);
				data._parentElem.executedOnReady = true;
			}

			setContainment = function(data,sortableElem){
				if(data.containment == "parent"){
					return ({left : sortableElem.parentElement.getBoundingClientRect().left,
							right : sortableElem.parentElement.getBoundingClientRect().right,
							top : sortableElem.parentElement.getBoundingClientRect().top,
							bottom : sortableElem.parentElement.getBoundingClientRect().bottom,
							height : sortableElem.parentElement.getBoundingClientRect().height,
							width : sortableElem.parentElement.getBoundingClientRect().width,
							offsetLeft : sortableElem.parentElement.offsetLeft,
							offsetTop : sortableElem.parentElement.offsetTop});
				}
				else{
					var containment = $L(data.containment).e.length == undefined ? $L(data.containment).e : $L(data.containment).e[0];
					return ({left : containment.getBoundingClientRect().left,
							right : containment.getBoundingClientRect().right,
							top : containment.getBoundingClientRect().top,
							bottom : containment.getBoundingClientRect().bottom,
							height : containment.getBoundingClientRect().height,
							width : containment.getBoundingClientRect().width,
							offsetLeft : containment.offsetLeft,
							offsetTop : containment.offsetTop});
				}
			};

			findScrollDiv = function(elem){
				var parent = elem.parentElement;
				while(elem.parentElement){
					elem = elem.parentElement;
					if(parent.scrollHeight > elem.clientHeight && !(elem.style.overflow && elem.style.overflow == 'hidden')){
						return elem;
					}
				}
				return null;
			};

			fixWidth = function(element){
				var childrens = element.children;
				for(var i = 0; i<childrens.length; i++){
					if(childrens[i].tagName.toLowerCase() == "td" || childrens[i].tagName.toLowerCase() == "lyte-td"){
						$L(childrens[i]).width($L(childrens[i]).width());
					}
				}
			};

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

			getRelativeParent = function(element){
				while(element.parentElement){
					element = element.parentElement;
					var cs = getComputedStyle(element);
					if(cs.position == "relative"){
						return element;
					}
				}
				return null;
			};

			//Checks whether the element can be dropped or not
			checkDroppable = function(element,parentElem,sortableElem,connectedWith,containmentDimensions,mP){
				if(element.id != "dummy"){
					var sortableParentId = sortableElem.parentElement.id;
					var droppableParentId = element.parentElement.id;
					if(containmentDimensions){
						if(mP.x < containmentDimensions.left || mP.x > containmentDimensions.right || mP.y < containmentDimensions.top || mP.y > containmentDimensions.bottom){
							return false;
						}
					}
					if(sortableElem.parentElement.isEqualNode(element.parentElement) || element.parentElement.isEqualNode(sortableElem._sortableData._parentElem)){
						return true;
					}
					if(((connectedWith).indexOf(element.parentElement) != -1) && element._sortableData.droppable){
						return true;
					}
				}
				return false;
			};

			//Checks whwther the element can be dropped or not 
			checkParentDroppable = function(element,parentElem,sortableElem,connectedWith,containmentDimensions,mP){
				var sortableParentId = sortableElem.parentElement.id;
				if(containmentDimensions){
					if(mP.x < containmentDimensions.left || mP.x > containmentDimensions.right || mP.y < containmentDimensions.top || mP.y > containmentDimensions.bottom){
						return false;
					}
				} 
				if(sortableElem.parentElement.isEqualNode(element) || element.isEqualNode(parentElem)){
					return true;
				}
				if(((connectedWith).indexOf(element) != -1) && checkDroppableValue(element)){
					return true;
				}
				return false;
			};

			checkDroppableValue = function(element){
				var childrens = element.children;
				var childElem;
				for(var v= 0; v<childrens.length; v++){
					if(childrens[v] != element.querySelector("#dummy") && childrens[v].tagName != "TEMPLATE" && $L(childrens[v]).hasClass('sortable-element')){
						childElem = childrens[v];
						break;
					}
				}
				return (childElem ? childElem._sortableData.droppable : element._sortableData.droppable);
			};

			//Checks for appending the sortable elements at the end of the div
			checkPossiblePosition = function(element,sortableElem){
				if(element.childElementCount > 0){
					var lastChild = element.lastElementChild;
					if(sortableElem.getBoundingClientRect().top > lastChild.getBoundingClientRect().bottom){
						return true
					}
				}
				else{
					return true;
				}
				return false;
			};

			checkIfDroppable = function(parentElem,ele){
				if(ele.parentElement === parentElem && parentElem.childElementCount === 1 && (((ele.getBoundingClientRect().right > (parentElem.getBoundingClientRect().left + ele.getBoundingClientRect().width / 2)) && 
					(ele.getBoundingClientRect().right <= parentElem.getBoundingClientRect().right)) || ((ele.getBoundingClientRect().left < (parentElem.getBoundingClientRect().right - ele.getBoundingClientRect().width / 2)) && 
					(ele.getBoundingClientRect().left >= parentElem.getBoundingClientRect().left)))){
					return true;
				}
				return false;
			};

			checkForIntersect = function(parentElem,mP){
				var cs = window.getComputedStyle(parentElem);
				var offset = parentElem.getBoundingClientRect();
				// console.log("cs",cs);
				// console.log("offset",offset);
				// console.log("_mousePosition",mP.x,mP.y);
				if(mP.x > (offset.left + parseFloat(cs.paddingLeft || 0)) && mP.x < (offset.right - parseFloat(cs.paddingRight || 0)) && mP.y > (offset.top + parseFloat(cs.paddingTop || 0)) && mP.y < (offset.bottom - parseFloat(cs.paddingBottom || 0))){
					return true;
				}
				return false; 
			};

			checkForBetween = function(parentElem,mP,div){
				var childrens = parentElem.children;
				var templateTags = 0;
				var childElem = [];
				for(var i = 0;i<childrens.length;i++){
					if(childrens[i].tagName != "TEMPLATE" && childrens[i].id != "dummy"){
						childElem.push(childrens[i]);
					}
					else{
						templateTags++;
					}
				}
				if(templateTags == childrens.length){
					return true;
				}
				else if(childElem.length > 0 && childElem[childElem.length - 1].isEqualNode(div)){
					return true;
				}
				else if(div.getBoundingClientRect().top > childElem[childElem.length - 1].getBoundingClientRect().bottom){
					return true;
				}
				return false;
			};

			callRevertBack = function(data) {
				$L(data._div).removeClass("sortable-element-selected");
				removeStyle(data._div);
				data._placeholder.remove();
			};

			removeStyle = function(element){
				element.style.position = '';
				element.style.top = '';
				element.style.left = '';
				element.style.width = '';
				element.style.height = '';
				// element.style.display = '';
				element.style.zIndex = '';
				element.style.boxSizing = '';
				$L(element).removeClass('lyteSortableElem');
			};

			findPreviousElem = function(elem){
				while(elem.previousElementSibling){
					elem = elem.previousElementSibling;
					if(elem.tagName != "TEMPLATE" && $L(elem).hasClass('sortable-element')){
						return elem;
					}
				}
				return null;
			};

			findNextElem = function(elem){
				while(elem.nextElementSibling){
					elem = elem.nextElementSibling;
					if(elem.tagName != "TEMPLATE" && $L(elem).hasClass('sortable-element')){
						return elem;
					}
				}
				return null;
			};

			checkForItems = function(data,targetElem){
				if(data.items.length > 0){
					for(var i = 0 ; i<data.items.length ; i++){
						var elements = document.querySelectorAll(data.items[i]);
						for(var j = 0; j<elements.length; j++){
							if(elements[j].isEqualNode(targetElem)){
								return true;
							}
						}
					}
				}
				else{
					return true;
				}
				return false;
			};

		}
		
	}

})( window );
