(function( window ) {

	if($L){	

		//This object synchronizes the draggable elements with the droppable elements
		//It contains the current object which is being dragged in the _current attribute
		//It also contains all the droppables available in the page inside the _droppables array attribute
		managerDD = {
			_current : null,
			_droppables : [],
			_drag : function(event){
				
				var droppables = this._droppables;
				var draggable = this._current;
				for(var i=0; i< droppables.length ; i++){
					
					var data = droppables[i]._droppableData;

					//Checks if the droppable is disabled or not
					//Also checks whether the draggable can be accepted by the droppable
					if(!data.disabled && _checkAcceptable(draggable,data.accept)){

						//Checks if the draggable intersects the droppable
						if(_checkIntersects(event,draggable,droppables[i],data.tolerance)){
							if(!data.entered && data.onEnter){
								data.onEnter(draggable,droppables[i]);
							}
							if(data.onDrag){
								data.onDrag(draggable,droppables[i]);
							}
							if(data.hoverClass && !$L(droppables[i]).hasClass(data.hoverClass)){
								if(data.activeClass && $L(droppables[i]).hasClass(data.activeClass)){
									$L(droppables[i]).removeClass(data.activeClass);
								}
								$L(droppables[i]).addClass(data.hoverClass)
							}
							if(!data.entered){
								data.entered = true;
							}
						}
						else{
							if(data.entered && data.onLeave){
								data.onLeave(draggable,droppables[i]);
							}
							if(data.hoverClass && $L(droppables[i]).hasClass(data.hoverClass)){
								$L(droppables[i]).removeClass(data.hoverClass);
							}
							if(data.activeClass && !$L(droppables[i]).hasClass(data.activeClass)){
								$L(droppables[i]).addClass(data.activeClass);
							}
							if(data.entered){
								data.entered = false;
							}
						}
					}
				}
			},
			_drop : function(event){
				var droppables = this._droppables;
				var draggable = this._current;
				for(var i=0; i< droppables.length ; i++){
					var data = droppables[i]._droppableData;
					if(data.activeClass && $L(droppables[i]).hasClass(data.activeClass)){
						$L(droppables[i]).removeClass(data.activeClass);
					}
					if(data.hoverClass && $L(droppables[i]).hasClass(data.hoverClass)){
						$L(droppables[i]).removeClass(data.hoverClass);
					}
					if(!data.disabled && _checkAcceptable(draggable,data.accept)){
						if(_checkIntersects(event,draggable,droppables[i],data.tolerance)){
							if(data.onDrop){
								data.onDrop(droppables[i]);
							}
						}
					}
				}
			}
		},


		//It initializes the droppable funcionality and stores it in the managerDD._droppables array 
		$L.prototype.droppable = function(object) {
			var data = object ? object : {};

			//Parent Element
			droppableEle = this.e;
			
			data.entered = false;
			data.activeClass = data.activeClass ? data.activeClass : false; 
			data.accept = data.accept ? data.accept : [];
			data.disabled = (data.disabled === true) ? data.disabled : false;
			data.hoverClass = data.hoverClass ? data.hoverClass : false;
			data.tolerance = (data.tolerance === "fit" || data.tolerance === "intersect" || data.tolerance === "pointer" || data.tolerance === "touch") ? data.tolerance : "intersect";
			droppableEle._droppableData = data;

			if(managerDD._droppables.indexOf(droppableEle) !== -1){
				managerDD._droppables.splice(managerDD._droppables.indexOf(droppableEle),1);
			}
			managerDD._droppables.push(droppableEle);

			if(data.onReady){
				data.onReady(this.e);
			}
			
		},

		_checkAcceptable = function(draggable,acceptables){
			if(typeof acceptables !== "string"){
				if(acceptables.length === 0){
					return true;
				}
				else{
					for(var i = 0 ; i < acceptables.length ;i++){
						if(acceptables[i] === ("#" + draggable.id)){
							return true;
						}
					}
				}
			}
			return false;
		},

		_checkIntersects = function(event,draggable,droppable,toleranceMode){
			
			var x1 = draggable.getBoundingClientRect().left,
				y1 = draggable.getBoundingClientRect().top,
				x2 = x1 + draggable.getBoundingClientRect().width,
				y2 = y1 + draggable.getBoundingClientRect().height,
				l = droppable.getBoundingClientRect().left,
				t = droppable.getBoundingClientRect().top,
				r = l + droppable.getBoundingClientRect().width,
				b = t + droppable.getBoundingClientRect().height;

			switch ( toleranceMode ) {
			case "fit":
				return ( l <= x1 && x2 <= r && t <= y1 && y2 <= b );
			case "intersect":
				return ( l < x1 + ( draggable.getBoundingClientRect().width / 2 ) && // Right Half
					x2 - ( draggable.getBoundingClientRect().width / 2 ) < r && // Left Half
					t < y1 + ( draggable.getBoundingClientRect().height / 2 ) && // Bottom Half
					y2 - ( draggable.getBoundingClientRect().height / 2 ) < b ); // Top Half
			case "pointer":
				if(event.type == "mousemove"){
					return _isOverAxis( event.clientY, t, droppable.getBoundingClientRect().height ) &&
					_isOverAxis( event.clientX, l, droppable.getBoundingClientRect().width );
				}
				if(event.type == "touchmove"){
					return _isOverAxis( event.touches[0].clientY, t, droppable.getBoundingClientRect().height ) &&
					_isOverAxis( event.touches[0].clientX, l, droppable.getBoundingClientRect().width );
				}
			case "touch":
				return (
					( y1 >= t && y1 <= b ) || // Top edge touching
					( y2 >= t && y2 <= b ) || // Bottom edge touching
					( y1 < t && y2 > b ) // Surrounded vertically
				) && (
					( x1 >= l && x1 <= r ) || // Left edge touching
					( x2 >= l && x2 <= r ) || // Right edge touching
					( x1 < l && x2 > r ) // Surrounded horizontally
				);
			default:
				return false;
			}
		},

		_isOverAxis = function( x, reference, size ) {
			return ( x >= reference ) && ( x < ( reference + size ) );
		}

	}

})( window );