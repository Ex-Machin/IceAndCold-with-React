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
        const res = await this.getResource(`/characters?page=5&pageSize=10`)
        return res.map(this._transformCharacter)
    }
    async getCharacter(id){
        const character = await this.getResource(`/characters/${id}`)
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
            return 'no-data :('
        }
    }

    _transformCharacter(char) {
        return {
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture),
            aliases: this.isSet(char.aliases.forEach(aliase => aliase)),
        } 
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            word: house.word,
            title: house.title,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
        }
    }
}