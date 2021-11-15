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

module.exports = {
    create
}
