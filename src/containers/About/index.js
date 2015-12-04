import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import { TopImage } from 'components/TopImage';
import { Tools } from 'components/Tools';

/* constant metaData, useful for SSR */
const metaData = {
  title: 'Almanac News',
  description: 'Your one source of truth for financial news and data.',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

export class About extends Component {
  render() {
    return (
      <section>
        <DocumentMeta {...metaData} />
        <TopImage />
        <Tools />
      </section>
    );
  }
}
