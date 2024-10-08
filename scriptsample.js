function addincomeArray(type,amt,bal,dt){
    
    let incomeobj={
        type:type,
        amt:amt,
        bal:bal,
        dt:dt
    }
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    
    newobj.incomeArray.push(incomeobj);
    
    localStorage.setItem(loggedkey,JSON.stringify(newobj));
    


}


// -------------add expense array--------------------
function addexpenseArray(type,amt,bal,dt){
    
    let expenseobj={
        type:type,
        amt:amt,
        bal:bal,
        dt:dt
    }
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    
    newobj.expenseArray.push(expenseobj);
    
    localStorage.setItem(loggedkey,JSON.stringify(newobj));

}


// ---------------display income array---------------
function displayincomeArray(){
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    let incomearray=newobj.incomeArray;
     let incomedetails=document.getElementById("incomedetails")
      incomedetails.innerHTML='';
    for(i of incomearray){
   
        incomedetails.innerHTML+= `<tr style="border-bottom: 2px green solid; " >
                <td>${i.type}</td>  
                 <td>+${i.amt}</td> 
                 <td>${i.bal}</td> 
                <td>${i.dt}</td>  
                 </tr>`
              
    }
}

// --------------display ExpenseArray----------------
function displayexpenseArray(){
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    let expenseArray=newobj.expenseArray;
    let expensedetails=document.getElementById("expensedetails")
    expensedetails.innerHTML='';
    for(i of expenseArray){
   
    expensedetails.innerHTML+=`<tr <tr style="border-bottom: 2px green solid; ">
                         <td>${i.type}</td>  
                         <td>-${i.amt}</td> 
                         <td>${i.bal}</td> 
                         <td>${i.dt}</td>  
    </tr>`
    }

}

// ---------display income and expense-----
function displayincomeexpense(){
    let obj=JSON.parse(localStorage.getItem(loggedkey))
    
    let originalobj=JSON.parse(localStorage.getItem(obj.uname))
    let incomedisplay=document.getElementById("incomedisplay")
    let expensedisplay=document.getElementById("expensedisplay")
    incomedisplay.innerHTML=`Rs ${originalobj.income}/- `
    expensedisplay.innerHTML=`Rs ${originalobj.expense}/-`


}

// ----add income---------------

function addIncome(event){
    event.preventDefault();
    let incometype=document.getElementById("incometype").value
    let incomeamt=document.getElementById("incomeamt").value
    if(incometype ==''||incomeamt==''){
        alert("Enter All Fields")
    }
    else{
        let newobj=JSON.parse(localStorage.getItem(loggedkey))

        newobj.income=newobj.income+parseFloat(incomeamt);
        let now = new Date(); // Get the current date and time
        let date = `${now.toLocaleDateString()} ${now.getHours()}:${now.getMinutes()} :${now.getSeconds()}`; // Format date and time

        console.log(date);   
        console.log(newobj);            
        localStorage.setItem(newobj.uname,JSON.stringify(newobj))
        alert("Amount Added Successfully")
        displayincomeexpense();
        addincomeArray(incometype,incomeamt,newobj.income,date);
         displayincomeArray()
        document.getElementById("incomeform").reset();

    }


}
// Add Expense
function addExpense(event){
    event.preventDefault();
    let expensetype=document.getElementById("expensetype").value
    let expenseamt=document.getElementById("expenseamt").value
    if(expensetype==''|| expenseamt==''){
        alert("Enter All Fields")
    }
    else{
        let newobj=JSON.parse(localStorage.getItem(loggedkey))
        if(expenseamt >newobj.income){
            alert("Insufficient amount")
        }
        else{
            newobj.income=newobj.income-parseFloat(expenseamt)
            newobj.expense=newobj.expense+parseFloat(expenseamt)
            localStorage.setItem(newobj.uname,JSON.stringify(newobj))
           
            let now = new Date(); // Get the current date and time
            let date = `${now.toLocaleDateString()} ${now.getHours()}:${now.getMinutes()} :${now.getSeconds()}`; // Format date and time
    
            alert("expense added successfully")
            document.getElementById("expenseform").reset();
            displayincomeexpense();
            
            addexpenseArray(expensetype,expenseamt,newobj.income,date);
           
            displayexpenseArray();
            location.reload();
        }

    }
   
}


// logout-----------------
function logout(){
    
    window.location='./index.html';
  
}

function clearAll(){
   let res=confirm("Are you sure you want clear all data ?")
 if(res){
        let newobj=JSON.parse(localStorage.getItem(loggedkey));
        newobj.income=0;
        newobj.expense=0;  
        newobj.incomeArray=[];
        newobj.expenseArray=[];      
        localStorage.setItem(newobj.uname,JSON.stringify(newobj))   
        displayincomeexpense();
        document.getElementById("incomedetails").innerHTML='';
        document.getElementById("expensedetails").innerHTML='';
        
        alert("Cleared all data successfully")
        location.reload();
        }   


}
