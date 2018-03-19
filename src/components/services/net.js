class Net {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(url) {
        return fetch(this.baseUrl + url).then(response => response.json());
    }

    post(url, data) {
        return fetch(this.baseUrl + url, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }).then(response => response.json());
    }

}

//export default new Net('http://jsonplaceholder.typicode.com/');
export default new Net('http://localhost:3001/');