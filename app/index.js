/*
 * @Author: sanye 
 * @Date: 2020-03-17 15:31:12 
 * @Last Modified by: sanye
 * @Last Modified time: 2020-03-20 16:31:38
 */
'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
let getMain = require('./utils/exportMain')
const _ = require('lodash')
let mainObj = {}
module.exports = class extends Generator {
    initPackage () {
        mainObj = getMain(this.props)
        let pkg =  this.fs.readJSON(this.templatePath('tempJson/package.json'), {})
        let dependencies = pkg.dependencies
        dependencies = _.assign(dependencies, mainObj.pkgJson)
        const {props} = this
        pkg = _.merge(pkg, {
            name: props.projectName,
            description: props.description,
            dependencies: dependencies
        })
        this.fs.writeJSON(this.destinationPath(`${this.props.appName}/package.json`), pkg)
    }
    initMain () {
        // 修改index.html
        this.fs.copyTpl(this.templatePath('common/public/index.html'),
        this.destinationPath(`${this.props.appName}/public/index.html`),
        {title: this.props.description, BASE_URL: '<%= BASE_URL %>'})
        // 修改main.js
        this.fs.copyTpl(this.templatePath('common/src/main.js'),
        this.destinationPath(`${this.props.appName}/src/main.js`),
        {temp: this.props.template, brandName: this.props.brandName})
    }
    prompting () {
        // 询问用户
        this.log(yosay(
            '欢迎来到'+ chalk.red('前端模版') + '敌军马上到达'
        ))
        const prompts = [{
            type: 'input',
            name: 'projectName',
            message: '你的项目名称?',
            default: "oms"
        },
        {
            type: 'input',
            name: 'description',
            message: '你的项目描述?',
            default: "后台管理系统"
        },
        {
            type:'input',
            name:'appName',
            message:'你的项目服务名称?',
            default:"oms"
        },
        {
            type:'input',
            name:'brandName',
            message:'你的系统名称?',
            default:"宇石"
        },
        {
            type: 'list',
            message: '请选择一种模版:',
            name: 'template',
            choices: [
                "h5",
                "oms",
                "website",
                "h5sdk",
                "hybrid"
            ],
            filter: function (val) { // 使用filter将回答变为小写
                return val.toLowerCase();
            }
        }];      
        return this.prompt(prompts).then(props => {      
            this.props= props;
        });
    }
    writing () {
        // 拷贝文件，搭建脚手架
        this.fs.copy(
            this.templatePath('common/'),
            this.destinationPath(`${this.props.appName}/`)
        )
        this.fs.copy(
            this.templatePath('tempJson/'),
            this.destinationPath(`${this.props.appName}/`)
        )
        this.initPackage()
        this.initMain()
    }
    end () {
        // 搭建完成
        this.log(yosay(chalk.greenBright('搭建完成')))
    }
}
