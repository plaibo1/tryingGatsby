import { graphql } from "gatsby"
import * as React from "react"
import * as style from './singlePost.module.css'

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import { GatsbyImage, getImage } from "gatsby-plugin-image"


const SinglePost = ({data}) => {

const { html } = data.markdownRemark;
const { category, title, url, image, postImage } = data.markdownRemark.frontmatter;

const img = getImage( (postImage ?? image) )

  return (
    <Layout>

      <Seo title={title} />

      <h1>{`Anime: ${title}`}</h1>

      <p>{`Категория: ${category}`}</p>

      <GatsbyImage className={style.linkImg} image={img} alt={title} />

      <div dangerouslySetInnerHTML={{__html: html}} />
      
    </Layout>
  )
}
export default SinglePost;

export const query = graphql`
  query PostQuery($url: String) {
    markdownRemark(frontmatter: {url: {eq: $url}}) {
      html
      frontmatter {
        category
        title
        url
        image {
          childImageSharp {
            gatsbyImageData(formats: AUTO, width: 500, placeholder: TRACED_SVG)
          }
        }
        postImage {
          childImageSharp {
            gatsbyImageData(formats: AUTO, width: 800, placeholder: TRACED_SVG)
          }
        }
      }
    }
  }
`
