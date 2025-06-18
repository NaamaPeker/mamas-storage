import {v4 as uuidv4} from 'uuid';


export class InMemoryStorage{
    
    constructor(){
        this.collection = []
    }
    create(collectionName, item) 
    {
        const new_object = {
        property_id: uuidv4(),
        collectionName: collectionName,
        collection: item
        }

        this.collection.push(new_object)
        return new_object

    }

    find(collectionName, findFunc)
    {
        return this.collection[collectionName].filter(findFunc)
    }

    where(collectionName, where) 
    {
        return this.collection[collectionName].filter(element =>{
            return Object.keys(where).every(key=> item[key] === where[key])
        });
    }
    where(collectionName)
    {
        return this.collection[collectionName]
    }

    remove(collectionName, findFunc)
    {
        this.collection[collectionName] = this.collection[collectionName].filter(element=> !findFunc(element))
        return this.collection[collectionName]
    }
}
export class InMemorySharedStorage {
  static sharedData = {};

  create(collectionName, item) {
    if (!InMemorySharedStorage.sharedData[collectionName]) {
      InMemorySharedStorage.sharedData[collectionName] = [];
    }
    const newItem = { ...item, _id: uuidv4() };
    InMemorySharedStorage.sharedData[collectionName].push(newItem);
    return newItem;
}
    find(collectionName, findFunc)
    {
        return this.sharedData[collectionName].filter(findFunc)
    }

    where(collectionName, where) 
    {
        return this.sharedData[collectionName].filter(element =>{
            return Object.keys(where).every(key=> item[key] === where[key])
        });
    }
    where(collectionName)
    {
        return this.sharedData[collectionName]
    }

    remove(collectionName, findFunc)
    {
        this.sharedData[collectionName] = this.sharedData[collectionName].filter(element=> !findFunc(element))
        return this.sharedData[collectionName]
    }
}