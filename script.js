const loggedkey=localStorage.getItem('loggedkey')
// console.log(loggedkey);
heading.innerHTML=`Welcome ${loggedkey}`




function register(){
    let uname=document.getElementById('uname').value
    let email=document.getElementById('email').value
    let pwrd=document.getElementById('pwrd').value

    if(uname ==="" || email ==="" || pwrd ===""){
        alert("Enter all fields")
    }
    else{
        if(email in localStorage){
            alert("User email already registered")
        }
        else{
            const userobj={
                uname:uname,
                password:pwrd,
                email:email,
                income:0,
                expense:0,
                incomeArray:[],
                expenseArray:[]
            }
            localStorage.setItem(userobj.uname,JSON.stringify(userobj))
            alert("user Registered successfully")
            window.location='./index.html';
        }
    }
    
}

function login(){
    let username=document.getElementById('Username').value
    let password=document.getElementById('password').value
    if(username==="" || password===""){
        alert("Please fill the fields")
    }
    else{
        if(username in localStorage){
            let out=JSON.parse(localStorage.getItem(username))
            if(password===out.password){
                alert("login successfull")
                localStorage.setItem('loggedObj',JSON.stringify(out))
                localStorage.setItem('loggedkey',out.uname)
                window.location='./home.html'
            }
            else{
                alert("please enter the correct password")
            }
        }
        else{
            alert("user not registered")
        }
    }

}




// add income button click
function addIncome(){
    let incometype=document.getElementById('incometype').value
    let incomeAmount=document.getElementById('incomeamount').value
    if(incometype==="" || incomeAmount===""){
        alert("please fill the fields")
    }
    else{
        let newobj=JSON.parse(localStorage.getItem(loggedkey))
        newobj.income+=parseFloat(incomeAmount) ;
        let balance=newobj.income
        
        displayIncomeBalance.innerHTML=`Rs ${balance}/-`
        let now=new Date();
        let date=`${now.toLocaleDateString()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
        console.log(date);
        localStorage.setItem(newobj.uname,JSON.stringify(newobj))

        
        let incomeObj={
            type:incometype,
            amount:incomeAmount,
            balance:balance,
            date:date
        }
        newobj.incomeArray.push(incomeObj);
        console.log(newobj.incomeArray);
        localStorage.setItem(loggedkey,JSON.stringify(newobj))

        let displayTable=``;
        for(i of newobj.incomeArray){
            displayTable+=`
            <tr>
                <td>${i.type}</td>
                <td>+${i.amount}</td>
                <td>${i.balance}</td>
                <td>${i.date}</td>
            </tr>
            `
        }
        incomedetails.innerHTML=displayTable
        

    }

}
function addExpense(){
    let expensetype=document.getElementById('expensetype').value
    let expenseAmount=document.getElementById('expanseamount').value
    if(expensetype==="" || expenseAmount===""){
        alert("please fill the fields")
    }
    else{
        let newobj=JSON.parse(localStorage.getItem(loggedkey))
        newobj.expense+=parseFloat(expenseAmount) ;
        
        let balance=newobj.income-newobj.expense
        
        displayexpanceAmount.innerHTML=`Rs ${newobj.expense}/-`

        let now=new Date();
        let date=`${now.toLocaleDateString()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
        console.log(date);

        
        let expenseObj={
            type:expensetype,
            amount:expenseAmount,
            balance:balance,
            date:date
        }
        newobj.expenseArray.push(expenseObj);
        console.log(newobj.expenseArray);
        localStorage.setItem(loggedkey,JSON.stringify(newobj))

        let displayTable=``;
        for(i of newobj.expenseArray){
            displayTable+=`
            <tr>
                <td>${i.type}</td>
                <td>-${i.amount}</td>
                <td>${i.balance}</td>
                <td>${i.date}</td>
            </tr>
            `
        }
        Expensedetails.innerHTML=displayTable

    }

}

function cleardata(){
    displayIncomeBalance.innerHTML=`Rs 0/-`
    displayexpanceAmount.innerHTML=`Rs 0/-`
    let newobj=JSON.parse(localStorage.getItem(loggedkey))
    newobj.income=0;
    newobj.expense=0;
    newobj.incomeArray=[];
    newobj.expenseArray=[];
    localStorage.setItem(loggedkey,JSON.stringify(newobj));
    incomedetails.innerHTML=``;
    Expensedetails.innerHTML=``;
}


// display pie chart

function ShowPiechart(){
    let newobj=JSON.parse(localStorage.getItem(loggedkey));
    const ExpArray=newobj.expenseArray
    
    let type=ExpArray.map(x=>x.type);
    let values=ExpArray.map(y=>y.amount);

    const totalexpense=ExpArray.reduce((total,expanse)=>total+parseFloat(expanse.amount) ,0)
    const remainingBalance=newobj.income-totalexpense;
    
    type.push("Remaining Balance")
    values.push(remainingBalance)

    const customcolors=generateDistinctColor(type.length);

    const mychart=document.getElementById("inner_pie").getContext('2d')

    const chart=new Chart(mychart,{
        type: "pie",
        data: {
            labels: type,
            datasets: [{
                data: values,
                backgroundColor: customcolors,
            }],
        },
        options: {
            title: {
                display: true
            },
        },
    });
    chart.update();
    


    
}


function generateDistinctColor(num){
    const colors=[];
    const increment=360/num;;
    let hue=0;
    for (let i = 0; i < num; i++) {
        const saturation = 70 + Math.random() * 10;
        const lightness = 50 + Math.random() * 10;
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        colors.push(color);
        hue += increment;
    }
    return colors;
}

function logout(){
    window.location='./index.html'
}

