if(!LytePopup){
    var LytePopup = {
        components:[],
        onEscape : function(evt){
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }
            if (isEscape) {
                LytePopup.closePopup(undefined,true);
            }
        },
        bindDocumentKeydown : function(){
            document.addEventListener('keydown',LytePopup.onEscape,true);
        },
        addPopup : function(component) {
            LytePopup.closePopup();
            var compLengh = LytePopup.components.length;
            if(compLengh>0){
                var prevZIndex = 0;
                var prePopup = '', thisPopup = '', thisFreeze = '';
                if(LytePopup.components[compLengh-1].$node.tagName == "LYTE-MODAL"){
                    prePopup = '.lyteModal';
                }
                else if(LytePopup.components[compLengh-1].$node.tagName == "LYTE-POPOVER"){
                    prePopup = '.lytePopover';
                }   
                else{
                    prePopup = '.alertPopup';
                }

                if(component.$node.tagName == "LYTE-MODAL"){
                    thisPopup = '.lyteModal';
                    thisFreeze = 'lyte-modal-freeze';
                }
                else if(component.$node.tagName == "LYTE-POPOVER"){
                    thisPopup = '.lytePopover';
                    thisFreeze = '.lytePopoverFreeze';
                }
                else{
                    thisPopup = '.alertPopup';
                    thisFreeze = '.alertFreezeLayer';
                }
                var node = LytePopup.components[compLengh-1].childComp.querySelector(prePopup);
                prevZIndex = Number(document.defaultView.getComputedStyle(node,null).getPropertyValue('z-index'));
                component.childComp.querySelector(thisPopup).style.zIndex = prevZIndex+2;
                if(component.$node.ltProp('freeze') && component.childComp.querySelector(thisFreeze)){
                    component.childComp.querySelector(thisFreeze).style.zIndex = prevZIndex+1;
                }
            }
            LytePopup.components[compLengh] = component;
        },
        closePopup : function(component,fromEscape){
            if(fromEscape){
                var lastPop = LytePopup.components[LytePopup.components.length-1];
                if(lastPop && lastPop.$node.ltProp("closeOnEscape")){
                    lastPop.$node.ltProp("show",false);
                }
            }
            else{
                if(component){
                    LytePopup.components.splice(LytePopup.components.indexOf(component),1);
                }
                else{
                    for(var i=LytePopup.components.length-1;i>=0;i--){
                        if(LytePopup.components[i].$node && !LytePopup.components[i].$node.ltProp("allowMultiple")){
                            LytePopup.components[i].$node.ltProp("show",false);
                        }
                    }
                }   
            }  
        }   
    };
    LytePopup.bindDocumentKeydown();
    window.addEventListener('resize',function(event){
        for(var i = LytePopup.components.length - 1 ; i >= 0 ; i--){
            if(LytePopup.components[i].$node && LytePopup.components[i].$node.nodeName == "LYTE-MODAL" && LytePopup.components[i].childComp.style.visibility == "visible" && LytePopup.components[i].childComp.querySelector('.lyteModal')){
                LytePopup.components[i].$node.component.updateScrollHandling();
                LytePopup.components[i].$node.component.computeOffsetImpl();
            }
        }
    },true);
};

Lyte.Component.register("lyte-modal",{
_template:"<template tag-name=\"lyte-modal\">\t<template is=\"if\" value=\"{{expHandlers(ltPropReRenderModal,'!')}}\"><template case=\"true\"> \t\t<lyte-wormhole case=\"true\" style=\"{{if(ltPropShowCopy,'visibility:visible','visibility:hidden')}}\">\t\t\t<template is=\"registerYield\" yield-name=\"lyte-content\">\t\t\t\t<div class=\"modalWrapper {{ltPropWrapperClass}}\">\t\t\t\t\t<div class=\"lyteModal\">\t\t\t\t\t\t<template is=\"if\" value=\"{{ltPropShowCloseButton}}\">\t\t\t\t\t\t\t<template case=\"true\"><span class=\"lyteModalClose\" onclick=\"{{action('close')}}\"></span></template>\t\t\t\t\t\t</template>\t\t\t\t\t\t<lyte-yield yield-name=\"modal\"></lyte-yield>\t\t\t\t\t</div>\t\t\t\t\t<template is=\"if\" value=\"{{ltPropFreeze}}\">\t\t\t\t\t\t<template case=\"true\"><lyte-modal-freeze></lyte-modal-freeze></template>\t\t\t\t\t</template>\t\t\t\t</div>\t\t\t</template>\t\t</lyte-wormhole>\t</template></template></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["ltPropShowCopy","'visibility:visible'","'visibility:hidden'"]}}}},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"insertYield","position":[1,1,3]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropShow","ltPropFreeze","ltPropShowCloseButton","ltPropCloseOnEscape","ltPropTransition","ltPropOffset","ltPropDimmer","ltPropDraggable","ltPropAllowMultiple","ltPropScrollable","ltPropMaxHeight","ltPropMaxWidth","ltPropWidth","ltPropHeight","ltPropWrapperClass","ltPropHeading","ltPropButtons","ltPropButtonPosition","ltPropShowCopy","ltPropReRenderModal"],
    init: function(){ 
        this.$node.ltProp('showCopy',this.$node.ltProp('show'));
        if(this.$node.ltProp('show')){
            this.onBeforeShowHandling();
        }
    },
    data: function(){
        return {
            //config from callee
            "ltPropShow":Lyte.attr("boolean",{"default": false}),
            "ltPropFreeze":Lyte.attr("boolean",{"default": true}),
            "ltPropShowCloseButton":Lyte.attr("boolean",{"default": true}),
            "ltPropCloseOnEscape":Lyte.attr("boolean",{"default": true}),
            "ltPropTransition":Lyte.attr("object",{"default":{"animation":"slideFromTop","duration":"0.5"}}),
            "ltPropOffset":Lyte.attr("object",{"default":{"top":"center","left":"center"}}),
            "ltPropDimmer":Lyte.attr("object",{"default":{"color":"black","opacity":"0.4"}}),
            "ltPropDraggable":Lyte.attr("boolean",{"default": false}),
            "ltPropAllowMultiple":Lyte.attr("boolean",{"default": false}),
            //"ltPropResizable":Lyte.attr("boolean",{"default": false}),
            "ltPropScrollable":Lyte.attr("boolean",{"default": false}),
            "ltPropMaxHeight":Lyte.attr("string",{"default":""}),
            "ltPropMaxWidth":Lyte.attr("string",{"default":""}),
            "ltPropWidth":Lyte.attr("string",{"default":""}),
            "ltPropHeight":Lyte.attr("string",{"default":"auto"}),
            "ltPropWrapperClass":Lyte.attr("string",{"default":""}),

            "ltPropHeading":Lyte.attr("string",{"default":""}),
            "ltPropButtons":Lyte.attr("array",{"default":[{"type":"accept","text":"Ok"}]}),
            "ltPropButtonPosition":Lyte.attr("string",{"default":"right"}),

            //local properties
            "ltPropShowCopy":Lyte.attr("boolean",{"default": false}),
            "ltPropReRenderModal":Lyte.attr("boolean",{"default":false})
        }
    },
    addDragHandler : function(){
        var dragHeader = this.actualModalDiv.querySelector('lyte-modal-header');
        if(dragHeader){
            dragHeader.parentEle = this;
            if(this.$node.ltProp("draggable")){
                dragHeader.addEventListener('mousedown',this.handleMove,true);
                dragHeader.classList.add('draggable');
            }
            else{
                dragHeader.removeEventListener('mousedown',this.handleMove,true);
                dragHeader.classList.remove('draggable');
            }
        }
        else{
            console.warn("This modal is not draggable because it has no header");
            this.$node.ltProp("draggable",false);
        }
    },
    handleMove : function(e){
        var drag = e.currentTarget.parentEle.actualModalDiv;
        LytePopup.node=drag;
        LytePopup.xPos=e.clientX-this.getBoundingClientRect().left;
        LytePopup.yPos=e.clientY-this.getBoundingClientRect().top;
        var elePos = drag.getBoundingClientRect();
        drag.style.transitionDuration = "0s";
        document.body.addEventListener('mousemove',e.currentTarget.parentEle.handleDrag,true);
        document.body.addEventListener('mouseup',e.currentTarget.parentEle.stopDrag,true);
    },
    handleDrag : function(e){
        var drag = LytePopup.node;
        drag.style.left=(e.clientX-LytePopup.xPos)+'px';
        drag.style.top=(e.clientY-LytePopup.yPos)+'px';
        window.getSelection().removeAllRanges();
    },
    stopDrag : function(e){
        var targetElem = e.target;
        while(targetElem && targetElem !== document){
            if(targetElem.parentEle){
                this.removeEventListener('mousemove',targetElem.parentEle.handleDrag,true);
                this.removeEventListener('mouseup',targetElem.parentEle.stopDrag,true);
                break;
            }
            targetElem = targetElem.parentElement ? targetElem.parentElement : document;
        }
    },      
    closeAlertFn : function(){
        this.$node.ltProp("show",false);
        if(this.getMethods("onClose")){
            this.executeMethod("onClose");  
        }
    },
    showToggled : function(){
        if(this.$node.ltProp("reRenderModal")){
            if(this.$node.ltProp("show")){
                this.$node.ltProp("show",false);
            }
            if(this.$node.ltProp("showCopy")){
                this.$node.ltProp("showCopy",false);
            }
            this.$node.ltProp("reRenderModal",false);
        }
        if(this.$node.ltProp("show") && !this.$node.ltProp("showCopy")){
            this.onBeforeShowHandling();
        }
        else{
            if(this.$node.ltProp("showCopy")){
                this.onBeforeCloseHandling();
            }
        }
    }.observes("ltPropShow","ltPropReRenderModal"),
    updateScrollHandling : function(){
        if(!this.$node.ltProp("freeze")){
            this.$node.ltProp("scrollable",true);
        }

        var oldHeight, oldWidth, newHeight, newWidth, 
        modalElem = this.actualModalDiv,
        contentNode = modalElem.querySelector("lyte-modal-content");
        contentNode = contentNode ? contentNode : modalElem;

        modalElem.style.maxWidth = "";
        modalElem.style.maxHeight = "";
        modalElem.style.height = this.$node.ltProp("height")?this.$node.ltProp("height"):"auto";
        modalElem.style.width = this.$node.ltProp("width")?this.$node.ltProp("width"):"auto";
        /*var borderDimensionX = ((window.getComputedStyle(modalElem).borderLeft ? parseFloat(window.getComputedStyle(modalElem).borderLeft) : 0) +
                                 (window.getComputedStyle(modalElem).borderRight ? parseFloat(window.getComputedStyle(modalElem).borderRight) : 0));*/
        var borderDimensionY = ((window.getComputedStyle(modalElem).borderTop ? parseFloat(window.getComputedStyle(modalElem).borderTop) : 0) +
                                 (window.getComputedStyle(modalElem).borderBottom ? parseFloat(window.getComputedStyle(modalElem).borderBottom) : 0));
        
        if(this.$node.ltProp("maxHeight")){
            this.childComp.querySelector(".modalWrapper").classList.add("scrollable");
            this.$node.ltProp("scrollable",true);
            oldHeight = modalElem.getBoundingClientRect().height - borderDimensionY;
            modalElem.style.height = this.$node.ltProp("maxHeight");
            newHeight = modalElem.getBoundingClientRect().height - borderDimensionY;
        }
        else{
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            oldHeight = modalElem.getBoundingClientRect().height - borderDimensionY;
            newHeight = h-40;
        }

        if(this.$node.ltProp("maxWidth")){
            this.$node.ltProp("scrollable",true);
            oldWidth = modalElem.getBoundingClientRect().width /*- borderDimensionX*/;
            modalElem.style.width = this.$node.ltProp("maxWidth");
            newWidth = modalElem.getBoundingClientRect().width /*- borderDimensionX*/;
            if(oldWidth < newWidth){
                modalElem.style.width = oldWidth+"px";
                newWidth = oldWidth;
            }
            modalElem.style.overflowX = "auto";
        }
        else{
            newWidth = modalElem.getBoundingClientRect().width /*- borderDimensionX*/;
        }

        if(this.$node.ltProp("scrollable")){
            var modalheader = this.actualModalDiv.querySelector("lyte-modal-header"), modalFooter = this.actualModalDiv.querySelector("lyte-modal-footer")
            var newH = (newHeight - ((modalheader ? modalheader.getBoundingClientRect().height : 0 ) +
                                                                           (modalFooter ? modalFooter.getBoundingClientRect().height : 0)));
            contentNode.style.maxHeight = (newH > 0 ? newH : 50) +"px";
            contentNode.style.overflowY = "auto"; 
            contentNode.style.height = (oldHeight - ((modalheader ? modalheader.getBoundingClientRect().height : 0) +
                                                                            (modalFooter ? modalFooter.getBoundingClientRect().height : 0)))+"px";
            modalElem.style.width = this.$node.ltProp("width")?this.$node.ltProp("width"):"auto";

            this.actualModalDiv.style.maxWidth = newWidth > 0 ? (newWidth +"px"):("70%");
        }
        else{
            this.childComp.querySelector(".modalWrapper").classList.remove("scrollable");   
        }

        if (!this.$node.ltProp("freeze")) {
            this.childComp.querySelector(".modalWrapper").style.position = "static";    
        }
        else{
            this.childComp.querySelector(".modalWrapper").style.position = "fixed";
        }
        
    },
    scrollHandling : function(){
        if(!this.getData('ltPropShow')){
            return;
        }
        this.updateScrollHandling();
    }.observes("ltPropWidth","ltPropMaxWidth","ltPropHeight","ltPropMaxHeight"),
    computeOffsetImpl : function(){        
        var modalEle = this.actualModalDiv;
        var modalElePosition = modalEle.getBoundingClientRect();
        modalEle.style.transitionDuration = this.$node.ltProp("transition").duration+"s";
        var offsetObj = Lyte.deepCopyObject(this.$node.ltProp('offset'));

        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        if(offsetObj){
            if(offsetObj.left === "center" || offsetObj.right === "center"){
                var offLeft = (w - modalElePosition.width)/2;
                if(offLeft < 0){
                    offLeft = 20;
                }
                offsetObj.left = offLeft + "px";
            }
            if(offsetObj.top === "center" || offsetObj.bottom === "center"){
                var offTop = (h - modalElePosition.height)/2;
                if(offTop < 0){
                    offTop = 20;
                }
                offsetObj.top = offTop + "px";
            }            
            if(offsetObj.right && offsetObj.right !== "center"){
                if(offsetObj.right.indexOf("%") > -1){
                    offsetObj.left = w-(modalElePosition.width+(w/parseFloat(offsetObj.right)))+"px";
                }
                else{
                    offsetObj.left = w-(modalElePosition.width+parseFloat(offsetObj.right))+"px";   
                }
            }
            if(offsetObj.bottom && offsetObj.bottom !== "center"){
                if(offsetObj.bottom.indexOf("%") > -1){
                    offsetObj.top = h-(modalElePosition.height+(h/parseFloat(offsetObj.bottom)))+"px";
                }
                else{
                    offsetObj.top = h-(modalElePosition.height+parseFloat(offsetObj.bottom))+"px";   
                }
            }
            modalEle.style.left = offsetObj.left;
            modalEle.style.top = offsetObj.top;
        }
        else{
            var offsetLeft="",offsetTop="";
            offsetLeft = (w - modalElePosition.width)/2;
            offsetTop = (h - modalElePosition.height)/2;
            if(!this.$node.ltProp("scrollable")){
                if(offsetLeft < 0){
                    offsetLeft = 20;
                }
                if(offsetTop < 0){
                    offsetTop = 20;
                }
            }
            modalEle.style.left = offsetLeft+"px";
            modalEle.style.top = offsetTop+"px";
        }
        if(this.$node.ltProp("transition").animation == "fadeIn"){
            modalEle.style.opacity = 1;
        }
        else{
            modalEle.style.opacity = "";
        }
        if(this.$node.ltProp("freeze")){
            document.body.classList.add('bodyWrapper');    
        }
    },
    onBeforeCloseHandling : function(){
        var result = true;
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if(this.getMethods("onBeforeClose")){
            result = this.executeMethod("onBeforeClose"); 
        }
        if(result === undefined || result){
            var animDur = parseFloat(this.$node.ltProp('transition').duration) * 1000;
            var self = this;
            setTimeout(function(){
                self.$node.ltProp({"show":false,"showCopy":false});
                if(self.getMethods("onClose")){
                    self.executeMethod("onClose");  
                }
                LytePopup.closePopup(self);
            },animDur);
            var modalEle = this.actualModalDiv;
            var val = "";
            modalEle.style.transitionDuration = this.$node.ltProp("transition").duration+"s";
            switch(this.$node.ltProp("transition").animation){
                case "slideFromTop":
                    modalEle.style.top = "-"+(modalEle.getBoundingClientRect().height)+"px";
                    break;
                case "slideFromBottom":
                    modalEle.style.top = h+"px";
                    break;
                case "slideFromLeft":
                    modalEle.style.left = "-"+(modalEle.getBoundingClientRect().width)+"px";
                    break;
                case "slideFromRight":
                    modalEle.style.left = w+"px";
                    break;
                case "fadeIn":
                    modalEle.style.opacity = 0;
                    break;
            }
            
            modalEle.classList.remove('lyteModalFromTop','lyteModalFromBottom','lyteModalFromLeft','lyteModalFromRight','lyteModalFadeIn');
            if(this.$node.ltProp('freeze')){
                this.childComp.querySelector("lyte-modal-freeze").style.opacity = 0;
            }
            this.childComp.querySelector(".modalWrapper").style.position = "fixed";
            document.body.classList.remove('bodyWrapper');
        }
        else{
            this.$node.ltProp('show',true);
        }
    },
    onBeforeShowHandling : function(){
        var result = true;
        if(this.getMethods("onBeforeShow")){
            result = this.executeMethod("onBeforeShow") ; 
        }
        if(result === undefined || result){
            this.addDragHandler();
            this.updateScrollHandling();
            var modalEle = this.actualModalDiv;
            var val = "";
            modalEle.style.transitionDuration = this.$node.ltProp("transition").duration+"s";
            var classVal = "lyteModalFrom";
            var modalStyle = this.actualModalDiv.style;
            switch(this.$node.ltProp("transition").animation){
                case "slideFromTop":
                    modalStyle.top = "-"+(this.actualModalDiv.getBoundingClientRect().height)+"px";
                    classVal += "Top";
                    break;
                case "slideFromBottom":
                    modalStyle.top = "100%";
                    classVal += "Bottom";
                    break;
                case "slideFromLeft":
                    modalStyle.left = "-"+(this.actualModalDiv.getBoundingClientRect().width)+"px";
                    classVal += "Left";
                    break;
                case "slideFromRight":
                    modalStyle.left = "100%";
                    classVal += "Right";
                    break;
                case "fadeIn":
                    classVal = "lyteModalFadeIn";
                    break;
            }
            this.actualModalDiv.classList.add(classVal);
            var self = this;
            setTimeout(function(){
                self.computeOffsetImpl();
                self.$node.ltProp('showCopy',true);
                // self.childComp.style.visibility = "visible";
                if(self.$node.ltProp('freeze')){
                    var freezeStyle = self.childComp.querySelector("lyte-modal-freeze").style;
                    freezeStyle.opacity = self.getData('ltPropDimmer').opacity;
                    freezeStyle.background = self.getData('ltPropDimmer').color;
                }
            },0);

            if(this.getMethods("onShow")){
                this.executeMethod("onShow"); 
            }
            LytePopup.addPopup(self);
        }
        else{
            this.$node.ltProp({"show":false,"showCopy":false});
        }
    },
    didDestroy : function(){
        if(this.childComp){
            this.childComp.remove();    
        }
        LytePopup.components = [];
    },
    actions: {
        wormholeDidConnect : function(){
            this.childComp = this.$node.querySelector('lyte-wormhole');
            this.actualModalDiv = this.childComp.querySelector(".lyteModal");
            // this.addDragHandler();
            var anim = this.$node.ltProp('transition');
            LyteComponent.appendChild(document.body,this.childComp);
            // this.updateScrollHandling();
        },
        close : function(){
           this.$node.ltProp("show",false);
        }
    }
});

