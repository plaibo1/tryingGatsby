const path = require('path')

exports.createPages = async ({ graphql, actions }) => {

  const {data} = await graphql(`
    query Posts {
      allMarkdownRemark(filter: {fileAbsolutePath: {ne: null}}) {
        nodes {
          frontmatter {
            url
            category
          }
        }
      }
    }
  `)

  data.allMarkdownRemark.nodes.forEach(node => {

    const { category, url } = node.frontmatter;

    actions.createPage({
      path: `/${category}/${url}`,
      component: path.resolve('./src/templates/singlePost/single-post.js'),
      context: { url }
    })

  });

  const dataFromContentful = await graphql(`
    query PostsFromCF {
      allContentfulAnime {
        nodes {
            title
        }
      }
    }
  `)

  dataFromContentful.data.allContentfulAnime.nodes.forEach(node => {

    const {title} = node;
    const url = title.split(' ').join('');
    const titleName = title

    actions.createPage({
      path: `contentful/${url}`,
      component: path.resolve('./src/templates/singlePost/single-post-contentful.js'),
      context: {titleName}
    })

  })

}
