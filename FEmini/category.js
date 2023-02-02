const SERVER_URL = "http://127.0.0.1:8000"

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function getCategory() {
    let response = await fetch(`${SERVER_URL}/blog/category`);
    let data = await response.json();
    return data
}

async function postCategory(category) {
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/category`, {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        }
    })
    let data = await response.json();
    return data
}

async function submitCategory() {
    let category = {
        name: document.getElementById('title').value
    }
    let result = await postCategory(category);
    return result
}

async function insertCategory() {
    let data = await getCategory();

    data.forEach(post => {
        document.body.insertAdjacentHTML('beforeend', `
        <div id="${post.id}">
            <h1 id="title">${post.name}</h1>
        </div>    
        `)
    });
    
    return data
}

insertCategory();
