const mongoCollections = require('../config/mongoCollections');
const currencyCollection = mongoCollections.currency
let { ObjectId } = require('mongodb');

async function create(name, shortName, symbol, conversion ){
    const currency_collection = await currencyCollection();

    let newCurrency = {
        name: name,
        shortName: shortName,
        symbol: symbol,
        conversion: conversion
    }; 

    const insertinfo = await currency_collection.insertOne(newCurrency)
    const newId = insertinfo.insertedId;
    const new_currency = await currency_collection.findOne({ _id: newId });
    const newObjId = ObjectId(new_currency._id); 
    let x = new_currency._id
    x = newObjId.toString(); 
    new_currency._id=x;

    return(new_currency)
}

async function getAll(){
    let list = [];
    const currency_Collection = await currencyCollection();
    const currencyList = await currency_Collection.find({}).toArray();

    for(let i=0; i<currencyList.length; i++){
        let x = currencyList[i]._id
        let y=x.toString();
        currencyList[i]._id = y;
    }

    for(let i=0;i<currencyList.length;i++){
        let ls = {"name": currencyList[i].name, "shortName": currencyList[i].shortName, 
        "symbol": currencyList[i].symbol, "conversion": currencyList[i].conversion};
        list.push(ls);
    }
    return list;
}

module.exports = {
    create,
    getAll
}
