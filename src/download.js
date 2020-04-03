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
  *
  * @param {String} repo
  */
 function github(repo) {
    return 'https://github.com/'
    + repo.owner
    + '/'
    + repo.name
    + '/archive/'
    + repo.branch
    + '.zip';
 }

 module.exports = download