import React, { useState } from 'react';
import styles from '../styles/CodeBoxContainer.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import nightOwl from '../node_modules/react-syntax-highlighter/dist/esm/styles/hljs/night-owl';
import qtCreator from '../node_modules/react-syntax-highlighter/dist/esm/styles/hljs/qtcreator_dark';
import { GQLServerCode, GQLClientQueriesCode, GQLClientMutationsCode } from '../server/sampleDB';

function CodeBoxContainer({ data, showDemo }) {
  const uriDataGQLServerCode = data ? data.GQLServerCode : '';
  const uriDataGQLClientMutationsCode = data ? data.GQLClientMutationsCode : '';
  const uriDataGQLClientQueriesCode = data ? data.GQLClientQueriesCode : '';

  return (
    <div className={styles.codebox}>
      <div className={styles.clientWrapper}>
        <div className={styles.client}>
          <h3> GraphQL Client Queries</h3>
          <SyntaxHighlighter language='javascript' style={qtCreator}>
            {showDemo ? GQLClientQueriesCode : uriDataGQLClientQueriesCode}
          </SyntaxHighlighter>
        </div>
        <div className={styles.client}>
          <h3> GraphQL Client Mutations</h3>
          <SyntaxHighlighter language='javascript' style={qtCreator}>
            {showDemo ? GQLClientMutationsCode : uriDataGQLClientMutationsCode}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className={styles.gqldata}>
        <h3> GraphQL Types, Root Queries, & Mutations </h3>
        <SyntaxHighlighter language='javascript' style={qtCreator}>
          {showDemo ? GQLServerCode : uriDataGQLServerCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeBoxContainer;
