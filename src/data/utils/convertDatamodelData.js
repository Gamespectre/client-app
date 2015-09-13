/**
 * The data returned from the API is created by 'datamodels',
 * which have the value of the property itself, as well as
 * the relevant database column name for easy storage.
 * In the client we're not concerned with the db,
 * so we need to remove the db column name.
 */

export default function(data) {
    let converted = {}

    for(let item in data) {
        if(data[item] instanceof Array) {
            converted[item] = data[item][0]
        }
        else {
            converted[item] = data[item]
        }
    }

    return converted
}