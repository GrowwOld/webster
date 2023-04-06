'use strict';

const rule = require('../../../lib/rules/sort-import');
const typescriptEslintParser = require.resolve('@typescript-eslint/parser');
const RuleTester = require('eslint').RuleTester;

const NEWLINE = '$newline';


const createImportTextFromStringArray = (importArray) => {
  return importArray.map((imp) => {
    if (imp === NEWLINE) {
      return '';

    } else {
      return imp;
    }
  }).join('\n');

};

const ruleTester = new RuleTester({
  parser: typescriptEslintParser
}
);


ruleTester.run('import-sorter', rule, {
  name: 'default imports are being sorted correctly',
  valid: [
    {
      code: createImportTextFromStringArray(
        [
          'import React from \'react\';',
          NEWLINE,
          'import relative from \'./relative\';',
          NEWLINE,
          'import \'module.css\''
        ]
      ),
      options: [ {
        order: [
          '$library',
          '^./',
          '$css'
        ]
      } ]
    },
    {
      code: createImportTextFromStringArray(
        [
          'import React from \'react\';',
          NEWLINE,
          'import relative from \'./relative\';',
          NEWLINE,
          'import \'./module.css\';',
          'import \'module.css\';'
        ]
      ),
      options: [ {
        order: [
          '^./'
        ]
      } ]
    }
  ],
  invalid: [
    {
      code: createImportTextFromStringArray([
        'import { Footer } from \'common/core\';',
        'import \'./mfPage.css\';',
        'import PropTypes from \'prop-types\';',
        'import { getMfPageURL } from \'router/fund\';',
        'import React from \'react\';',
        'import { connect } from \'react-redux\';',
        'import { FaqSection } from \'multi-pod/components\';',
        'import { SecondaryHeader } from \'multi-pod/components\';',
        'import { addToMfWatchlist, checkMfWatchlist, removeFromMfWatchlist } from \'multi-pod/utils/api/fund\';',
        'import { CATEGORY, CORE_EVENTS, trackEvent } from \'multi-pod/utils/analytics\';',
        'import { APP_CONSTANTS } from \'multi-pod/utils/constants\';',
        NEWLINE,
        'import { isEmpty, getBreadcrumbSchema, getFaqSchema, getPathVariableFromUrlIndex, getWebpageSchema, getProductSchema } from \'@groww-tech/ella\';',
        NEWLINE,
        'import { MF_INVESTMENT_TYPE, AOF_STATUS } from \'multi-pod/utils/constants/fund\';',
        'import { MF_PAGE_CONSTANTS } from \'multi-pod/utils/content/fund\';',
        'import { initializePage, setRedirectionUrl } from \'multi-pod/utils/helpers\';',
        'import { mfMainData } from \'multi-pod/utils/api/fund\';',
        'import { getAmcPageLinksFromFundHouse } from \'multi-pod/utils/helpers/fund\';',
        'import { hasSession } from \'multi-pod/utils/helpers/composite\';',
        'import { MF_ERROR_MESSAGES } from \'multi-pod/utils/content/fund\';',
        'import { ROUTES } from \'multi-pod/utils/constants/webRoutes\';',
        'import { getUserData } from \'multi-pod/redux/actionCreators\';',
        'import { Button, Toastify, TOASTIFY_TYPE } from \'multi-pod/ui\';',
        NEWLINE,
        'import { getWatchlistData, setWatchlistIconClicked } from \'pods/fund/redux/actionCreators\';',
        'import withFallbackForSSR, { getInitialPropsWrapper } from \'common/core/withFallbackForSSR\';',
        'import { getMetaTags } from \'utils/helpers/common\';',
        'import RecentlyViewed from \'./RecentlyViewed\';',
        'import MfHeading from \'./MfHeading\';',
        'import MfConfigurableContent from \'./MfConfigurableContent\';',
        'import { mfFaqHelper } from \'./mfPageHelper\';'
      ]),
      options: [
        { order: [
          '$library',
          '^react',
          '^@groww-tech',
          '^multi-pod',
          '^pods',
          '^common',
          '^utils',
          '^\.\.\/',
          '^\.\/',
          '$css',
          '$img'
        ] } ],
      errors: [
        {
          message: 'Invalid Import Order'
        }
      ],
      output: createImportTextFromStringArray([
        'import PropTypes from \'prop-types\';',
        'import { getMfPageURL } from \'router/fund\';',
        NEWLINE,
        'import React from \'react\';',
        'import { connect } from \'react-redux\';',
        NEWLINE,
        'import { isEmpty, getBreadcrumbSchema, getFaqSchema, getPathVariableFromUrlIndex, getWebpageSchema, getProductSchema } from \'@groww-tech/ella\';',
        NEWLINE,
        'import { FaqSection } from \'multi-pod/components\';',
        'import { SecondaryHeader } from \'multi-pod/components\';',
        'import { addToMfWatchlist, checkMfWatchlist, removeFromMfWatchlist } from \'multi-pod/utils/api/fund\';',
        'import { CATEGORY, CORE_EVENTS, trackEvent } from \'multi-pod/utils/analytics\';',
        'import { APP_CONSTANTS } from \'multi-pod/utils/constants\';',
        'import { MF_INVESTMENT_TYPE, AOF_STATUS } from \'multi-pod/utils/constants/fund\';',
        'import { MF_PAGE_CONSTANTS } from \'multi-pod/utils/content/fund\';',
        'import { initializePage, setRedirectionUrl } from \'multi-pod/utils/helpers\';',
        'import { mfMainData } from \'multi-pod/utils/api/fund\';',
        'import { getAmcPageLinksFromFundHouse } from \'multi-pod/utils/helpers/fund\';',
        'import { hasSession } from \'multi-pod/utils/helpers/composite\';',
        'import { MF_ERROR_MESSAGES } from \'multi-pod/utils/content/fund\';',
        'import { ROUTES } from \'multi-pod/utils/constants/webRoutes\';',
        'import { getUserData } from \'multi-pod/redux/actionCreators\';',
        'import { Button, Toastify, TOASTIFY_TYPE } from \'multi-pod/ui\';',
        NEWLINE,
        'import { getWatchlistData, setWatchlistIconClicked } from \'pods/fund/redux/actionCreators\';',
        NEWLINE,
        'import { Footer } from \'common/core\';',
        'import withFallbackForSSR, { getInitialPropsWrapper } from \'common/core/withFallbackForSSR\';',
        NEWLINE,
        'import { getMetaTags } from \'utils/helpers/common\';',
        NEWLINE,
        'import RecentlyViewed from \'./RecentlyViewed\';',
        'import MfHeading from \'./MfHeading\';',
        'import MfConfigurableContent from \'./MfConfigurableContent\';',
        'import { mfFaqHelper } from \'./mfPageHelper\';',
        NEWLINE,
        'import \'./mfPage.css\';'
      ])

    },
    {
      code: createImportTextFromStringArray([
        'import * as name from \'name\';',
        'import {someLib} from \'typeA/asdf\'',
        'import React from \'react\'',
        'import {someLib} from \'typeA/asdf/fkg\''
      ]),
      options: [
        { order: [
          'react',
          '$library',
          'typeA',
          'typeA\/asdf\/fkg',
          'name'
        ] } ],
      errors: [
        {
          message: 'Invalid Import Order'
        }
      ],
      output: createImportTextFromStringArray([
        'import React from \'react\';',
        NEWLINE,
        'import { someLib } from \'typeA/asdf\';',
        NEWLINE,
        'import { someLib } from \'typeA/asdf/fkg\';',
        NEWLINE,
        'import * as name from \'name\';'
      ])

    },
    {
      code: createImportTextFromStringArray([
        'import * as name from \'name\';',
        'import {someLib} from \'typeA/asdf\'',
        'import React from \'react\'',
        'import {someLib} from \'typeA/asdf/fkg\''
      ]),
      options: [
        { order: [
          'react',
          '$library',
          'typeA\/asdf\/fkg',
          'typeA',
          'name'
        ] } ],
      errors: [
        {
          message: 'Invalid Import Order'
        }
      ],
      output: createImportTextFromStringArray([
        'import React from \'react\';',
        NEWLINE,
        'import { someLib } from \'typeA/asdf/fkg\';',
        NEWLINE,
        'import { someLib } from \'typeA/asdf\';',
        NEWLINE,
        'import * as name from \'name\';'
      ])

    },
    {
      code: createImportTextFromStringArray([
        'import * as name from \'name\';',
        'import {someLib} from \'typeA/asdf\'',
        'import React from \'react\'',
        'import \'custom.css\'',
        'import \'other-css.css\'',
        'import \'file.module.css\''
      ]),
      options: [
        { order: [
          'react',
          '$library',
          'custom.css',
          'typeA'
        ] } ],
      errors: [
        {
          message: 'Invalid Import Order'
        }
      ],
      output: createImportTextFromStringArray([
        'import React from \'react\';',
        NEWLINE,
        'import * as name from \'name\';',
        NEWLINE,
        'import \'custom.css\';',
        NEWLINE,
        'import { someLib } from \'typeA/asdf\';',
        NEWLINE,
        'import \'other-css.css\';',
        'import \'file.module.css\';'
      ])

    }

  ]
});
