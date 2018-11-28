Lyte.Component.register("lyte-autocomplete",{
_template:"<template tag-name=\"lyte-autocomplete\">         <lyte-dropdown lt-prop-yield=\"true\" lt-prop-freeze=\"false\" on-option-selected=\"{{method('valSet')}}\">        <template is=\"registerYield\" yield-name=\"yield\">          <lyte-drop-button>                <lyte-input lt-prop-id=\"{{ltPropId}}\" lt-prop-wrapper-style=\"{{ltPropWrapperStyle}}\" lt-prop-class=\"{{ltPropClass}}\" lt-prop-autofocus=\"{{ltPropAutofocus}}\" lt-prop-autocomplete=\"{{ltPropAutocomplete}}\" lt-prop-type=\"{{ltPropType}}\" lt-prop-name=\"{{ltPropName}}\" lt-prop-placeholder=\"{{ltPropPlaceholder}}\" lt-prop-width=\"100%\" lt-prop-height=\"{{ltPropHeight}}\" on-keyup=\"{{method('keyup')}}\" lt-prop-style=\"{{ltPropStyle}}\" on-keypress=\"{{method('keypress')}}\" on-keydown=\"{{method('keydown')}}\" lt-prop-appearance=\"{{ltPropAppearance}}\" lt-prop-direction=\"vertical\" lt-prop-disabled=\"{{ltPropDisabled}}\" lt-prop-readonly=\"{{ltPropReadonly}}\" on-change=\"{{method('change')}}\" on-blur=\"{{method('blurThrow')}}\" on-mouseover=\"{{method('mouseover')}}\" on-mousedown=\"{{method('mousedown')}}\" on-mouseleave=\"{{method('mouseleave')}}\" on-mouseenter=\"{{method('mouseenter')}}\" on-mouseout=\"{{method('mouseout')}}\" on-mouseup=\"{{method('mouseup')}}\" on-mousemove=\"{{method('mousemove')}}\" on-click=\"{{method('clickThrow')}}\" on-focusout=\"{{method('focusout')}}\" on-focus=\"{{method('focus')}}\" on-dblclick=\"{{method('dblclick')}}\" on-contextmenu=\"{{method('contextmenu')}}\"></lyte-input>          </lyte-drop-button>           <template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\">            <lyte-drop-box class=\"{{ltPropDropdownClass}}\" id=\"{{ltPropDropdownId}}\">              <lyte-drop-body>              <template is=\"for\" items=\"{{ltPropContent}}\" item=\"list\" index=\"indexVal\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(list)}}\"><template case=\"true\">                      <lyte-drop-group elemorder=\"{{indexVal}}\">                         <lyte-drop-label>{{lyteUiReturnOnlyKey(list)}}</lyte-drop-label>                            <template is=\"for\" items=\"{{lyteUiReturnOnlyValue(list)}}\" item=\"list1\" index=\"indexVal1\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(list1),'==',false)}}\"><template case=\"true\">                                                 <lyte-drop-item grporder=\"{{indexVal}}\" elemorder=\"{{indexVal1}}\" data-value=\"{{list1}}\">                                                        <lyte-autocomplete-label keywords=\"{{list1}}\">{{list1}}</lyte-autocomplete-label>                                                  </lyte-drop-item>                                        </template><template case=\"false\">                                                    <lyte-drop-item grporder=\"{{indexVal}}\" elemorder=\"{{indexVal1}}\" data-value=\"{{list1[ltPropLabel]}}\" class=\"{{list1.class}}\">                                                        <lyte-autocomplete-label keywords=\"{{list1[ltPropKeyWords]}}\">{{list1[ltPropLabel]}}</lyte-autocomplete-label>                                                            <template is=\"if\" value=\"{{list1[ltPropDescription]}}\"><template case=\"true\">                                                                <lyte-autocomplete-description>, {{list1[ltPropDescription]}}</lyte-autocomplete-description>                                                            </template></template>                                                    </lyte-drop-item>                                                   </template></template></template>                    </lyte-drop-group>                    </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(list),'==',false)}}\"><template case=\"true\">                                       <lyte-drop-item elemorder=\"{{indexVal}}\" data-value=\"{{list}}\">                                              <lyte-autocomplete-label keywords=\"{{list}}\">{{list}}</lyte-autocomplete-label>                                        </lyte-drop-item>                                </template><template case=\"false\">                                      <lyte-drop-item elemorder=\"{{indexVal}}\" data-value=\"{{list[ltPropLabel]}}\" class=\"{{list1.class}}\">                                          <lyte-autocomplete-label keywords=\"{{list[ltPropKeyWords]}}\">{{list[ltPropLabel]}}</lyte-autocomplete-label>                                              <template is=\"if\" value=\"{{list[ltPropDescription]}}\"><template case=\"true\">                                                  <lyte-autocomplete-description>, {{list[ltPropDescription]}}</lyte-autocomplete-description>                                              </template></template>                                      </lyte-drop-item>                                </template></template></template></template></template>                    </lyte-drop-body>                   </lyte-drop-box>          </template><template case=\"false\">                  <lyte-yield yield-name=\"yield\"></lyte-yield>            </template></template>        </template>      </lyte-dropdown>     </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropAutocomplete","ltPropPlaceholder","ltPropAutofocus","ltPropDisabled","ltPropMaxlength","ltPropReadonly","ltPropId","ltPropClass","ltPropType","ltPropName","ltPropWidth","ltPropValue","ltPropContent","ltPropLabel","ltPropDescription","ltPropAppearance","ltPropDirection","ltPropExternalSearch","ltPropUrl","ltPropYield","ltPropHeight","ltPropHighlight","ltPropHighlightClass","ltPropKeyWords","ltPropMinLength","ltPropUrlQueryParams","ltPropErrorClass","ltPropDropdownWidth","ltPropDropdownHeight","ltPropDropdownClass","ltPropDropdownId","ltPropMethod","ltPropWrapperStyle","highlightedArray","timeout","optGroup","autocompleteFlag"],

     didConnect : function(){
        var errorDiv = document.createElement('DIV');
        errorDiv.classList.add('lyteautocompleteError');
        errorDiv.style.display = 'none';
        this.autocompleteComp = errorDiv;
        $L('lyte-drop-body', this.$node).e[0].appendChild(errorDiv)
        if(this.getData('ltPropYield'))
            {  
              var dropdown = $L('lyte-dropdown', this.$node).e[0]
              dropdown.toggle()
              dropdown.toggle()
              dropdown.component.childComp.classList.add(this.getData('ltPropDropdownClass'))    

            }
        this.$node.setValue = function(value){
              $L('lyte-input',this.$node).e[0].ltProp({'value' : value});
              this.pressFunc.call(this, value != undefined ? value : '')
        }.bind(this)
            
        this.$node.constructor._observers[1].value.call(this)   
        this.$node.constructor._observers[2].value.call(this) 
        this.$node.querySelector('lyte-drop-button').addEventListener('click',function(event){
                $L('lyte-dropdown', this.$node).e[0].toggle()
                event.stopPropagation();
                event.preventDefault();
                var exstDrops = $L('lyte-drop-box:not(.lyteDropdownHidden)').e;
                for(var i = 0; i < exstDrops.length; i++)
                    {
                      if(exstDrops[i].origindd != $L('lyte-dropdown', this.$node).e[0])
                        {
                          exstDrops[i].origindd.toggle();
                        }
                    }
         }.bind(this))
     },

     arrayFrom : function(nodeList){
            var arrayList = [];
            for(var i = 0; i < nodeList.length; i++)
              {
                arrayList.push(nodeList[i]);
              }
            return arrayList.slice(); 
           },
     
     optGroup : function(){
         var temp = $L('lyte-dropdown', this.$node).e[0].component.childComp;
          if((temp && !temp.classList.contains('lyteDropdownHidden') && $L('input',this.$node).e[0].value.length) || this.getData('ltPropExternalSearch'))   
              {
                  this.contentFiltering.call(this, $L('input',this.$node).e[0].value)
              }

     }.observes('ltPropContent'),
     // setting height
     heigthSet : function(){
          var ltPropDropdownHeight = this.getData('ltPropDropdownHeight');
          if(ltPropDropdownHeight)  
              {
                $L('lyte-drop-body',$L('lyte-dropdown', this.$node).e[0].component.childComp).e[0].style.maxHeight = ltPropDropdownHeight;
              }
     }.observes('ltPropHeight'),
     // setting width 
     widthSet : function(){
          var ltPropDropdownWidth = this.getData('ltPropDropdownWidth');
          if(ltPropDropdownWidth)
              {
                 $L('lyte-drop-body',$L('lyte-dropdown', this.$node).e[0].component.childComp).e[0].style.width = ltPropDropdownWidth;
              }
     }.observes('ltPropWidth'),

     data : function (){
      //user data
            return {
               ltPropAutocomplete : Lyte.attr("string",{"default" : 'off'}),
               ltPropPlaceholder : Lyte.attr("string",{"default" : ''}),
               ltPropAutofocus : Lyte.attr("boolean",{"default" : false}),
               ltPropDisabled : Lyte.attr("boolean",{"default" : false}),
               ltPropMaxlength : Lyte.attr("number",{"default" : 25}),
               ltPropReadonly : Lyte.attr("boolean",{"default" : false}),
               ltPropId : Lyte.attr("string",{"default" : 'inputId'}),
               ltPropClass : Lyte.attr("string",{"default" : ''}),
               ltPropType : Lyte.attr("string",{"default" : 'text'}),
               ltPropName : Lyte.attr("string",{"default" : ''}),
               ltPropWidth : Lyte.attr("string",{"default" : '100%'}),
               ltPropValue : Lyte.attr("string",{"default" : ''}),
               ltPropContent : Lyte.attr("array",{"default" : []}),
               ltPropLabel : Lyte.attr("string",{"default" : ''}),
               ltPropDescription : Lyte.attr("string",{"default" : ''}),
               ltPropAppearance : Lyte.attr("string",{"default" : 'flat'}),
               ltPropDirection : Lyte.attr("string",{"default" : 'vertical'}),
               ltPropExternalSearch : Lyte.attr("boolean",{"default" : false}),
               ltPropUrl : Lyte.attr("string",{"default" : ''}),
               ltPropYield : Lyte.attr("boolean",{"default" : false}),
               ltPropHeight : Lyte.attr("string",{"default" : ''}),
               ltPropHighlight : Lyte.attr("boolean",{"default" : false}),
               ltPropHighlightClass : Lyte.attr("string",{"default" : 'lyteautocompleteHighlight'}),
               ltPropKeyWords : Lyte.attr("string",{"default" : ''}),
               ltPropMinLength : Lyte.attr('number',{'default' : 1}),
               ltPropUrlQueryParams : Lyte.attr('string', {'default' : 'q'}),
               ltPropErrorClass : Lyte.attr('string',{'default' : 'lyteautocompleteError'}),
               ltPropDropdownWidth : Lyte.attr('string',{'default' : 'auto'}),
               ltPropDropdownHeight : Lyte.attr('string',{'default' : '300px'}),
               ltPropDropdownClass : Lyte.attr('string', {'default' : 'lyteautocompleteDropdown'}),
               ltPropDropdownId : Lyte.attr('string', {'default' : 'lyteAutocomplete'}),
               ltPropMethod : Lyte.attr('string',{'default' : 'contains'}),
               ltPropWrapperStyle : Lyte.attr('string', {'default' : ''}),

               // system data
               highlightedArray : Lyte.attr("array",{"default" : []}),
               timeout : Lyte.attr("number",{"default" : undefined}),
               optGroup : Lyte.attr("boolean",{"default" : false}),
               autocompleteFlag : Lyte.attr('boolean', {'default' : true})

             }
         },
// Function for finding textContents when data were not properly given for DOM autocomplete
      autocompleteList : function(nodeName){
              var autocompleteList=[];
              var target=[];
              query=this.getData('ltPropQuerySelector')
              if(typeof query =="string")
                  {
                      query=JSON.parse(query);
                  }
              for(var i=0;i<nodeName.childElementCount;i++)
                {
                  while(nodeName.children[i].childElementCount)
                     {
                        returnedVal=this.autocompleteList.call(this,nodeName.children[i]);
                        autocompleteList=autocompleteList.concat(returnedVal[0]);
                        target=target.concat(returnedVal[1]);
                        break;
                     }
                  if(!nodeName.children[i].childElementCount) 
                      {
                        autocompleteList.push(nodeName.children[i].textContent);
                        if(query.target)
                          {
                            targetList=$L(query.target,$L(query.scope).e[0]).e;
                            node=nodeName.children[i];
                            while(node!=$L(query.scope).e[0])
                              {
                                var flag=false;
                                for(var j=0;j<targetList.length;j++)
                                  {
                                      if(node==targetList[j])
                                         {
                                            target.push(node);
                                            flag=true;
                                            break;
                                         }
                                  }
                                if(flag)
                                    {
                                        break;
                                    }
                                 else
                                   {
                                      node=node.parentElement;
                                   }
                              }
                          }
                        else
                          {
                            target.push(nodeName.children[i]);
                          }
                    }
                }
              return [autocompleteList,target];
         },
// to Highlight selected text
     highlightText : function(targerArray, inputValue)
        {
            var regEx = new RegExp('('+inputValue+')','gi');
            var regEx2 = /(?!>)([^><]+)(?=<)/ig;
            for(var i = 0; i < targerArray.length; i++)
                {
                    var autocompleteLabel = $L('lyte-autocomplete-label', targerArray[i]).e[0], span = $L('div.lyteAutoComplete', targerArray[i]).e[0];
                    if(!span){
                      span = document.createElement('div');
                      span.classList.add('lyteAutoComplete');
                      targerArray[i].insertBefore(span, targerArray[i].firstChild);
                    }
                    autocompleteLabel.style.display = 'none';
                    if(autocompleteLabel.children.length)
                        {
                             span.innerHTML = this.autoHighlight.call(this, autocompleteLabel, regEx, regEx2);
                        }
                    else   
                        {
                          span.innerHTML = autocompleteLabel.textContent.replace(regEx,'<span class ='+this.getData('ltPropHighlightClass')+'>$1</span>');
                        }
                } 
        }, 

      autoHighlight : function(autocompleteLabel,regEx, regEx2){
         return autocompleteLabel.innerHTML.replace(regEx2, function(){
                      return arguments[0].replace(regEx,'<span class ='+this.getData('ltPropHighlightClass')+'>$1</span>')
              }.bind(this));
      }, 

    //showing nd hiding error message
   errorMessage : function(flag){
      var errorDiv =  this.autocompleteComp
      if(flag)
          {
              errorDiv.style.display = 'block';
              errorDiv.style.width = window.getComputedStyle(this.$node, null).getPropertyValue('width')
          }
      else
          {
              errorDiv.style.display = 'none'
              errorDiv.innerHTML = ''
          }
    },

     methods : {
          "mouseup":function(event){
              if(this.getMethods("onMouseup"))
                  {
                    this.executeMethod('onMouseup', event)
                  }
            },
         "mouseover":function(event){
              if(this.getMethods("onMouseover"))
                  {
                    this.executeMethod('onMouseover', event)
                  }
              },
          "mouseleave":function(event){
            if(this.getMethods("onMouseleave"))
                {
                  this.executeMethod('onMouseleave', event)
                }
            },
          "mouseenter":function(event){
            if(this.getMethods("onMouseenter"))
                {
                  this.executeMethod('onMouseenter', event)
                }
            },
          "mousedown":function(event){
            if(this.getMethods("onMousedown"))
                {
                  this.executeMethod('onMousedown', event)
                }
            },
        "mouseout":function(event){
              if(this.getMethods("onMouseout"))
                {
                  this.executeMethod('onMouseout', event)
                }
             },
          "blurThrow":function(event){
               if(this.getMethods("onBlur"))
                   {
                      this.executeMethod('onBlur', event)
                   }
          },
         "change":function(event){
               if(this.getMethods("onChange"))
                   {
                      this.executeMethod('onKeyup', event)
                   }
             },
          "focus":function(event){
              if(this.getMethods("onFocus"))
                   {
                      this.executeMethod('onFocus', event)
                   }
            },
         "focusout":function(event){
              if(this.getMethods("onFocusout"))
                   {
                      this.executeMethod('onFocusout', event)
                   }
            },
         "keypress":function(event){
              if(this.getMethods("onKeypress"))
                   {
                      this.executeMethod('onKeypress', event)
                   }
               var keyCode = event.keyCode    
               if(!(keyCode >= 37 && keyCode <= 40) && keyCode != 13)  
                    {
                      event.stopPropagation() 
                    }  
            },
          "mousemove":function(event){
              if(this.getMethods("onMousemove"))
                   {
                      this.executeMethod('onMousemove', event)
                   }
            },  
         "keydown":function(event){
             if(this.getMethods("onKeydown"))
                  { 
                      this.executeMethod('onKeydown', event)
                  }
             var keyCode = event.keyCode     
             if(!(keyCode >= 37 && keyCode <= 40) && keyCode != 13)  
                  {
                    event.stopPropagation() 
                  }  
           },
        "dblclick":function(event){
              if(this.getMethods("onDblclick"))
                {
                  this.executeMethod('onDblclick', event)
                }
           },
        "contextmenu":function(event){
              if(this.getMethods("onContextmenu"))
                {
                  this.executeMethod('onContextmenu', event)
                }
            },
        "clickThrow":function(event){
                if(this.getData('ltPropMinLength') == 0 && !this.getData('ltPropExternalautocomplete'))
                      {
                         $L('lyte-dropdown', this.$node).e[0].toggle()
                      }    
                 if(this.getMethods("onClick"))
                      { 
                        this.executeMethod('onClick', event)
                      }  
                   // event.stopPropagation()            
           },
             // when dropdown value selected  
        "valSet":function(event,selectedVal){
                  var targetElem = (event||window.event).target
                  while(targetElem.tagName != 'LYTE-DROP-ITEM' && targetElem.tagName != "BODY") 
                    {
                      targetElem = targetElem.parentElement
                    }
                   if(targetElem.tagName == 'LYTE-DROP-ITEM')
                      {
                        var autocompleteLabel = $L('lyte-autocomplete-label', targetElem).e[0]
                        selectedVal = autocompleteLabel.textContent
                      } 
                  if(selectedVal)
                      {
                        $L('input', this.$node).e[0].value = selectedVal
                        var ltPropContent = this.getData('ltPropContent');
                        if(this.getMethods('onSelect'))
                            {
                              var value;
                              if(this.getData('ltPropYield'))
                                  {
                                    value = targetElem.getAttribute('data-value')
                                  }
                               else
                                  {
                                    var ltPropContent = this.getData('ltPropContent')
                                    var childrens = this.arrayFrom.call(this, $L('lyte-drop-body', $L('lyte-dropdown', this.$node).e[0].component.childComp).e[0].children);
                                    for(var i = 0; i < childrens.length; i++)
                                        {
                                           if(['LYTE-DROP-GROUP', 'LYTE-DROP-ITEM'].indexOf(childrens[i].tagName) == -1)
                                              {
                                                  Lyte.arrayUtils(childrens, 'removeAt', i);
                                                  i--;
                                              }
                                        }
                                     if(targetElem.parentElement.tagName == 'LYTE-DROP-GROUP')
                                          {
                                             var grp = ltPropContent[childrens.indexOf(targetElem.parentElement)];
                                             value = grp[Object.keys(grp)[0]][this.arrayFrom.call(this, $L('lyte-drop-item', targetElem.parentElement).e).indexOf(targetElem)];$L('lyte-dropdown', this.$node).e[0].component.childComp
                                          }
                                      else
                                          {
                                              value = ltPropContent[childrens.indexOf(targetElem)];
                                          }    
                                  }   
                               this.executeMethod('onSelect', value, event, this.$node)
                            }
                      }          
            },
        //filtering process  checks
        "keyup":function(event){
              if(event.keyCode == 37 || event.keyCode == 13 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 91 || event.keyCode == 27 || event.keyCode == 16 || event.keyCode == 18){
                return
              }
              if(this.getData('timeout') != undefined)
                { 
                    clearTimeout(this.getData('timeout'))
                }
              var val = $L('input', this.$node).e[0].value;
              if((val.length >= this.getData('ltPropMinLength')|| event.keyCode == 8) && event.keyCode != 13)
                  {
                         this.setData('timeout', setTimeout(function(){  
                             this.pressFunc.call(this, val)
                           }.bind(this),100))
                  }    
            }
          },
        filteringArray : function(searchList, targetList, val){
             var flag, method = this.getData('ltPropMethod'), visibleList = [];
             if(val.length)
                {
                   for(var i = 0; i < searchList.length; i++)
                     {
                          switch(method)
                            {
                              case 'contains' : {
                                  if(searchList[i].trim().toLowerCase().indexOf(val.toLowerCase()) >= 0)
                                      {
                                          visibleList.push(targetList[i]);
                                      }
                                  break;    
                               }
                               case 'startsWith' : {
                                    if(searchList[i].trim().toLowerCase().startsWith(val.toLowerCase()))
                                        {
                                          visibleList.push(targetList[i]);
                                       }
                                    break;
                               }
                               case 'endsWith' : {
                                    if(searchList[i].trim().toLowerCase().endsWith(val.toLowerCase()))
                                        {
                                            visibleList.push(targetList[i]);
                                       }
                                    break;
                               }
                            }  
                      }
                }
             else
                {
                   visibleList = targetList;
                }
             if(this.getMethods('onSearch'))   
                {
                  flag = this.executeMethod('onSearch',visibleList,this.autocompleteComp, this.$node);
                }
             if(flag != false)
                {
                  for(var i = 0; i < searchList.length; i++)
                     {  
                        switch(method)
                          {
                            case 'contains' : {
                                if(searchList[i].trim().toLowerCase().indexOf(val.toLowerCase()) < 0)
                                    {
                                       targetList[i].classList.add('lyteSearchHidden')
                                    }
                                  else
                                    {
                                       targetList[i].classList.remove('lyteSearchHidden')
                                    }  
                                break;    
                             }
                             case 'startsWith' : {
                                  if(!searchList[i].trim().toLowerCase().startsWith(val.toLowerCase()))
                                      {
                                          targetList[i].classList.add('lyteSearchHidden')
                                      }
                                     else
                                      {
                                         targetList[i].classList.remove('lyteSearchHidden')
                                      }  
                                  break;
                             }
                             case 'endsWith' : {
                                  if(!searchList[i].trim().toLowerCase().endsWith(val.toLowerCase()))
                                      {
                                          targetList[i].classList.add('lyteSearchHidden')
                                      }
                                    else
                                     {
                                        targetList[i].classList.remove('lyteSearchHidden')
                                     }  
                                  break;
                             }
                          }      
                     }
                    this.optGroupHide.call(this)
                    this.errorMessage.call(this, !visibleList.length) 
                   if(visibleList.length && this.getData('ltPropHighlight'))  
                      {
                          this.highlightText.call(this, targetList, val)
                      }   
                } 
        },  
        // hiding category
        optGroupHide : function(){
              var categories = $L('lyte-drop-group', $L('lyte-dropdown', this.$node).e[0].component.childComp).e
              for(var i = 0; i < categories.length; i++)
                  {
                    if($L('lyte-drop-item.lyteSearchHidden', categories[i]).e.length == $L('lyte-drop-item', categories[i]).e.length)
                        {
                            categories[i].style.display = 'none'
                        }
                     else
                        {
                            categories[i].style.display = 'block'
                        }   
                  }
        },
        contentFiltering : function(val){
              var dropdown = $L('lyte-dropdown', this.$node).e[0], content = [], target = [];
              if(!dropdown.component.childComp)
                  {
                     dropdown.toggle();
                  }
               var lyteDropdownContainer =  dropdown.component.childComp
               if((lyteDropdownContainer.classList.contains('lyteDropdownHidden') && val.length >= this.getData('ltPropMinLength'))|| (!lyteDropdownContainer.classList.contains('lyteDropdownHidden') && val.length < this.getData('ltPropMinLength')))
                    {
                        dropdown.toggle()
                    }
               var target = $L('lyte-drop-item', lyteDropdownContainer).e
               for(var k = 0; k < target.length; k++)
                  {
                      var autocompleteLabel = $L('lyte-autocomplete-label', target[k]).e[0]
                      var keyword = autocompleteLabel.getAttribute('keywords')
                      if(keyword)
                         {
                            try
                               {
                                 keyword = JSON.parse(keyword).join(' ')
                               }
                             catch(err){
                             } 
                         }
                      content.push(keyword ? keyword : autocompleteLabel.textContent)
                  }
               this.filteringArray.call(this, content, target, val)
               dropdown.component.setAlignment.call(dropdown.component)
        },
        // filtering process  
        pressFunc : function ( val){
            if(!this.getData('ltPropExternalSearch') && !this.getData('ltPropUrl'))
                {
                    this.contentFiltering.call(this, val)
                }
              else
                 {
                    if(val.length >= this.getData('ltPropMinLength'))
                        {
                            if(this.getData('ltPropUrl'))
                              {
                                  var xhttp = new XMLHttpRequest();
                                  var comp = this
                                  xhttp.onreadystatechange = function(){
                                    if(this.readyState == 4 && this.status == 200)
                                      {
                                        if(this.responseText)
                                            {
                                              x = JSON.parse(this.responseText);
                                              if(!x)
                                                {
                                                  x = [];
                                                }
                                              comp.setData('ltPropContent')
                                            }
                                      }
                                  };
                                  xhttp.open("GET",this.getData('ltPropUrl') + '?' + this.getData('ltPropUrlQueryParams') + '=' + val, true);
                                  xhttp.getResponseHeader("Content-type", "application/json")
                                  xhttp.send();
                              }
                          else
                              {
                                 if(this.getMethods('onExtSearch'))
                                    {
                                      this.executeMethod('onExtSearch',val, this.$node);
                                    }
                              }
                      }
                     else
                        {
                          var drop = $L('lyte-dropdown', this.$node).e[0];
                          if(!drop.component.childComp.classList.contains('lyteDropdownHidden'))
                            {
                              drop.toggle();
                            }
                        } 

                  }

            if(this.getMethods("onKeyup"))
                { 
                    this.executeMethod('onKeyup', event);
                }    
        }  
  });