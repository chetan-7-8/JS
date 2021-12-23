//Refactor the function into linear
const printName = (name) => "Hi "+name;

console.log(printName("chetan"));

//Template Literals
const printBill = (name, bill)=>{
    return `Hi ${name}, Please pay ${bill}`;
}

console.log(printBill("chetan",100));





const Person={
    name: "Chetan",
    age: 21
}

let{name,age}=Person;
console.log(name);
console.log(age);