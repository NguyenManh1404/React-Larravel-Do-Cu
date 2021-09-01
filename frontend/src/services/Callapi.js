let API_URL = 'http://127.0.0.1:8000/api';


export default function Call_API(endpoint, method = "GET", body) {
    return fetch({
        method,
        url: `${API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}