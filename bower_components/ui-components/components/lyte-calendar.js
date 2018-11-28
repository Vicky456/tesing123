Lyte.Component.register('lyte-calendar',{
_template:"<template tag-name=\"lyte-calendar\">    <div class=\"lyteCalendarPopup\">        <div class=\"lyteCalendarView\">            <div>                <div class=\"lyteCalendarNavigator\">                    <template is=\"if\" value=\"{{ltPropYear}}\">                        <template case=\"true\"><span class=\"lyteCalNav lyteCalyearNavLft\" onclick=\"{{action('previous','Y',event)}}\"></span></template>                    </template>                    <span class=\"lyteCalNav lyteCaldLft\" onclick=\"{{action('previous','M',event)}}\"></span>                    <span class=\"lyteCalsCalMon\">{{monthHeader}}</span>                    <span class=\"lyteCalNav lyteCaldRgt\" onclick=\"{{action('next','M',event)}}\"></span>                    <template is=\"if\" value=\"{{ltPropYear}}\">                        <template case=\"true\"><span class=\"lyteCalNav lyteCalyearNavRgt\" onclick=\"{{action('next','Y',event)}}\"></span></template>                    </template>                </div>                <div class=\"lyteCalTableContainerHeader\">                    <div class=\"lyteCalTableRowHeader\">                        <template is=\"for\" items=\"{{daysOfWeek}}\" item=\"day\" indexval=\"idod\">                            <div class=\"lyteCalTableCellHeader\">{{day}}</div>                        </template>                    </div>                </div>            </div>            <div class=\"lyteCalTableContainer\">                <template is=\"for\" items=\"{{matrix}}\" item=\"vector\" indexval=\"rowid\">                    <div class=\"lyteCalTableRow\">                        <template is=\"for\" items=\"{{vector}}\" item=\"date\" indexval=\"cellid\">                            <template is=\"if\" value=\"{{ltPropStartDate}}\">                                <template case=\"true\">                                    <template is=\"if\" value=\"{{lyteUiCheckInRange(ltPropMinDate,ltPropMaxDate,date.val)}}\">                                        <template case=\"true\">                                            <div data-date=\"{{date.val}}\" onclick=\"{{action('dateSelected',event)}}\" class=\"{{date.clsname}}\">{{date.date}}</div>                                        </template>                                        <template case=\"false\">                                            <div data-date=\"{{date.val}}\" class=\"{{date.clsname}}\">{{date.date}}</div>                                        </template>                                    </template>                                </template>                                <template case=\"false\">                                    <template is=\"if\" value=\"{{lyteUiCheckInRange(ltPropMinDate,ltPropMaxDate,date.val)}}\">                                        <template case=\"true\">                                            <div data-date=\"{{date.val}}\" onclick=\"{{action('dateSelected',event)}}\" class=\"{{date.clsname}}\">{{date.date}}</div>                                        </template>                                        <template case=\"false\">                                            <div data-date=\"{{date.val}}\" class=\"{{date.clsname}}\">{{date.date}}</div>                                        </template>                                    </template>                                </template>                            </template>                        </template>                    </div>                </template>            </div>            <div>                <div class=\"lyteCalBtns\">                    <template is=\"if\" value=\"{{showToday}}\">                        <template case=\"true\"><p class=\"lyteCalCurrentDate\"><a onclick=\"{{action('today',event)}}\">{{todayName}}</a></p></template>                    </template>                    <template is=\"if\" value=\"{{ltPropYield}}\">                        <template case=\"true\">                            <lyte-yield yield-name=\"footer\"></lyte-yield>                        </template>                    </template>                </div>            </div>        </div>    </div></template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1,1,1]},{"type":"if","position":[1,1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,1,1,3]},{"type":"text","position":[1,1,1,1,5,0]},{"type":"attr","position":[1,1,1,1,7]},{"type":"attr","position":[1,1,1,1,9]},{"type":"if","position":[1,1,1,1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,1,3,1,1]},{"type":"for","position":[1,1,1,3,1,1],"dynamicNodes":[{"type":"text","position":[1,0]}]},{"type":"attr","position":[1,1,3,1]},{"type":"for","position":[1,1,3,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}}]}]},{"type":"attr","position":[1,1,5,1,1]},{"type":"if","position":[1,1,5,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,0]},{"type":"text","position":[0,0,0]}]}},"default":{}},{"type":"attr","position":[1,1,5,1,3]},{"type":"if","position":[1,1,5,1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropStartDate","ltPropEndDate","ltPropCurrentDate","ltPropFormat","ltPropYear","ltPropMonthHeaderFormat","daysOfWeek","monthNames","todayName","viewDate","changeData","ltPropYield","ltPropMinDate","ltPropMaxDate","ltPropStartWeekDay"],
	data:function(){
		return {
			'ltPropStartDate': Lyte.attr("string",{"default":''}),
			'ltPropEndDate': Lyte.attr("string",{"default":''}),
			'ltPropCurrentDate': Lyte.attr("string",{"default":''}),
			'ltPropFormat': Lyte.attr("string",{"default":"MM/DD/YYYY"}),
			'ltPropYear': Lyte.attr("boolean",{"default":true}),
			'ltPropMonthHeaderFormat': Lyte.attr("string",{"default":'MMMM YYYY'}),
			'daysOfWeek': Lyte.attr("array",{"default":['Mon','Tue','Wed','Thu','Fri','Sat','Sun']}),
			'monthNames': Lyte.attr("array",{"default":['January','February','March','April','May','June','July','August','September','October','November','December']}),
			'todayName': Lyte.attr("string",{"default":"Today"}),
			'viewDate': Lyte.attr("object",{"default":{}}),
			'changeData': Lyte.attr("number",{"default":0}),
			'ltPropYield': Lyte.attr("boolean",{"default":false}),
			'ltPropMinDate': Lyte.attr("string",{"default":''}),
			'ltPropMaxDate': Lyte.attr("string",{"default":''}),
			'ltPropStartWeekDay': Lyte.attr("number",{"default":1})
		}
	},
	monthHeaderObserver:function(){
		this.setData('monthHeader',this.getMonthHeader.call(this))
	}.observes('monthNames.[]'),
	getMonthHeader:function(){
		var format = this.getData('ltPropMonthHeaderFormat')
		var lmd = /MMMM YYYY/g
		var ld = /MMM YYYY/g
		var retval=""
		if(lmd.test(format)){
			var monthArray= this.getData('monthNames')
			retval=monthArray[this.getData('viewDate').getMonth()]+" "+this.getData('viewDate').getFullYear()
		}else if(ld.test(format)){
			var monthArray= this.getData('monthNames')
			retval=monthArray[this.getData('viewDate').getMonth()]+" "+this.getData('viewDate').getFullYear()
		}
		return retval
	},
	getDateFromFormat:function(tdate,format){
		var date = tdate.getDate()
		var year  = tdate.getFullYear()
		var month= tdate.getMonth()+1
		if(month<10)
			month='0'+month
		if(date<10)
			date='0'+date
		var sd = /(MM).+(DD).+(YYYY)/g
		var ld = /(MMM|DD|YYYY).+(MMM|DD|YYYY).+(YYYY|MMM|DD)/g
		var lmd = /(MMMM|DD|YYYY).+(MMMM|DD|YYYY).+(YYYY|MMMM|DD)/g
		var iso =/(YYYY).+(MM).+(DD)/g
		if(lmd.test(format)){
			var monthArray=['January','February','March','April','May','June','July','August','September','October','November','December']
			format=format.replace('MMMM',monthArray[month-1])
			format=format.replace('DD',date)
			format=format.replace('YYYY',year)
		}
		else if(ld.test(format)){
			var monthArray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
			format=format.replace('MMM',monthArray[month-1])
			format=format.replace('DD',date)
			format=format.replace('YYYY',year)
		}
		else if(iso.test(format)){
			format=format.replace('MM',month)
			format=format.replace('DD',date)
			format=format.replace('YYYY',year)
		}
		else if(sd.test(format)){
			format=format.replace('MM',month)
			format=format.replace('DD',date)
			format=format.replace('YYYY',year)
		}
		
		return format
	},
	isLeapYear:function(year){
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	},
	getNumber:function(month,year){
		var daysinmonths = [31,28,31,30,31,30,31,31,30,31,30,31]
		if(this.isLeapYear.call(this,year) && month==1){
			return 29
		}
		else{
			return daysinmonths[month]
		}
	},
	showtoday:function(){
		var curDate = new Date()
		if(curDate.getMonth()!=this.getData('viewDate').getMonth() || curDate.getYear()!=this.getData('viewDate').getYear()){
			this.setData('showToday',true)
		}
		else{
			this.setData('showToday',false)
		}
	},
	checkDate:function(current){
		var start = this.getData('ltPropMinDate');
		var end = this.getData('ltPropMaxDate');
		if(start === '' && end === ''){
			return true;
		}
		else if(start !== '' && end === ''){
			var startDate = new Date(start)
			if(current >= startDate){
				return true
			}
		}
		else if(start !== '' && end !== ''){
			var startDate = new Date(start)
			var endDate = new Date(end)
			if(current >= startDate && current <= endDate){
				return true
			}
		}
		else {
			var endDate = new Date(end)
			if(current <= endDate){
				return true
			}
		}
		return false
	},
	setDates:function(){
		this.setDatesFunction()
	}.observes('ltPropStartDate','ltPropEndDate','changeData'),
	getNumberOfFirstRowDates: function(firstday){
		var startDayOfMonth = this.getData('ltPropStartWeekDay');
		var firstRowDays;
		if(firstday == 0){
			firstRowDays = startDayOfMonth === 0?7:startDayOfMonth;
		}
		else {
			if(firstday < startDayOfMonth){
				firstRowDays = startDayOfMonth - firstday
			}
			else {
				firstRowDays = 7 - (firstday - startDayOfMonth)
			}
		}
		return firstRowDays

	},
	getNumberToSubtract: function(firstday) {
		var numberToSubtract;
		var startDayOfMonth = this.getData('ltPropStartWeekDay')
		if(firstday == 0){
			numberToSubtract = startDayOfMonth == 0?0:7-startDayOfMonth
		}
		else {
			if(firstday < startDayOfMonth){
				numberToSubtract = 7 - (startDayOfMonth - firstday)
			}
			else {
				numberToSubtract = firstday - startDayOfMonth
			}
		}
		return numberToSubtract
	},
	setDatesFunction:function(){
		// Number of rows in the table
		var numberOfRows = 6;

		// current month to be displayed
		var currentDateToBeDisplayed = this.getData('viewDate')

		// Day of the full date
		var day = currentDateToBeDisplayed.getDay()

		// Date of the full date
		var date = currentDateToBeDisplayed.getDate()

		// Get first date in numerical terms
		var firstday = date - Math.floor(date/7)*7 - 1
		firstday = day - firstday
		if(firstday < 0){
			firstday = 7 - firstday
		}

		// Get month of the full date
		var month = currentDateToBeDisplayed.getMonth()

		// Get fullyear of the full date
		var year = 1900+currentDateToBeDisplayed.getYear()

		// Make corrections to the month for processing - 0 is jan so 11 is dec
		month = month - 1;
		if(month < 0){
			month = 11
			year = year - 1
		}

		// Number of days in month
		var numberOfDaysInMonth = this.getNumber.call(this,currentDateToBeDisplayed.getMonth(),year)

		// First row filled by first week dates
		var firstRowDays = this.getNumberOfFirstRowDates(firstday);

		// Subtract number of days in first week of the month
		numberOfDaysInMonth = numberOfDaysInMonth - firstRowDays

		// Subtract 4 more weeks so we get 5 rows filled
		numberOfDaysInMonth = numberOfDaysInMonth - 28

		// Any more remaining bump numberOfRows by 1
		if(numberOfDaysInMonth > 0){
			numberOfRows = numberOfRows + 1;
		}

		// get months and years
		month = currentDateToBeDisplayed.getMonth()-1;
		year = 1900+currentDateToBeDisplayed.getYear()

		// first date of week
		var calStartDate=new Date(month+2+'/1/'+year)

		var numberToSubtract = this.getNumberToSubtract(firstday);
		// if(firstday == 0){
		// 	numberToSubtract = 6
		// }
		// else {
		// 	numberToSubtract = firstday - 1
		// }
		calStartDate.setDate(calStartDate.getDate() -  numberToSubtract)
		this.setData('matrix',[])
		var todayDate = new Date()

		// Construct array
		for(var i = 0; i < numberOfRows; i++){

			Lyte.arrayUtils(this.getData('matrix'),'push',[[]])
			for(var j = 0; j < 7; j++){

				var clsname='lyteCalCdate'

				// Get new acquired date values
				var newMonth=calStartDate.getMonth()
				var curDate = new Date(this.getData('viewDate').getTime())
				var curMonth= curDate.getMonth()
				var ndate=calStartDate.getDate()
				var tdate = this.getData('ltPropCurrentDate')?new Date(this.getData('ltPropCurrentDate')):'nodate'
				var nyear = calStartDate.getYear()

				// Check if date is in range
				var isInRange = this.checkDate(calStartDate)

				// Check if range constraints are provided
				var isPresent = this.getData('ltPropMinDate') !== "" || this.getData('ltPropMaxDate') !== "";


				// Add Gray class only if it is not in range or if it is next month but no ranges were provided
				if((!this.getData('ltPropStartDate') && !this.getData('ltPropEndDate')) && (curMonth-newMonth==1 || newMonth-curMonth==11)){
					if(isPresent && !isInRange || (!isPresent)){
						clsname+=' lyteCalGray'
					}
				}
				else if((!this.getData('ltPropStartDate') && !this.getData('ltPropEndDate')) && (newMonth-curMonth==1 || curMonth-newMonth==11)){
					if(isPresent && !isInRange || (!isPresent)){
						clsname+=' lyteCalGray'
					}	
				}
				else if(isPresent && !isInRange){
					clsname+=' lyteCalGray'
				}

				// Add selected Class
				if(tdate !== 'nodate' && newMonth==tdate.getMonth() && tdate.getDate() == ndate && tdate.getYear() == nyear /*&& clsname.indexOf('old')==-1 && clsname.indexOf('disabled')==-1*/){
					clsname+=' lyteCalSel'
				}

				// Add today class
				else if(todayDate.getMonth() === newMonth && todayDate.getDate() === ndate && todayDate.getYear() === nyear){
					clsname+= ' lyteCalToday'
				}

				// Add Classes for weekends
				if(calStartDate.getDay()==0 || calStartDate.getDay()==6){
					clsname+=' lyteCalWeekend'
				}

				// Store in array and increment date by 1
				clsname+= ' lyteCalTableCell'
				var obj={}
				obj.date=calStartDate.getDate()
				obj.clsname=clsname
				obj.val = this.getDateFromFormat.call(this,calStartDate,this.getData('ltPropFormat'))
				Lyte.arrayUtils(this.getData('matrix')[i],'push',obj)
				calStartDate.setDate(calStartDate.getDate()+1)
			}
		}	
	},
	init:function(){
		var viewDate,selecteddate
		if(this.get('ltPropStartDate') && this.get('ltPropEndDate')){
			viewDate = new Date(this.get('ltPropStartDate'))
			selecteddate = new Date()
		}
		else{
			viewDate = this.getData('ltPropCurrentDate')?new Date(this.getData('ltPropCurrentDate')):new Date()
			selecteddate = new Date(viewDate.getTime())
		}
		viewDate.setDate(1)
		this.setData('viewDate',viewDate)
		this.setData('monthHeader',this.getMonthHeader.call(this))
		this.setDatesFunction()
		this.showtoday.call(this)
	},
	didConnect:function(){
	},
	actions:{
		previous:function(val){
			var inter
			var from = new Date(this.getData('viewDate').getTime())
			var to
			if(val=='Y'){
				inter = this.getData('viewDate')
				inter.setYear(1900+inter.getYear()-1)
				to = new Date(inter.getTime())
				this.setData('viewDate',inter)
				this.setData('monthHeader',this.getMonthHeader.call(this))
				//this.$node.constructor._observers[0].value.call(this)
				this.setData('changeData',this.getData('changeData') + 1)
				this.showtoday.call(this)
			}
			else if(val=='M'){
				inter = this.getData('viewDate')
				inter.setMonth(inter.getMonth()-1)
				to = new Date(inter.getTime())
				this.setData('viewDate',inter)
				this.setData('monthHeader',this.getMonthHeader.call(this))
				//this.$node.constructor._observers[0].value.call(this)
				this.setData('changeData',this.getData('changeData') + 1)
				this.showtoday.call(this)

			}
			if(this.getMethods('onNavigate')){
				this.executeMethod('onNavigate',event,this.getDateFromFormat(from,this.getData('ltPropFormat')),this.getDateFromFormat(to,this.getData('ltPropFormat')),this)
			}
		},
		dateSelected:function(event){
			if(event.button !== 0){
				return ;
			}
			var ele = this.$node.getElementsByClassName('lyteCalSel')
			if(ele.length !== 0){
				ele[0].classList.remove('lyteCalSel')
			}
			this.setData('ltPropCurrentDate',event.target.getAttribute('data-date'))
			event.target.classList.add('lyteCalSel')
			if(this.getMethods('onDateSelected')){
				this.executeMethod('onDateSelected',event,event.target.getAttribute('data-date'),this)
			}
		},
		today:function(){
			var from = new Date(this.getData('viewDate').getTime())
			var curDate = new Date()
			curDate.setDate(1)
			var to = new Date(curDate.getTime())
			this.setData('viewDate',curDate)
			this.setData('monthHeader',this.getMonthHeader.call(this))
			//this.$node.constructor._observers[0].value.call(this)
			this.setData('changeData',this.getData('changeData') + 1)
			this.setData('showToday',false)
			if(this.getMethods('onNavigate')){
				this.executeMethod('onNavigate',event,this.getDateFromFormat(from,this.getData('ltPropFormat')),this.getDateFromFormat(to,this.getData('ltPropFormat')),this)
			}
		},
		next:function(val){
			var inter
			var from = new Date(this.getData('viewDate').getTime())
			var to 
			if(val=='Y'){
				inter = this.getData('viewDate')
				inter.setYear(1900+inter.getYear()+1)
				this.setData('viewDate',inter)
				to = new Date(inter.getTime())
				this.setData('monthHeader',this.getMonthHeader.call(this))
				//this.$node.constructor._observers[0].value.call(this)
				this.setData('changeData',this.getData('changeData') + 1)
				this.showtoday.call(this)
			}
			else if(val=='M'){
				inter = this.getData('viewDate')
				inter.setMonth(inter.getMonth()+1)
				to = new Date(inter.getTime())
				this.setData('viewDate',inter)
				this.setData('monthHeader',this.getMonthHeader.call(this))
				//this.$node.constructor._observers[0].value.call(this)
				this.setData('changeData',this.getData('changeData') + 1)	
				this.showtoday.call(this)		
			}
			if(this.getMethods('onNavigate')){
				this.executeMethod('onNavigate',event,this.getDateFromFormat(from,this.getData('ltPropFormat')),this.getDateFromFormat(to,this.getData('ltPropFormat')),this)
			}
		}

	}
});
