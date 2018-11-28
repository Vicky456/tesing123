Lyte.Component.register("lyte-tree",{
_template:"<template tag-name=\"lyte-tree\"> <template is=\"if\" value=\"{{isObject(ltPropTreeData)}}\"><template case=\"true\">\t<template is=\"if\" value=\"{{haveChildren(ltPropTreeData,ltPropChildrenKey)}}\"><template case=\"true\">\t \t<div class=\"{{ltPropTreeRoot}}\">\t\t\t\t\t\t<div class=\"lyteTreeParent\" onclick=\"{{action('treeExtend',ltPropTreeIcon)}}\">\t\t\t\t\t<span class=\"{{ltPropTreeClass}}\"></span>\t\t\t\t\t<template is=\"if\" value=\"{{ltPropNeedCheckbox}}\"><template case=\"true\">\t\t\t\t\t\t<lyte-checkbox on-checked=\"{{method('onChecked')}}\" on-unchecked=\"{{method('onUnchecked')}}\" lt-prop-type=\"primary\" onclick=\"{{action('selectChildren')}}\"></lyte-checkbox>\t\t\t\t\t</template></template>\t\t\t\t\t<span class=\"\">{{ltPropTreeData[ltPropTreeLabelKey]}}</span>\t\t\t</div>\t\t\t<div class=\"lyteTreeChildren lyteDisNone\">\t\t\t\t\t<lyte-tree lt-prop-tree-label-key=\"{{ltPropTreeLabelKey}}\" lt-prop-children-key=\"{{ltPropChildrenKey}}\" lt-prop-tree-data=\"{{ltPropTreeData[ltPropChildrenKey]}}\" lt-prop-tree-icon=\"{{ltPropTreeIcon}}\" lt-prop-tree-class=\"{{ltPropTreeClass}}\" lt-prop-dashed-lines=\"{{ltPropDashedLines}}\" lt-prop-tree-root=\"lyteTreeNode\" lt-prop-need-checkbox=\"{{ltPropNeedCheckbox}}\" on-checked=\"{{method('onChecked')}}\" on-unchecked=\"{{method('onUnchecked')}}\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\" on-selected=\"{{method('onSelected')}}\"></lyte-tree>\t\t\t</div>\t\t</div>\t</template><template case=\"false\">\t\t<div class=\"{{dashedLines}}\" style=\"{{childPadding(ltPropTreeIcon)}}\">\t\t\t<div class=\"lyteTreeParent\">\t\t\t\t<template is=\"if\" value=\"{{ltPropNeedCheckbox}}\"><template case=\"true\">\t\t\t\t\t<lyte-checkbox on-checked=\"{{method('onChecked')}}\" on-unchecked=\"{{method('onUnchecked')}}\" lt-prop-type=\"primary\" onclick=\"{{action('selectChildren')}}\"></lyte-checkbox>\t\t\t\t</template></template>\t\t\t\t<span class=\"\">{{ltPropTreeData[ltPropTreeLabelKey]}}</span>\t\t\t\t</div>\t\t</div>\t</template></template></template><template case=\"false\"><template is=\"if\" value=\"{{isArray(ltPropTreeData)}}\"><template case=\"true\">\t\t<template is=\"for\" items=\"{{ltPropTreeData}}\" item=\"tree\" index=\"index\">\t\t\t\t<lyte-tree lt-prop-children-key=\"{{ltPropChildrenKey}}\" lt-prop-tree-label-key=\"{{ltPropTreeLabelKey}}\" lt-prop-tree-data=\"{{tree}}\" lt-prop-tree-icon=\"{{ltPropTreeIcon}}\" lt-prop-tree-class=\"{{ltPropTreeClass}}\" lt-prop-dashed-lines=\"{{ltPropDashedLines}}\" lt-prop-tree-root=\"lyteTreeNode\" lt-prop-need-checkbox=\"{{ltPropNeedCheckbox}}\" on-checked=\"{{method('onChecked')}}\" on-unchecked=\"{{method('onUnchecked')}}\" on-before-open=\"{{method('onBeforeOpen')}}\" on-open=\"{{method('onOpen')}}\" on-before-close=\"{{method('onBeforeClose')}}\" on-close=\"{{method('onClose')}}\" on-selected=\"{{method('onSelected')}}\"></lyte-tree>\t\t</template> </template></template></template></template></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"text","position":[1,1,5,0]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"childPadding","args":["ltPropTreeIcon"]}}}},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"text","position":[1,1,3,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropTreeData","ltPropTreeLabelKey","ltPropChildrenKey","ltPropTreeId","ltPropTreeRoot","dashedLines","ltPropDashedLines","ltPropNeedCheckbox","ltPropTreeIcon","ltPropTreeClass"],	
	data : function(){
		return {
			ltPropTreeData : Lyte.attr("array",{"default":undefined}),
			ltPropTreeLabelKey :  Lyte.attr("string",{"default":undefined}),
			ltPropChildrenKey : Lyte.attr("string",{"default":undefined}),
			ltPropTreeId : Lyte.attr("string",{"default":undefined}),
			ltPropTreeRoot : Lyte.attr("string",{"default":'lyteTreeNode'}),
			dashedLines : Lyte.attr("string",{"default":'lyteTreeNode'}),
			ltPropDashedLines : Lyte.attr("boolean",{"default":false}),
			ltPropNeedCheckbox : Lyte.attr("boolean",{"default":false}),
			ltPropTreeIcon : Lyte.attr("string",{"default":'Arrow'}),
			ltPropTreeClass : Lyte.attr("string",{"default":undefined})
		}
	},
	methods : {
		onChecked:function(){
			
		},
		onUnchecked:function(){
			
		},
		onBeforeOpen:function(){
			
		},
		onOpen:function(){
			
		},
		onBeforeClose:function(){
			
		},
		onClose:function(){
			
		},
		onSelected:function(){
			
		}
	},
	init : function(){
		
		var treeIcon = this.getData('ltPropTreeIcon'),
			dashedLines = this.getData('ltPropDashedLines');
		if( treeIcon === 'Plus' ) {
			this.setData('ltPropTreeClass','lyteTreePlus');
		} else if ( treeIcon === 'ChbxPlus' ) {
			this.setData('ltPropTreeClass','lyteTreeChbxPlus');
		} else {
			this.setData('ltPropTreeClass','lyteTreeArrow');
		}
		if( dashedLines ) {
			this.setData('dashedLines','lyteTreeNode lyteTreeNoChild');
			this.setData('ltPropTreeRoot','lyteTreeNode lyteTreeLine');
		} else {
			this.setData('dashedLines','lyteTreeNode');
			this.setData('ltPropTreeRoot','lyteTreeNode');
		}
	},
	iconObserver : function() {

		var treeIcon = this.getData('ltPropTreeIcon');
		if( treeIcon === 'Plus' ) {
			this.setData('ltPropTreeClass','lyteTreePlus');
		} else if ( treeIcon === 'ChbxPlus' ) {
			this.setData('ltPropTreeClass','lyteTreeChbxPlus');
		} else {
			this.setData('ltPropTreeClass','lyteTreeArrow');
		}
	}.observes('ltPropTreeIcon'),
	dashedLinesObserver : function() {

		var dashedLines = this.getData('ltPropDashedLines');
		if ( dashedLines ) {
			this.setData('dashedLines','lyteTreeNode lyteTreeNoChild');
			this.setData('ltPropTreeRoot','lyteTreeNode lyteTreeLine');
		} else {
			this.setData('dashedLines','lyteTreeNode');
			this.setData('ltPropTreeRoot','lyteTreeNode');
		}
	}.observes('ltPropDashedLines'),
	actions : {
		selectChildren : function() {
			var elm = this.$node.children[0],
				checkBoxes = elm.getElementsByTagName('lyte-checkbox'),
				children = elm.getElementsByClassName('lyteTreeChildren'),
				treeIcon = this.getData('ltPropTreeIcon'),
				iconElement = elm.getElementsByClassName('lyteTree'+treeIcon),
				iconClass,
				isChecked;
			if ( checkBoxes.length>1 ){
				if (treeIcon === 'Arrow') {
					iconClass = 'lyteTreeArrowRotate';
				} else if (treeIcon === 'Plus') {
					iconClass = 'lyteTreeMinus';
				} else if (treeIcon === 'ChbxPlus') {
					iconClass = 'lyteTreeChbxMinus';
				}
				if (checkBoxes[0].checked){
					if ( this.getMethods('onBeforeClose') ) {
						this.executeMethod('onBeforeClose');
					}
					isChecked = false;
					for ( var i = 0; i < children.length; i++){
						var child = children[i],
							sibling = children[i].previousElementSibling;
						if(sibling.classList.contains('lyteTreeExpand')) {
							sibling.classList.remove('lyteTreeExpand')
							child.classList.add('lyteDisNone');
						}
					}
					if ( this.getMethods('onClose') ) {
						this.executeMethod('onClose');
					}
					for (var i = 0; i < iconElement.length; i++) {
						var iconElm = iconElement[i];
						iconElm.classList.remove(iconClass);
					}
				} else {
					if ( this.getMethods('onBeforeOpen') ) {
						this.executeMethod('onBeforeOpen');
					}
					isChecked = true;
					for ( var i = 0; i < children.length; i++){
						var child = children[i],
							sibling = children[i].previousElementSibling;
						if(!sibling.classList.contains('lyteTreeExpand')) {
							sibling.classList.add('lyteTreeExpand')
							child.classList.remove('lyteDisNone');
						}
					}
					if ( this.getMethods('onOpen') ) {
						this.executeMethod('onOpen');
					}
					if ( this.getMethods('onSelected') ) {
						this.executeMethod('onSelected');
					}
					for (var i = 0; i < iconElement.length; i++) {
						var iconElm = iconElement[i];
						iconElm.classList.add(iconClass)
					}
				}
				for ( var i = 1; i < checkBoxes.length; i++){
					checkBoxes[i].ltProp({checked:isChecked});
				}
			} else{
				if ( !checkBoxes[0].checked && this.getMethods('onSelected') ) {
					this.executeMethod('onSelected');
				}
			}
			window.event.stopPropagation();
		},
		treeExtend : function(value) {
			var elem = window.event.srcElement || window.event.target;
			if(!elem.classList.contains('lyteTreeParent')){
				elem = elem.parentElement;
			}
			if(elem.classList.contains('lyteTreeExpand')){
				if ( this.getMethods('onBeforeClose') ) {
					this.executeMethod('onBeforeClose');
				}
				var sibling = elem.nextElementSibling;
				sibling.classList.add('lyteDisNone');
				sibling.classList.remove('lyteTreeChildrenTransition');
				var iconTag = elem.getElementsByClassName('lyteTree'+value)[0];
				if(value == 'Arrow'){
					iconTag.classList.remove('lyteTreeArrowRotate');	
				} else if (value == 'Plus') {
					iconTag.classList.remove('lyteTreeMinus');	
				} else if (value == 'ChbxPlus'){
					iconTag.classList.remove('lyteTreeChbxMinus');	
				}
				elem.classList.remove('lyteTreeExpand');	
				if ( this.getMethods('onClose') ) {
					this.executeMethod('onClose');
				}
			} else {
				if ( this.getMethods('onBeforeOpen') ) {
					this.executeMethod('onBeforeOpen');
				}
				var sibling = elem.nextElementSibling;
				sibling.classList.remove('lyteDisNone');
				sibling.classList.add('lyteTreeChildrenTransition');
				var iconTag = elem.getElementsByClassName('lyteTree'+value)[0];
				if(value == 'Arrow'){
					iconTag.classList.add('lyteTreeArrowRotate');	
				} else if (value == 'Plus') {
					iconTag.classList.add('lyteTreeMinus');	
				} else if (value == 'ChbxPlus'){
					iconTag.classList.add('lyteTreeChbxMinus');	
				}
				elem.classList.add('lyteTreeExpand');	
				if ( this.getMethods('onOpen') ) {
					this.executeMethod('onOpen');
				}
			}
		}
	},
	didConnect : function(){
	},
	didDestroy : function(){

	}
});