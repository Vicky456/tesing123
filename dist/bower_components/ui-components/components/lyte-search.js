Lyte.Component.register("lyte-search",{
_template:"<template tag-name=\"lyte-search\">    <lyte-input lt-prop-id=\"{{ltPropId}}\" lt-prop-wrapper-style=\"{{ltPropWrapperStyle}}\" lt-prop-class=\"{{ltPropClass}}\" lt-prop-autofocus=\"{{ltPropAutofocus}}\" lt-prop-autocomplete=\"{{ltPropAutocomplete}}\" lt-prop-type=\"{{ltPropType}}\" lt-prop-name=\"{{ltPropName}}\" lt-prop-placeholder=\"{{ltPropPlaceholder}}\" lt-prop-width=\"100%\" lt-prop-height=\"{{ltPropHeight}}\" on-keyup=\"{{method('keyup')}}\" lt-prop-style=\"{{ltPropStyle}}\" lt-prop-value=\"{{lbind(ltPropValue)}}\" on-keypress=\"{{method('keypress')}}\" on-keydown=\"{{method('keydown')}}\" lt-prop-appearance=\"{{ltPropAppearance}}\" lt-prop-direction=\"{{ltPropDirection}}\" lt-prop-disabled=\"{{ltPropDisabled}}\" lt-prop-readonly=\"{{ltPropReadonly}}\" on-change=\"{{method('change')}}\" on-blur=\"{{method('blurThrow')}}\" on-mouseover=\"{{method('mouseover')}}\" on-mousedown=\"{{method('mousedown')}}\" on-mouseleave=\"{{method('mouseleave')}}\" on-mouseenter=\"{{method('mouseenter')}}\" on-mouseout=\"{{method('mouseout')}}\" on-mouseup=\"{{method('mouseup')}}\" on-mousemove=\"{{method('mousemove')}}\" on-click=\"{{method('clickThrow')}}\" on-focusout=\"{{method('focusout')}}\" on-focus=\"{{method('focus')}}\" on-dblclick=\"{{method('dblclick')}}\" on-contextmenu=\"{{method('contextmenu')}}\"></lyte-input></template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropAutocomplete","ltPropPlaceholder","ltPropAutofocus","ltPropDisabled","ltPropStyle","ltPropMaxlength","ltPropReadonly","ltPropId","ltPropClass","ltPropType","ltPropName","ltPropWidth","ltPropHeight","ltPropValue","ltPropAppearance","ltPropDirection","ltPropQuerySelector","ltPropMinLength","ltPropMethod","ltPropWrapperStyle","timeout"],
     didConnect : function(){
        this.$node.setValue = function(value){
              $L('lyte-input',this.$node).e[0].ltProp({'value' : value});
              this.pressFunc.call(this, value != undefined ? value : '')
        }.bind(this)
     },

     data : function (){
      //user data
            return {
               ltPropAutocomplete : Lyte.attr("string",{"default" : 'off'}),
               ltPropPlaceholder : Lyte.attr("string",{"default" : ''}),
               ltPropAutofocus : Lyte.attr("boolean",{"default" : false}),
               ltPropDisabled : Lyte.attr("boolean",{"default" : false}),
               ltPropStyle : Lyte.attr("string",{"default" : ''}),
               ltPropMaxlength : Lyte.attr("number",{"default" : 25}),
               ltPropReadonly : Lyte.attr("boolean",{"default" : false}),
               ltPropId : Lyte.attr("string",{"default" : 'inputId'}),
               ltPropClass : Lyte.attr("string",{"default" : ''}),
               ltPropType : Lyte.attr("string",{"default" : 'search'}),
               ltPropName : Lyte.attr("string",{"default" : ''}),
               ltPropWidth : Lyte.attr("string",{"default" : '100%'}),
               ltPropHeight  : Lyte.attr("string",{"default" : ''}),
               ltPropValue : Lyte.attr("string",{"default" : ''}),
               ltPropAppearance : Lyte.attr("string",{"default" : 'flat'}),
               ltPropDirection : Lyte.attr("string",{"default" : 'vertical'}),
               ltPropQuerySelector : Lyte.attr("object",{"default" : {}}),
               ltPropMinLength : Lyte.attr('number',{'default' : 1}),
               ltPropMethod : Lyte.attr('string',{'default' : 'contains'}),
               ltPropWrapperStyle : Lyte.attr('string', {'default' : ''}),

               //system data
               timeout : Lyte.attr("number",{"default" : undefined}),

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

// Function for finding textContents when data were not properly given for DOM search
      searchList : function(nodeName){
              var searchList=[];
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
                        returnedVal=this.searchList.call(this,nodeName.children[i]);
                        searchList=searchList.concat(returnedVal[0]);
                        target=target.concat(returnedVal[1]);
                        break;
                     }
                  if(!nodeName.children[i].childElementCount) 
                      {
                        searchList.push(nodeName.children[i].textContent);
                        if(query.target)
                          {
                            var scope = typeof query.scope == 'string' ? ((/^#/g.test(query.scope.trim()) && !/\s/g.test(query.scope.trim())) ? $L(query.scope).e : $L(query.scope).e[0]) : query.scope
                            targetList=$L(query.target, scope).e;
                            node=nodeName.children[i];
                            while(node != scope)
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
              return [searchList,target];
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
                 if(this.getMethods("onClick"))
                      { 
                        this.executeMethod('onClick', event)
                      }  
           },
        //filtering process  checks
        "keyup":function(event){
              if([37,13,38,39,40,91,27,16,18].indexOf(event.keyCode) > -1){ 
                return
              }
              if(this.getData('timeout') != undefined)
                { 
                    clearTimeout(this.getData('timeout'))
                }
              var val = $L('input', this.$node).e[0].value;
              if(val.length >= this.getData('ltPropMinLength') || event.keyCode == 8)
                  {
                         this.setData('timeout', setTimeout(function(){  
                             this.pressFunc.call(this, val)
                           }.bind(this),100))
                  }    
            }
          },
        filteringArray : function(searchList, targetList, val, searchComp){
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
                                        visibleList.push(searchComp[i]);
                                    }
                                break;    
                             }
                             case 'startsWith' : {
                                  if(searchList[i].trim().toLowerCase().startsWith(val.toLowerCase()))
                                      {
                                        visibleList.push(searchComp[i]);
                                     }
                                  break;
                             }
                             case 'endsWith' : {
                                  if(searchList[i].trim().toLowerCase().endsWith(val.toLowerCase()))
                                      {
                                          visibleList.push(searchComp[i]);
                                     }
                                  break;
                             }
                          }  
                      }
                }
             else
                {
                   visibleList = searchComp;
                }
              if(this.getMethods('onSearch'))
                {
                  flag = this.executeMethod('onSearch',visibleList, this.$node)
                }
              if(flag != false)
                {
                  var lyteSearchHidden = this.getData('ltPropHideClass')
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
                }   
        },  
        pressFunc : function (val){
             var content = [], searchList = [], target = [], query = this.getData('ltPropQuerySelector');
             var scope = typeof query.scope == 'string' ? ( (/^#/g.test(query.scope.trim()) && !/\s/g.test(query.scope.trim())) ? $L(query.scope).e : $L(query.scope).e[0]) : query.scope;
             if(query.search)
                {
                  (/^#/g.test(query.search.trim()) && !/\s/g.test(query.search.trim())) ? searchList.push($L(query.search, scope).e) : searchList = searchList.concat(this.arrayFrom.call(this, $L(query.search, scope).e));
                }
             query.target ? ((/^#/g.test(query.target.trim()) && !/\s/g.test(query.target.trim())) ? target.push($L(query.target, scope).e) : target = target.concat(this.arrayFrom.call(this, $L(query.target, scope).e))) : (target = target.concat(searchList.slice()));  
             if(!searchList.length)
                {
                    returnedVal=this.searchList.call(this,scope);
                    content = returnedVal[0];
                    target = returnedVal[1];
                    searchList = target.slice();
                }
              else
                {
                  for(var j=0;j<searchList.length;j++)
                   {
                      content[j]=searchList[j].textContent;
                   }
                }
             this.filteringArray.call(this, content, target, val, searchList)    
            if(this.getMethods("onKeyup"))
                { 
                    this.executeMethod('onKeyup');
                }    
        }  
  });
