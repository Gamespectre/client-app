import mobservable from 'mobservable'

export default (itemProcessor) => {
    return {
        insert(data) {
            if(!Array.isArray(data)) {
                if(!Array.isArray(this.data)) {
                    this.data = itemProcessor(data)
                }
                this.data.push(itemProcessor(data))
            }
            else if(!Array.isArray(this.data)) {
                this.data = data.map(dataItem => itemProcessor(dataItem))
            }
            else {
                data.forEach(item => this.data.push(itemProcessor(item)))
            }

            console.log(this.data)
        },
        retrieve(key, query = null) {
            if(Number.isInteger(key)) {
                return this.data[key]
            }

            return this.data.find(currentItem => {
                return typeof currentItem[key] === query
            })
        }
    }
}