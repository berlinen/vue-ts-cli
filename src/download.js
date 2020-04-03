/**
 * @description github clone
 * @author berlin
 */

 const wget = require('download')

/**
 * @description download下载
 * @param {string} repo
 * @param {string} dest
 * @param {Function} fn
 */
 function download (repo, dest, fn) {
   let url = github(normalize(repo))
   wget(url, dest, {
    extract: true,
    strip: 1
   }).then(() => {
     fn()
   }).catch(err => {
     fn(err)
   })
 }

 /**
  * @description github url repositories
  * @param {String} repo
  */
 function github(repo) {
    const {owner, name, branch} = repo
    return `https://github.com/${owner}/${name}/archive/${branch}.zip`
 }

 /**
  * @description normalize
  * @param {string} string
  */
 function normalize(string) {
  let url = string.split('/')
  let owner = url[0]
  let name = url[1]
  const branch = 'master'

  if(~name.includes('#')) {
    branch = name.split('#')[1]
    name = name.split('#')[0]
  }

  return {
    owner,
    name,
    branch
  }
 }

 module.exports = download