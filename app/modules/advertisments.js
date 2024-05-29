const express = require('express');
const AdModel = require('../models/admodel')

const Advertisements ={
    async find(params) {
        const {shortText, description, userId, tags} = params
        try {
            const foundAds = await AdModel.find({
                shortText, 
                description, 
                userId, 
                tags,
                isDeleted: false
            })
            return foundAds;
        } catch (error) {
            console.error('Error:', error)
            throw error;
        }
    },

    async create(data) {
        try {
            const newAd = new AdModel(data)
            await newAd.save()
            return newAd
        }
        catch (error) {
            console.error('Error:', error)
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
            console.error('Error:', error)
            throw error
        }
    },    
}



module.exports = Advertisements