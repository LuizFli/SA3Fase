import axios from "axios";

export const buscarFilmes = ()  => {
    return axios.get("http://localhost:9090/acervo/filme")
        .then(response => response.data);
}

export const buscarFilmePorId = id  => {
    return axios.get(`http://localhost:9090/acervo/filme/${id}`)
        .then(response => response.data);
}

export const inserirFilme = (filme)  => {
    return axios.post("http://localhost:9090/acervo/filme", filme)
        .then(response => response.data);
}

export const atualizarFilme = (filme)  => {
    return axios.put("http://localhost:9090/acervo/filme", filme)
        .then(response => response.data);
}

export const excluirFilme = id => {
    return axios.delete(`http://localhost:9090/acervo/filme/${id}`)
        .then(response => response.data);
}