export default class IceAndCold {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
              `, received ${res.status}`);
        }

        return await res.json()
    }
    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    async getCharacter(charId){
        const character = await this.getResource(`/characters/${charId}`)
        return this._transformCharacter(character)
    }
    async getAllHouses() {
        const houses = await this.getResource(`/houses/`)
        return houses.map(this._transformHouse)
    }
    async getHouses(id) {
        const house = await this.getResource(`/houses/${id}`)
        return this._transformHouses(house)
    }
    async getAllBooks() {
        const books = await this.getResource(`/books/`)
        return books.map(this._transformBooks)
    }
    async getBooks(id) {
        const book = await this.getResource(`/books/${id}`)
        return this._transformBook(book)
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture),
            aliases: this.isSet(char.aliases.forEach(aliase => aliase)),
        } 
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: house.name,
            region: house.region,
            word: house.word,
            title: house.title,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
        }
    }

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
        }
    }
}