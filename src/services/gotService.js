
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

    _transformChar(promise) {
        return {
            name: promise.name,
            born: promise.born,
            died: promise.died,
            culture: promise.culture,
            gender: promise.gender,
            url: promise.url
        }
    }



    getAllBooks() {
        return this.getResource(`/books/`);
    }
    
    getBook(id) {
        return this.getResource(`/books/${id}/`);
    }
    
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return await res.map(this._transformChar)
    }
    
    async getCharacter (id) {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformChar(res);
    }
    
    getAllHouses() {
        return this.getResource(`/houses/`);
    }
    
    getHouse(id) {
        return this.getResource(`/houses/${id}/`);
    }
}
