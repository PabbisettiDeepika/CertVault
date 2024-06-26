// Login user and store token in local storage

let fields = ["userName", "password", "submit"];
let inputTypes = ["text", "password", "submit"];
let labels = ["User name", "Password"];
let form;

createForm();
bindEvent();

function validateUser()
{
    if (localStorage.getItem("Token"))
    {
        window.location.assign("./homepage.html");
    }
}

function createForm()
{
    form = document.createElement("form");
    form.id = "loginForm";
    document.getElementById("loginPage").appendChild(form);

    for (let counter = 0; counter < fields.length; counter++)
    {
        if (counter < fields.length - 1)
        {
            let label = document.createElement("label");
            label.innerText = labels[counter];
            let lineBreak = document.createElement("br");
            form.appendChild(label);
            form.appendChild(lineBreak);
        }
        let formElement = document.createElement("input");
        formElement.type = inputTypes[counter];
        formElement.id = fields[counter];
        formElement.required = true;
        form.appendChild(formElement);
        form.appendChild(document.createElement("br"));
    }
}

function bindEvent()
{
    form.addEventListener("submit", function(event)
    {
        event.preventDefault();
        login()
    });
}

async function login() 
{
    let userName = document.getElementById(fields[0]).value;
    let password = document.getElementById(fields[1]).value;
    let data = { UserName: userName, Password: password };
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)};
    try 
    {
        const response = await fetch("http://localhost:5000/api/login", options);
        let result = await response.json();
        if (result.Token)
        {
            alert("Login successfully!")
            localStorage.setItem("Token", result.Token);
            window.location.assign("./homepage.html");
        }
        else
        {
            alert("Invalid user details");
        }
    } 
    catch (error) 
    {
        console.log('Unable to fetch:', error);
    }
}
