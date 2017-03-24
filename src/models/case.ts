import mongoose = require('mongoose');


var caseSchema = new mongoose.Schema({
    // 案例的名字
    title: String,
    // 案例的简介
    summary: String,
    // 案例的金额
    money: Number,

    // 预览的图片组
    images: { type: [{ url: String, rootPath: String, filename: String }], default: [] },

    // 评论
    commet: String,
    developers: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developer' }], default: [] },
});


export interface ICase extends mongoose.Document {
    title: string;
    summary: String;
    money: Number;
    images: { url: String, rootPath: String, filename: String }[];
    comment: String;
    // developers:
}

export var caseModel = mongoose.model('Case', caseSchema);
