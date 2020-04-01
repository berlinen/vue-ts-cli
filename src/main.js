import program from 'commander'
import symbol from 'log-symbols'
import chalk from 'chalk'

import create from './create.js' // 项目创建
import init from './init.js' // 项目初始化
import dev from './dev' // 项目启动
import build from './build' // 项目打包

/**
 * template-cli 命令列表
 * actionMap => obj
 */

 let actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目', // 描述
    usages: [ // 使用方法
      'templat-cli create ProjectName',
      'tp-cli create ProjectName',
      'tc create ProjectName'
    ],
    alias: 'c' // 命令简称
  },
  // 项目初始化
  init: {
    description: '初始化项目',
    usages: [
      'templat-cli init',
      'tp-cli init',
      'tc init'
    ],
    alias: 'i'
  }
 }