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
  * @description normalize parse url
  * @param {string} string
  */
 function normalize(string) {
  let owner = string.split('/')[0];
  let name = string.split('/')[1];
  let branch = 'master';

  if (~name.indexOf('#')) {
    branch = name.split('#')[1];
    name = name.split('#')[0];
  }

  return {
    owner: owner,
    name: name,
    branch: branch
  };
 }

 module.exports = download

//  module.exports = (opts) => async (ctx, next) => {
//   await next();

//   const ancestor = opts.envs ? opts.envs.ifrProjectDomain : '';
//   ctx.set('Content-Security-Policy', `frame-ancestors ${ancestor}`);
//   ctx.set('X-Frame-Options', `allow-from ${ancestor}`);
// };