/**
 * @module JSX
 */

import React from 'react';

import { Helmet } from 'react-helmet';

import { COMMON_URLS } from '../utils/constants';
import JsonLd from '../utils/JsonLd';
import {
  ArticleSchema,
  BreadcrumbSchema,
  FaqSchema,
  MetatagsData,
  ProductSchema,
  WebpageSchema
} from '../utils/types';

/**
 * This method can be used to insert meta tags in any page necessary for SEO.
 *
 * @param {MetatagsData} dataObject - Data object for meta tags
 * @param {string} web_host - Current domain based on environment .... like - https://groww.in
 *
 * @remarks
 * This method should be present in the first render otherwise SEO will not happen.
 *
 * @example
 * ```
 * getMetaTags(dataObject, config.host); // Use in render method
 * ```
 */
export function getMetaTags(dataObject: MetatagsData, web_host: string) {
  const title = dataObject.title;
  let desc = dataObject.desc;

  desc = desc.length > 315 ? desc.substring(0, 315) + ' ...' : desc;

  const featuredImage = dataObject.featuredImage ? dataObject.featuredImage : COMMON_URLS.DEFAULT_GROWW_LOGO_270;

  let robots = 'noindex';

  if (web_host.includes(COMMON_URLS.PROD_HOST)) {
    robots = 'index';
  }

  if (dataObject.noIndex) {
    robots = 'noindex';
  }

  const routeName = web_host + dataObject.routeName;
  const canonicalUrl = dataObject.canonicalUrl ? dataObject.canonicalUrl : routeName;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description"
        content={desc}
      />
      <meta name="robots"
        content={robots}
      />
      <meta name="twitter:card"
        content="summary_large_image"
      />
      <meta name="twitter:image"
        content={featuredImage}
      />
      <meta name="twitter:description"
        content={desc}
      />
      <meta name="twitter:title"
        content={title}
      />
      <meta name="twitter:site"
        content="_@groww"
      />
      <meta name="twitter:creator"
        content="_@groww"
      />
      <meta itemProp="name"
        content={title}
      />
      <meta itemProp="description"
        content={desc}
      />
      <meta itemProp="image"
        content={featuredImage}
      />
      <meta property="og:locale"
        content="en_US"
      />
      <meta property="og:type"
        content="website"
      />
      <meta property="og:title"
        content={title}
      />
      <meta property="og:image"
        content={featuredImage}
      />
      <meta property="og:description"
        content={desc}
      />
      <meta property="og:url"
        content={routeName}
      />
      <meta property="og:site_name"
        content="Groww"
      />
      <link rel="publisher"
        href="https://plus.google.com/b/112795119140865328446/+GrowwIn?"
      />
      <link rel="canonical"
        href={canonicalUrl}
      />
    </Helmet>
  );
}


/**
 * This method can be used to insert Organization Schema in any page necessary for SEO.
 *
 * @remarks
 * This method should be present in the first render otherwise SEO will not happen.
 *
 * @example
 * ```
 * getOrganizationSchema() // Use in render method
 * ```
 */
export function getOrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Groww',
    'description': 'Start Online Investing in Stocks and Direct Mutual Funds with India\'s Leading Investment and Trading Platform - Groww. Equity Trading, US Stocks, Direct Mutual Funds with Zero-commission.',
    'url': COMMON_URLS.PROD_HOST,
    'logo': COMMON_URLS.DEFAULT_GROWW_LOGO_270,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'No.11, 2nd floor, 80 FT Road, 4th Block, S.T Bed, Koramangala',
      'addressLocality': 'Bengaluru',
      'addressRegion': 'Karnataka',
      'postalCode': '560034'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91 91 0880 0604',
        contactType: 'customer service'
      }
    ],
    sameAs: [
      COMMON_URLS.FACEBOOK_PAGE,
      COMMON_URLS.TWITTER_PAGE,
      COMMON_URLS.YOUTUBE_MAIN_CHANNEL,
      COMMON_URLS.LINKEDIN_PAGE,
      COMMON_URLS.INSTAGRAM_PAGE
    ]
  };

  return (
    <JsonLd schemaData={data} />
  );
}


/**
 * This method can be used to insert rich snippet webpage schema in any page.
 *
 * @param {WebpageSchema} schemaObject - Schema object for web page schema
 * @param {string} web_host - Current domain based on environment .... like - https://groww.in
 *
 * @remarks
 * This method should be present in the first render otherwise SEO will not happen.
 *
 * @example
 * ```
 * getWebpageSchema(schemaObject, config.host) // Use in render method
 * ```
 */
export const getWebpageSchema = (schemaObject: WebpageSchema, web_host: string) => {
  let desc = schemaObject.desc;

  desc = desc.length > 315 ? desc.substring(0, 315) + ' ...' : desc;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': schemaObject.title,
    'description': desc,
    'url': web_host + schemaObject.routeName,
    'publisher': {
      '@type': 'Organization',
      'name': 'Groww',
      'url': web_host,
      'logo': {
        '@type': 'ImageObject',
        'contentUrl': COMMON_URLS.DEFAULT_GROWW_LOGO_270
      }
    }
  };

  return (
    <JsonLd schemaData={data} />
  );
};


/**
 * This method can be used to insert rich snippet article schema in any page.
 *
 * @param {ArticleSchema} schemaObject - Schema object for article schema
 * @param {string} web_host - Current domain based on environment .... like - https://groww.in
 *
 * @remarks
 * This method should be present in the first render otherwise SEO will not happen.
 *
 * @example
 * ```
 * getArticleSchema(schemaObject, config.host); // Use in render method
 * ```
 */
export function getArticleSchema(schemaObject: ArticleSchema, web_host: string) {

  const language = schemaObject.inLanguage ? schemaObject.inLanguage : 'en';
  const image = schemaObject.image ? schemaObject.image : COMMON_URLS.DEFAULT_GROWW_LOGO_270;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': [ schemaObject.headline ],
    'image': [ image ],
    'inLanguage': language,
    'datePublished': schemaObject.datePublished,
    'dateModified': schemaObject.dateModified,
    'author': [ {
      '@type': 'Person',
      'name': 'Groww Team',
      'url': web_host
    } ]
  };

  return (
    <JsonLd schemaData={data} />
  );
}


/**
 * This method can be used to insert rich snippet product schema in any page.
 *
 * @param {ProductSchema} schemaObject - Schema object for product schema
 * @param {string} web_host - Current domain based on environment .... like - https://groww.in
 *
 * @remarks
 * This method should be present in the first render otherwise SEO will not happen.
 *
 * @example
 * ```
 * getProductSchema(schemaObject, config.host); // Use in render method
 * ```
 */
export function getProductSchema(schemaObject: ProductSchema, web_host: string) {
  let desc = schemaObject.desc;

  desc = desc.length > 315 ? desc.substring(0, 315) + ' ...' : desc;
  let data = null;

  const image = schemaObject.logoUrl ? schemaObject.logoUrl : COMMON_URLS.DEFAULT_GROWW_LOGO_270;

  data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': schemaObject.schemeName,
    'description': desc,
    'url': web_host + schemaObject.routeName,
    'image': image,
    'brand': {
      '@type': 'Organization',
      'name': schemaObject.fundHouse
    },
    'review': {
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': schemaObject.rating,
        'bestRating': 5
      },
      'author': {
        '@type': 'Organization',
        'name': 'Groww'
      }
    }
  };

  return <JsonLd schemaData={data} />;
}


/**
 * This method can be used to insert rich snippet FAQ schema in any page.
 *
 * @param {FaqSchema[]} faqData - Schema object for FAQ schema
 *
 * @remarks
 * This method should be present in the first render otherwise SEO will not happen.
 *
 * @example
 * ```
 * getFaqSchema(faqData); // Use in render method
 * ```
 */
export function getFaqSchema(faqData: FaqSchema[]) {
  let data = null;
  const mainEntity = [];

  for (let i = 0; i < faqData.length; i++) {
    mainEntity.push({
      '@type': 'Question',
      name: faqData[ i ].question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqData[ i ].answer
      }
    });
  }

  data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity
  };

  return (
    <JsonLd schemaData={data} />
  );
}


/**
 * This method can be used to insert rich snippet breadcrumb schema in any page.
 *
 * @param {BreadcrumbSchema[]} schemaObject - Schema object for breadcrumb schema
 * @param {string} web_host - Current domain based on environment .... like - https://groww.in
 *
 * @remarks
 * This method should be present in the first render otherwise SEO will not happen.
 *
 * @example
 * ```
 * getBreadcrumbSchema(schemaData, config.host); // Use in render method
 * ```
 */
export const getBreadcrumbSchema = (schema: BreadcrumbSchema[], web_host: string) => {
  const arr = [];

  for (let i = 0; i < schema.length; i++) {
    arr.push({
      '@type': 'ListItem',
      'position': i + 1,
      'item': {
        '@id': web_host + schema[ i ].url,
        'name': schema[ i ].name
      }
    });
  }

  const data = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': arr
  };

  return (
    <JsonLd schemaData={data} />
  );
};


/**
 * This method can be used to insert Search Schema for SEO.
 *
 * @remarks
 * This method should be present in the first render otherwise SEO will not happen.
 *
 * @example
 * ```
 * getSearchSchema() // Use in render method
 * ```
 */
export const getSearchSchema = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': COMMON_URLS.PROD_HOST,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': [ {
        '@type': 'EntryPoint',
        'urlTemplate': `${COMMON_URLS.PROD_HOST}/search?q={searchTerms}`
      } ],
      'query-input': 'required name=searchTerms'
    }
  };

  return (
    <JsonLd schemaData={data} />
  );
};


/**
 * This method can be used to highlight the searched part.
 * This function returns the text as an element with highlightedText as bold and rest normal.
 * Casing is ignored in the text
 *
 * @param {string} eventName - Name of the event that you want to listen or subscribe
 * @param {Function} callback - Callback function which will be called upon dispatching of that event
 *
 * @remarks
 * Ignores casing when matching the text
 *
 * @example
 * ```
 * getHighlightedText('My name is Khan', 'name', arrayIndexHere, styleObject, 'bold'); // last 2 arguments are optional
 * ```
 */
export function getHighlightedText(text: string, higlightText: string, index = 0, style = {}, fontWeight = 'bold') {
  /**
   * This function returns the text into two parts,
   * 1. highlightedText as bold
   * 2. remaining text in normal form
   * Casing is ignored in the text
   * params =>
   * text : original text
   * highlight text: part of orogonal text to be highlighted
   * index: index of the search result (just for unique key element), by default 0
   * style: style of wrapper div of text, by default {}
   * fontWeight: font-weight of highlighted text, by default bold
   * */
  try {
    higlightText = higlightText.replace(/[^\w\s]/gi, ''); // replacing the special characters
    const parts = text.split(new RegExp(`(${higlightText})`, 'gi'));

    return (
      <div key={`${text}${index}`}
        style={style}
      >
        {
          parts.map((part, i) => {
            return (
              <span key={i}
                style={part.toLowerCase() === higlightText.toLowerCase() ? { fontWeight: fontWeight ? fontWeight : 'bold' } : {}}
              >
                {part}
              </span>);
          })
        }
      </div>
    );

  } catch (err) {
    console.error('Error in getting highlighted text: ', err);
  }
}
