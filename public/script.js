import process from "node:process";

// const urlBase = `http://${process.env.URL_DOMAIN}/LAMPAPI`;		// Change ${...} part to your purchased domain here

// const endpoint = 'Login.php';

const userId = 0;
const firstName = "";
const lastName = "";


export async function loginRequest (login, password) {

	const url = Deno.env.get("URL_DOMAIN");

	const urlBase = `http://${url}/LAMPAPI`;		// Change ${...} part to your purchased domain here
	const endpoint = 'Login.php';


	if (!login || !password) {
		throw new Error("Username and password are required");
	}

	const response = await fetch(`${urlBase}/${endpoint}`, {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify({ login: login, password: password })
	});


	if (!response.ok) {
		throw new Error(`Login failed: ${response.statusText}`);
	}

	const data = await response.json();
	if (!data.id || data.id < 1){
		throw new Error("User/Password combination incorrect");
	}

	return {
		userId: data.id,
		firstName: data.firstName,
		lastName: data.lastName
	}
}

export async function doLogin()
{
	const login = document.getElementById("loginName").value;
	const password = document.getElementById("loginPassword").value;
	document.getElementById("loginResult").innerHTML = "";

	try {
		const result = await loginRequest(login, password);
		saveCookie(result.firstName, result.lastName, result.userId);
		globalThis.location.href = "home.html";
		return result;
	} catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	const minutes = 20;
	const date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	let userId = -1;
	const data = document.cookie;
	const splits = data.split(",");
	for(let i = 0; i < splits.length; i++) 
	{
		const thisOne = splits[i].trim();
		const tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			let _firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			let lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		globalThis.location.href = "index.html";
	}
	else
	{
//		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	let userId = 0;
	let firstName = "";
	let lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	globalThis.location.href = "index.html";
}

function addColor()
{
	const newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	const tmp = {color:newColor,userId:userId};
	const jsonPayload = JSON.stringify( tmp );

	const url = urlBase + '/AddColor.' + extension;
	
	const xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	const srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	const tmp = {search:srch,userId:userId};
	const jsonPayload = JSON.stringify( tmp );

	const url = urlBase + '/SearchColors.' + extension;
	
	const xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				const jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}
