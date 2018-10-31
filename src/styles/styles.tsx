import * as React from 'react';
import Responsive from 'react-responsive';
import styled, { css } from 'styled-components';

import { midGray } from './colors';

export const mediaQuerySizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 500
};

export const Desktop = (props: any) => <Responsive {...props} minWidth={992} />;
export const Tablet = (props: any) => (
  <Responsive {...props} minWidth={768} maxWidth={991} />
);
export const Mobile = (props: any) => <Responsive {...props} maxWidth={767} />;
export const Default = (props: any) => <Responsive {...props} minWidth={768} />;

// iterate through the sizes and create a media template
export const media: {
  giant: (tString: TemplateStringsArray) => TemplateStringsArray;
  desktop: (tString: TemplateStringsArray) => TemplateStringsArray;
  tablet: (tString: TemplateStringsArray) => TemplateStringsArray;
  phone: (tString: TemplateStringsArray) => TemplateStringsArray;
} = Object.keys(mediaQuerySizes).reduce(
  (accumulator, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = mediaQuerySizes[label] / 16;
    accumulator[label] = (...args: any[]) => css`
      @media (max-width: ${emSize}em) {
        // @ts-ignore
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {
    giant: (str: TemplateStringsArray) => str,
    desktop: (str: TemplateStringsArray) => str,
    tablet: (str: TemplateStringsArray) => str,
    phone: (str: TemplateStringsArray) => str
  }
);

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${midGray};
  margin-top: 25px;
  margin-bottom: 25px;
`;
