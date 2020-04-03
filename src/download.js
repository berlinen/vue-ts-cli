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

 module.exports = download