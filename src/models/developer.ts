import mongoose = require('mongoose');

var developerSchema = new mongoose.Schema({
    // 头像
    avatar: { type: { url: String, rootPath: String, filename: String }, default: { url: '', rootPath: '', filename: '' } },
    name: String,
    // 技术评星, 最大5
    star: { type: Number, default: 5 },
    // 后台登录的账号密码
    phone: { type: String, required: true },
    password: { type: String, required: true },
    // 默认状态是可接单,在接单,
    state: Number,
    //技术标签
    tags: { type: [String], default: [] },
    // 个人简介
    summary: { type: String, default: '个性签名' },

    skills: { type: [{ name: String, level: { type: Number, default: 5 } }] },
    // 日薪
    daypay: { type: Number, default: 400 },
    // 工作地点 工作日晚上、周末白天、周末晚上
    workplaces: { type: [String], default: [] },
    // 作品
    works: {
        type: [{
            name: String, keywords: {
                type: [{ String }],
                default: []
            }
        }]
    }
});

export interface IDeveloper extends mongoose.Document {
    // 开发者姓名
    name: String;
    // 技术能力
    star: Number;
    state: Number;
    //技术标签
    tags: String[];
    sumamry: String;
    skills: { name: String, level: Number };
    daypay: Number;
    workplaces: String[];
    // 工作地地点
    works: { name: String, keywords: String[] };
}

export var developerModel = mongoose.model<IDeveloper>('Developer', developerSchema);

