import { graphql } from "gatsby"
import * as React from "react"
import * as style from './singlePost.module.css'

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import { GatsbyImage, getImage } from "gatsby-plugin-image"


const SinglePostContentful = ({data}) => {

const { html } = data.contentfulAnime.description.childMarkdownRemark;

const { title, postImage, year, numberOfEpisodes } = data.contentfulAnime;

const img = getImage( postImage )

  return (
    <Layout>

      <Seo title={title} />

      <h1>{`Anime from contentful: ${title}`}</h1>

      <ul>
        <li>Year: {year}</li>
        <li>Кол-во серий: {numberOfEpisodes}</li>
      </ul>

      <GatsbyImage className={style.linkImg} image={img} alt={title} />

      <div dangerouslySetInnerHTML={{__html: html}} />
      
    </Layout>
  )
}
export default SinglePostContentful

export const queryContentful = graphql`
  query PostQueryToContentful($titleName: String) {
    contentfulAnime(title: {eq: $titleName}) {
      year
      title
      numberOfEpisodes
      childContentfulAnimeContentJsonNode {
        authors
        id
        tags
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      postImage {
        gatsbyImageData(width: 800, placeholder: TRACED_SVG, formats: AUTO)
      }
    }
}
`
