
export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getKey = (url) => {
        return url.split('/')[url.split('/').length - 1]
    }

    _transformChar = (promise) => {
        return {
            name: promise.name,
            born: promise.born,
            died: promise.died,
            culture: promise.culture,
            gender: promise.gender,
            url: promise.url,
            key: this.getKey(promise.url)
        }
    }

    _transformHouse = (promise) => {
        return {
            name: promise.name,
            key: this.getKey(promise.url),
            region: promise.region,
            founded: promise.founded,
            founder: promise.founder,
            currentLord: promise.currentLord,
            url: promise.url
        }
    }

    _transformBooks = (promise) => {
        return {
            name: promise.name,
            url: promise.url,
            publisher: promise.publisher,
            released: promise.released,
            numberOfPages: promise.numberOfPages,
            key: this.getKey(promise.url)
        }
    }

    getBook = async (id) => {
        const res = await this.getResource(`/books/${id}`);
        return this._transformBooks(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return await res.map(this._transformBooks)
    }
    
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return await res.map(this._transformChar)
    }
    
    getCharacter = async (id) => {
        if(!id) {
            return id;
        }
        const res = await this.getResource(`/characters/${id}`);
        return this._transformChar(res);
    }
    
    getAllHouses = async() => {
        const res =  await this.getResource(`/houses/`);
        return await res.map(this._transformHouse)
    }

}
