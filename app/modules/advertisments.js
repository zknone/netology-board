const express = require('express');
const AdModel = require('../models/admodel')

const Advertisements ={
    async find(params) {
        try {

        }
        catch{

        }
    },

    async create(data) {
        try {
            const newAd = new AdModel(data);
            await newAd.save();
            return newAd;
        }
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    
    async remove(id) {
        try {
            await AdModel.findByIdAndUpdate(id, {
                isDeleted: true,
            });
        }
        catch (error){
            console.error('Error:', error);
            throw error;
        }
    },    
}



module.exports = Advertisements;