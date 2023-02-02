const SERVER_URL = "http://127.0.0.1:8000"

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const showModal = () => {
    let modal = document.getElementById('modal');
    modal.style.display = 'flex';
}

const closeModal = () => {
    submitArticle();
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}


async function getArticle() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
}

async function getDetailArticle(id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = await response.json();
    return data
}


async function postArticle(article) {
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method: 'POST',
        body: article,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let data = await response.json();
    return data
}

async function submitArticle() {
    let form = document.getElementById('item')
    let formData = new FormData(form);
    let result = await postArticle(formData);
    return result
}

async function insertArticle() {
    let data = await getArticle();

    data.forEach(post => {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="${post.id}">
                <h1>작성자: ${post.author}</h1>
                <h1 id="title">${post.title}</h1>
                <p id="category">${post.category.id}</p>
                <p id="content">${post.content}</p>
                <button onclick="insertDetailArticle(${post.id})">세부내용 보기</button><hr>
            </div>    
        `)
    });
    
    return data
}

async function insertDetailArticle(id) {
    let data = await getDetailArticle(id);
        document.body.insertAdjacentHTML('beforeend', `
            <div class="modal">
                <div id="${data.id}">
                    <h1>작성자: ${data.author}</h1>
                    <h1 id="title">${data.title}</h1>
                    <p id="category">${data.category.id}</p>
                    <p id="content">${data.content}</p>
                    
                </div> 
            </div>   
        `)
    
    return data
}

insertArticle();
