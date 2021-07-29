
const path = require('path')
const fs = require('fs');
const globby = require('globby')


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/page.js`)


  for (let index = 0; index < 10000; index++) {
    createPage({
      path: `/news/page-${index}`,
      component: blogPostTemplate,
      context: {
        title: `Page ${index}`,
      },
    })
  }

}

exports.onPostBuild = async ({ reporter }) => {
  const copyFilesActivity = reporter.activityTimer(`Moving static assets to /news`)
  copyFilesActivity.start();

  const paths = await globby('public/*', {
    onlyFiles: true
  })

  paths.map((pathname) => {
    const filename = pathname.slice(7)
    fs.copyFile(pathname, `public/news/${filename}`, (err) => {
      if (err)
        throw err;
    });
  });
  copyFilesActivity.setStatus(`Copied ${paths.length} files to /news`)
  copyFilesActivity.end()
}
