import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Docs from '../components/docList'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`, 'documentation', 'docs', 'markdown']} />
      <Docs docs={data.docs.objectsByType} />
    </Layout>
  )
}


IndexPage.propTypes = {
  data: PropTypes.object,
}

export const query = graphql`
  query($readKey: String!) {
    docs {
      objectsByType(bucket_slug: "gatsby-docs", type_slug: "docs", read_key: $readKey) {
        title
        content
        created_at
        _id
      }
    }
  }
`

export default IndexPage