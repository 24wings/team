import express = require('express');
import { APPCONFIG } from '../config';
import { developerModel, IDeveloper } from '../models';
var router = express.Router();


// 访问主页,登录页面
router.route('/')
    .get(async (req, res, next) => {
        if (res.locals.admin) {
            res.render('admin/index');
        } else {
            res.render('admin/signin');
        }
    })
    .post(async (req, res, next) => {
        var { phone, password } = req.body;
        if (phone == APPCONFIG.admin.phone && password == APPCONFIG.admin.password) {
            res.render('admin/index');
        } else {
            var developer = await developerModel.findOne({ phone, password }).exec();
            if (developer) {
                res.render('admin/person', { developer });

            } else {
                res.render('admin/signin', {
                    errorMsg: '该用户不存在'
                });

            }
        }

    });

// 注册
router.route('/signup')
    .get(async (req, res, next) => {
        res.render('admin/signup')
    })
    .post(async (req, res, next) => {
        var { phone, password, repassword } = req.body;
        if (phone && password && repassword && /^1[3-9]\d{9}$/.test(phone) && repassword == password) {
            var isExisit = await developerModel.findOne({ phone }).count().exec();
            if (isExisit) {
                res.render('admin/signup', {
                    errorMsg: '该手机号已经存在'
                });
            } else {

                var newDeveloper = await new developerModel({ phone, password, repassword }).save();

                res.locals.developer = newDeveloper;
                res.render('admin/person');

            }

        } else {
            var errorMsg = /^1[3-9]\d{9}$/.test(phone) ? '密码不一致' : '手机号不非法';
            res.render('admin/signup', {
                errorMsg
            });
        }
    })



export { router as adminRouter };