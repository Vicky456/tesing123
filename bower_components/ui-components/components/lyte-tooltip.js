Lyte.Component.register('lyte-tooltip',{
_template:"<template tag-name=\"lyte-tooltip\">   </template>",
_dynamicNodes : [],
_observedAttributes :["ltPropId","ltPropClass","ltPropKeepAlive","eventListeners"],
  
  data : function(){
    return {
      //user data
      ltPropId : Lyte.attr('string', {default : ''}),
      ltPropClass : Lyte.attr('string', {default : ''}),
      ltPropKeepAlive : Lyte.attr('boolean', {default : false}),
      // system data
      eventListeners : Lyte.attr('object', {default : {}})
    }
  },

  didConnect : function(){
      var tooltips = $L('lyte-tooltip').e
      if(tooltips.length > 1)
          {
            for(var mn = 0; mn < tooltips.length; mn++)
                {
                  if(!(tooltips[mn].getAttribute('lt-prop-class') || tooltips[mn].getAttribute('lt-prop-id')) && tooltips[mn] != this.$node)
                      {
                         tooltips[mn].parentElement.removeChild(tooltips[mn]);  
                      }
                }
          }
      var evt = this.mousemove.bind(this);
      this.setData('eventListeners.mousemove', evt);
      document.addEventListener('mousemove', evt);   
      window.addEventListener('scroll',this.tooltipScroll , true); 
  },

  tooltipScroll : function(event){
    if($L('span.lyteTooltip').e.length)
        {
          $L('span.lyteTooltip').css('display', 'none');
        }
  },

  clickHide : function(event){
      var component = $L('lyte-tooltip').e[0].component;
      component.removeTooltip.call(component, this.tooltip.tooltipSpan, event);
  },

  didDestroy : function(){
      if($L('lyte-tooltip').e.length == 0){
          window.removeEventListener('scroll',this.tooltipScroll , true);
          document.removeEventListener('mousemove', this.getData('eventListeners').mousemove);
        }
  },

  propertySetting : function(nodeName1){
      if(nodeName1.getAttribute('lt-prop-tooltip-config'))
          {
            try{ 
                var config = JSON.parse(nodeName1.getAttribute('lt-prop-tooltip-config'));
                for(var key in config)
                  {
                     nodeName1.tooltip.config[key] = config[key];
                  }
            }catch(err){
              var matches = nodeName1.getAttribute('lt-prop-tooltip-config').match(/[\w]+/ig);
              for(var i = 0; i < matches.length; i += 2)
                  {
                     nodeName1.tooltip.config[matches[i]] = matches[i + 1];
                  }
            }
          }
  },

  createTooltip : function(event, span, flag){
      if(flag)
          {
             this.followcursor.call(this, event, span)
          }
       else
          {
             this.nonFollowcursor.call(this, event, span)
          }
      if(!this.getData('ltPropKeepAlive'))      
          {
            if((span.nodeName1.tooltip.config.keeptooltip != true && span.nodeName1.tooltip.config.keeptooltip != 'true'))
                 {
                    span.nodeName1.tooltip.maxdisp = setTimeout(function(){
                    if(document.body.contains(span))
                      {
                         delete span.nodeName1.tooltipSpan;
                         delete span.nodeName1.tooltip;
                         document.body.removeChild(span);
                      }
                    }, span.nodeName1.tooltip.config.maxdisplaytime);
                }
          }
  },

  followcursor : function(event, span){
      if(document.body.contains(span))
          {
            span.className = 'lyteTooltip ' + span.nodeName1.tooltip.classname + (this.getData('ltPropClass') ? ' ' + this.getData('ltPropClass') : '');
            span.innerText = span.nodeName1.tooltip.title;    
            span.style.left = event.clientX +'px';
            span.style.top =(event.clientY + 5 + span.nodeName1.tooltip.config.margin) + 'px';
          }
  },

  nonFollowcursor : function(event, span, position){
      span.className = 'lyteTooltip ' + span.nodeName1.tooltip.classname + (this.getData('ltPropClass') ? ' ' +  this.getData('ltPropClass') : '');
      if(!position)
        {
          position = span.nodeName1.tooltip.config.position;
        }
      var xscroll = window.pageXOffset || document.documentElement.scrollLeft
      var yscroll = window.pageYOffset || document.documentElement.scrollTop  
      var left = span.nodeName1.getBoundingClientRect().left + xscroll;
      var topPos = span.nodeName1.getBoundingClientRect().top + yscroll;
      var margin = span.nodeName1.tooltip.config.margin;
      var margin = margin > 20 ? 20 : margin;         
      span.innerText = span.nodeName1.tooltip.title;
      var toolwid = span.offsetWidth
      var divWidth = span.nodeName1.getBoundingClientRect().width;
      var wid = span.nodeName1.getBoundingClientRect().height;
      var appearance = span.nodeName1.tooltip.config.appearance;
      switch(position.toLowerCase())
        {
          case 'right' :
           {
              if(appearance=="callout")
                  {
                      span.classList.add('lyteRight');
                      left+= parseInt(window.getComputedStyle(span, ':after').getPropertyValue('border-left-width'));
                  }
              span.style.left=(left+divWidth+margin)+'px';
              span.style.top=(topPos+wid/2-span.offsetHeight/2)+'px';
              if(window.innerWidth < (span.getBoundingClientRect().left + span.getBoundingClientRect().width))
                {
                   this.nonFollowcursor.call(this,event, span,'left');
                }
              break; 
           }
           case 'left' :
             {
                if(appearance=="callout")
                    {
                        span.classList.add('lyteLeft');
                        left-= parseInt(window.getComputedStyle(span, ':before').getPropertyValue('border-left-width'));
                    }
                 span.style.left=(left-margin-parseInt(toolwid))+'px';
                 span.style.top=(topPos+wid/2-span.offsetHeight/2)+'px';
                if(span.getBoundingClientRect().left < 0)
                  {
                    this.nonFollowcursor.call(this,event, span,'right');
                  }
                break;  
             }
          case 'bottom' :
            {
              if(appearance=="callout")            
                  {
                      span.classList.add('lyteBottom');
                      topPos+= parseInt(window.getComputedStyle(span, ':after').getPropertyValue('border-left-width'));
                  }
              span.style.left=(left+divWidth/2-parseInt(toolwid)/2)+'px';
              span.style.top=(topPos+wid+margin)+'px';
              if(window.innerHeight < (span.getBoundingClientRect().top + span.getBoundingClientRect().height))
                 {
                      this.nonFollowcursor.call(this,event, span,'top');
                 }   
              break;  
            }     
          case 'top' :
            {
              if(appearance=="callout")
                 {
                      span.classList.add('lyteTop');
                      topPos-= parseInt(window.getComputedStyle(span, ':after').getPropertyValue('border-left-width'));
                 }
              span.style.left=(left+divWidth/2-parseInt(toolwid)/2)+'px';
              span.style.top=(topPos-margin-span.clientHeight)+'px';
              if(span.getBoundingClientRect().top < 0)
                 {
                   this.nonFollowcursor.call(this,event, span,'bottom');
                 }  
              break;     
            }
           case 'bottomright' :
            {
              if(appearance=="callout")
                 {
                     span.classList.add('lyteBottomright');
                     topPos+= parseInt(window.getComputedStyle(span, ':after').getPropertyValue('border-left-width'));
                 }
              span.style.left=(left+divWidth*.75-0.2*parseInt(toolwid))+'px';
              span.style.top=(topPos+wid+margin)+'px';
              if(window.innerWidth < (span.getBoundingClientRect().left + span.getBoundingClientRect().height))
                  {
                    this.nonFollowcursor.call(this,event, span,'BottomLeft');
                  } 
              else if(window.innerHeight < (span.getBoundingClientRect().top + span.getBoundingClientRect().height)) 
                 {
                   this.nonFollowcursor.call(this,event, span,'topright');
                 }
              break; 
            }
          case 'topright' :
            {
              if(appearance=="callout")
                 {
                      span.classList.add('lyteTopright');
                      topPos-=parseInt(window.getComputedStyle(span, ':after').getPropertyValue('border-left-width'));
                 }
              span.style.left=(left+divWidth*.75-0.2*parseInt(toolwid))+'px';
              span.style.top=(topPos-span.clientHeight-margin)+'px';
               if(window.innerWidth < (span.getBoundingClientRect().left + span.getBoundingClientRect().width))
                   {
                     this.nonFollowcursor.call(this,event, span,'topleft');
                   }
               else if(span.getBoundingClientRect().top<0)
                  {
                     this.nonFollowcursor.call(this,event, span,'bottomright');
                  } 
               break;      
           }
          case 'bottomleft' :
             {
               if(appearance=="callout")
                  {
                      span.classList.add('lyteBottomleft');
                      topPos+=parseInt(window.getComputedStyle(span, ':after').getPropertyValue('border-left-width'));
                  }
               span.style.left=(left-parseInt(toolwid)*.8+0.25*divWidth)+'px';
               span.style.top=(topPos+wid+margin)+'px';
               if(span.getBoundingClientRect().left < 0)
                  {
                      this.nonFollowcursor.call(this,event, span,'bottomright');
                  }
               else if(window.innerHeight < (span.getBoundingClientRect().top + span.getBoundingClientRect().height))
                  {
                      this.nonFollowcursor.call(this,event, span,'topleft');
                  }
               break; 
              }
           case 'topleft' :
              {
                  if(appearance=="callout")
                    {
                        span.classList.add('lyteTopleft');
                        topPos-= parseInt(window.getComputedStyle(span, ':after').getPropertyValue('border-left-width'));
                    }
                  span.style.left=(left-parseInt(toolwid)*.8+0.25*divWidth)+'px';
                  span.style.top=(topPos-parseInt(span.clientHeight)-margin)+'px';
                  if(span.getBoundingClientRect().left<0)
                    {
                        this.nonFollowcursor.call(this,event, span,'topright');
                    }
                  else if(span.getBoundingClientRect().top<0)
                    {
                        this.nonFollowcursor.call(this,event, span,'bottomleft');
                    }
                  break;    
                 }
          default:
             {
              var tooltop=0;
              if(appearance=="callout")
                  {
                      span.classList.add('lyteBottom');
                      tooltop = parseInt(window.getComputedStyle(span, ':after').getPropertyValue('border-left-width'));
                  }
                span.style.left=(parseInt(event.clientX)-span.offsetWidth/2+margin)+'px';
                span.style.top=(topPos+tooltop+wid+margin)+'px';
                if(span.getBoundingClientRect().left<0)
                  {
                     span.style.left = '0px';
                  }
               if(window.innerHeight < (span.getBoundingClientRect().top + span.clientHeight))
                  {
                     span.style.top = (span.nodeName1.getBoundingClientRect().top - span.offsetHeight -tooltop) + 'px';     
                  } 
             }
          }
  },

removeTooltip : function(span, event){
         if(document.body.contains(span))
            {
               clearTimeout(span.nodeName1.tooltip.disptime);
               clearTimeout(span.nodeName1.tooltip.settime);
               span.nodeName1.removeEventListener('click', this.clickHide);
               delete span.nodeName1.tooltipSpan;
               delete span.nodeName1.tooltip;
               document.body.removeChild(span)

            }
},
  mousemove : function(event){
        var nodeName1 = event.target;
        while(nodeName1 && nodeName1.tagName != 'BODY'){
            if(nodeName1.getAttribute('lt-prop-title'))
                {
                  if(nodeName1.getAttribute('title'))
                      {
                        nodeName1.removeAttribute('title')
                      }
                   if(!nodeName1.hasOwnProperty('tooltip'))   
                      {
                        nodeName1.tooltip = {};
                      }
                   nodeName1.tooltip.config = {position : '', appearance : 'callout', margin : 0, showdelay : 0, hidedelay : 0, maxdisplaytime : 5000, keeptooltip : false}
                   nodeName1.tooltip.title = nodeName1.getAttribute('lt-prop-title');
                   this.propertySetting.call(this, nodeName1);
                   if(this.prevTooltipNode != nodeName1 && !nodeName1.tooltip.tooltipSpan)
                      {
                          this.prevTooltipNode = nodeName1;
                          var span = document.createElement('span')
                          var ltPropId = this.getData('ltPropId'), ltPropClass = this.getData('ltPropClass');
                          if(ltPropId)
                              {
                                 span.setAttribute('id', ltPropId);
                              }
                          if(ltPropClass)
                              {
                                  span.classList.add(ltPropClass);
                              }    
                          span.classList.add('lyteTooltip');
                          span.classList.add('lyteTooltipHidden');
                          if(nodeName1.getAttribute('lt-prop-tooltip-style'))
                              {
                                span.setAttribute('style', nodeName1.getAttribute('lt-prop-tooltip-style'));
                                if(!span.style.borderColor)
                                    { 
                                        span.style.borderColor = span.style.backgroundColor;
                                    }
                              }
                          nodeName1.tooltip.classname = nodeName1.tagName + 'tooltip' + $L('span.lyteTooltip').e.length + nodeName1.tooltip.config.appearance + nodeName1.tooltip.config.position
                          span.classList.add(nodeName1.tooltip.classname);
                          document.body.appendChild(span);
                          nodeName1.tooltip.tooltipSpan = span;
                          span.nodeName1 = nodeName1;
                          nodeName1.addEventListener('click', this.clickHide);
                          nodeName1.tooltip.settime = setTimeout(this.createTooltip.bind(this), span.nodeName1.tooltip.config.showdelay,event, span,  span.nodeName1.tooltip.config.position == 'followcursor' ? true : false);
                      } 
                    else if(nodeName1.tooltip.config.position == 'followcursor' && this.prevTooltipNode == nodeName1 && nodeName1.tooltip.tooltipSpan)
                      {
                          var span = nodeName1.tooltip.tooltipSpan;
                          clearTimeout(span.nodeName1.tooltip.maxdisp);
                          clearTimeout(span.nodeName1.tooltip.settime);
                          span.nodeName1.tooltip.settime = setTimeout(this.createTooltip.bind(this), span.nodeName1.tooltip.config.showdelay,event, span, true);
                          this.followcursor.call(this, event, span)
                      }
                   else if(nodeName1.tooltip.tooltipSpan && nodeName1.tooltip.tooltipSpan.style.display == 'none')
                      {
                          nodeName1.tooltip.tooltipSpan.style.display ='';
                          clearTimeout(nodeName1.tooltip.maxdisp);
                          clearTimeout(nodeName1.tooltip.settime);
                          clearTimeout(nodeName1.tooltip.bodyTimeout);
                          nodeName1.tooltip.settime = setTimeout(this.createTooltip.bind(this), nodeName1.tooltip.config.showdelay,event, nodeName1.tooltip.tooltipSpan, nodeName1.tooltip.config.position == 'followcursor' ? true : false);
                      }   
                   else
                      {
                          this.prevTooltipNode = nodeName1;
                      }  
                   break;       
                }
              else {
                nodeName1 = nodeName1.parentElement;
              }  
        }
      if(nodeName1 && nodeName1.tagName == 'BODY' && this.prevTooltipNode != nodeName1)
          {
              this.prevTooltipNode = nodeName1;
              var tooltipsopen = $L('span.lyteTooltip').e;
              for(var i = 0; i < tooltipsopen.length; i++)
                  {
                      if(document.body.contains(tooltipsopen[i]))
                        {
                          tooltipsopen[i].nodeName1.tooltip.bodyTimeout = setTimeout(this.removeTooltip, tooltipsopen[i].nodeName1.tooltip.config.hidedelay, tooltipsopen[i], event);
                        }
                  }
          } 

  }

});

document.addEventListener('DOMContentLoaded',function(event){
    if(!$L('lyte-tooltip').e.length){
        document.body.appendChild(document.createElement('lyte-tooltip'));
    }
});