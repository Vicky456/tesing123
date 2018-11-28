    var lyteGridStackCurrentNode = {};
    Lyte.Component.register('lyte-gridstack', {
_template:"<template tag-name=\"lyte-gridstack\">\t\t<lyte-yield yield-name=\"lyteGridStack\">\t\t</lyte-yield></template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropScope","ltPropHandler","ltPropMarginLeft","ltPropMarginTop","ltPropUnit","ltPropGridLength","ltPropResizeDirection","ltPropFloat","ltPropDirection","ltPropUndo","ltPropResize","ltPropBestfit","lyteGridStack","ltPropFlag","elements","oriNode","xElements","yElements","lyteQuerySelector","lyteGridstackKeyFlag"], 
    didDestroy : function(){
        document.removeEventListener('keydown', this.getData('lyteQuerySelector').keydown);
    },
    // default css construction and getting data from grids
    initialValSet : function(styleFlag){
    // collecting data and calculating max height and width of the scope
        var lyteQuerySelector = this.getData('lyteQuerySelector')
        var data = this.getData('lyteGridStack'), b = [], a = [], c = [];
        var scope = $L(this.getData('ltPropScope'), this.$node).e[0]
        lyteQuerySelector.occupied = [];
        lyteQuerySelector.currentPos = 0;
        lyteQuerySelector.verticalMove = true;
        elements = $L(this.getData('ltPropHandler'),scope).e;
        scope.dataSet = {};
        scope.style.scrollBehavior = "smooth"
        lyteQuerySelector.elementCount = [];
        for(var i = 0; i < elements.length; i++ )
            {
                data[i] = {x1 : '', y1 : '', length : '', height : '', nodeName : '', preX : [], preY : [], preLength : [], preHeight : [], component : undefined}
                data[i].x1 = parseInt(elements[i].getAttribute('lyte-grid-x'));
                data[i].y1 = parseInt(elements[i].getAttribute('lyte-grid-y'));
                data[i].length = parseInt(elements[i].getAttribute('lyte-grid-length'));
                data[i].height = parseInt(elements[i].getAttribute('lyte-grid-height'));
                data[i].nodeName = elements[i]
                data[i].nodeName.dataSet = {}
                data[i].oldX = [], 
                data[i].oldY = [], 
                data[i].oldLength = [], 
                data[i].oldHeight = [], 
                elements[i].elemNum = i;
                data[i].component = this
                elements[i].classList.add('items')
                lyteQuerySelector.elementCount.push(i)
                if(this.getData('ltPropResize') == true)
                    {
                        if(data[i].nodeName.getAttribute('lyte-grid-resize') != "disabled")
                            {
                                for(var j = 0;j < this.getData('ltPropResizeDirection').length;j++ )
                                    {
                                        var classes = ['lyteGridStackLeft', 'lyteGridStackRight', 'lyteGridStackBottom', 'lyteGridStackBottomLeft', 'lyteGridStackBottomRight'];
                                        var clsName = ['left', 'right', 'bottom', 'bottomLeft', 'bottomRight']
                                        if(clsName.indexOf(this.getData('ltPropResizeDirection')[j]) != -1)
                                            {
                                                var divElem = document.createElement('div');
                                                divElem.classList.add(classes[clsName.indexOf(this.getData('ltPropResizeDirection')[j])]);
                                                elements[i].appendChild(divElem);
                                            }
                                    }
                            }
                    }
                a.push(data[i].length);             
                b.push(data[i].height);
                c.push(data[i].y1 + data[i].height) 
            }
        this.previousPos.call(this, elements)
        lyteQuerySelector.MaxLength = Math.max.apply(null,a); 
        lyteQuerySelector.MaxHeight = Math.max.apply(null,b); 
        lyteQuerySelector.MaxBottom = Math.max.apply(null,c);
        scope.style.height = ((lyteQuerySelector.MaxBottom + 2)*parseInt(this.getData('ltPropUnit')) + ((lyteQuerySelector.MaxBottom + 1)*parseInt(this.getData('ltPropMarginTop')))) + 'px'    
        if(!styleFlag)    
                {
                    var style = $L('style#lyteGridStack',this.$node).e[0], elem
                    if(style == null)     
                        {
                            style = document.createElement('style');
                            style.type = "text/css";
                            style.id = "lyteGridStack";
                            this.$node.appendChild(style)
                        }
                     $L(this.getData('ltPropScope'), this.$node).addClass('lyteGridstackScope');
                     $L(this.getData('ltPropHandler'), this.$node).addClass('lyteGridstackHandler');   
                    // Constructing initial CSS     
                    var totalWid = ((parseInt(this.getData('ltPropGridLength')) + 1)*parseInt(this.getData('ltPropUnit')) + ((parseInt(this.getData('ltPropGridLength')))*parseInt(this.getData('ltPropMarginLeft'))))  
                    var widPerc = totalWid*100/scope.parentElement.clientWidth;
                    scope.style.width = (widPerc != Infinity ? widPerc : 100) + '%';    
                    for(var i = 1;i <= Math.max(parseInt(this.getData('ltPropGridLength')), lyteQuerySelector.MaxBottom) + 1;i++ )
                        {
                            if(i <= parseInt(this.getData('ltPropGridLength')))
                                {
                                    elem = this.getData('ltPropScope') + " " + this.getData('ltPropHandler') + "[lyte-grid-x = \"" + (i-1) + "\"]{left:" +  (((i)*parseInt(this.getData('ltPropUnit')) + ((i-1)*parseInt(this.getData('ltPropMarginLeft'))))*100/totalWid) + "%;}"
                                    this.styleFormation.call(this, elem, this.getData('ltPropHandler').replace(/[.|#]/gi,'') + "lytegridx" + (i-1))
                                    if(i <= parseInt(this.getData('ltPropGridLength')))
                                        {
                                            elem = this.getData('ltPropScope') + " " +this.getData('ltPropHandler') + "[lyte-grid-length = \"" + i + "\"]{width:" +  ((i*parseInt(this.getData('ltPropUnit')) + ((i-1)*parseInt(this.getData('ltPropMarginLeft'))))*100/totalWid) + "%;}"
                                            this.styleFormation.call(this, elem, this.getData('ltPropHandler').replace(/[.|#]/gi,'') + "lytegridlength" + (i-1) )
                                        }
                                }
                            if(i <= lyteQuerySelector.MaxBottom + 1)
                                {
                                    elem =this.getData('ltPropScope') + " " + this.getData('ltPropHandler') + "[lyte-grid-y = \"" + (i-1) + "\"]{top:" + ((i)*parseInt(this.getData('ltPropUnit')) + ((i-1)*parseInt(this.getData('ltPropMarginTop')))) + "px;}"
                                    this.styleFormation.call(this, elem, this.getData('ltPropHandler').replace(/[.|#]/gi,'') + "lytegridy" + (i-1))
                                    if(i <= lyteQuerySelector.MaxHeight)
                                        {
                                            elem =this.getData('ltPropScope') + " " + this.getData('ltPropHandler') + "[lyte-grid-height = \"" + i + "\"]{height:" + (i*parseInt(this.getData('ltPropUnit')) + (i-1)*parseInt(this.getData('ltPropMarginTop'))) + "px;}"
                                            this.styleFormation.call(this, elem, this.getData('ltPropHandler').replace(/[.|#]/gi,'') + "lytegridheight" + (i-1))
                                        }
                                }   
                        }
                    scope.setAttribute('lt-prop-grid-height', lyteQuerySelector.MaxBottom)
            }
        this.displayGrid.call(this, null);  
    }, 
    // function for finding maximum height of the scope 
    maxHeight : function(data){
            var elements = $L(this.getData('ltPropHandler'), $L(this.getData('ltPropScope'), this.$node).e[0]).e;
            var b = [], a = [], c = [];
            for(var i = 0;i < elements.length;i++ )
                {   
                    a.push(data[i].length);             
                    b.push(data[i].height);
                    c.push(data[i].y1 + data[i].height)
                }
            return [Math.max.apply(null,a), Math.max.apply(null,b), Math.max.apply(null,c)] 
    }, 
    // function for Constructing css dynamically while changing lyte-grid-y && lyte-grid-length && lyte-grid-height
    styleFormation : function(elem, id){
                style = document.createElement('style');
                style.type = "text/css";
                style.setAttribute('class',id)
                $L('style#lyteGridStack', this.$node).e[0].appendChild(style)
                style.append(elem)
    }, 
    // Checking and initiating css construction
    cssConstruct : function(target, attributeName){
        var data = this.getData('lyteGridStack'), scope = $L(this.getData('ltPropScope'), this.$node).e[0], lyteQuerySelector = this.getData('lyteQuerySelector');
        // Checking for height
        if(attributeName == "lyte-grid-height")
            {   
                 if(target.getAttribute('lyte-grid-height') > lyteQuerySelector.MaxHeight)
                    {   
                        for(var i = lyteQuerySelector.MaxHeight + 1;i <= (parseInt(target.getAttribute('lyte-grid-height')));i++ )
                            {
                                elem =this.getData('ltPropScope') + " " + this.getData('ltPropHandler') + "[lyte-grid-height = \"" + ((i) + "\"]{height:" + ((i)*parseInt(this.getData('ltPropUnit')) + ((i-1)*parseInt(this.getData('ltPropMarginTop'))))) + "px;}"
                                this.styleFormation.call(this, elem, this.getData('ltPropHandler').replace(/[.|#]/gi,'') + "lytegridheight" + (i + 1))
                            }
                        if(data[target.elemNum].y1 + parseInt(target.getAttribute('lyte-grid-height')) > lyteQuerySelector.MaxBottom)
                            {
                                lyteQuerySelector.MaxBottom = data[target.elemNum].y1 + parseInt(target.getAttribute('lyte-grid-height'))
                                scope.setAttribute('lt-prop-grid-height', lyteQuerySelector.MaxBottom)
                                scope.lyteData.gridHeight = lyteQuerySelector.MaxBottom;  
                                if(lyteQuerySelector.length == 1)
                                    {
                                        scope.style.height = ((lyteQuerySelector.MaxBottom + 2)*parseInt(this.getData('ltPropUnit')) + ((lyteQuerySelector.MaxBottom + 1)*parseInt(this.getData('ltPropMarginTop')))) + 'px'    
                                    }   
                            }
                        lyteQuerySelector.MaxHeight = parseInt(target.getAttribute('lyte-grid-height'))
                        data[target.elemNum].height = parseInt(target.getAttribute('lyte-grid-height'))
                    }
            }
        // Checking for top position    
        else if(attributeName == "lyte-grid-y")
            {
                if((parseInt(target.getAttribute('lyte-grid-y')) + (parseInt(target.getAttribute('lyte-grid-height')))) > (lyteQuerySelector.MaxBottom-1))
                    {
                        for(var i = lyteQuerySelector.MaxBottom + 1;i <= (parseInt(target.getAttribute('lyte-grid-y')) + (parseInt(target.getAttribute('lyte-grid-height'))));i++ )
                            {
                                elem =this.getData('ltPropScope') + " " + this.getData('ltPropHandler') + "[lyte-grid-y = \"" + (i) + "\"]{top:" + ((i + 1)*parseInt(this.getData('ltPropUnit')) + (i)*parseInt(this.getData('ltPropMarginTop'))) + "px;}"
                                this.styleFormation.call(this, elem, this.getData('ltPropHandler').replace(/[.|#]/gi,'') + "lytegridy" + (i))
                            }
                        lyteQuerySelector.MaxBottom = (parseInt(target.getAttribute('lyte-grid-y')) + (parseInt(target.getAttribute('lyte-grid-height'))))
                        data[target.elemNum].y1 = parseInt(target.getAttribute('lyte-grid-y'))
                        scope.setAttribute('lt-prop-grid-height', lyteQuerySelector.MaxBottom)
                        scope.lyteData.gridHeight = lyteQuerySelector.MaxBottom;
                        lyteQuerySelector.previousNode = target   
                    }
                 else if((parseInt(target.getAttribute('lyte-grid-y')) + (parseInt(target.getAttribute('lyte-grid-height')))) < (lyteQuerySelector.MaxBottom-1) && lyteQuerySelector.previousNode == target)
                    {
                        data[target.elemNum].y1 = parseInt(target.getAttribute('lyte-grid-y'))
                        var ret = this.maxHeight.call(this, data)
                        for(var j = lyteQuerySelector.MaxBottom;j > ret[2];j--)
                            {
                                if($L('.'+this.getData('ltPropHandler').replace(/[.|#]/gi,'') + "lytegridy" + (j), this.$node).e[0])
                                    {
                                        var temporary = $L('style#lyteGridStack', this.$node).e[0]
                                        if(temporary)
                                            {
                                                var dummy = $L('.'+this.getData('ltPropHandler').replace(/[.|#]/gi,'') + "lytegridy" + (j), this.$node).e[0]
                                                if(dummy && dummy.parentElement == temporary)
                                                    {
                                                        temporary.removeChild(dummy)
                                                    }
                                            }
                                    }
                            }
                        scope.setAttribute('lt-prop-grid-height', ret[2])
                        lyteQuerySelector.MaxBottom = ret[2]
                    }
                 if(lyteQuerySelector.length == 1)  
                    {
                        scope.style.height = ((lyteQuerySelector.MaxBottom + 2)*parseInt(this.getData('ltPropUnit')) + ((lyteQuerySelector.MaxBottom + 1)*parseInt(this.getData('ltPropMarginTop')))) + 'px'    
                    }   
            }
        // Checking for length  
        else if(attributeName == "lyte-grid-length")
            {   
                var ltPropGridLength = parseInt(this.getData('ltPropGridLength'))
                var gridLength =  parseInt(target.getAttribute('lyte-grid-length'))
                var xPos =  parseInt(target.getAttribute('lyte-grid-x'))
                 if((xPos + gridLength > ltPropGridLength))  
                        {
                            data[target.elemNum].length = ltPropGridLength - xPos
                            target.setAttribute('lyte-grid-length', data[target.elemNum].length)
                        }
            }
        }, 
    // initiating css construction  
    setVal : function(target, attributeName, attributeValue, flag){
        target.setAttribute(attributeName, attributeValue);
        if(attributeName == 'lyte-grid-y' || attributeName == 'lyte-grid-height' || attributeName == 'lyte-grid-length' || attributeName == 'lyte-grid-x')
            {
                this.cssConstruct.call(this, target, attributeName)
            }
        target.dataSet[attributeName] = attributeValue; 
    }, 
    // initiating css construction  and finding grid positions
    displayGrid : function(x){
                var elements = $L(this.getData('ltPropHandler'), $L(this.getData('ltPropScope'), this.$node).e[0]).e, lyteQuerySelector = this.getData('lyteQuerySelector');
                var data = this.getData('lyteGridStack');
                for(var k = 0;k < elements.length;k++ )
                    {
                        if(k != x)
                            {
                                this.setVal(elements[k], 'lyte-grid-y', data[k].y1)  
                                this.setVal(elements[k], 'lyte-grid-x', data[k].x1)
                                if(data[k].length != data[k].nodeName.getAttribute('lyte-grid-length-old'))
                                    {   
                                        this.setVal(elements[k], 'lyte-grid-length', data[k].length, true)
                                    }
                                if(data[k].height != data[k].nodeName.getAttribute('lyte-grid-height-old'))
                                    {
                                        this.setVal(elements[k], 'lyte-grid-height', data[k].height)
                                    }
                            }
                    }
                $L(this.getData('ltPropScope'), this.$node).e[0].dataSet['lt-prop-grid-height'] = lyteQuerySelector.MaxBottom
                $L(this.getData('ltPropScope'), this.$node).e[0].dataSet['lt-prop-grid-length'] = parseInt(this.getData('ltPropGridLength'))   
                this.positionFind.call(this, elements)
                        
        }, 
    // To find all grid positions   
    positionFind : function(elements){
                var xCor = [], yCor = [], xCorEnd = [], yCorEnd = [], x = [], y = [], a = [], b = [], Max;
                data = this.getData('lyteGridStack');
                for(var k = 0;k < elements.length;k++ )
                    {
                        x.push(data[k].x1);
                        y.push(data[k].y1);
                        a.push(data[k].x1 + data[k].length);
                        b.push(data[k].y1 + data[k].height);
                    }
                Max = Math.max(Math.max.apply(null,x), Math.max.apply(null,y), Math.max.apply(null,a), Math.max.apply(null,b));
                for(var j = 0;j <= Max;j++ )
                    {
                        x = [], y = [], a = [], b = [];
                        for(var i = 0;i < data.length;i++ )
                            {   
                                if(data[i].x1 <= j && j <= data[i].x1 + data[i].length)
                                    {
                                        x.push(i);
                                    }   
                                if(data[i].y1 <= j && j <= data[i].y1 + data[i].height)
                                    {
                                        y.push(i);
                                    }               
                            }
                        xCor.push(x);
                        yCor.push(y);
                    }
                Lyte.arrayUtils(this.data.xElements, 'remove', 0, this.data.xElements.length)
                Lyte.arrayUtils(this.data.xElements, 'concat', xCor)    
                Lyte.arrayUtils(this.data.yElements, 'remove', 0, this.data.yElements.length)
                Lyte.arrayUtils(this.data.yElements, 'concat', yCor)      
       
    }, 
    // To remove same elements from Checking    
    multipleRemoval : function(elementsToCheck){
            for(var z = 0;z < elementsToCheck.length;z++ )
                {
                    for(var y = z + 1;y < elementsToCheck.length;y++ )
                    {
                        if(elementsToCheck[z] == elementsToCheck[y])
                        {
                            Lyte.arrayUtils(elementsToCheck, 'removeAt', y)
                            y--;
                        }
                    }
                }
             return elementsToCheck 
    }, 
    // To check elements in hori and vertical directions
    similarData : function(elementsToCheck1, elementsToCheck2){
            var temp = []
            if(!(elementsToCheck1 == undefined || elementsToCheck2 == undefined))
                {
                    for(var i = 0;i < elementsToCheck1.length;i++ )
                        {
                            for(var j = 0;j < elementsToCheck2.length;j++ )
                                {
                                    if(elementsToCheck1[i] == elementsToCheck2[j])
                                        {
                                            temp.push(elementsToCheck1[i]);
                                            break;
                                        }
                                }
                        }
                }
            else
                {
                    temp = elementsToCheck1 ? elementsToCheck1 : elementsToCheck2;
                }   
            return temp;    
    }, 
    // To find the other elements on selected element
    elementCheck : function(element, node, flag){
            var elementsToCheck = [], k, xElements = this.getData('xElements');
             var data = this.getData('lyteGridStack');
            if(data[node.elemNum].length > 1)
                {
                    if(flag)
                        {
                            k = data[node.elemNum].x1
                        }
                    else
                        {
                             k = data[node.elemNum].x1 + 1;
                        }   
                    for(;k < (data[node.elemNum].x1 + data[node.elemNum].length);k++ )
                        {
                            if(xElements[k])
                                {
                                    if(xElements[k].length)
                                        {
                                            elementsToCheck = elementsToCheck.concat(this.getData('xElements')[k]);
                                        }
                                }   
                        }   
                }
            else
                {
                    elementsToCheck = this.similarData.call(this, xElements[data[node.elemNum].x1], xElements[data[node.elemNum].x1 + 1])
                }
            if(elementsToCheck)                 
                {
                    return this.multipleRemoval.call(this, elementsToCheck);    
                }
            else
                {
                    return [];
                }   
    }, 
    // To find clicked Pos
    nodeName : function(event){
            nodeName = event.target;
            if(nodeName)
            {
                var flag = false, val;
                element = $L(this.getData('ltPropScope'), this.$node).e[0];
                while(nodeName != element && nodeName.tagName != "BODY" && nodeName.tagName != "HTML")
                    {
                        if(nodeName.classList.contains('lyteGridStackLeft'))
                            {
                                val = 'left'
                                flag = true
                                break;
                            }
                        else if(nodeName.classList.contains('lyteGridStackRight'))
                            {
                                val = 'right'
                                flag = true
                                break;
                            }
                        else if(nodeName.classList.contains('lyteGridStackBottom'))
                            {
                                val = 'bottom'
                                flag = true
                                break;
                            }
                        else if(nodeName.classList.contains('lyteGridStackBottomLeft'))
                            {
                                val = 'BottomLeft'
                                flag = true
                                break;
                            }
                        else if(nodeName.classList.contains('lyteGridStackBottomRight'))
                            {
                                val = 'BottomRight'
                                flag = true
                                break;
                            }       
                        else if(nodeName.tagName == 'LYTE-GRID-CONTENT')
                            {
                                val = 'content'
                                flag = true
                                break;
                            }           
                        else
                            {
                                nodeName = nodeName.parentElement;
                            } 
                    }
                if(nodeName != element && flag)
                    {
                        return [val, nodeName.parentElement, nodeName.parentElement.parentElement];
                    }
                else 
                    {
                        return null;
                    }
            }
        else
            {
                return null;
            }           
    },
    // updating value on every changes 
    valueUpdating : function(i, x1, attributeName){
        var data = this.getData('lyteGridStack')
        if(data[i][x1] != data[i].nodeName.dataSet[attributeName])
            {
                data[i].nodeName.dataSet[attributeName + '-old'] =  data[i].nodeName.dataSet[attributeName]
                data[i].nodeName.dataSet[attributeName] = parseInt(data[i][x1])
            }
    }, 
    // Number of elements adjacent around selected elements
    bottomElementsCount : function(node, direction, flag){
        var x1, y1, length, height, yElements1, xElements1, offsetLeft, initialLeft, lytegridlength, x, ltPropMarginLeft ;
        if(direction == 'vertical')
            {
                x1 = 'y1', y1 = 'x1', length = 'height', height = 'length', yElements1 = 'xElements', xElements1 = 'yElements', offsetLeft = 'offsetTop', initialLeft = 'initialTop', lytegridlength = 'lyte-grid-height', ltPropMarginLeft ='ltPropMarginTop'
            }
        else
            {
                x1 = 'x1', y1 = 'y1', length = 'length', height = 'height', yElements1 = 'yElements', xElements1 = 'xElements', offsetLeft = 'offsetLeft', initialLeft = 'initialLeft', lytegridlength = 'lyte-grid-length', ltPropMarginLeft ='ltPropMarginLeft'
            }
        x = parseInt(((node[offsetLeft]-parseInt(this.getData('ltPropUnit')))/(parseInt(this.getData('ltPropUnit')) + parseInt(this.getData(ltPropMarginLeft)))).toFixed(0))
        x = x > 0 ? x : 0   
        if(this.getData('ltPropFlag'))
            {
                var data = this.getData('lyteGridStack'), yElements = this.getData(yElements1), xElements = this.getData(xElements1), elementsToCheck = [], elementsToCheck1 = [], elementsToCheck2 = [];
                if(!flag)
                    {
                        if(data[node.elemNum][length] > 1)
                            {
                                for(var i = data[node.elemNum][x1] + 1; i < data[node.elemNum][x1] + data[node.elemNum][length] ; i++)
                                    {
                                        elementsToCheck = elementsToCheck.concat(xElements[i])
                                    }
                            }
                        else
                            {
                                elementsToCheck = this.similarData.call(this, xElements[data[node.elemNum][x1]], xElements[data[node.elemNum][x1] + data[node.elemNum][length]])
                            }
                    }
                else
                    {
                        if(node[offsetLeft] > node[initialLeft][0])
                            {
                                elementsToCheck = elementsToCheck.concat(xElements[data[node.elemNum][x1]])
                            }
                        else if(node[offsetLeft] < node[initialLeft][0] || node.getAttribute(lytegridlength) != data[node.elemNum][length])
                            {
                                elementsToCheck = elementsToCheck.concat(xElements[data[node.elemNum][x1] + data[node.elemNum][length]])
                            }   
                    }   
                elementsToCheck1 = this.multipleRemoval.call(this, elementsToCheck1.concat(yElements[data[node.elemNum][y1] + data[node.elemNum][height]]))
                elementsToCheck2 = this.multipleRemoval.call(this,elementsToCheck2.concat(yElements[data[node.elemNum][y1]]))
                elementsToCheck = this.multipleRemoval.call(this, elementsToCheck)  
                Lyte.arrayUtils(elementsToCheck1, 'removeAt', elementsToCheck1.indexOf(node.elemNum))
                Lyte.arrayUtils(elementsToCheck2, 'removeAt', elementsToCheck2.indexOf(node.elemNum))
                Lyte.arrayUtils(elementsToCheck, 'removeAt', elementsToCheck.indexOf(node.elemNum))
                if(!flag)   
                    {
                        var array = [];
                        array[array.length] = this.similarData.call(this, elementsToCheck, elementsToCheck1).length
                        array[array.length] = this.similarData.call(this, elementsToCheck, elementsToCheck2).length
                        return array
                    }
                else
                    {
                        return [this.similarData.call(this, elementsToCheck, elementsToCheck1), this.similarData.call(this, elementsToCheck, elementsToCheck2)]
                    }               
            }
        else
            {
                return [1,1];
            }   


    },
    // where selected grid direction changes
    contraFlexure : function(node,direction){
            var movement, instantPrevious, offsetTop, initialTop
            if(direction == 'x')
                {   
                    movement = 'movementX', instantPrevious = 'instantPreviousX', offsetTop = 'offsetLeft', initialTop = 'initialLeft'
                }
            else
                {
                    movement = 'movementY', instantPrevious = 'instantPreviousY', offsetTop = 'offsetTop', initialTop = 'initialTop'
                }   
            if(node[initialTop][0] != node[offsetTop])
                {
                    if(node[movement] == 'decrease' && (node[instantPrevious] > node[offsetTop]))
                        {
                            node[initialTop][0] = node[offsetTop] 
                            node[movement] = 'increase'
                        }
                    else if(node[movement] == 'increase' && ( node[offsetTop] > node[instantPrevious]))
                        {
                            node[initialTop][0] = node[offsetTop]
                            node[movement] = 'decrease'
                        }
                    node[instantPrevious] = node[offsetTop] 
                }
        },
    // Initial function on mousemove    
    mousemoveFun : function(element, event){
    event.preventDefault()    
    var lyteQuerySelector = this.elementSorting.call(this,this.getData('lyteQuerySelector'))
    for(var z = 0;z < lyteQuerySelector.SelectedNodes.length; z++)
        {   
            lyteQuerySelector.previousPosFind = true
            var i, j, k, flag = true, stackElements = [], stackElements1 = [], flag1 = true, flag2 = true, elementsToCheck = [], elementsToCheck1 = [], btmEl, btmEl1;
            var data = this.getData('lyteGridStack');
            var node = data[lyteQuerySelector.SelectedNodes[z]].nodeName;
            var xIni = node.xPos;
            var yIni = node.yPos;
            var elements = $L(this.getData('ltPropHandler'), element).e;
            var xPos = event.clientX;
            var yPos = event.clientY;
            var xCor = this.getData('xElements');
            var yCor = this.getData('yElements');
            var xElements = this.getData('xElements');
            var yElements = this.getData('yElements');
            var unit = this.getData('ltPropUnit');
            var marginTop = this.getData('ltPropMarginTop');
            var MarginLeft = this.getData('ltPropMarginLeft'), dumm;
            if(((node.initialLeft[1]-node.offsetLeft) < 0))
                {
                    node.initialLeft[1] += parseInt(((-node.initialLeft[1] + node.offsetLeft)/parseInt(unit)).toFixed(0))*parseInt(unit)
                }
            else if(((node.initialLeft[1]-node.offsetLeft) > 0))
                {
                    node.initialLeft[1] -= parseInt(((node.initialLeft[1]-node.offsetLeft)/parseInt(unit)).toFixed(0))*parseInt(unit)
                }   
            if(((node.initialTop[1]-node.offsetTop) < 0))
                {
                    node.initialTop[1] += parseInt(((-node.initialTop[1] + node.offsetTop)/parseInt(unit)).toFixed(0))*parseInt(unit)
                }
            else if(((node.initialLeft[1]-node.offsetLeft) > 0))
                {
                    node.initialTop[1] -= parseInt(((node.initialTop[1]-node.offsetTop)/parseInt(unit)).toFixed(0))*parseInt(unit)
                }
            i = node.elemNum;
            if(data[i].length != parseInt(node.getAttribute('lyte-grid-length')) || data[i].height != parseInt(node.getAttribute('lyte-grid-height')) || ((node.offsetLeft < node.initialLeft[0]) && (node.offsetTop < node.initialTop[0])) /*|| ((node.offsetLeft < node.initialLeft[0]) && (node.offsetTop > node.initialTop[0]))*/)
                {
                    flag2 = true
                }
            else if((data[i].x1) == parseInt(node.getAttribute('lyte-grid-x')))
                {
                    flag2 = false
                }
            else if(node.offsetTop > (node.initialTop[0] + parseInt(this.getData('ltPropUnitTop'))))
                {
                    flag2 = false
                }           
            if(node.flag)   
                {
                    left = xPos-xIni;
                    topPos = yPos-yIni; 
                    node.style.left = (left) + 'px';
                    node.style.top = topPos + 'px'; 
                    var temppp = parseInt(((node.offsetLeft-parseInt(unit))/(parseInt(unit) + parseInt(MarginLeft))).toFixed(0))
                    if(temppp != data[i].x1){
                        dumm = true
                    }
                    data[i].x1 = temppp > 0 ? temppp : 0;
                    data[i].x1 = data[i].x1 > (parseInt(this.getData('ltPropGridLength'))-data[i].length)?(parseInt(this.getData('ltPropGridLength'))-data[i].length):data[i].x1;
                }
            else
                {
                    // resizing functions
                    if((node.value == "right" || node.value == "BottomRight") && (node.xOff + xPos-node.getBoundingClientRect().left) >= parseInt(unit))
                        {
                            node.style.width = (node.xOff + xPos-node.getBoundingClientRect().left) + 'px';
                            data[i].x1 = parseInt(((node.offsetLeft-parseInt(unit))/(parseInt(unit) + parseInt(MarginLeft))).toFixed(0))
                            if((node.offsetLeft + node.clientWidth) > ((parseInt(this.getData('ltPropGridLength')) + 1)*parseInt(unit) + ((parseInt(this.getData('ltPropGridLength'))-1)*parseInt(MarginLeft))))
                                {
                                    data[i].x1 = parseInt(this.getData('ltPropGridLength')) - data[i].length
                                }
                            else 
                                { 
                                    data[node.elemNum].length = parseInt(((node.clientWidth + parseInt(MarginLeft))/(parseInt(MarginLeft) + parseInt(unit))).toFixed(0))
                                }   
                        }
                    if((node.value == "left" || node.value == "BottomLeft") && (node.xOff + Math.abs(xPos-node.getBoundingClientRect().left-node.clientWidth)) >= parseInt(unit))
                        {
                            node.style.width = (node.clientWidth-(-node.xOff + xPos-node.getBoundingClientRect().left)) + 'px'
                            node.style.left = (-node.xOff + xPos-node.getBoundingClientRect().left + node.offsetLeft) + 'px';
                            data[i].x1 = parseInt(Math.round((node.offsetLeft + node.clientWidth)/(parseInt(unit) + parseInt(MarginLeft))).toFixed(0))
                            if(node.offsetLeft < parseInt( unit))
                                {
                                    data[i].x1 = 0
                                }
                            else    
                                {
                                    data[node.elemNum].length = parseInt(((node.clientWidth + parseInt(MarginLeft))/(parseInt(MarginLeft) + parseInt(unit))).toFixed(0))
                                    data[i].x1 -= data[node.elemNum].length
                                }
                        }   
                    data[i].x1 = data[i].x1 > 0?data[i].x1:0
                    data[i].x1 = data[i].x1 > (parseInt(this.getData('ltPropGridLength'))-data[i].length)?(parseInt(this.getData('ltPropGridLength'))-data[i].length):data[i].x1; 
                    if((node.value == "bottom" || node.value == "BottomLeft" || node.value == "BottomRight") && (node.yOff + yPos-node.getBoundingClientRect().top) >= parseInt(unit))
                        {
                            node.style.height = (node.yOff + yPos-node.getBoundingClientRect().top) + 'px'                          
                        }
                    if(node.offsetTop  > (parseInt(unit) - parseInt(marginTop)))
                        {       
                            data[node.elemNum].height = parseInt(((node.clientHeight + parseInt(marginTop))/(parseInt(marginTop) + parseInt(unit))).toFixed(0))
                        }
                    data[i].length = data[i].length > 0?data[i].length:1;
                    data[i].height = data[i].height > 0?data[i].height:1;   
                }

            var btmEl = this.bottomElementsCount.call(this, node, 'horizontal'),btmEl1 = this.bottomElementsCount.call(this, node, 'vertical')
            if(node.initialTop[0] > node.offsetTop)
                {
                    this.verticalMoveBottomToTop.call(this, element, node)
                }
             if(node.initialTop[0] < node.offsetTop)
                {
                    this.verticalMoveTopToBottom.call(this, element, node)
                }
            if((btmEl1[0] != 0 && (node.offsetLeft > node.initialLeft[0])) || (btmEl1[1] != 0 && node.initialLeft[0] > node.offsetLeft && data[node.elemNum].height <= parseInt(node.getAttribute('lyte-grid-height'))) || ((data[i].length) > node.dataSet['lyte-grid-length-old']) && data[node.elemNum].height <= parseInt(node.getAttribute('lyte-grid-height')))       
                {
                    this.topCheck.call(this, node, element);  
                    if(!this.getData('ltPropFloat'))
                        {
                            this.topMoveFunc.call(this, node)
                        }
                }   
            if(flag2|| (btmEl[0] == 0 && node.initialTop[0] < node.offsetTop) || (btmEl[1] == 0 && node.initialTop[0] > node.offsetTop) || !this.getData('ltPropFloat'))
                {
                    var temp =parseInt(((node.offsetTop-parseInt(unit))/(parseInt(unit) + parseInt(marginTop))).toFixed(0))
                    if((btmEl[0] == 0 && node.initialTop[0] < node.offsetTop))
                        {
                            if(data[i].y1 <= temp)
                                {
                                    data[i].y1 = temp
                                }
                        }
                    else if((btmEl[1] == 0 && node.initialTop[0] > node.offsetTop))
                        {
                            if(data[i].y1 >=temp)
                                {
                                    data[i].y1 = temp
                                }
                        }   
                    data[i].y1 = data[i].y1 > 0?data[i].y1:0;
                }
            if(dumm || data[node.elemNum].x1 != parseInt(node.getAttribute('lyte-grid-x'))|| data[node.elemNum].y1 != parseInt(node.getAttribute('lyte-grid-y')) || data[node.elemNum].length != parseInt(node.getAttribute('lyte-grid-length')) || data[node.elemNum].height != parseInt(node.getAttribute('lyte-grid-height')))    
                {    
                    this.valueUpdating.call(this, i, 'x1', 'lyte-grid-x')
                    this.valueUpdating.call(this, i, 'y1', 'lyte-grid-y')
                    this.valueUpdating.call(this, i, 'length', 'lyte-grid-length')
                    this.valueUpdating.call(this, i, 'height', 'lyte-grid-height')        
                    this.positionFind.call(this, elements)        
                    var l, count = 0, stackElements = [];
                    var data = this.getData('lyteGridStack');
                    if((node.initialLeft[0] > node.offsetLeft || node.initialLeft[0] < node.offsetLeft) || (node.dataSet['lyte-grid-length-old'] > data[node.elemNum].length))
                        {
                            elementsToCheck =  xElements[data[node.elemNum].x1].concat(xElements[data[node.elemNum].x1 + data[node.elemNum].length])
                        }   
                    elementsToCheck1 = this.yElementsFind.call(this, data[node.elemNum].y1 + data[node.elemNum].height, lyteQuerySelector.MaxBottom, yElements)    
                    elementsToCheck = this.multipleRemoval.call(this, this.similarData.call(this, elementsToCheck, elementsToCheck1))
                    if(elementsToCheck.indexOf(node.elemNum) != -1) 
                        {
                            Lyte.arrayUtils(elementsToCheck, 'removeAt', elementsToCheck.indexOf(node.elemNum))
                        }
                    for(l = 0;l < elementsToCheck.length;l++ )
                        {
                            if(data[node.elemNum].y1 + data[node.elemNum].height <= data[elementsToCheck[l]].y1 + 1)
                                {
                                    if((((node.initialLeft[0] > node.offsetLeft) && data[elementsToCheck[l]].x1 == data[node.elemNum].x1 + data[node.elemNum].length)) || ((node.initialLeft[0] < node.offsetLeft) && data[node.elemNum].x1 == data[elementsToCheck[l]].x1 + data[elementsToCheck[l]].length) || (node.dataSet['lyte-grid-length-old'] - data[node.elemNum].length == 1))
                                        {
                                            var valMove = this.heightGet.call(this, data[elementsToCheck[l]].nodeName)
                                            if(!!valMove)
                                                {
                                                    flag1 = false
                                                    count = data[elementsToCheck[l]].y1;
                                                    data[elementsToCheck[l]].y1 = data[elementsToCheck[l]].y1 - ( this.getData('ltPropFloat')? (data[elementsToCheck[l]].y1 - valMove < data[node.elemNum].y1) ? data[elementsToCheck[l]].y1 - data[node.elemNum].y1 :valMove : valMove )
                                                    this.valueUpdating.call(this, elementsToCheck[l], 'y1', 'lyte-grid-y')
                                                    this.topMoveFunc.call(this, data[elementsToCheck[l]].nodeName, count, false, node);
                                                    this.displayGrid.call(this, node.elemNum);
                                                    break;
                                                }
                                        }
                                }
                        }
                    this.contraFlexure.call(this, node)
                    this.contraFlexure.call(this, node, 'x')
                    if((data[node.elemNum].y1 < (parseInt(node.getAttribute('lyte-grid-y'))) || (node.initialTop[0] - node.offsetTop > parseInt(marginTop))) && !this.getData('ltPropFloat'))
                        {
                            this.topMoveFunc.call(this, node, parseInt(node.getAttribute('lyte-grid-y')), false, node);
                        }
                    if((data[node.elemNum].height > node.dataSet['lyte-grid-height-old'] && !element.flag))
                        {
                             lyteQuerySelector.verticalMove = false
                            node.setAttribute('lyte-grid-height', data[node.elemNum].height)
                            this.verticalCheck.call(this, data[node.elemNum], data[node.elemNum].y1 + data[node.elemNum].height, data[node.elemNum].y1 + data[node.elemNum].height, node, true)
                            this.displayGrid.call(this, node.elemNum);
                        }   
                    else if((data[node.elemNum].height < node.dataSet['lyte-grid-height-old'] && !element.flag))
                        {
                            lyteQuerySelector.verticalMove = false
                            node.setAttribute('lyte-grid-height', data[node.elemNum].height)
                            this.topMoveFunc.call(this, node, data[node.elemNum].y1, true);
                            this.displayGrid.call(this, node.elemNum);
                        }       
                    event.preventDefault();
                    if(!this.getData('ltPropFloat'))   
                        {
                            valMove = this.heightGet.call(this, node)
                        }
                    else
                        {
                            valMove = 0
                        }
                    if(flag1 && node.dataSet['lyte-grid-x'] != node.dataSet['lyte-grid-x-old'])   
                        {
                            this.positionFind.call(this, elements)
                            var elementCount = this.elementSorting.call(this, this.similarData.call(this,  this.multipleRemoval.call(this, this.yElementsFind.call(this, this.getData('ltPropFloat') ? data[node.elemNum].y1  : data[node.elemNum].y1, data[node.elemNum].y1 + data[node.elemNum].height, yElements)),  this.multipleRemoval.call(this, this.yElementsFind.call(this, this.getData('ltPropFloat') ? data[node.elemNum].x1 -1 : data[node.elemNum].x1, data[node.elemNum].x1 + data[node.elemNum].length - 1/*this.getData('ltPropFloat') ? 1 : 0*/, xElements))))
                            if(elementCount.indexOf(node.elemNum) != -1)    
                                {
                                    Lyte.arrayUtils(elementCount, 'removeAt', elementCount.indexOf(node.elemNum))
                                }
                                    for(var j = 0;j < elementCount.length;j++ )
                                        {
                                            if((data[node.elemNum].x1 == data[elementCount[j]].x1 + data[elementCount[j]].length && node.initialLeft[0] < node.offsetLeft && (node.offsetLeft >= data[elementCount[j]].nodeName.offsetLeft + data[elementCount[j]].nodeName.clientWidth)) || (data[node.elemNum].x1 + data[node.elemNum].length == data[elementCount[j]].x1 && node.initialLeft[0] < node.offsetLeft && (node.offsetLeft + node.clientHeight <= data[elementCount[j]].nodeName.offsetLeft)))
                                              {  
                                                if( data[elementCount[j]].y1 > data[node.elemNum].y1 && !data[elementCount[j]].nodeName.classList.contains('selected'))
                                                    {
                                                        var htmve = this.heightGet.call(this, data[elementCount[j]].nodeName)
                                                        if(htmve)
                                                            {
                                                                data[elementCount[j]].y1 = data[elementCount[j]].y1 - htmve/*( this.getData('ltPropFloat')? htmve >= data[node.elemNum].height ? data[elementCount[j]].y1 - data[node.elemNum].y1 :htmve : htmve )*/
                                                                this.valueUpdating.call(this, elementCount[j], 'y1', 'lyte-grid-y')
                                                                this.topMoveFunc.call(this, data[elementCount[j]].nodeName, data[elementCount[j]].y1);
                                                            }
                                                    }
                                            }
                                        }
                        }
            }
          else
            {
                if(!this.getData('ltPropFloat'))   
                        {
                            valMove = this.heightGet.call(this, node)
                        }
                    else
                        {
                            valMove = 0
                        }
            }  
        if(this.getMethods('onMove'))
            {
                this.executeMethod('onMove', node, node.dataSet, element.dataSet, event)
            }       
        }
    var bestFit = element.querySelector('div.lyteBestFit');
    if(bestFit && node && this.getData('ltPropBestfit'))
        {
            bestFit.style.left = ((data[node.elemNum].x1 + 1)*parseInt(unit) + ((data[node.elemNum].x1)*parseInt(MarginLeft))) + 'px';
            bestFit.style.top = ((data[node.elemNum].y1-valMove + 1)*parseInt(unit) + ((data[node.elemNum].y1-valMove)*parseInt(marginTop))) + 'px';
            bestFit.style.width = (data[node.elemNum].length*parseInt(unit) + (data[node.elemNum].length-1)*parseInt(MarginLeft)) + 'px';
            bestFit.style.height = ((data[node.elemNum].height)*parseInt(unit) + (data[node.elemNum].height-1)*parseInt(marginTop)) + 'px';
            bestFit.style.display = "block";
        }
    }, 
    // check for movement from bottom to top
    verticalMoveBottomToTop : function(element, node){
            var topElements = [], i, temp1 = 0, flag = true, elementsToCheck = [], elementsToCheck1 = [];
            data = this.getData('lyteGridStack');   
            elementsToCheck = this.elementCheck.call(this, element, node)
            temp1 = data[node.elemNum].y1                           
            elementsToCheck1 = this.getData('yElements')[temp1];
            if(elementsToCheck1)
                {
                    elementsToCheck = this.similarData.call(this, elementsToCheck, elementsToCheck1)
                }
            if(elementsToCheck.indexOf(node.elemNum) != -1) 
                {
                    Lyte.arrayUtils(elementsToCheck, 'removeAt', elementsToCheck.indexOf(node.elemNum))
                }
            for(i = 0;i < elementsToCheck.length;i++ )
                {
                    if((node.offsetTop < (data[elementsToCheck[i]].nodeName.offsetTop + data[elementsToCheck[i]].nodeName.clientHeight - 0.5 * parseInt(this.getData('ltPropMarginTop')))) && (node.offsetTop > (data[elementsToCheck[i]].nodeName.offsetTop + parseInt(this.getData('ltPropMarginTop')))) &&(data[node.elemNum].y1 == data[elementsToCheck[i]].y1 + data[elementsToCheck[i]].height) &&/* (data[node.elemNum].y1 < data[elementsToCheck[i]].y1 + data[elementsToCheck[i]].height) &&*/ (node.initialTop[0] > node.offsetTop) /*&& (((node.initialLeft[0] +node.clientWidth) < data[elementsToCheck[i]].nodeName.offsetLeft + data[elementsToCheck[i]].nodeName.clientWidth) &&((node.initialLeft[0] +node.clientWidth) > data[elementsToCheck[i]].nodeName.offsetLeft) || (node.initialLeft[0]) < (data[elementsToCheck[i]].nodeName.offsetLeft + data[elementsToCheck[i]].nodeName.clientWidth) && (node.initialLeft[0] > data[elementsToCheck[i]].nodeName.offsetLeft) || (node.initialTop[0] + node.clientHeight < data[elementsToCheck[i]].nodeName.offsetTop ) || (node.initialTop[0] > data[elementsToCheck[i]].nodeName.offsetTop + data[elementsToCheck[i]].nodeName.clientHeight))*/)
                        {
                            topElements[topElements.length] = elementsToCheck[i];
                        }
                }
            if(topElements.length)
                {
                    topElements = this.elementSorting.call(this,topElements)
                    for(var i = 0; i < topElements.length; i++)
                      { 
                        ht = this.heightGet.call(this, node, data[topElements[i]].nodeName)
                        if(this.getData('ltPropFloat'))
                            {
                                ht = data[topElements[i]].height > ht ? ht : data[topElements[i]].height
                            }   
                        var iniHgt = data[topElements[i]].y1 + data[topElements[i]].height
                        data[node.elemNum].y1 = iniHgt - ht;
                        this.valueUpdating.call(this, node.elemNum, 'y1', 'lyte-grid-y')
                        var temp =(data[node.elemNum].y1 + data[node.elemNum].height) < (data[topElements[i]].y1-this.heightGet.call(this, data[topElements[i]].nodeName))?(data[topElements[i]].y1-this.heightGet.call(this, data[topElements[i]].nodeName)):(data[node.elemNum].y1 + data[node.elemNum].height);
                        this.verticalCheck.call(this, data[topElements[i]],iniHgt, temp + data[topElements[i]].height, node, true)
                        data[topElements[i]].y1 = temp
                        this.valueUpdating.call(this, topElements[i], 'y1', 'lyte-grid-y')
                        if(!this.getData('ltPropFloat') || (i == topElements.length -1 && i != 0))
                            {
                                this.topMoveFunc.call(this, node, data[node.elemNum].y1 + ht, false)
                            }
                        if(!this.getData('ltPropFloat'))
                            {
                                this.topMoveFunc.call(this, data[topElements[i]].nodeName, data[topElements[i]].y1, true)
                            }
                    }
                    this.displayGrid.call(this)
                }       
    }, 
    // check for movement top to bottom
    verticalMoveTopToBottom : function(element, node){
            var topElements = [], bottomElements = [], i, j, temp1 = 0, flag = true, elementsToCheck = [], elementsToCheck1 = [], upHeight = 0;
            var data = this.getData('lyteGridStack');
            elementsToCheck = this.elementCheck.call(this, element, node)
            temp1 = data[node.elemNum].y1                           
            elementsToCheck1 = this.getData('yElements')[temp1 + data[node.elemNum].height];
            if(elementsToCheck1)
                {
                    elementsToCheck = this.similarData.call(this, elementsToCheck, elementsToCheck1)
                }
            if(elementsToCheck.indexOf(node.elemNum) != -1)
                {
                    Lyte.arrayUtils(elementsToCheck, 'removeAt', elementsToCheck.indexOf(node.elemNum))
                }   

            for(i = 0;i < elementsToCheck.length;i++ )
                {
                    if((node.offsetTop + node.clientHeight > (data[elementsToCheck[i]].nodeName.offsetTop + parseInt(this.getData('ltPropMarginTop')))) /*&& (node.offsetTop < (data[elementsToCheck[i]].nodeName.offsetTop + parseInt(this.getData('ltPropMarginTop'))))*/ && (node.initialTop[0] <= node.offsetTop) && ((data[elementsToCheck[i]].nodeName.offsetLeft + data[elementsToCheck[i]].nodeName.clientWidth > node.initialLeft[0]) && (node.initialLeft[0] + node.clientWidth > data[elementsToCheck[i]].nodeName.offsetLeft) && (node.initialTop[0] + node.clientHeight < data[elementsToCheck[i]].nodeName.offsetTop ||node.initialTop[0] > data[elementsToCheck[i]].nodeName.offsetTop + data[elementsToCheck[i]].nodeName.clientHeight))) 
                        {
                            topElements[topElements.length] = elementsToCheck[i];
                        }
                }
            if(topElements.length)
                { 
                    var arr = [], max;
                    for(i = 0;i < topElements.length;i++ )
                        {
                            arr.push(data[topElements[i]].height + data[topElements[i]].y1);
                        }
                    ht = arr.reduce(function(a, b){return Math.max(a, b);});        
                    for(var j = 0;j < topElements.length;j++ )
                        {
                            if(!this.getData('ltPropFloat'))
                                {
                                    upHeight = this.heightGet.call(this, data[topElements[j]].nodeName, node); 
                                    if(upHeight)
                                        {
                                            data[topElements[j]].y1 -= upHeight;
                                            this.valueUpdating.call(this, topElements[j], 'y1', 'lyte-grid-y')
                                            if(j == 0)
                                                {
                                                    ht = data[topElements[j]].height + data[topElements[j]].y1
                                                }
                                            else
                                                {
                                                    ht = (data[topElements[j]].height + data[topElements[j]].y1) > (data[topElements[j-1]].height + data[topElements[j-1]].y1)?(data[topElements[j]].height + data[topElements[j]].y1):(data[topElements[j-1]].height + data[topElements[j-1]].y1);
                                                }
                                        }
                                    data[node.elemNum].y1 = ht
                                    if(i == topElements.length -1 || i != 0)
                                        {
                                            this.topMoveFunc.call(this,data[topElements[j]].nodeName)
                                        }   
                                }
                            else
                                {
                                    data[node.elemNum].y1 = parseInt(((node.offsetTop-parseInt(this.getData('ltPropUnit'))) / (parseInt(this.getData('ltPropUnit')) + parseInt(this.getData('ltPropMarginTop')))).toFixed(0))
                                    this.verticalCheck.call(this, data[node.elemNum], parseInt(node.getAttribute('lyte-grid-y')) + data[node.elemNum].height, data[node.elemNum].y1 + data[node.elemNum].height, node, true)
                                }
                            }
                    this.valueUpdating.call(this, node.elemNum, 'y1', 'lyte-grid-y')
                    this.verticalCheck.call(this, data[node.elemNum], parseInt(node.getAttribute('lyte-grid-y')) + data[node.elemNum].height, data[node.elemNum].y1 + data[node.elemNum].height, data[node.elemNum].nodeName, true)      
                    this.displayGrid.call(this)
                }           
    }, 
    // to check any free space available above the particular grid
    heightGet : function(node, oldNode,flag){
            if(node.elemNum >= 0)
                    {
                    var topElements = [], i, j, temp = 0, elementsToCheck = [], elementsToCheck1 = [];
                    data = this.getData('lyteGridStack');
                    if(!oldNode)
                        {
                            oldNode = node
                        }
                    xElements = this.getData('xElements');
                    yElements = this.getData('yElements');
                    if(data[node.elemNum].length > 1)
                        {
                            for(var k = data[node.elemNum].x1 + 1;k < (data[node.elemNum].length + data[node.elemNum].x1);k++ )
                                {
                                    if(xElements[k])
                                        {
                                            elementsToCheck = this.multipleRemoval.call(this, elementsToCheck.concat(xElements[k]))
                                        }
                                }
                        }   
                    else
                        {
                            elementsToCheck = this.similarData.call(this, xElements[data[node.elemNum].x1], xElements[data[node.elemNum].x1])
                        }   
                    for(var k = data[node.elemNum].y1 + data[node.elemNum].height-1;k >= 0;k--)
                        {
                            if(yElements[k])
                                {
                                    elementsToCheck1 = this.multipleRemoval.call(this, elementsToCheck1.concat(yElements[k]))
                                }
                        }   
                    elementsToCheck = this.elementSorting.call(this, this.similarData.call(this, elementsToCheck, elementsToCheck1))
                    if(elementsToCheck.indexOf(node.elemNum) != -1) 
                        {
                            Lyte.arrayUtils(elementsToCheck, 'removeAt', elementsToCheck.indexOf(node.elemNum))
                        }
                    for(i = 0;i < elementsToCheck.length;i++ )
                        {
                            if(elementsToCheck[i] != oldNode.elemNum || flag)
                                {
                                    if(data[node.elemNum].y1 >= data[elementsToCheck[i]].y1)
                                        {
                                            if(((data[elementsToCheck[i]].x1 > data[node.elemNum].x1) && (data[elementsToCheck[i]].x1 < (data[node.elemNum].x1 + data[node.elemNum].length))) || (((data[elementsToCheck[i]].x1 + data[elementsToCheck[i]].length) > (data[node.elemNum].x1)) && (((data[elementsToCheck[i]].x1 + data[elementsToCheck[i]].length) < (data[node.elemNum].x1 + data[node.elemNum].length)))) || ((data[elementsToCheck[i]].x1 > data[node.elemNum].x1) && ((data[elementsToCheck[i]].x1 + data[elementsToCheck[i]].length) < (data[node.elemNum].x1 + data[node.elemNum].length))) || ((data[elementsToCheck[i]].x1 < data[node.elemNum].x1) && ((data[elementsToCheck[i]].x1 + data[elementsToCheck[i]].length) > (data[node.elemNum].x1 + data[node.elemNum].length))) || ((data[elementsToCheck[i]].x1 == data[node.elemNum].x1) || (data[elementsToCheck[i]].x1 + data[elementsToCheck[i]].length == data[node.elemNum].length + data[node.elemNum].x1)))
                                                    {
                                                        topElements[topElements.length] = elementsToCheck[i];
                                                    }
                                        }
                                }
                        }
                    for(j = 0;j < topElements.length;j++ )
                        {
                            if(j == 0)
                                {
                                    temp += -data[topElements[0]].y1-data[topElements[0]].height + data[node.elemNum].y1;
                                }
                            else if((-data[topElements[j]].y1-data[topElements[j]].height + data[node.elemNum].y1) < temp)
                                {
                                    temp = -(data[topElements[j]].y1 + data[topElements[j]].height-data[node.elemNum].y1);
                                }
                        }
                    if(topElements.length == 0)
                        {
                            temp = data[node.elemNum].y1;
                        }
                    if(temp < 0)
                        {
                            temp = 0;
                        }   
                    return temp;    
                    }       

    },
    // vertical movement towards top 
    topMoveFunc : function(node, count, flagie, currentNode)
    {
            var i, elementsToCheck = [],lyteQuerySelector = this.getData('lyteQuerySelector'), occupied = lyteQuerySelector.occupied, element = lyteQuerySelector.element, data = this.getData('lyteGridStack');
            occupied.push(node.elemNum)
            currentNode = currentNode?currentNode:node;
            elementsToCheck = this.elementSorting.call(this, this.elementCheck.call(this, element, node))
            if(elementsToCheck.indexOf(node.elemNum) != -1) 
                {
                    Lyte.arrayUtils(elementsToCheck, 'removeAt', elementsToCheck.indexOf(node.elemNum))
                }
            occupied =occupied.concat(elementsToCheck)  
            for(i = 0;i < elementsToCheck.length;i++ )
                {
                    if(!data[elementsToCheck[i]].nodeName.classList.contains('selected'))
                         {
                            if((data[node.elemNum].x1 >= data[elementsToCheck[i]].x1 && data[node.elemNum].x1 + data[node.elemNum].length <= data[elementsToCheck[i]].x1) || (data[node.elemNum].x1 + data[node.elemNum].length >= data[elementsToCheck[i]].x1 && (data[node.elemNum].x1 + data[node.elemNum].length <= data[elementsToCheck[i]].x1 + data[elementsToCheck[i]].length)) || (data[node.elemNum].x1 > data[elementsToCheck[i]].x1) || ((data[node.elemNum].x1 + data[node.elemNum].length) > (data[elementsToCheck[i]].x1 + data[elementsToCheck[i]].length)))
                                {
                                    if(data[node.elemNum].y1 + data[node.elemNum].height <= data[elementsToCheck[i]].y1 + data[elementsToCheck[i]].height ||flagie)
                                        {
                                            valMove = this.heightGet.call(this, data[elementsToCheck[i]].nodeName,null,!flagie)
                                            data[elementsToCheck[i]].y1 = data[elementsToCheck[i]].y1-valMove;
                                            this.valueUpdating.call(this, elementsToCheck[i], 'y1', 'lyte-grid-y')
                                            if(valMove)
                                                {
                                                    this.topMoveFunc.call(this, data[elementsToCheck[i]].nodeName, data[elementsToCheck[i]].y1 + valMove, flagie, currentNode);
                                                    if(!flagie)
                                                        {
                                                            this.displayGrid.call(this, currentNode.elemNum)
                                                        }
                                                }
                                        }
                                }
                        }
                }
    }, 
    // to sort selected elements according to directions
    elementSorting : function(stackElements, flag){
            if(flag)
                {
                    y1 = 'x1'
                }
            else
                {
                    y1 = 'y1'
                }   
            var data = this.getData('lyteGridStack')
            for(var j = 0;j < stackElements.length;j++ )
                    {
                        for(var k = j + 1;k < stackElements.length;k++ )
                            {
                                if(data[stackElements[j]][y1] > data[stackElements[k]][y1])
                                    {
                                        var temp = stackElements[j];
                                        stackElements[j] = stackElements[k];
                                        stackElements[k] = temp;
                                    }
                            }
                    }
                return stackElements    
    }, 
    // horizontal movement check
    topCheck : function(node, element,timeoutFlag){
                var i, flag = false, stackElements = [], temp1, elementsToCheck = [], elementsToCheck1 = [], hgt, ht=0;
                    var data = this.getData('lyteGridStack'), currentTop;
                    xElements = this.getData('xElements');
                    yElements = this.getData('yElements');
                    temp1 = data[node.elemNum].y1
                    if(data[node.elemNum].length > 1)   
                        {
                            if(xElements[data[node.elemNum].x1 + data[node.elemNum].length-1])
                                {
                                    if(xElements[data[node.elemNum].x1 + data[node.elemNum].length-1].length)
                                        {
                                            elementsToCheck = elementsToCheck.concat(xElements[data[node.elemNum].x1 + data[node.elemNum].length-1]);
                                        }
                                }
                            if(xElements[data[node.elemNum].x1 + 1])
                                {
                                    if(xElements[data[node.elemNum].x1 + 1].length) 
                                        {
                                            elementsToCheck = elementsToCheck.concat(xElements[data[node.elemNum].x1 + 1]);
                                        }
                                }
                        }
                    else
                        {
                            elementsToCheck = this.similarData.call(this, xElements[data[node.elemNum].x1], xElements[data[node.elemNum].x1 + 1])
                        }
                    if(data[node.elemNum].height > 1)   
                        {
                            for(var k = temp1 + 1;k < (data[node.elemNum].y1 + data[node.elemNum].height);k++ )
                                {
                                    elementsToCheck1 = elementsToCheck1.concat(yElements[k])
                                }
                        }
                    else
                        {
                            elementsToCheck1 = this.similarData.call(this, yElements[data[node.elemNum].y1], yElements[data[node.elemNum].y1 + 1])
                        }
                    if(elementsToCheck1)        
                        {
                            elementsToCheck = this.similarData.call(this, elementsToCheck, this.multipleRemoval.call(this, elementsToCheck1))
                        }
                    elementsToCheck = this.elementSorting.call(this, this.multipleRemoval.call(this, elementsToCheck))  
                    if(elementsToCheck.indexOf(node.elemNum) != -1) 
                        {
                            Lyte.arrayUtils(elementsToCheck, 'removeAt', elementsToCheck.indexOf(node.elemNum))
                        }
                    for(i = 0; i < elementsToCheck.length; i++ )
                        {
                            if(timeoutFlag)
                                {
                                    if(data[node.elemNum].x1 != node.getAttribute('lyte-grid-x') || data[node.elemNum].length != node.getAttribute('lyte-grid-length'))
                                        {   
                                            flag=true
                                        }
                                }
                            else
                                {
                                    if(((data[node.elemNum].x1 + data[node.elemNum].length > data[elementsToCheck[i]].x1 && data[node.elemNum].x1 < data[elementsToCheck[i]].x1) || (data[node.elemNum].x1 < data[elementsToCheck[i]].x1 + data[elementsToCheck[i]].length && data[elementsToCheck[i]].x1 + data[elementsToCheck[i]].length < data[node.elemNum].x1 + data[node.elemNum].length)) && (temp1 + data[node.elemNum].height > data[elementsToCheck[i]].y1 && temp1 < data[elementsToCheck[i]].y1) || (temp1 < data[elementsToCheck[i]].y1 + data[elementsToCheck[i]].height && data[elementsToCheck[i]].y1 + data[elementsToCheck[i]].height < temp1 + data[node.elemNum].height) || (temp1 >= data[elementsToCheck[i]].y1 && data[elementsToCheck[i]].y1 + data[elementsToCheck[i]].height >= temp1 + data[node.elemNum].height) || (data[elementsToCheck[i]].y1 + data[elementsToCheck[i]].height < temp1 + data[node.elemNum].height && temp1 < data[elementsToCheck[i]].y1 ))
                                        {
                                            flag=true
                                        }
                                }   
                            if(flag && !data[elementsToCheck[i]].nodeName.classList.contains('selected'))    
                                {
                                    if(((data[node.elemNum].x1 <= (data[elementsToCheck[i]].x1 + data[elementsToCheck[i]].length-1))) || ((data[elementsToCheck[i]].x1 + 1 >= (data[node.elemNum].x1 + data[node.elemNum].length))))   
                                            {
                                                stackElements[stackElements.length] = elementsToCheck[i]
                                                ht += data[elementsToCheck[i]].height
                                                if(this.getData('ltPropDirection') != 'horizontal')
                                                    {
                                                        break;
                                                    }
                                            }   
                                }
                            flag=false  
                        }
                    if(stackElements.length)
                        {
                            if(!timeoutFlag)
                                {
                                    this.valueUpdating.call(this, node.elemNum, 'x1', 'lyte-grid-x')  
                                } 
                            stackElements = this.elementSorting.call(this, stackElements, true)
                            for(var z = 0 ; z < stackElements.length ; z++)
                                {
                                    var valMove = this.heightGet.call(this, data[stackElements[z]].nodeName), totalHeight = data[node.elemNum].height + data[node.elemNum].y1 -valMove, ret = true;
                                    hgt = totalHeight;
                                    if(this.getData('ltPropDirection') != 'horizontal') 
                                        {
                                            this.verticalCheck.call(this, data[stackElements[z]], data[stackElements[z]].y1 + data[stackElements[z]].height, totalHeight + valMove + data[stackElements[z]].height, node);  
                                            data[stackElements[z]].y1 = (hgt > (data[node.elemNum].height + data[node.elemNum].y1)?hgt:(data[node.elemNum].height + data[node.elemNum].y1)) - (this.getData('ltPropFloat')? 0 : this.heightGet.call(this,data[node.elemNum].nodeName));
                                            this.valueUpdating.call(this, stackElements[z], 'y1', 'lyte-grid-y')
                                        }
                                    else
                                        {
                                            if(z > 0 &&  ((parseInt(data[stackElements[z]].nodeName.getAttribute('lyte-grid-x')) + parseInt(data[stackElements[z]].nodeName.getAttribute('lyte-grid-length'))) == (this.$node.ltProp('gridLength')) || parseInt(data[stackElements[z]].nodeName.getAttribute('lyte-grid-x')) == 0))
                                                {
                                                    break;
                                                }
                                            if(node.offsetLeft > data[stackElements[z]].nodeName.offsetLeft)
                                                {
                                                    this.horiMovement.call(this, node, stackElements[z], 'left', ht, stackElements.length == 1 || (stackElements.length > 2 && z != 1))                                                   
                                                }
                                            else if(node.offsetLeft < data[stackElements[z]].nodeName.offsetLeft)   
                                                {
                                                    this.horiMovement.call(this, node, stackElements[z], 'right', ht, stackElements.length == 1 || (stackElements.length > 2 && z != 1))                                                  
                                                }   
                                        }
                                    if(!this.getData('ltPropFloat'))    
                                        {
                                            this.topMoveFunc.call(this, data[stackElements[z]].nodeName, z == 0 || (data[stackElements[z]].x1 != 0 && data[stackElements[z]].x1 + data[stackElements[z]].length != parseInt(this.getData('ltPropGridLength')))) 
                                        }
                                    this.displayGrid.call(this, node.elemNum);
                                }
                    }
},
// if given direction is horizontal
    horiMovement : function(node, stackElements, direction, ht, flag){
            var data = this.getData('lyteGridStack'), lyteQuerySelector = this.getData('lyteQuerySelector');
            data[stackElements].x1 = direction == "left"?(data[stackElements].x1-1):(data[stackElements].x1 + 1);
            if(data[stackElements].x1 < 0 || (data[stackElements].x1 + data[stackElements].length) > parseInt(this.getData('ltPropGridLength')))
                {
                    if(data[stackElements].x1 < 0)
                        {
                            data[stackElements].x1 = 0;
                        }
                    else
                        {
                            data[stackElements].x1 = parseInt(this.getData('ltPropGridLength'))-data[stackElements].length;
                        }
                    this.valueUpdating.call(this, stackElements, 'x1', 'lyte-grid-x')
                    var dumHgt = data[stackElements].y1 + data[stackElements].height
                    data[stackElements].y1 = data[node.elemNum].y1 + data[node.elemNum].height;     
                    this.verticalCheck.call(this, data[stackElements], dumHgt, data[node.elemNum].y1 + data[node.elemNum].height + data[stackElements].height /*ht*/, node);
                    this.valueUpdating.call(this, stackElements, 'y1', 'lyte-grid-y')
                    this.displayGrid.call(this);    
                }
            else
                {
                    this.valueUpdating.call(this, stackElements, 'x1', 'lyte-grid-x')
                    data[stackElements].nodeName.initialLeft = []
                    data[stackElements].nodeName.initialTop = []
                    for(var k = 0; k < 3; k++)
                        {
                            data[stackElements].nodeName.initialLeft[k] = data[stackElements].nodeName.offsetLeft;
                            data[stackElements].nodeName.initialTop[k] = data[stackElements].nodeName.offsetTop;
                        }
                    this.topCheck.call(this, data[stackElements].nodeName, lyteQuerySelector.element, true)
                    if(flag)
                        {
                            var valMove = this.heightGet.call(this, data[stackElements].nodeName)
                            if(! this.getData('ltPropFloat'))
                                {
                                    data[stackElements].y1 -= valMove
                                    if(valMove)
                                        {
                                            this.topMoveFunc.call(this, data[stackElements].nodeName)
                                        }   
                                }
                        }
                    this.displayGrid.call(this)
                }
    },
    // vertical movement top to bottom  
    verticalCheck : function(node, currentHeight, totalHeight, currentNode, flagie, direction){
            var topElements = [], elementsToCheck = [], i, count, ht, flag = false, flag2 = false, elementsToCheck1 = [], maxElem = [], temp = [], data = this.getData('lyteGridStack');
            currentNode = currentNode?currentNode:node.nodeName;
            var xElements = this.getData('xElements')
             var yElements = this.getData('yElements')
            if(direction == 'left')
                {   
                    elementsToCheck = elementsToCheck.concat(xElements[node.x1])
                }
            else if(direction == "right")
                {
                    elementsToCheck = elementsToCheck.concat(xElements[node.x1 + node.length])
                }   
            else
                {   
                    if(node != data[currentNode.elemNum])
                        {
                            if(node.length > 1)
                                {
                                    for(var z = node.x1 + 1;z < (node.x1 + node.length);z++ )
                                        {   
                                            elementsToCheck = elementsToCheck.concat(xElements[z])
                                        }
                                }
                            else
                                {
                                    elementsToCheck = this.similarData.call(this, xElements[node.x1], xElements[node.x1 + 1])
                                }   
                        }
                    else
                        {
                            elementsToCheck = this.elementCheck.call(this, element, node.nodeName)
                        }
                }
            elementsToCheck = this.multipleRemoval.call(this, elementsToCheck)  
             for(var z = totalHeight - node.height; z <= totalHeight; z++)
                {
                    elementsToCheck1 = elementsToCheck1.concat(yElements[z])
                }
            if(elementsToCheck1)
                {
                    elementsToCheck = this.similarData.call(this, elementsToCheck, this.multipleRemoval.call(this, elementsToCheck1))    
                }
            elementsToCheck = this.elementSorting.call(this, elementsToCheck);  
            if(elementsToCheck.indexOf(node.nodeName.elemNum) != -1)
                {
                    Lyte.arrayUtils(elementsToCheck, 'removeAt', elementsToCheck.indexOf(node.nodeName.elemNum))
                }
            if(elementsToCheck.indexOf(currentNode.elemNum) != -1)  
                {
                    Lyte.arrayUtils(elementsToCheck, 'removeAt', elementsToCheck.indexOf(currentNode.elemNum))
                }
            if(direction)
                {
                    if(!this.similarData.call(this, elementsToCheck, yElements[node.y1 + node.height].concat(yElements[node.y1])).length)
                        {
                            elementsToCheck = []
                        }
                }       
            for(i = 0;i < elementsToCheck.length;i++ )
                {
                    if(elementsToCheck[i] != node.nodeName.elemNum && elementsToCheck[i] != currentNode.elemNum)
                        {
                            if(flagie)
                                {
                                    if((node.y1) == data[elementsToCheck[i]].y1)
                                        {
                                            flag2 = true;
                                        }
                                }
                            if((node.y1) < (data[elementsToCheck[i]].y1 + data[elementsToCheck[i]].height) || flag2)
                                {   
                                    topElements[topElements.length] = elementsToCheck[i];
                                    flag = true
                                }
                            else if(flagie && ((data[elementsToCheck[i]].y1 + data[elementsToCheck[i]].height) >= (node.y1 + node.height)))
                                {
                                    topElements[topElements.length] = elementsToCheck[i];
                                    flag = true
                                }       
                        }
                    if(flag)
                        {
                            flag = false
                            maxElem.push(data[topElements[topElements.length-1]].height + data[topElements[topElements.length-1]].y1)
                            if(topElements.length > 1)
                                {
                                    temp.push(data[topElements[topElements.length - 1]].y1-(data[topElements[0]].y1 + data[topElements[0]].height))     
                                }
                        }   
                }
             if(topElements.length)
                {   
                    topElements = this.elementSorting.call(this, topElements)
                    ht = totalHeight;
                    var elem = [], elem1 = [];
                    totalHeight = Math.max.apply(null,maxElem) - data[topElements[0]].y1 + ht   
                        for(var j = 0;j < topElements.length;j++ )
                            {
                                var htmove = this.heightGet.call(this, data[topElements[j]].nodeName)
                                if(j == 0)
                                    {
                                        if((ht <= data[topElements[j]].y1) && flagie)
                                            {
                                                break
                                            }
                                        else    
                                            {
                                                if(data[topElements[j]].y1-ht < 1)
                                                    {
                                                        data[topElements[j]].y1 = ht
                                                        htmove = this.heightGet.call(this, data[topElements[j]].nodeName)
                                                        if((data[topElements[j]].y1-htmove >= ht))
                                                            {
                                                                data[topElements[j]].y1 -= htmove
                                                            }
                                                    }   
                                            }
                                    }
                                else
                                    {
                                        data[topElements[j]].y1 = data[topElements[0]].y1 + data[topElements[0]].height + temp[j-1];
                                        htmove = this.heightGet.call(this, data[topElements[j]].nodeName)
                                        if((data[topElements[j]].y1 - htmove >= ht))
                                            {
                                                data[topElements[j]].y1 -= htmove
                                            }
                                    }   
                                this.valueUpdating.call(this, topElements[j], 'y1', 'lyte-grid-y')      
                            }
                        elem = this.yElementsFind.call(this,Math.min(node.x1, data[currentNode.elemNum].x1), Math.max((node.x1 + node.length), data[currentNode.elemNum].x1 + data[currentNode.elemNum].length), xElements)
                        elem = this.elementSorting.call(this,this.multipleRemoval.call(this, this.similarData.call(this, elem, topElements)))
                        for(var i = 0;i < elem.length;i++ )
                            {
                                var elem1 = [], elem2 = []
                                for(var j = data[elem[i]].x1 + 1;j < (data[elem[i]].x1 + data[elem[i]].length);j++ )
                                    {
                                        elem1 = elem1.concat(xElements[j])
                                    }
                                 if(data[elem[i]].length == 1)
                                    {
                                         elem1 = this.similarData.call(this, xElements[data[elem[i]].x1], xElements[data[elem[i]].x1 + 1])
                                    }   
                                elem2 = this.elementSorting.call(this,this.similarData.call(this, elem1, this.yElementsFind.call(this, parseInt(data[elem[i]].nodeName.getAttribute('lyte-grid-y')) + 1 ,parseInt(data[elem[i]].nodeName.getAttribute('lyte-grid-y')) + data[elem[i]].height, yElements)));
                                for(var k = 0;k < elem2.length;k++ )
                                    {
                                        if(topElements.indexOf(elem2[k]) == -1 && node.nodeName.elemNum != elem2[k] && currentNode.elemNum != elem2[k])
                                            {
                                                this.additionalCheck.call(this, elem2[k], data[elem[i]].y1 + data[elem[i]].height, topElements);
                                            }
                                    }   
                            }
                    }               
},
// to find elements on given height 
yElementsFind : function(start, end, yElements){
    var elements = [];
    for(var i = start;i <= end;i++ )
        {
            elements = elements.concat(yElements[i])
        }
    return elements;    
}, 
// to propagate vertical check 
additionalCheck : function(element, height, topElements1){
        var xElements = this.getData('xElements'), yElements = this.getData('yElements'), data = this.getData('lyteGridStack'), elem1 = [], elem2 = [], hgt = height, elementNo = element;
        elem1 = elem1.concat(this.yElementsFind.call(this, parseInt(data[element].nodeName.getAttribute('lyte-grid-y')) + data[element].height, data[element].y1 + data[element].height, yElements))
        if(data[element].length>1)
            {
                elem2 = elem2.concat(xElements[data[element].x1 + 1])
                elem2 = elem2.concat(xElements[data[element].x1 + data[element].length - 1])
            }
        else
            {
                elem2 =elem2.concat(this.similarData.call(this, xElements[data[element].x1], xElements[data[element].x1 + 1]))
            }   
        elem1 = this.similarData.call(this, elem1, elem2);
        if(elem1.indexOf(element) != -1)
            {
                Lyte.arrayUtils(elem1, 'removeAt', elem1.indexOf(element))
            }   
        for(var i = 0;i < elem1.length;i++ )
            {
                if(topElements1.indexOf(elem1[i]) == -1)
                    {
                        topElements1.push(elem1[i])
                        this.additionalCheck.call(this, elem1[i], height + data[element].height, topElements1)
                    }
            }
        if(data[elementNo].y1 > hgt)
            {
                 var htmove = this.heightGet.call(this, data[elementNo].nodeName);
                 if(data[elementNo].y1 - htmove <= hgt)
                    {
                        data[elementNo].y1 = hgt
                    }
                else
                    {
                        data[elementNo].y1 -= htmove
                    }
                    
            }
          else  
            {
               data[elementNo].y1 = hgt
            }
        this.valueUpdating.call(this, elementNo, 'y1', 'lyte-grid-y')       
}, 
// finding previous position for undo
previousPos : function(elementCount){
    var data = this.getData('lyteGridStack'), lyteQuerySelector = this.getData('lyteQuerySelector');
    for(var i = 0;i < elementCount.length;i++ )
        {
            if(lyteQuerySelector.currentPos < data[i].oldX.length)
                {
                    Lyte.arrayUtils(data[i].oldX, 'remove', lyteQuerySelector.currentPos + 1, data[i].oldX.length)
                    Lyte.arrayUtils(data[i].oldY, 'remove', lyteQuerySelector.currentPos + 1, data[i].oldY.length)
                    Lyte.arrayUtils(data[i].oldLength, 'remove', lyteQuerySelector.currentPos + 1, data[i].oldLength.length)
                    Lyte.arrayUtils(data[i].oldHeight, 'remove', lyteQuerySelector.currentPos + 1, data[i].oldHeight.length)
                }
            data[i].oldX[data[i].oldX.length] = data[i].nodeName.getAttribute('lyte-grid-x')
            data[i].oldY[data[i].oldY.length] = data[i].nodeName.getAttribute('lyte-grid-y')
            data[i].oldLength[data[i].oldLength.length] = data[i].nodeName.getAttribute('lyte-grid-length')
            data[i].oldHeight[data[i].oldHeight.length] = data[i].nodeName.getAttribute('lyte-grid-height')
        }
    lyteQuerySelector.currentPos = data[0].oldX.length-1;
}, 
mousedown : function (evt)
    {
        var lyteQuerySelector = this.getData('lyteQuerySelector'), currentElement = this, data = this.getData('lyteGridStack') 
        if($L('lyte-gridstack').e.length)
            {
              var ret = this.nodeName.call(this, evt);   
                if(ret)
                    {
                        lyteGridStackCurrentNode.mvefunc = this.mMove.bind(this), lyteGridStackCurrentNode.upfunc = this.mouseup.bind(this),
                        lyteGridStackCurrentNode.gridstack = this
                        evt.stopPropagation();
                        evt.preventDefault()
                        var val = ret[0];
                        var nodeName = ret[1]
                        var element = $L(this.getData('ltPropScope'), this.$node).e[0]
                        if(!evt.shiftKey)   
                            {
                                lyteQuerySelector.BottomToTopFlag = true, lyteQuerySelector.allowMovement = true, lyteGridStackCurrentNode.mvefunc = this.mMove.bind(this)  
                                if(($L(this.getData('ltPropHandler') + '.selected', element).e.length == 0))
                                    {   
                                        if(nodeName && ret)
                                            {
                                                lyteQuerySelector.SelectedNodes = [];
                                                nodeName.classList.add('selected')
                                                lyteQuerySelector.SelectedNodes.push(nodeName.elemNum);
                                                lyteQuerySelector.element = element
                                                nodeName.initialLeft = [], nodeName.initialTop = []
                                                for(var k = 0; k < 3; k++)
                                                    {
                                                        nodeName.initialLeft[k] = nodeName.offsetLeft;
                                                        nodeName.initialTop[k] = nodeName.offsetTop;
                                                    }
                                                nodeName.initialY1 = data[nodeName.elemNum].y1
                                                nodeName.initialX1 = data[nodeName.elemNum].x1
                                                nodeName.xPos = evt.clientX - nodeName.offsetLeft;
                                                nodeName.yPos = evt.clientY - nodeName.offsetTop;
                                                nodeName.instantPreviousX = nodeName.initialLeft[0];
                                                nodeName.instantPreviousY = nodeName.initialTop[0];
                                                nodeName.movementY = 'increase'
                                                nodeName.movementX = 'increase'
                                                if(val == "content")
                                                    {
                                                        nodeName.flag = true;
                                                    }
                                                else
                                                    {
                                                        nodeName.classList.add('lyteSizeChange')
                                                        nodeName.value = val;
                                                        if(val == "right" || val == "BottomRight")      
                                                            {
                                                                nodeName.xOff = nodeName.getBoundingClientRect().left + nodeName.clientWidth-evt.clientX;
                                                            }
                                                        else
                                                            {
                                                                nodeName.xOff = -nodeName.getBoundingClientRect().left + evt.clientX;
                                                            }   
                                                        nodeName.yOff = nodeName.getBoundingClientRect().top + nodeName.clientHeight-evt.clientY;
                                                        nodeName.flag = false;
                                                    }
                                                if(this.getData('ltPropBestfit'))     
                                                    {
                                                        if(!$L('div.lyteBestFit',element).e.length)
                                                            {
                                                                bestFit = document.createElement('div');
                                                                bestFit.classList.add('lyteBestFit');
                                                                bestFit.style.display = "none"
                                                                element.appendChild(bestFit);
                                                            }
                                                             
                                                        
                                                    }
                                                document.body.addEventListener('mousemove', lyteGridStackCurrentNode.mvefunc);
                                            }
                                    }
                                else
                                    {   
                                        lyteQuerySelector.SelectedNodes = [];
                                        var nodeName = $L(currentElement.getData('ltPropHandler') + '.selected', this.$node).e
                                        for(var i = 0;i < nodeName.length; i++ )
                                            {
                                                lyteQuerySelector.SelectedNodes.push(element.querySelectorAll(currentElement.getData('ltPropHandler') + '.selected')[i].elemNum);
                                                nodeName[i].left = nodeName[i].offsetLeft;
                                                nodeName[i].top = nodeName[i].offsetTop;
                                                nodeName[i].flag = true;
                                                nodeName[i].initialLeft[0] = nodeName[i].offsetLeft;
                                                nodeName[i].initialTop[0] = nodeName[i].offsetTop;
                                                nodeName[i].xPos = event.clientX-nodeName[i].offsetLeft;
                                                nodeName[i].yPos = event.clientY-nodeName[i].offsetTop;
                                                nodeName[i].movementY = 'increase'
                                                nodeName[i].movementX = 'increase'
                                            }
                                        lyteQuerySelector.SelectedNodes = this.elementSorting.call(this, lyteQuerySelector.SelectedNodes);
                                        document.body.addEventListener('mousemove', lyteGridStackCurrentNode.mvefunc); 
                                    }
                            }
                        else if(!lyteQuerySelector.allowMovement)
                            {
                                ret = this.nodeName.call(this, evt);
                                if(ret)
                                    {
                                        nodeName = ret[1]
                                        nodeName.initialLeft = [], nodeName.initialTop = []
                                        if(nodeName.classList.contains('selected'))
                                            {
                                                nodeName.classList.remove('selected')
                                            }
                                        else    
                                            {
                                                nodeName.classList.add('selected')
                                            }
                                    }
                            }   
                        lyteQuerySelector.previousPosFind = false
                    } 
              evt.preventDefault()      
         }                  
},
mMove : function(evt){
    this.mousemoveFun.call(this, $L(this.getData('ltPropScope'), this.$node).e[0], evt);
    evt.stopPropagation();
    evt.preventDefault()
} ,
mouseup : function (evt){
    if($L('lyte-gridstack').e.length && this == lyteGridStackCurrentNode.gridstack)
         {
            evt.stopPropagation();
            evt.preventDefault()
            var lyteQuerySelector = this.getData('lyteQuerySelector'), data = this.getData('lyteGridStack')
            var ret = this.nodeName.call(this, evt);   
            var element = $L(this.getData('ltPropScope'), this.$node).e[0]
            var elementCount = this.elementSorting.call(this, lyteQuerySelector.elementCount)
            if(!evt.shiftKey || lyteQuerySelector.allowMovement)   
                {
                    lyteQuerySelector.verticalMove = true, lyteQuerySelector.allowMovement = false
                    if(lyteQuerySelector.SelectedNodes)
                        {
                            for(i = lyteQuerySelector.SelectedNodes.length-1;i >= 0;i--)    
                                {
                                    nodeName = data[lyteQuerySelector.SelectedNodes[i]].nodeName
                                    if(nodeName.classList.contains('selected'))
                                        {
                                            if(!this.getData('ltPropFloat'))
                                                {
                                                    valMove = this.heightGet.call(this, nodeName)
                                                    data[nodeName.elemNum].y1 -= (valMove);
                                                    if(valMove && this.bottomElementsCount.call(this, nodeName)) 
                                                        {
                                                            this.topMoveFunc.call(this, nodeName, data[nodeName.elemNum].y1 + valMove, false)
                                                        }
                                                }
                                            this.displayGrid.call(this);    
                                            nodeName.classList.remove('selected')
                                            nodeName.style.removeProperty('left')
                                            nodeName.style.removeProperty('top')
                                            nodeName.style.removeProperty('height')
                                            nodeName.style.removeProperty('width')
                                            Lyte.arrayUtils(lyteQuerySelector.occupied, 'remove', 0, lyteQuerySelector.occupied.length)
                                            this.topCheck.call(this,nodeName,element)
                                            delete nodeName.initialY1; delete nodeName.xPos; delete nodeName.yPos; delete nodeName.movementX;delete nodeName.movementY; delete nodeName.flag;
                                            delete nodeName.initialX1; delete nodeName.instantPreviousX;delete nodeName.instantPreviousY;delete nodeName.val; delete nodeName.xOff; delete nodeName.yOff;

                                        }
                                    if($L('div.lyteBestFit',element).e[0])    
                                        {
                                            $L('div.lyteBestFit',element).e[0].style.display = 'none' 
                                        }
                                    }
                                for(i = 0;i < lyteQuerySelector.SelectedNodes.length;i++ )  
                                    {   
                                        if(this.getMethods('onRelease'))
                                            {
                                                this.executeMethod('onRelease', data[lyteQuerySelector.SelectedNodes[i]].nodeName, data[lyteQuerySelector.SelectedNodes[i]].nodeName.dataSet, element.dataSet)
                                            }   
                                    }   
                            }
                        if((nodeName.offsetLeft > 30 && nodeName.offsetTop > 30))
                            {   
                                this.displayGrid.call(this);
                                if(lyteQuerySelector.SelectedNodes.length && lyteQuerySelector.previousPosFind) 
                                    {
                                        this.previousPos.call(this, elements)
                                    }
                            }
                        else if(ret)
                            {
                                lyteQuerySelector.currentPos += 1
                                this.undoPrevious.call(this)
                            }
                    document.body.removeEventListener('mousemove', lyteGridStackCurrentNode.mvefunc)
                    lyteQuerySelector.SelectedNodes = []    
               }
               document.removeEventListener('mouseup', lyteGridStackCurrentNode.upfunc)     
            } 
    },
    keydown : function (event){
        if($L('lyte-gridstack').e.length && lyteGridStackCurrentNode.gridstack == this && this.getData('ltPropUndo'))
            {
                if((event.ctrlKey || event.metaKey) && event.shiftKey && event.keyCode == 90)
                    {
                        this.undoNext.call(this);
                    }
                else if((event.ctrlKey || event.metaKey) && !event.shiftKey && event.keyCode == 90)
                    {
                        this.undoPrevious.call(this);
                    }  
            }  
  },
// after rendering properties
    didConnect : function(){
            var element = $L(this.getData('ltPropScope'), this.$node).e[0]
            if(!this.getData('ltPropGridLength'))
                {
                    this.setData('ltPropGridLength', parseInt(((element.clientWidth - parseInt(this.getData('ltPropUnit')))/(parseInt(this.getData('ltPropUnit')) + parseInt(this.getData('ltPropMarginLeft')))).toFixed(0)))
                }
            var lyteQuerySelector = this.getData('lyteQuerySelector')    
            element.setAttribute('tabindex', '1')
            element.lyteData = {};
            element.component = this
            this.initialValSet.call(this)
            var val, data = this.getData('lyteGridStack');
            elements = $L(this.getData('ltPropHandler'), element).e;
            element.lyteData.gridLength = this.getData('ltPropGridLength')
            element.lyteData.gridHeight = lyteQuerySelector.maxHeight;
            element.addEventListener('mousedown',function(event){
                if(event.target != this && event.button != 2)
                    {
                        if(this.component.getData('lyteGridStack').length != $L(this.component.getData('ltPropHandler'), element).e.length)
                            {
                                Lyte.arrayUtils(this.component.getData('lyteGridStack'),'remove',0,this.component.getData('lyteGridStack').length)
                                Array.prototype.forEach.call($L('style',this.component.$node).e,function(array,index){array.parentElement.removeChild(array)})
                                this.component.initialValSet.call(this.component, false);
                            }
                        this.component.mousedown.call(this.component, event);
                        document.addEventListener('mouseup', lyteGridStackCurrentNode.upfunc)
                    }
                })
            this.setData('lyteQuerySelector.keydown', this.keydown.bind(this));
            document.addEventListener('keydown',this.getData('lyteQuerySelector').keydown)
            this.$node.addGrid = function(div, child, x, y, length, height, resize) {
                    if(child)
                        {
                            div.appendChild(child);
                        }
                    div.setAttribute('lyte-grid-x', x ? x : 1)
                    div.setAttribute('lyte-grid-y', y ? y : 1)
                    div.setAttribute('lyte-grid-length', length ? length : 1)
                    div.setAttribute('lyte-grid-height', height ? height : 1)
                    if(resize == 'disabled')
                        {
                            div.setAttribute('lt-prop-resize', resize)
                        }
                    var scope = $L(this.component.getData('ltPropScope'), this).e[0]
                    scope.appendChild(div)   
                    this.component.initialValSet.call(this.component, true)   
                } 
             this.$node.removeGrid = function(div){
                if(div)
                    {
                        div.parentElement.removeChild(div)
                        this.component.initialValSet.call(this.component, true)   
                    }
             }          
    },
    // data 
    data : function(){
        return {
            // user data
            ltPropScope : Lyte.attr("string",{"default": ''}), 
            ltPropHandler : Lyte.attr("string",{"default":''}), 
            ltPropMarginLeft : Lyte.attr("string",{"default":'20'}), 
            ltPropMarginTop : Lyte.attr("string",{"default":'20'}), 
            ltPropUnit : Lyte.attr("string",{"default":'50px'}), 
            ltPropGridLength : Lyte.attr("number",{"default":undefined}), 
            ltPropResizeDirection : Lyte.attr("array",{"default":['left', 'right', 'bottom', 'bottomRight', 'bottomLeft']}), 
            ltPropFloat : Lyte.attr("boolean",{"default": false}), 
            ltPropDirection : Lyte.attr("string",{"default":"vertical"}), 
            ltPropUndo : Lyte.attr("boolean",{"default": true}), 
            ltPropResize : Lyte.attr("boolean",{"default": true}), 
            ltPropBestfit : Lyte.attr("boolean",{"default": true}), 
            // system data
            lyteGridStack : Lyte.attr("array",{"default":[]}), 
            ltPropFlag : Lyte.attr("boolean",{"default": true}), 
            elements : Lyte.attr("object",{"default":undefined}), 
            oriNode : Lyte.attr("object",{"default":undefined}), 
            xElements : Lyte.attr("array",{"default":[]}), 
            yElements : Lyte.attr("array",{"default":[]}),
            lyteQuerySelector : Lyte.attr('object',{'default' : {}}),
            lyteGridstackKeyFlag : Lyte.attr('array',{'default' : [false, false]})
        }
    }, 
    // undo
    undoPrevious : function(){
            var data = this.getData('lyteGridStack'), lyteQuerySelector = this.getData('lyteQuerySelector') ;
            var elements = $L(this.getData('ltPropHandler'), $L(this.getData('ltPropScope'), this.$node).e[0]).e;
            if((lyteQuerySelector.currentPos) <= data[0].oldHeight.length && lyteQuerySelector.currentPos >= 1)
                {
                    for(var i = 0;i < elements.length;i++ )
                        {
                            data[i].x1 = parseInt(data[i].oldX[lyteQuerySelector.currentPos-1])
                            data[i].nodeName.dataSet['lyte-grid-x-old'] = data[i].x1
                            data[i].y1 = parseInt(data[i].oldY[lyteQuerySelector.currentPos-1])
                            data[i].nodeName.dataSet['lyte-grid-y-old'] = data[i].y1
                            data[i].length = parseInt(data[i].oldLength[lyteQuerySelector.currentPos-1])
                            data[i].nodeName.dataSet['lyte-grid-length-old'] = data[i].length
                            data[i].height = parseInt(data[i].oldHeight[lyteQuerySelector.currentPos-1])
                            data[i].nodeName.dataSet['lyte-grid-height-old'] = data[i].height
                        }
                    this.displayGrid.call(this);
                    lyteQuerySelector.currentPos = (lyteQuerySelector.currentPos - 1) >= 1 ? (lyteQuerySelector.currentPos - 1) : 1;  
                }
        },
        // redo 
    undoNext : function(){
            var data = this.getData('lyteGridStack'), lyteQuerySelector = this.getData('lyteQuerySelector') ;
            var elements = $L(this.getData('ltPropHandler'), $L(this.getData('ltPropScope'), this.$node).e[0]).e;
            if((lyteQuerySelector.currentPos) <= (data[0].oldHeight.length-1))
                {
                    var dumm = lyteQuerySelector.currentPos + 1 == data[0].oldHeight.length ? lyteQuerySelector.currentPos : lyteQuerySelector.currentPos + 1
                    for(var i = 0;i < elements.length;i++ )
                        {
                            data[i].x1 = parseInt(data[i].oldX[dumm])
                            data[i].nodeName.dataSet['lyte-grid-x-old'] = data[i].x1
                            data[i].y1 = parseInt(data[i].oldY[dumm])
                            data[i].nodeName.dataSet['lyte-grid-y-old'] = data[i].y1
                            data[i].length = parseInt(data[i].oldLength[dumm])
                            data[i].nodeName.dataSet['lyte-grid-length-old'] = data[i].length
                            data[i].height = parseInt(data[i].oldHeight[dumm])
                            data[i].nodeName.dataSet['lyte-grid-height-old'] = data[i].height
                        }
                    this.displayGrid.call(this);
                    lyteQuerySelector.currentPos = dumm;
                }
    }
    }); 
