import React from 'react'
import showdown from 'showdown'
import PropTypes from 'prop-types'
import Layout from '../components/layout.js'
import SEO from '../components/seo.js'
import { graphql } from 'gatsby'
import './_docPage.scss'

const converter = new showdown.Converter({ ghCompatibleHeaderId: true })

const DocPage = ({ data }) => {
  const Doc = data.docs.object
  if (!Doc) {
    window.location = '/'
  }

  let toc = `###[Back to List](${window.location.origin})\n`
  for (const i in Doc.metafields) {
    if (Doc.metafields[i].key === 'table_of_contents') {
      toc += Doc.metafields[i].value
    }
  }
  return (
    <Layout>
      <SEO
        title={data.docs.object.title}
        keywords={[`${data.docs.object.title}`, 'gatsby', 'documentation']}
      />
      <div
        className="doc-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          height: 'calc(100vh - 228px)',
        }}
      >
        <div
          className="doc-toc"
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(toc) }}
          style={{
            width: '30%',
            height: '100%',
            overflow: 'auto',
          }}
        />
        <div
          className="doc-main"
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(Doc.content) }}
          style={{
            width: '80%',
            height: '100%',
            overflow: 'auto',
            scrollBehavior: 'smooth',
          }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($cosmicBucket: String!, $title: String!, $readKey: String!) {
    docs {
      object(bucket_slug: $cosmicBucket, slug: $title, read_key: $readKey) {
        title
        content
        created_at
        _id
        metafields {
          key
          value
        }
      }
    }
  }
`

DocPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default DocPage
