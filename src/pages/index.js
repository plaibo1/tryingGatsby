import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({data}) => {

  const allMarkdownRemark = data.allMarkdownRemark;

  const allContentfulAnime = data.allContentfulAnime;
  
  return (
    <Layout>
      <Seo title="Home" />
      <h1>Anime</h1>

      <div className="posts">
        {
          allMarkdownRemark.nodes.map(post => {
            const {title, category, url, image} = post.frontmatter;
            const img = getImage(image)
            return (
              <div className="post markdown" key={post.id}>
                <Link className="post__link" to={`${category}/${url}`} >

                <span className="post__img-wrap">
                  <GatsbyImage className="post__link__img" image={img} alt={title} />
                </span>

                <span className="post__title" title={title}>
                  {title}
                </span>

                </Link>
              </div>
            )
          })
        }
        {
          allContentfulAnime.nodes.map(post => {
            const {title, image} = post;
            const img = getImage(image)
            return (
              <div className="post contentful" key={post.id}>
                <Link className="post__link" to={`contentful/${title.split(' ').join('')}`} >

                <span className="post__img-wrap">
                  <GatsbyImage className="post__link__img" image={img} alt={title} />
                </span>

                <span className="post__title" title={title}>
                  {title}
                </span>

                </Link>
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query MainPage {
    allMarkdownRemark(filter: {fileAbsolutePath: {ne: null}}) {
      nodes {
        frontmatter {
          title
          category
          url
          image {
            childImageSharp {
              gatsbyImageData(width: 200, formats: [AUTO, AVIF], placeholder: BLURRED)
            }
          }
        }
        id
      }
    },
    allContentfulAnime {
      nodes {
        title
        year
        numberOfEpisodes
        id
        image {
          gatsbyImageData(placeholder: TRACED_SVG, width: 200)
        }
      }
    }
  }
`

// export const contentfulQuery = graphql`
//   query animeToMainPage {

//   }
// `