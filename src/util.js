import fs from 'fs'
import symbol from 'log-symbols'
import chalk from 'chalk'
import inquirer from 'inquirer'
import downloadGit from 'download-git-repo'

// 文件是否存在
let notExistFold = async (name) => {
  return new Promise((resolve, reject) => {
    if(fs.existsSync(name)) {
      console.log(symbol.error, chalk.red('文件夹名已被占用，请更换名字重新创建'));
      reject()
    } else {
      resolve()
    }
  })
}

// 询问用户
let promptList = [
 {
  type: 'list',
  name: 'frame',
  message: 'please choose this project template',
  choice:  ['vue', 'react']
 },
 {
  type: 'input',
  name: 'description',
  message: 'Please enter the project description: '
 },
 {
  type: 'input',
  name: 'author',
  message: 'Please enter the author name: '
  }
]