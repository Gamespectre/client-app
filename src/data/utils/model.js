import mobservable from 'mobservable'

class Model {

    constructor(dataObject) {
        this.collection = dataObject.collection
        this.processor = dataObject.processor
    }

    insert(data) {
        if(!data instanceof Array) {
            if(!this.collection.data instanceof Array) {
                this.collection.data = this.itemProcessor(data)
            }
            this.collection.data.push(this.itemProcessor(data))
        }
        else if(!this.collection.data instanceof Array) {
            this.collection.data = data.map(dataItem => this.itemProcessor(dataItem))
        }
        else {
            data.forEach(item => this.collection.data.push(this.itemProcessor(item)))
        }
    }

    retrieve(key, query = null) {
        if(Number.isInteger(key)) {
            return this.collection.data[key]
        }

        return this.collection.data.find(currentItem => {
            return typeof currentItem[key] === query
        })
    }
}

export default Model