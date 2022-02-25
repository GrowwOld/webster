import React from 'react';


const JsonLd = (props: Props) => {
  const schemaData = JSON.stringify(props.schemaData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaData }}
    />
  );
};


type RequiredProps = {

}


type DefaultProps = {
  schemaData: object;
}


type Props = RequiredProps & DefaultProps;

export default JsonLd;
