import mongoose = require('mongoose');
mongoose.connect('mongodb://120.77.169.182/test');

export { ICase, caseModel } from './case';

export { developerModel, IDeveloper } from './developer';