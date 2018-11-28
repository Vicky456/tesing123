Lyte.Component.register('lyte-dropdown',{
_template:"<template tag-name=\"lyte-dropdown\">\t<lyte-yield yield-name=\"yield\" style=\"display: none;\"></lyte-yield>\t<template is=\"if\" value=\"{{expHandlers(ltPropHover,'==',true)}}\"><template case=\"true\">\t\t<template is=\"if\" value=\"{{expHandlers(multiple,'==',true)}}\"><template case=\"true\">\t\t\t<template is=\"if\" value=\"{{expHandlers(search,'==',true)}}\"><template case=\"true\">\t\t\t\t<template is=\"if\" value=\"{{expHandlers(drophead,'==','noyield')}}\"><template case=\"true\">\t\t\t\t\t<lyte-drop-button>\t\t\t\t\t\t<div class=\"lyteMultiselect\">\t\t\t\t\t\t\t<ul class=\"lyteMultipleSelect\">\t\t\t\t\t\t\t\t<template is=\"for\" items=\"{{allSelected}}\" item=\"item\" index=\"indexVal\">\t\t\t\t\t\t\t\t\t<li data-value=\"{{item['value']}}\">\t\t\t\t\t\t\t\t\t\t<span class=\"lyteDropdownVisible\">{{item['display']}}</span>\t\t\t\t\t\t\t\t\t\t<lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove>\t\t\t\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\t</template>\t\t\t\t\t\t\t</ul>\t\t\t\t\t\t\t<input type=\"text\" class=\"lyteDropdownTextField\" autocomplete=\"off\" tabindex=\"{{ltPropTabindex}}\" onclick=\"{{action('showHide',event)}}\">\t\t\t\t\t\t</div>\t\t\t\t\t</lyte-drop-button>\t\t\t\t</template><template case=\"false\">\t\t\t\t</template></template>\t\t\t</template><template case=\"false\">\t\t\t\t<template is=\"if\" value=\"{{expHandlers(drophead,'==','noyield')}}\"><template case=\"true\">\t\t\t\t\t<div class=\"lyteDummyEventContainer\" onclick=\"{{action('showHide',event)}}\" onkeyup=\"{{action('checkKey',event)}}\" tabindex=\"{{ltPropTabindex}}\">\t\t\t\t\t\t<lyte-drop-button>\t\t\t\t\t\t\t<ul class=\"lyteMultipleSelect\">\t\t\t\t\t\t\t\t<template is=\"for\" items=\"{{allSelected}}\" item=\"item\" index=\"indexVal\">\t\t\t\t\t\t\t\t\t<li data-value=\"{{item['value']}}\">\t\t\t\t\t\t\t\t\t\t<span class=\"lyteDropdownVisible\">{{item['display']}}</span>\t\t\t\t\t\t\t\t\t\t<lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove>\t\t\t\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\t</template>\t\t\t\t\t\t\t</ul>\t\t\t\t\t\t</lyte-drop-button>\t\t\t\t\t</div>\t\t\t\t</template><template case=\"false\">\t\t\t\t</template></template>\t\t\t</template></template>\t\t</template><template case=\"false\">\t\t\t<div onmouseenter=\"{{action('showHide',event,'enter')}}\" onmouseleave=\"{{action('closeIt',event)}}\" class=\"lyteDummyEventContainer\" tabindex=\"{{ltPropTabIndex}}\" style=\"display: inline-block;\">\t\t\t\t<template is=\"if\" value=\"{{expHandlers(drophead,'==','noyield')}}\"><template case=\"true\">\t\t\t\t\t<lyte-drop-button>\t\t\t\t\t\t<span class=\"lyteMarginRight\">{{displayvalue}}</span>\t\t\t\t\t\t<lyte-icon class=\"{{ltPropIconClass}}\"></lyte-icon>\t\t\t\t\t</lyte-drop-button>\t\t\t\t</template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(drophead,'==','yield')}}\"><template case=\"true\">\t\t\t\t\t\t\t\t\t</template></template></template></template>\t\t\t</div>\t\t</template></template>\t</template><template case=\"false\">\t\t<template is=\"if\" value=\"{{expHandlers(multiple,'==',true)}}\"><template case=\"true\">\t\t\t<template is=\"if\" value=\"{{expHandlers(search,'==',true)}}\"><template case=\"true\">\t\t\t\t<template is=\"if\" value=\"{{expHandlers(drophead,'==','noyield')}}\"><template case=\"true\">\t\t\t\t\t<lyte-drop-button>\t\t\t\t\t\t<div class=\"lyteMultiselect\">\t\t\t\t\t\t\t<ul class=\"lyteMultipleSelect\">\t\t\t\t\t\t\t\t<template is=\"for\" items=\"{{allSelected}}\" item=\"item\" index=\"indexVal\">\t\t\t\t\t\t\t\t\t<li data-value=\"{{item['value']}}\">\t\t\t\t\t\t\t\t\t\t<span class=\"lyteDropdownVisible\">{{item['display']}}</span>\t\t\t\t\t\t\t\t\t\t<lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove>\t\t\t\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\t</template>\t\t\t\t\t\t\t</ul>\t\t\t\t\t\t\t<input type=\"text\" class=\"lyteDropdownTextField\" autocomplete=\"off\" tabindex=\"{{ltPropTabindex}}\" onclick=\"{{action('showHide',event)}}\">\t\t\t\t\t\t</div>\t\t\t\t\t</lyte-drop-button>\t\t\t\t</template><template case=\"false\">\t\t\t\t\t<div class=\"lyteDummyEventContainer\" tabindex=\"{{ltPropTabIndex}}\" style=\"display: inline-block;\" onclick=\"{{action('showHide',event)}}\">\t\t\t\t\t</div>\t\t\t\t</template></template>\t\t\t</template><template case=\"false\">\t\t\t\t<div class=\"lyteDummyEventContainer\" onclick=\"{{action('showHide',event)}}\" onkeyup=\"{{action('checkKey',event)}}\" tabindex=\"{{ltPropTabindex}}\">\t\t\t\t<template is=\"if\" value=\"{{expHandlers(drophead,'==','noyield')}}\"><template case=\"true\">\t\t\t\t\t<lyte-drop-button>\t\t\t\t\t\t<ul class=\"lyteMultipleSelect\">\t\t\t\t\t\t\t<template is=\"for\" items=\"{{allSelected}}\" item=\"item\" index=\"indexVal\">\t\t\t\t\t\t\t\t<li data-value=\"{{item['value']}}\">\t\t\t\t\t\t\t\t\t<span class=\"lyteDropdownVisible\">{{item['display']}}</span>\t\t\t\t\t\t\t\t\t<lyte-drop-remove class=\"lyteCloseIcon\"></lyte-drop-remove>\t\t\t\t\t\t\t\t</li>\t\t\t\t\t\t\t</template>\t\t\t\t\t\t</ul>\t\t\t\t\t</lyte-drop-button>\t\t\t\t</template><template case=\"false\">\t\t\t\t</template></template>\t\t\t\t</div>\t\t\t</template></template>\t\t</template><template case=\"false\">\t\t\t<div onclick=\"{{action('showHide',event)}}\" class=\"lyteDummyEventContainer\" tabindex=\"{{ltPropTabIndex}}\" style=\"display: inline-block;\">\t\t\t\t<template is=\"if\" value=\"{{expHandlers(drophead,'==','noyield')}}\"><template case=\"true\">\t\t\t\t\t<lyte-drop-button>\t\t\t\t\t\t<span class=\"lyteMarginRight\">{{displayvalue}}</span>\t\t\t\t\t\t<lyte-icon class=\"{{ltPropIconClass}}\"></lyte-icon>\t\t\t\t\t</lyte-drop-button>\t\t\t\t</template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(drophead,'==','yield')}}\"><template case=\"true\">\t\t\t\t\t\t\t\t\t</template></template></template></template>\t\t\t</div>\t\t</template></template>\t</template></template>\t\t<template is=\"if\" value=\"{{expHandlers(ltPropHover,'==',false)}}\"><template case=\"true\">\t\t\t<template is=\"if\" value=\"{{expHandlers(dropbody,'==','noyield')}}\"><template case=\"true\">\t\t\t\t<lyte-drop-box class=\"lyteDropdownHidden\">\t\t\t\t<lyte-drop-body>\t\t\t\t\t<template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"indexVal\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(item)}}\"><template case=\"true\">\t\t\t\t\t\t\t<lyte-drop-group>\t\t\t\t\t\t\t\t<lyte-drop-label>{{lyteUiReturnOnlyKey(item)}}</lyte-drop-label>\t\t\t\t\t\t\t\t<template is=\"for\" items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subitem\" index=\"indexval\">\t\t\t\t\t\t\t\t\t<template is=\"if\" value=\"{{lyteUiIsObject(subitem)}}\"><template case=\"true\">\t\t\t\t\t\t\t\t\t\t<lyte-drop-item data-value=\"{{subitem[ltPropSystemValue]}}\">{{subitem[ltPropUserValue]}}</lyte-drop-item>\t\t\t\t\t\t\t\t\t</template><template case=\"false\">\t\t\t\t\t\t\t\t\t\t<lyte-drop-item data-value=\"{{subitem}}\">{{subitem}}</lyte-drop-item>\t\t\t\t\t\t\t\t\t</template></template>\t\t\t\t\t\t\t\t</template>\t\t\t\t\t\t\t</lyte-drop-group>\t\t\t\t\t\t</template><template case=\"false\">\t\t\t\t\t\t\t<template is=\"if\" value=\"{{lyteUiIsObject(item)}}\"><template case=\"true\">\t\t\t\t\t\t\t\t<lyte-drop-item data-value=\"{{item[ltPropSystemValue]}}\">{{item[ltPropUserValue]}}</lyte-drop-item>\t\t\t\t\t\t\t</template><template case=\"false\">\t\t\t\t\t\t\t\t<lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item>\t\t\t\t\t\t\t</template></template>\t\t\t\t\t\t</template></template>\t\t\t\t\t</template>\t\t\t\t\t\t\t\t\t</lyte-drop-body>\t\t\t\t</lyte-drop-box>\t\t\t</template><template case=\"false\">\t\t\t</template></template>\t\t\t<div class=\"lyteLoadMsg\" style=\"display:none;\">Loading</div>\t\t</template><template case=\"false\">\t\t\t<template is=\"if\" value=\"{{expHandlers(dropbody,'==','noyield')}}\"><template case=\"true\">\t\t\t\t<lyte-drop-box>\t\t\t\t<lyte-drop-body>\t\t\t\t\t<template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"indexVal\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(item)}}\"><template case=\"true\">\t\t\t\t\t\t\t<lyte-drop-group>\t\t\t\t\t\t\t\t<lyte-drop-label>lyteUiReturnOnlyKey(item)</lyte-drop-label>\t\t\t\t\t\t\t\t<template is=\"for\" items=\"{{lyteUiReturnValueBy(item,lyteReturnOnlyKey(item))}}\" item=\"subitem\" index=\"indexval\">\t\t\t\t\t\t\t\t\t<template is=\"if\" value=\"{{lyteUiIsObject(subitem)}}\"><template case=\"true\">\t\t\t\t\t\t\t\t\t\t<lyte-drop-item data-value=\"{{subitem[ltPropSystemValue]}}\">{{subitem[ltPropUserValue]}}</lyte-drop-item>\t\t\t\t\t\t\t\t\t</template><template case=\"false\">\t\t\t\t\t\t\t\t\t\t<lyte-drop-item data-value=\"{{subitem}}\">{{subitem}}</lyte-drop-item>\t\t\t\t\t\t\t\t\t</template></template>\t\t\t\t\t\t\t\t</template>\t\t\t\t\t\t\t</lyte-drop-group>\t\t\t\t\t\t</template><template case=\"false\">\t\t\t\t\t\t\t<template is=\"if\" value=\"{{lyteUiIsObject(item)}}\"><template case=\"true\">\t\t\t\t\t\t\t\t<lyte-drop-item data-value=\"{{item[ltPropSystemValue]}}\">{{item[ltPropUserValue]}}</lyte-drop-item>\t\t\t\t\t\t\t</template><template case=\"false\">\t\t\t\t\t\t\t\t<lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item>\t\t\t\t\t\t\t</template></template>\t\t\t\t\t\t</template></template>\t\t\t\t\t</template>\t\t\t\t</lyte-drop-body>\t\t\t\t</lyte-drop-box>\t\t\t</template><template case=\"false\">\t\t\t</template></template>\t\t\t<div class=\"lyteLoadMsg\" style=\"display:none;\">Loading</div>\t\t</template></template></template>",
_dynamicNodes : [{"type":"insertYield","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"componentDynamic","position":[1,1]}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}],
_observedAttributes :["changeItToInvoke","dummy1","dummy2","ltPropYield","ltPropType","ltPropTabindex","ltPropShow","ltPropFreeze","ltPropOptions","ltPropUserValue","ltPropSystemValue","ltPropPosition","ltPropIconClass","ltPropSelected","ltPropCallout","ltPropPlaceHolder","ltPropDisabled","ltPropHover","ltPropNoResult","ltPropInputClass","allSelected","ltPropBoundary","pos","firePos"],
	init:function(){
		if(!document.querySelector('#lytedropdownfreezelayer')){
			var freezeLayer ;
			freezeLayer = document.createElement('div')
			freezeLayer.setAttribute('id','lytedropdownfreezelayer')
			freezeLayer.style.display = 'none'
			freezeLayer.style.opacity = "0.01"
			freezeLayer.style.background = "#fff"
			document.body.appendChild(freezeLayer)
		}
		this.$node.toggle = function(event,type){
			var val = event?event:undefined
			if(this.component.getData('ltPropDisabled')){
				return ;
			}
			this.constructor._actions.showHide.call(this.component,val,type)
		}
		if(this.getData('ltPropType').indexOf('multiple') != -1){
			this.setData('multiple',true)
			this.setData('allSelected',[])
			if(!this.getData('ltPropSelected')){
				this.setData('ltPropSelected',"[]")
			}

			//this.$node.style.width = "100%"  
		}
		if(this.getData('ltPropType').indexOf('multisearch') != -1){
			this.setData('multiple',true)
			this.setData('search',true)
			this.setData('allSelected',[])
			if(!this.getData('ltPropSelected')){
				this.setData('ltPropSelected',"[]")
			}

			//This was here for no reason
			//this.$node.style.width = "100%"  
		}
	},
	didDestroy:function(){
		if(this.childComp){
			this.childComp.remove();
		}
		if(this.$node.mutobserver){
			this.$node.mutobserver.disconnect()
		}
	},
	didConnect:function(){
			if(!this.$node.querySelector('lyte-drop-button')){
				this.setData('drophead','noyield')
			}
			else{
				this.setData('drophead','yield')
				LyteComponent.appendChild(this.$node.querySelector('.lyteDummyEventContainer'),this.$node.querySelector('lyte-drop-button'))
			}
			if(!this.$node.querySelector('lyte-drop-box')){
				this.setData('dropbody','noyield')
			}
			else{
				this.setData('dropbody','yield')
				this.$node.querySelector('lyte-drop-box').classList.add('lyteDropdownHidden')
			}
			var lytedrophead = this.$node.querySelector('lyte-drop-button')

			var lytedropbox = this.$node.querySelector('lyte-drop-box')

			// Mutation observer
			//var lytedropbody = this.$node.querySelector('lyte-drop-body')
			this.$node.mutobserver = new MutationObserver(function(mutations) {
				var dropbox = this.childComp?this.childComp:this.$node.querySelector('lyte-drop-box')
				if(dropbox.classList.contains('lyteDropdownHidden')){
					return ;
				}
				if(this.getData('multiple')){
					var notselected = false
					for(var i=0;i<mutations.length;i++){
						var allCases = mutations[i].attributeName == 'selected' ||
						(mutations[i].attributeName == 'class' && !mutations[i].target.classList.contains('lyteArrow')) ||
						(mutations[i].attributeName == 'style' && mutations[i].target.tagName != 'LYTE-DROP-BOX' && !mutations[i].target.classList.contains('lyteArrow')) 
						if(allCases){
							notselected = true
							break;
						}
					}
					if(notselected){
						this.setCss()
					}
				}
				else{
					var notselected = false
					var stylemutations = false
					for(var i=0;i<mutations.length;i++){
						if(mutations[i].attributeName == 'style' && mutations[i].target.tagName == 'LYTE-DROP-BOX'){
							stylemutations = true
						}
					}
					for(var i=0;i<mutations.length;i++){
						var allCases =   
						(mutations[i].attributeName == 'style' && mutations[i].target.tagName != 'LYTE-DROP-BOX' && !mutations[i].target.classList.contains('lyteArrow')) ||
						(mutations[i].attributeName == 'class' && !mutations[i].target.classList.contains('lyteArrow'))

						// If a class mutation happened,check if there is a style mutation in LYTE-DROP-BOX. If there is then do nothing
						if(allCases && mutations[i].attributeName == 'class' && mutations[i].target.tagName == 'LYTE-DROP-BOX'){
							if(!stylemutations){
								notselected = true
								break;
							}
						}
						else if(allCases){
							notselected = true
						}
					}
					if(notselected){
						this.setCss()
					}
				}
			}.bind(this));
			var config = { attributes: true,subtree:true,attributeOldValue:true }
			this.$node.mutobserver.observe(lytedropbox, config);
			// Mutation observer ends

			var noresultdiv = document.createElement('div')
			noresultdiv.setAttribute('class','lyteDropdownNoResult')
			noresultdiv.textContent = 'No Results Found'
			noresultdiv.style.display = 'none'
			lytedropbox.appendChild(noresultdiv)
			lytedropbox.addEventListener('click',function(event){
				this.actions.processElements.call(this,event)
			}.bind(this))
			if(this.getData('ltPropHover')){
				lytedropbox.addEventListener('mouseout',function(event){
					this.actions.closeIt.call(this,event)
				}.bind(this))
			}
			var span = document.createElement('span')
			span.setAttribute('class','lyteArrow')
			lytedropbox.insertBefore(span,lytedropbox.children[0])

			//We need to set the first value in the dropdown as the selected one
			if(!this.getData('ltPropSelected') && this.getData('ltPropOptions').length > 0){
				var firstElement = this.getData('ltPropOptions')[0]
				var flag = false
				var value
				if(firstElement.constructor == Object)
            	{
             		if(Object.keys(firstElement).length == 1)		
	              		{
	              			value = firstElement[Object.keys(firstElement)[0]]
	              			if(value.constructor == Array)
	                  		{
	                      		flag = true
	                  		}
	               		}   
           		}
           		if(flag){
           			if ( Object.prototype.toString.call(value[0]) === "[object Object]" ) {
           				this.setData('ltPropSelected',value[0][this.getData('ltPropSystemValue')])
           			}
           			else{
           				this.setData('ltPropSelected',value[0])
           			}
           		}
           		else{
           			if ( Object.prototype.toString.call(firstElement) === "[object Object]" ) {
           				this.setData('ltPropSelected',firstElement[this.getData('ltPropSystemValue')])
           			}
           			else{
           				this.setData('ltPropSelected',firstElement)
           			}
           		}
				// var keys = Object.keys(this.getData('ltPropOptions')[0])
				// if(keys.length == 1 && keys[0] != this.getData('ltPropSystemValue')){
				// 	if(this.getData('ltPropDataType') == "arrayOfObjects"){
				// 		this.setData('ltPropSelected',this.getData('ltPropOptions')[0][keys][0][this.getData('ltPropSystemValue')])
				// 	}
				// 	else{
				// 		this.setData('ltPropSelected',this.getData('ltPropOptions')[0][keys][0])
				// 	}
				// }
				// else{
				// 	if(this.getData('ltPropDataType') == "arrayOfObjects"){
				// 		this.setData('ltPropSelected',this.getData('ltPropOptions')[0][this.getData('ltPropSystemValue')])
				// 	}
				// 	else{
				// 		this.setData('ltPropSelected',this.getData('ltPropOptions')[0])
				// 	}
				// }
			}
			else if(!this.getData('ltPropSelected') && this.getData('dropbody') == "yield" && this.getData('ltPropType') != 'multiple' && this.getData('ltPropType') != 'multisearch'){ 
				var node = this.$node.querySelector('lyte-drop-item')
				if(node){
					node.setAttribute('selected',true)
				}
			}
			if(this.getData('ltPropDisabled')){
				this.$node.querySelector('[tabindex]').classList.add('lyteDropdown-disabled')
				this.$node.querySelector('[tabindex]').setAttribute('tabindex',-1) 
			}
			else{
				this.$node.querySelector('[tabindex]').classList.remove('lyteDropdown-disabled')
				this.$node.querySelector('[tabindex]').setAttribute('tabindex',this.getData('ltPropTabindex'))
			}
			this.$node.querySelector('[tabindex]').addEventListener('keyup',function(event){
				this.$node.constructor._actions.checkKey.call(this,event)
			}.bind(this))
			//this.$node.constructor._observers[0].value.call(this)
			this.setData('changeItToInvoke',this.getData('changeItToInvoke') + 1)
		if(this.getData('ltPropShow')){
			this.setData('ltPropShow',false)
			this.$node.toggle()
			this.$node.querySelector('[tabindex]').focus()
			var position = this.$node.getBoundingClientRect()
			if(position.left < 0 || position.top < 0){ // This doesn't work exactly it can be behind a overflow'd div and still not be visible.
				this.$node.scrollIntoView()
			}
		}
	},
	firePosCallBack: function(){
		if(this.getMethods('onPositionChanged') && this.getData('pos') !== ''){
			this.executeMethod('onPositionChanged',this.getData('pos'),this)
		}
	}.observes('pos','firePos'),
	returnValueBy:function(content,key){
		if(key){
			return content[key]
		}
		return content
	},
	findParent:function(){
		if(this.getData('buttondisplay')){
			return this.$node.querySelector('.lyteDropdownButtonContainer')
		}
		else if(this.getData('multiple')){
			return this.$node.querySelector('.lyteMultiselect')
		}
		else{
			return this.$node.querySelector('.lyteDropdownElement1')
		}
	},
	setProperWidth:function(dropdownbutton,bcr,dropdownwidth){
		// if(this.getData('ltPropType') == 'multisearch'){
		// 	return ;
		// }
		// var selectbox = dropdownbutton
		// var selectboxwidth = bcr.width
		// var dropdown = this.childComp
		// var style = dropdown.getAttribute('style')
		// style = style?style:''
		// var width = dropdownwidth
		// // dropdown.setAttribute('style',style + 'width:' + width + '!important;')
		// // var dropdownwidth = dropdown.getBoundingClientRect().width

		// if(selectboxwidth > dropdownwidth){
		// 	var style = dropdown.getAttribute('style')
		// 	style = style?style:''
		// 	dropdown.setAttribute('style',style + 'width: auto!important;')
		// }
		// else if(selectboxwidth < dropdownwidth){
		// 	var style = dropdown.getAttribute('style')
		// 	style = style?style:''
		// 	dropdown.setAttribute('style',style + 'width: auto!important;')
		// }			
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
		if(!this.childComp || this.childComp.classList.contains('lyteDropdownHidden')){
			return;
		}
		var dummy
		var xscroll = window.pageXOffset || document.documentElement.scrollLeft
		var yscroll = window.pageYOffset || document.documentElement.scrollTop
		var parNode = this.$node.querySelector('lyte-drop-button')
		var bcr = parNode.getBoundingClientRect()

		var elem1= this.childComp
		var elembcr = elem1.getBoundingClientRect()
		var ewidth=elem1.offsetWidth
		if(!onlyScroll){

			// Change this guys position over here
			this.setProperWidth(parNode,bcr,ewidth) //This needs a lot of reviewing because of the bad code in it
		}
		var wwidth=window.innerWidth
		var wheight=window.innerHeight
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
				this.setData('pos','down')
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowTop')
					var arrowHeight = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					var pxpos = arrowHeight.indexOf('px')
					arrowHeight = Number(arrowHeight.substring(0,pxpos))
					
					elem1.style.top = this.setTopBelowForDown(parNode,bcr,yscroll) + arrowHeight + 'px'

				}
				else{ 
					elem1.style.top = this.setTopBelowForDown(parNode,bcr,yscroll) + 'px'
				}
				
			}
			else{
				this.setData('pos','up')
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowBottom')
					var arrowHeight = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
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
					var widthToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					widthToAdd = Number(widthToAdd.substring(0,widthToAdd.indexOf('px')))
					var marginLeft = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginLeft
					marginLeft = Math.abs(Number(marginLeft.substring(0,marginLeft.indexOf('px'))))
					var num = bcr.width/2 - widthToAdd + marginLeft // We removed arrow.offsetWidth because it was giving width as 0 px
					var denom = ewidth/100
					var per = num/denom
					arrow.style.left = per +"%" 
				}
				elem1.style.left= this.setLeftNotExceedForDown(parNode,bcr,xscroll) + 'px'
			}
			else{
				if(this.getData('ltPropCallout')){
					var widthToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					widthToAdd = Number(widthToAdd.substring(0,widthToAdd.indexOf('px')))
					var marginLeft = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginLeft
					marginLeft = Math.abs(Number(marginLeft.substring(0,marginLeft.indexOf('px'))))
					var denom = ewidth/100
					var num = ewidth - (bcr.width/2) - widthToAdd + marginLeft // We removed arrow.offsetWidth because it was giving width as 0 px
					var per = num/denom 
					arrow.style.left = per +"%" 
				}
				elem1.style.left = this.setLeftExceedForDown(parNode,elem1,bcr,elembcr,xscroll) + 'px'
			}
		}
		else if(this.getData('ltPropPosition') == 'right'){
			var rightflag = true
			if(bcr.left + bcr.width + ewidth > window.innerWidth && bcr.left - elembcr.width > 0){   
				rightflag = false
				
			}
			else{
				rightflag = true
			}
			var downflag = true
			if(bcr.top + elembcr.height > window.innerHeight){
				downflag = false
				
			}
			else{
				downflag = true
			}
			if(rightflag){
				this.setData('pos','right')
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowLeft')
					var arrowWidth = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					var pxpos = arrowWidth.indexOf('px')
					arrowWidth = Number(arrowWidth.substring(0,pxpos))
					elem1.style.left = this.setLeftForRight(parNode,bcr,xscroll) + arrowWidth + "px"
				}
				else{
					elem1.style.left= this.setLeftForRight(parNode,bcr,xscroll) + 'px'
				}
			}
			else{
				this.setData('pos','left')
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowRight')
					var arrowWidth = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
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
					var heightToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					heightToAdd = Number(heightToAdd.substring(0,heightToAdd.indexOf('px')))
					var marginTop = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginTop
					marginTop = Math.abs(Number(marginTop.substring(0,marginTop.indexOf('px'))))
					var num = ((bcr.height/2) - heightToAdd  + marginTop) * 100 // Had arrow.getBoundingClientRect()/2 removed cos its value is 0
					var denom = elembcr.height
					var per = num/denom
					arrow.style.top = per + "%"
				}
				elem1.style.top = this.setTopForRight(parNode,bcr,yscroll) + 'px' 
			}
			else{
				if(this.getData('ltPropCallout')){
					var heightToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					heightToAdd = Number(heightToAdd.substring(0,heightToAdd.indexOf('px')))
					var marginTop = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginTop
					marginTop = Math.abs(Number(marginTop.substring(0,marginTop.indexOf('px'))))
					var num = (elembcr.height - bcr.height/2 - heightToAdd + marginTop) * 100 // Had arrow.getBoundingClientRect()/2 
					var denom = elembcr.height
					var per = num/denom
					arrow.style.top = per +"%"
				} 
				elem1.style.top = this.setTopForRightAbove(parNode,elem1,bcr,elembcr,yscroll) + "px"
			}
		}
		else if(this.getData('ltPropPosition') == 'up'){
			var topflag = true
			if(bcr.top - elembcr.height < 0 && bcr.top + bcr.height + eheight < wheight){
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
				this.setData('pos','up')
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowBottom')
					var arrowHeight = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					var pxpos = arrowHeight.indexOf('px')
					arrowHeight = Number(arrowHeight.substring(0,pxpos))
					elem1.style.top = this.setTopAboveForDown(parNode,elem1,bcr,elembcr,yscroll) - arrowHeight +"px"	
				}
				else{
					elem1.style.top = this.setTopAboveForDown(parNode,elem1,bcr,elembcr,yscroll) + 'px'
				}
			}
			else{
				this.setData('pos','down')
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowTop')
					var arrowHeight = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
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
					var widthToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					widthToAdd = Number(widthToAdd.substring(0,widthToAdd.indexOf('px')))
					var marginLeft = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginLeft
					marginLeft = Math.abs(Number(marginLeft.substring(0,marginLeft.indexOf('px'))))
					var num = bcr.width/2 + marginLeft - widthToAdd // We removed arrow.offsetWidth because it was giving width as 0 px
					var denom = ewidth/100
					var per = num/denom
					arrow.style.left = per +"%" 
				}
				elem1.style.left= this.setLeftNotExceedForDown(parNode,bcr,xscroll) +'px'
			}
			else{
				if(this.getData('ltPropCallout')){
					var widthToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					widthToAdd = Number(widthToAdd.substring(0,widthToAdd.indexOf('px')))
					var marginLeft = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginLeft
					marginLeft = Math.abs(Number(marginLeft.substring(0,marginLeft.indexOf('px'))))
					var denom = ewidth/100
					var num = ewidth - (bcr.width/2) + marginLeft - widthToAdd // We removed arrow.offsetWidth because it was giving width as 0 px
					var per = num/denom 
					arrow.style.left = per +"%" 
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
			if(bcr.top + elembcr.height > window.innerHeight){
				downflag = false
				
			}
			else{
				downflag = true
			}
			if(leftflag){
				this.setData('pos','left')
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowRight')
					var arrowWidth = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					var pxpos = arrowWidth.indexOf('px')
					arrowWidth = Number(arrowWidth.substring(0,pxpos))
					elem1.style.left = this.setRightForRight(parNode,elem1,bcr,elembcr,xscroll) - arrowWidth + "px"
				}
				else{
					elem1.style.left = this.setRightForRight(parNode,elem1,bcr,elembcr,xscroll) + 'px'
				}	
			}
			else{
				this.setData('pos','right')
				if(this.getData('ltPropCallout')){
					this.setCorrectClass('lyteArrowLeft')
					var arrowWidth = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
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
					var heightToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					heightToAdd = Number(heightToAdd.substring(0,heightToAdd.indexOf('px')))
					var marginTop = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginTop
					marginTop = Math.abs(Number(marginTop.substring(0,marginTop.indexOf('px'))))
					var num = ((bcr.height/2) - heightToAdd + marginTop) * 100 // Had arrow.getBoundingClientRect()/2 
					var denom = elembcr.height
					var per = num/denom
					arrow.style.top = per + "%"
				}
				elem1.style.top = this.setTopForRight(parNode,bcr,yscroll) + 'px'
			}
			else{
				if(this.getData('ltPropCallout')){
					var heightToAdd = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').borderWidth
					heightToAdd = Number(heightToAdd.substring(0,heightToAdd.indexOf('px')))
					var marginTop = window.getComputedStyle(this.childComp.querySelector('.lyteArrow'), ':before').marginTop
					marginTop = Math.abs(Number(marginTop.substring(0,marginTop.indexOf('px'))))
					var num = (elembcr.height - bcr.height/2 - heightToAdd + marginTop) * 100 // Had arrow.getBoundingClientRect()/2 
					var denom = elembcr.height
					var per = num/denom
					arrow.style.top = per +"%" 
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
	getScrollParent:function(node){
		if(node === null){
			return null;
		}
		if (node.scrollHeight > node.clientHeight) {
    		return node;
  		} else {
    		return this.getScrollParent(node.parentNode);
  		}
	},
	setFreezeLayer:function(){
		var node = document.getElementById('lytedropdownfreezelayer')
		node.style.display = "block"
		node.style.height = window.innerHeight +"px"
		node.style.width = window.innerWidth + "px"
		node.style.top = "0px"
		node.style.left = "0px"
		node.style.position = "fixed"
		var lytedropdown = this.childComp
		//node.style.zIndex = 
		node.classList.add('lyteDropdownZIndex')
		node.style.overflow = "hidden"
		var body = document.body
		body.style.overflow = 'hidden'
	},
	scrollIntoView:function(element,move){
		var parent = this.childComp.querySelector('lyte-drop-body')
		var offsetTop = element.offsetTop
		var scrolledValue = parent.scrollTop
		var parentHeight = parent.getBoundingClientRect().height
		var elementHeight = element.getBoundingClientRect().height
		if(move == "down" && scrolledValue + parentHeight < offsetTop + elementHeight){
			parent.scrollTop = parent.scrollTop + offsetTop + elementHeight - (parentHeight + scrolledValue)
		}
		else if(move == "up" && offsetTop < scrolledValue){
			parent.scrollTop = offsetTop
		}
	},
	ltPropSelectedChanged:function(){

		if(this.getData('multiple')){
			var parent = this.childComp?this.childComp:this.$node.querySelector('lyte-drop-box')   //Wormhole has been formed
			if(!this.getData('ltPropSelected')){
				return ;
			}
			try{
			var selected = JSON.parse(this.getData('ltPropSelected'))
			}
			catch(err){
				console.error('Could not parse ltPropSelected',err)
				return ;
			} 
			var display = this.getData('allSelected')
			for(var i=0;i<selected.length;i++){
				var flag = true
				for(var j=0;j<display.length;j++){
					if(selected[i] == display[j].value){
						flag = false
						break
					}
				}
				if(flag){
					var valToBeSet = {}
					valToBeSet.value = selected[i]
					valToBeSet.display = parent.querySelector('[data-value="'+selected[i]+'"]').textContent
					if(!valToBeSet.display){
						continue
					}
					Lyte.arrayUtils(this.getData('allSelected'),'push',valToBeSet)
				}
			}
			
		}
		else if(this.getData('drophead') != 'yield'){
			var parent = this.childComp?this.childComp:this.$node.querySelector('lyte-drop-box')   //Wormhole has been formed
			var node = parent.querySelector('[data-value="'+ this.getData('ltPropSelected') +'"]')
			var selecteds = parent.querySelectorAll('[selected]')
			for(var i=0;i<selecteds.length;i++){
				if(selecteds[i].getAttribute('data-value') != this.getData('ltPropSelected')){
					selecteds[i].removeAttribute('selected')
				}
			}
			if(node){
				var innerText = node.textContent
				this.setData('displayvalue',innerText)
			}
		}

		//why????
		// To set selected to true to the ltPropSelected node
		if(node && !node.hasAttribute('selected')){
			node.setAttribute("selected","true")
		}		
	}.observes('ltPropSelected','changeItToInvoke'),
	changeCSSForItemLengthChange:function(){
		//this.setCss()
	}.observes('ltPropOptions.[]'),
	tabindexobserver:function(){
		if(this.getData('ltPropDisabled')){
			this.$node.querySelector('[tabindex]').classList.add('lyteDropdown-disabled')
			this.$node.querySelector('[tabindex]').tabIndex = -1
		}
		else{
			this.$node.querySelector('[tabindex]').classList.remove('lyteDropdown-disabled')
			this.$node.querySelector('[tabindex="-1"]').tabIndex = this.getData('ltPropTabindex')
		}
	}.observes('ltPropDisabled'),
	data:function(){
        return {
        	'changeItToInvoke':Lyte.attr("number",{"default":1}),
        	'dummy1':Lyte.attr("boolean",{"default":true}),
        	'dummy2':Lyte.attr("boolean",{"default":false}),
        	'ltPropYield':Lyte.attr("boolean",{"default":false}),
        	'ltPropType':Lyte.attr("string",{"default":''}),
        	'ltPropTabindex':Lyte.attr("number",{"default":0}),
        	'ltPropShow':Lyte.attr("boolean",{"default":false}),
        	'ltPropFreeze':Lyte.attr("boolean",{"default": true}),
        	'ltPropOptions':Lyte.attr("array",{"default":[]}),
        	'ltPropUserValue':Lyte.attr("string",{"default":undefined}),
			'ltPropSystemValue':Lyte.attr("string",{"default":undefined}),
			'ltPropPosition':Lyte.attr("string",{"default":'down'}),
			'ltPropIconClass':Lyte.attr("string",{"default":'dropdown'}),
			'ltPropSelected':Lyte.attr("string",{"default":''}),
			'ltPropCallout':Lyte.attr("boolean",{"default": false}),
			'ltPropPlaceHolder':Lyte.attr("string",{"default":''}),
			'ltPropDisabled':Lyte.attr("boolean",{"default": false}),
			'ltPropHover':Lyte.attr("boolean",{"default": false}),
			'ltPropNoResult':Lyte.attr("string",{"default":'No Results Found'}),
   			'ltPropInputClass':Lyte.attr("string",{"default":'lyteSearch'}),
   			'allSelected' : Lyte.attr("array", {"default" : []}),
   			'ltPropBoundary':Lyte.attr("object",{"default":{}}),
   			'pos':Lyte.attr("string",{"default":''}),
   			'firePos':Lyte.attr("number",{"default":1})
			// 'ltPropContainerClass':Lyte.attr("string",{"default":''}),
			// 'ltPropSlide':Lyte.attr("boolean",{"default": false}),
		}
	},
	actions:{
		closeIt:function(event){
			var mx = event.clientX,my = event.clientY
			var dp = this.$node.querySelector('lyte-drop-button')
			var dpt = dp.getBoundingClientRect().top,dph = dp.getBoundingClientRect().height
			var dpl = dp.getBoundingClientRect().left,dpw = dp.getBoundingClientRect().width
			var dc = this.childComp
			var dct = dc.getBoundingClientRect().top,dch = dc.getBoundingClientRect().height
			var dcl = dc.getBoundingClientRect().left,dcw = dc.getBoundingClientRect().width
			if((mx >= dpl && mx <= dpl + dpw && my >= dpt && my <= dpt + dph)|| (mx >= dcl && mx <= dcl + dcw && my >= dct && my <= dct + dch)){
				return ;
			}
			this.$node.toggle(event,"leave")
		},
		closedrop:function(event){  //May need to comment this
			if(this.getData('ltPropSearch') && event.relatedTarget == this.childComp.querySelector('input[type="text"]')){
				return ;
			}
			var ele = document.querySelectorAll('lyte-drop-body')
			if(ele.length > 0){
				for(var i=0;i<ele.length;i++){
					var cele = ele[i]
					if(!cele.classList.contains('lyteDropdownHidden')){
						cele.classList.add('lyteDropdownHidden')
					}
				}

			}
		},
		wormholeDidConnect : function(){
			if(this.getData('multiple') && this.getData('ltPropSelected').length>2){                    //Hide the filtered items in the dropdown list(CODE HELP)
				try{
					var selected = JSON.parse(this.getData('ltPropSelected'))
				}
				catch(err){
					console.error('Unable to parse ltPropSelected',err)
					return ;
				}
				for(var i=0;i<selected.length;i++){
					// Maybe need to add selected to true
					this.$node.querySelector('lyte-drop-body').querySelector('[data-value="'+selected[i]+'"]').classList.add('lyteDropdownActive')
				}
			}		
			this.childComp = this.$node.querySelector('lyte-drop-box')
			var that = this
			if(this.getData('ltPropType') == 'multisearch' && this.getData('drophead') != 'yield'){
				$L('.lyteDropdownTextField').search({
					scope:this.childComp,
					search:'lyte-drop-item',
					onSearch:function(result){
						for(var i=0;i<result.length;i++){
							if(!result[i].classList.contains('lyteDropdownActive')){
								var noresultdiv = that.childComp.querySelector('.lyteDropdownNoResult')
								if(noresultdiv){
									noresultdiv.style.display = 'none'
								}
								return ;
							}
						}
						if(that.childComp.querySelector('.lyteDropdownNoResult').style.display != 'none'){
							return ;
						}
						that.childComp.querySelector('.lyteDropdownNoResult').style.display = 'block'
					}
				})
			}
			LyteComponent.appendChild(document.body, this.childComp);
			this.childComp.origindd = this.$node
			//this.childComp.querySelector('lyte-drop-body').style.display = 'block'
			this.childComp.classList.remove('lyteDropdownHidden')
			// this.childComp.style.zIndex = 1010
			// this.childComp.style.position = 'absolute'
			//this.setCss.call(this)
			// if(this.getData('ltPropSlide')){  // TODO:Need to change this
			// 	this.childComp.classList.add('lyteDropdownSlide')
			// }
			if(this.getData('ltPropFreeze') && !this.getData('multiple') && !this.getData('ltPropHover')){
				this.setFreezeLayer()
			}

		},
		processElements:function(event){
			var ele =  event.target
			while(ele.tagName != 'HTML' && ele.tagName != 'LYTE-DROP-ITEM'){
				ele = ele.parentElement
			}
			if(ele.tagName == 'HTML'){               //Clicking on header should not trigger an event(CODE HELP)
				return false
			}
			if(!this.getData('multiple') && this.getData('drophead') != 'yield'){
				var node = this.childComp.querySelector('.lyteDropdownSelection')
				if(node){
					node.classList.remove('lyteDropdownSelection')
				}
				ele.setAttribute("selected","true")
				ele.classList.add('lyteDropdownSelection')
				if(this.getMethods('onOptionSelected')){
					this.executeMethod('onOptionSelected',event,this.getData('ltPropSelected'),this)
				}
				if(this.getMethods('onBeforeHide')){
					var result = this.executeMethod('onBeforeHide',event,this)
					result = result == undefined?true:false
					if(!result){
						return ;
					}
				} 
				this.childComp.classList.add('lyteDropdownHidden')
				document.querySelector('#lytedropdownfreezelayer').style.display = "none"
				this.childComp.style.top = ""
				this.childComp.style.left = ""
				this.childComp.style.width = ""
				if(this.getData('ltPropFreeze')){
					document.body.style.overflow = this.bodyoverflow?this.bodyoverflow:""
				}
				if(this.getMethods('onHide')){
					this.executeMethod('onHide',event,this)	
				}
				this.setData('pos','')
			}
			else if(this.getData('multiple')){
				var elements = this.childComp.querySelectorAll('lyte-drop-item')
				for(var i=0;i<elements.length;i++){
					if(elements[i].classList.contains('lyteDropdownSelection')){
						break;
					}
				}
				if(elements[i] != undefined){
					elements[i].classList.remove('lyteDropdownSelection')
					var j = i
					i++;j--;
					for(;i<elements.length;i++){
						if(!elements[i].classList.contains('lyteDropdownActive')){
							break
						}
					}
					if(i != elements.length){
						elements[i].classList.add('lyteDropdownSelection')
					}
					else{
						for(;j>-1;j--){
							if(!elements[j].classList.contains('lyteDropdownActive')){
								break
							}
						}
						if(j != -1){
							elements[j].classList.add('lyteDropdownSelection')
						}
					}
				}
				ele.setAttribute("selected","true")
				var src = ele.getAttribute('data-value') 

				// check this things position in code now.
				if(this.getMethods('onAdd')){
					this.executeMethod('onAdd',event,src,this.getData('ltPropSelected'),this)
				}
				this.childComp.querySelector('[data-value="'+src+'"]').classList.add('lyteDropdownActive')
				// All of this should happen only when a non-custom dropdown is given.
				var visiblenodes = this.childComp.querySelectorAll('lyte-drop-item:not(.lyteDropdownActive):not(.lyteSearchHidden)');
				if(visiblenodes.length == 0){
					if(this.childComp.querySelector('.lyteDropdownNoResult') && this.getData('ltPropType') !== 'multisearch' && this.getData('drophead') !== 'yield'){
						this.childComp.querySelector('.lyteDropdownNoResult').style.display = 'block'
					}
				}
				if(this.getData('drophead') == 'noyield' && this.getData('search')){
					this.$node.querySelector('input').focus()
				}
				// Dk why this was there
				// else{
				// 	this.$node.querySelector('.lyteDummyEventContainer').focus()
				// }
				this.setAlignment.call(this)
				var button = this.$node.querySelector('lyte-drop-button')
				this.setProperWidth.call(this,button,button.getBoundingClientRect(),button.offsetWidth)
			}
			else{	

				// Maybe need to set selected to true		
				if(this.childComp.querySelector('lyte-drop-item.lyteDropdownSelection')){
					this.childComp.querySelector('lyte-drop-item.lyteDropdownSelection').classList.remove('lyteDropdownSelection')
				}
				ele.classList.add('lyteDropdownSelection')
				this.setData('ltPropSelected',ele.getAttribute('data-value'))
				if(this.getMethods('onOptionSelected')){
					this.executeMethod('onOptionSelected',event,this.getData('ltPropSelected'),this)
				}
				if(this.getMethods('onBeforeHide')){
					var result = this.executeMethod('onBeforeHide',event,this)
					result = result == undefined?true:false
					if(!result){
						return ;
					}
				}
				this.childComp.classList.add('lyteDropdownHidden')
				document.querySelector('#lytedropdownfreezelayer').style.display = "none"
				if(this.getData('ltPropFreeze')){
					document.body.style.overflow = this.bodyoverflow?this.bodyoverflow:""
				}
				this.childComp.style.top = ""
				this.childComp.style.left = ""
				this.childComp.style.width = ""
				if(this.getMethods('onHide')){
					this.executeMethod('onHide',event,this)		
				}
				this.setData('pos','')
			}
		},
		callScroll:function(event){
			if(this.getMethods('onScroll')){
				
				var promise = this.executeMethod('onScroll',event,this)

				if(promise){
					if(!this.promises){
						this.promises = []
					}
					this.promises.push(promise)
					this.childComp.querySelector('.lyteLoadMsg').style.display = ""
				}
				else{
					Promise.all(this.promises).then(function(){
						this.childComp.querySelector('.lyteLoadMsg').style.display = "none"
						this.promises = [];
					}.bind(this))
				}
			}
		},
		closeFun:function(event){

			// This is for inbuilt error display
			if(this.childComp.querySelector('.lyteDropdownNoResult') && this.getData('ltPropType') !== 'multisearch' && this.getData('drophead') !== 'yield'){
				this.childComp.querySelector('.lyteDropdownNoResult').style.display='none'
			}
			var realNode = event.target
			while(!realNode.getAttribute('data-value') && realNode != undefined){
				realNode = realNode.parentElement
			}
			if(!realNode){
				return ;
			}
			var data = realNode.getAttribute('data-value')
			
				try{
					var selected = JSON.parse(this.getData('ltPropSelected'))
				}
				catch(err){
					console.err('unable to parse ltPropSelected',err)
				}
				var newarr = []
				for(var i=0;i<selected.length;i++){
					if(selected[i] == data){
						continue;
					}
					else{
						newarr.push(selected[i])
					}
				}
				if(this.getData('drophead') == 'noyield'){
					for(var i=0;i<this.getData('allSelected').length;i++){
						if(this.getData('allSelected')[i].value == data){
							Lyte.arrayUtils(this.getData('allSelected'),'removeAt',i)
							break;
						}
					}
				}
				var parent = this.childComp?this.childComp:this.$node.querySelector('lyte-drop-body')
				var node = parent.querySelector('[data-value="'+ data +'"]')
				node.removeAttribute('selected')
				var endString = '['
				for(var i = 0; i < newarr.length; i++){
					endString = endString + '"' + newarr[i] + '",'
				}
				endString = endString.substring(0,endString.length - 1)
				if(endString.length !== 0){
					endString = endString +']'
				}
				else {
					endString = '[]'
				}
				// This will call the ltpropselectedchange observer but nothing will come of it i think
				this.setData('ltPropSelected',endString)
				var topbox = this.childComp.querySelectorAll('[data-value="'+data+'"]')

				// This is for when the didn't render so there was no data
				if(topbox.length != 0){ 
					topbox[0].classList.remove('lyteDropdownActive')
					topbox[0].classList.remove('lyteSearchHidden')
				}
				if(this.childComp){
					this.setAlignment.call(this)
				}
				if(this.getMethods('onRemove')){
					this.executeMethod('onRemove',event,data,this.getData('ltPropSelected'),this)
				}

			event.stopPropagation()

		},
		searchAndCheck:function(event){
			this.$node.constructor._actions.checkKey.call(this,event)
		},
		searchAndOpen:function(event){
			this.$node.constructor._actions.showHide.call(this,event)
		},
		checkKey:function(event){
			if(event.keyCode == 9){
				this.$node.toggle(this,event)
				if(this.getData('ltPropType') == 'multisearch'){
					this.$node.querySelector('[type="text"]').focus()
				}
			}
		},
		showHide:function(event,eventtype){
			// For some unknow reason the dropdown closes when you hover over the select box to prevent this we are doing this and same for the opposite
				// if(event && event.target.tagName == 'LYTE-DROP-REMOVE'){
				// 	return ;
				// }
				if(eventtype == "enter"){
					if(this.childComp && !this.childComp.classList.contains('lyteDropdownHidden')){
						return ;
					}
					this.$node.querySelector('[tabindex]').focus()
				}
				if(eventtype == 'leave'){
					if(this.childComp && this.childComp.classList.contains('lyteDropdownHidden')){
						return ;
					}
				}

			if(!this.getData('ltPropShow')){
				if(this.getMethods('onBeforeShow')){
					if(!this.childComp){
						this.childComp = this.$node.querySelector('lyte-drop-box')
					}
					var result = this.executeMethod('onBeforeShow',event,this)
					result = result == undefined?true:false
					if(!result){
						return ;
					}
				}
				this.setData('ltPropShow',true)
				this.$node.constructor._actions.wormholeDidConnect.call(this)

				
				if(this.getMethods('onShow')){
					this.executeMethod('onShow',event,this)
				}
			}
			else if(this.childComp.classList.contains('lyteDropdownHidden')){
				if(this.getMethods('onBeforeShow')){
					var result = this.executeMethod('onBeforeShow',event,this)
					result = result == undefined?true:false
					if(!result){
						return ;
					}
				}
				this.childComp.classList.remove('lyteDropdownHidden')
				if(this.getMethods('onShow')){
					this.executeMethod('onShow',event,this)
				}
				//this.setCss.call(this)
				if(this.getData('ltPropFreeze') && !this.getData('multiple') && !this.getData('ltPropHover')){
					this.setFreezeLayer()
				}

			}
			else if(!this.getData('multiple')){
				if(this.getMethods('onBeforeHide')){
					var result = this.executeMethod('onBeforeHide',event,this)
					result = result == undefined?true:false
					if(!result){
						return ;
					}
				}
				this.childComp.classList.add('lyteDropdownHidden')
				document.querySelector('#lytedropdownfreezelayer').style.display = "none"
				if(this.getData('ltPropFreeze')){
					document.body.style.overflow = this.bodyoverflow?this.bodyoverflow:""
				}
				this.childComp.style.top = ""
				this.childComp.style.left = ""
				this.childComp.style.width = ""
				if(this.getMethods('onHide')){
					this.executeMethod('onHide',event,this)
					
				}
				this.setData('pos','')
			}
			
		}
	}
})
window.addEventListener('scroll',function(event){	
	//var ele =  document.querySelector('[class="lyteDropdownContainer"]') || document.querySelector('[class="lyteDropdownContainer lyteDropdownSlide"]')
	var ele = document.querySelector('lyte-drop-box:not(.lyteDropdownHidden)')
	var tempele = ele;
	if(!ele){
		return ;
	}
	while(ele.tagName != 'LYTE-DROP-BOX'){
		ele = ele.parentElement
	}
	var curscroll = event.target
	if(curscroll.nodeName == "#document"){     //This probably happens because scrollIntoView is used to focus the dropdown which is open at the start so the event.target is #document(CODE HELP)
		return ;
	}
	while(curscroll.tagName != "LYTE-DROP-BOX" && curscroll.tagName != 'HTML'){
		curscroll = curscroll.parentElement
	}
	if(curscroll.tagName == 'LYTE-DROP-BOX'){
		return ;
	}
	var dropdown = ele.origindd
	if(!dropdown){
		return
	}
	var component = dropdown.component
	var boundary = component.getData('ltPropBoundary')
	var left = boundary.left?boundary.left:0
	var right = boundary.right?boundary.right:window.innerWidth
	var top = boundary.top?boundary.top:0
	var bottom = boundary.down?boundary.down:window.innerHeight
	var bcr = dropdown.getBoundingClientRect()
	if(bcr.top < top || bcr.left < left || bcr.right > right || bcr.bottom > bottom){
		if(component.getMethods('onBeforeHide')){
			var result = component.executeMethod('onBeforeHide',event,component)
			result = result == undefined?true:false
			if(!result){
				return ;
			}
		}
			document.querySelector('#lytedropdownfreezelayer').style.display = "none"
			ele.classList.add('lyteDropdownHidden')
			if(component.getData('ltPropFreeze')){
				document.body.style.overflow = openElem.origindd.component.bodyoverflow?openElem.origindd.component.bodyoverflow:""
			}
			component.childComp.style.top = ""
			component.childComp.style.left = ""
			component.childComp.style.width = ""
			if(component.getMethods('onHide')){
				component.executeMethod('onHide',event,component)
			}
			component.setData('pos','')
	}
	dropdown.component.setCss(true)
},true)
document.addEventListener('click',function(event){
	var ele = event.target
	while(ele.tagName != 'LYTE-DROPDOWN' && ele.tagName != 'HTML' && ele.tagName != 'LYTE-DROP-BOX' && ele.tagName != 'LYTE-DROP-REMOVE'){
		ele = ele.parentElement
		if(!ele){
			return ;
		}
	}
	if(ele.tagName == 'HTML'){
		var openElem = document.querySelector('lyte-drop-box:not(.lyteDropdownHidden)')
		var tempelm = openElem
		if(tempelm){
			while(openElem.tagName != 'LYTE-DROP-BOX'){
				openElem = openElem.parentElement
			}
			if(openElem.origindd.component.getMethods('onBeforeHide')){
				var result = openElem.origindd.component.executeMethod('onBeforeHide',event,openElem.origindd.component)
				result = result == undefined?true:false
				if(!result){
					return ;
				}
			}
			document.querySelector('#lytedropdownfreezelayer').style.display = "none"
			tempelm.classList.add('lyteDropdownHidden')
			if(openElem.origindd.component.getData('ltPropFreeze')){
				document.body.style.overflow = openElem.origindd.component.bodyoverflow?openElem.origindd.component.bodyoverflow:""
			}
			var component = openElem.origindd.component
			openElem.origindd.component.childComp.style.top = ""
			openElem.origindd.component.childComp.style.left = ""
			openElem.origindd.component.childComp.style.width = ""
			if(openElem.origindd.component.getMethods('onHide')){
				openElem.origindd.component.executeMethod('onHide',event,openElem.origindd.component)
			}
			openElem.origindd.component.setData('pos','')
		}
		return ;
	}
	else if(ele.tagName == 'LYTE-DROPDOWN'){
		var currentClickedDropdown = ele
		var allOpenDropdowns = document.querySelectorAll('lyte-drop-box:not(.lyteDropdownHidden)')
		if(allOpenDropdowns.length != 0){
			for(var i=0;i<allOpenDropdowns.length;i++){
				if(allOpenDropdowns[i].origindd == currentClickedDropdown){
					continue;
				}
				else{
					var dropdownTag = allOpenDropdowns[i].origindd
					if(dropdownTag.component.getMethods('onBeforeHide')){
						var result = dropdownTag.component.executeMethod('onBeforeHide',event,dropdownTag.component)
						result = result == undefined?true:false
						if(!result){
							continue
						}
					}
					allOpenDropdowns[i].classList.add('lyteDropdownHidden')
					if(currentClickedDropdown.ltProp('freeze').toString().toLowerCase() == "false"){
						document.querySelector('#lytedropdownfreezelayer').style.display = "none"
					}
					if(dropdownTag.component.getData('ltPropFreeze')){
						document.body.style.overflow = dropdownTag.component.bodyoverflow?dropdownTag.component.bodyoverflow:""
					}
					var component = dropdownTag.component
					dropdownTag.component.childComp.style.top = ""
					dropdownTag.component.childComp.style.left = ""
					dropdownTag.component.childComp.style.width = ""
					if(dropdownTag.component.getMethods('onHide')){
						dropdownTag.component.executeMethod('onHide',event,dropdownTag.component)
					}
					dropdownTag.component.setData('pos','')
				}
			}
		}
	}
	else if(ele.tagName == 'LYTE-DROP-REMOVE'){
		var dropdown = ele
		while(dropdown.tagName != 'LYTE-DROPDOWN'){
			dropdown = dropdown.parentElement
		}
		dropdown.component.actions.closeFun.call(dropdown.component,event)
	}
},true)
document.addEventListener('keydown',function(event){  //This is to take care of the tabbing problems in a dropdown and traversing(CODE HELP)
	var kc = event.keyCode
	if((kc == 38 || kc == 40 || kc == 13 || kc == 8) && (document.querySelector('lyte-drop-box:not(.lyteDropdownHidden)') != null)){
		if(kc == 38 || kc == 40){
			event.preventDefault()
		}
		var openbox = document.querySelector("lyte-drop-box:not(.lyteDropdownHidden)")
		var opendd = openbox.origindd
		var component = opendd.component
		if(component.getData('ltPropType') == 'multisearch' && event.keyCode == 8){
			var src = event.target.value
			if(src == "" && event.keyCode == 8){
				var deleteLast = opendd.querySelectorAll('lyte-drop-remove')
				if(deleteLast.length>0){
					deleteLast[deleteLast.length - 1].click()
				}
			}
		}
		var cursel = openbox.querySelector('.lyteDropdownSelection')
		var elem
		if(!cursel || (cursel && (cursel.classList.contains('lyteSearchHidden') || cursel.classList.contains('lyteDropdownActive')))){
			var elems = openbox.querySelectorAll('lyte-drop-item:not(.lyteSearchHidden):not(.lyteDropdownActive)') //wrong
			for(var i=0;i<elems.length;i++){
				if(elems[i].style.display != 'none'){
					elem = elems[i]
					break;
				}
			}
			if(cursel){
				cursel.classList.remove('lyteDropdownSelection')
			}
			if(elem){
				elem.classList.add('lyteDropdownSelection')
				return ;
			}
		}
			
		var kc = event.keyCode
		var elements = openbox.querySelectorAll('lyte-drop-item')
		for(var i=0;i<elements.length;i++){
			if(elements[i].classList.contains('lyteDropdownSelection')){
				break;
			}
		}
		if(kc == 13){
			if(component.getData('multiple')){
				if(elements[i] == undefined){ 
					return ;
				}
				elements[i].click()

				// You are just bad
				var k = i;
				var allElements = openbox.querySelectorAll('lyte-drop-item')
				for(;k < allElements.length;k++){
					if(!allElements[k].classList.contains('lyteSearchHidden') && !allElements[k].classList.contains('lyteDropdownActive')){
						break;
					}
				}
				if(k != allElements.length){
					allElements[k].classList.add('lyteDropdownSelection')
				}
				else{
					k = i
					for(;k > -1;k--){
						if(!allElements[k].classList.contains('lyteSearchHidden') && !allElements[k].classList.contains('lyteDropdownActive')){
							break;
						}
					}
					if(k != -1){
						allElements[k].classList.add('lyteDropdownSelection')
					}
				}
			}
			else{
				if(elements[i]){
					elements[i].click()
				}
			}
		}
		else if(kc == 38 && i != 0){
			var j = i
			i=i-1
			for(;i>-1;i--){
				if(!elements[i].classList.contains('lyteDropdownActive') && !elements[i].classList.contains('lyteSearchHidden') && elements[i].style.display != 'none'){
					break;
				}
			}
			if(i != -1){
				elements[j].classList.remove('lyteDropdownSelection')
				elements[i].classList.add('lyteDropdownSelection')
				component.scrollIntoView(elements[i],'up')
			}							
		}
		else if(kc == 40 && i != elements.length -1){
			var j = i
			i=i+1
			for(;i<elements.length;i++){
				if(!elements[i].classList.contains('lyteDropdownActive') && !elements[i].classList.contains('lyteSearchHidden') && elements[i].style.display != 'none'){
					break;
				}
			}
			if(i < elements.length){  // Added this because it was breaking in CRM
				elements[j].classList.remove('lyteDropdownSelection')
				elements[i].classList.add('lyteDropdownSelection')
				component.scrollIntoView(elements[i],'down')
			}
		}
		
	}
	if(kc != 9 && kc != 27){
		// var setopendd = document.querySelector('lyte-drop-box:not(.lyteDropdownHidden)')
		// if(setopendd){
		// 	setopendd.origindd.component.setCss()
		// }
		return ;
	}
	ele = document.querySelector('lyte-drop-box:not(.lyteDropdownHidden)')
	if(ele){
	 		while(ele.tagName != 'LYTE-DROP-BOX'){
	 			ele = ele.parentNode
	 		}
	 		if(ele.origindd.component.getMethods('onBeforeHide')){
				var result = ele.origindd.component.executeMethod('onBeforeHide',event,ele.origindd.component)
				result = result == undefined?true:false
				if(!result){
					return ;
				}
			}
			ele.classList.add('lyteDropdownHidden')
	 		document.querySelector('#lytedropdownfreezelayer').style.display = "none"
	 		if(ele.origindd.component.getData('ltPropFreeze')){
				document.body.style.overflow = ele.origindd.component.bodyoverflow?ele.origindd.component.bodyoverflow:""
			}
			var component = ele.origindd.component
			component.childComp.style.top = ""
			component.childComp.style.left = ""
			component.childComp.style.width = ""
	 		if(ele.origindd.component.getMethods('onHide')){
	 			ele.origindd.component.executeMethod('onHide',event,ele.origindd.component)
	 		}
	 		ele.origindd.component.setData('pos','')
	}

})
window.addEventListener('resize',function(event){
	var currentOpen = document.querySelector('lyte-drop-box:not(.lyteDropdownHidden)')
	if(currentOpen){
		currentOpen.origindd.component.setCss()
	}
	var node = document.getElementById('lytedropdownfreezelayer')
	if(!node){
		return ;
	}
	document.getElementById('lytedropdownfreezelayer').style.width = window.innerWidth +"px"
	document.getElementById('lytedropdownfreezelayer').style.height = window.innerHeight +"px"
})



Lyte.createCustomElement("lyte-drop-item", {
	static : {
		"observedAttributes" : {
			get : function() {
				return ['selected'];
			}
		}
	},
	"attributeChangedCallback" : function(attr, oldValue, newValue, namespace) {
		if (attr == 'selected') {
        	if (this.hasAttribute('selected')) {
          		var currentnode = this;
          		while (currentnode.tagName != 'LYTE-DROP-BOX' && currentnode.tagName != 'BODY') {
            		currentnode = currentnode.parentElement;
          		}
          		if (currentnode.tagName == 'HTML') {
            		return;
          		}
          		var dropdown = currentnode.origindd;
          		if (!dropdown) {
            		while (currentnode.tagName != 'LYTE-DROPDOWN' && currentnode.tagName != 'BODY') {
              			currentnode = currentnode.parentElement;
            		}
            		dropdown = currentnode;
          		}
          		var component = dropdown.component;
          		var dropdowntype = component.getData('ltPropType');
          		if (dropdowntype == 'multiple' || dropdowntype == "multisearch") {
            		var src = this.getAttribute('data-value');
            		var selected = component.getData('ltPropSelected');
            		if (selected.length == 2) {
              			selected = '["' + src + '"]';
              			component.setData('ltPropSelected', selected);
            		} 
            		else {
              			var lastindex = selected.indexOf(']');
              			var string = selected.substring(0, lastindex) + ',"' + src + '"]';
              			component.setData('ltPropSelected', string);
            		}
          		} 
          		else {
            		var src = this.getAttribute('data-value');
            		component.setData('ltPropSelected', src);
          		}
        	}
      	}
	}
});





Lyte.createCustomElement("lyte-drop-group", {
	static : {
		"observedAttributes" : {
			get : function() {
				return ['label'];
			}
		}
	},
	"attributeChangedCallback" : function(attr, oldValue, newValue, namespace) {
		if (attr == 'label') {
        	// Destroying an element
            var node = this.querySelector('lyte-drop-label');
            var value = this.getAttribute('label');
            if (node) {
                node.textContent = value;
            } else {
                node = document.createElement('lyte-drop-label');
                node.textContent = value;
                this.insertBefore(node, this.children[0]);
            }
        }
	}
});