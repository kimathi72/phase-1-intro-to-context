// Your code here
const createEmployeeRecord = function (array){
    const employeeRecord = {};
    employeeRecord.firstName = array[0];
    employeeRecord.familyName = array[1];
    employeeRecord.title = array[2];
    employeeRecord.payPerHour = array[3];
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
    return employeeRecord;
};
const createEmployeeRecords = (array) => {
    return array.map(item => createEmployeeRecord(item));
        
}
const createTimeInEvent = (object, string) => {
    let array = string.split(" ");
    const obj = {};
    obj.type = "TimeIn";
    obj.date = array[0];
    obj.hour = Number(array[1]);
    object["timeInEvents"].push(obj);
    return object;
}
const createTimeOutEvent = (object, string) => {
    let array = string.split(" ");
    const obj = {};
    obj.type = "TimeOut";
    obj.date = array[0];
    obj.hour = Number(array[1]);
    object["timeOutEvents"].push(obj);
    return object;
}
const hoursWorkedOnDate = (object, string) => {
    return((object.timeOutEvents.find(item => item.date === string).hour) - (object.timeInEvents.find(item => item.date === string).hour))/100;
}
const wagesEarnedOnDate = (object, string) => {
    return hoursWorkedOnDate(object , string) * object.payPerHour;
}
const allWagesFor = (object) => {
    return object.timeInEvents.map(item => item.date)
    .map(item => wagesEarnedOnDate(object, item))
    .reduce(function(accum, element){
        return accum += element;
    });
}
const calculatePayroll = (object) => {
    return object.map(item => allWagesFor(item))
    .reduce(function(accum,element){
        return accum += element;
    });
}