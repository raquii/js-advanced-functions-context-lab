/*Loads Array elements into corresponding Object properties. 
Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents. */
function createEmployeeRecord(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

/*Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array*/
function createEmployeeRecords(arr){
    return arr.map(ele=>{
        return createEmployeeRecord(ele);
    });
}


/*Add an Object with keys:
type: Set to "TimeIn"
hour: Derived from the argument
date: Derived from the argument*/
function createTimeInEvent(date){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseFloat(date.slice(date.length - 4)),
        date: date.slice(0,10)
    });
    return this;
}

/*Add an Object with keys:
type: Set to "TimeOut"
hour: Derived from the argument
date: Derived from the argument*/
function createTimeOutEvent(date){
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseFloat(date.slice(date.length - 4)),
        date: date.slice(0,10)
    });
    return this;
}

/*Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent*/
//this function says ele.date is undefined
function hoursWorkedOnDate(date){
    let timeInObj = this.timeInEvents.find(ele=>{
        return ele.date === date;
    });

    let timeOutObj = this.timeOutEvents.find(ele=>{
        return ele.date === date;
    });
    
   let hoursWorked = ((parseFloat(timeOutObj.hour) - parseFloat(timeInObj.hour))/100);
   return hoursWorked;
}

/*Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed.
Amount should be returned as a number.*/

function wagesEarnedOnDate(date){
    let wagesEarned = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    return wagesEarned; 
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

/*Test the firstName field for a match with the firstName argument*/
function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(ele=>{
        return ele["firstName"] === firstName;
    })
}

/*Using wagesEarnedOnDate, accumulate the value of all dates worked by the 
employee in the record used as context. Amount should be returned as a number.*/

function calculatePayroll(arr){
    let payrollSum = 0;
    arr.forEach(ele=>{
        payrollSum = (payrollSum + allWagesFor.call(ele))
    })
    return payrollSum;
}