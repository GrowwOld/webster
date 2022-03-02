/* Start of GENERIC TYPES - These types are not use case specific. Please refer to these first before creating new types. */

export type MultiLevelObject = {
  [ key:string ]: unknown;
}


export type SingleLevelObject = {
  [ key: string ]: string | number;
}


export type GenericArguments = any[]


export type GenericFunction = (...args: GenericArguments) => any;

/* End of GENERIC TYPES */


export type ArticleSchema = {
  headline: string;
  datePublished: string;
  dateModified: string;
  inLanguage?: string;
  image?: string;
}

export type MetatagsData = {
  title: string;
  desc: string;
  routeName: string;
  noIndex: boolean;
  featuredImage?: string;
  canonicalUrl?: string;
}


export type WebpageSchema = {
  desc: string;
  title: string;
  routeName: string;
}

export type ProductSchema = {
  desc: string;
  schemeName: string;
  routeName: string;
  fundHouse: string;
  rating: number;
  logoUrl?: string;
}

export type FaqSchema = {
  question: string;
  answer: string;
}

export type BreadcrumbSchema = {
  url: string;
  name: string;
}


export type TabsData = {
  searchId: string;
  [key:string]: unknown;
};
