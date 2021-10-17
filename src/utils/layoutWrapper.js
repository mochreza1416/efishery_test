import React from "react";
import { LayoutContentWrapper } from "./layoutWrapper.style";
import FormField from './formField';
import styled from 'styled-components';
import { palette } from 'styled-theme';

const LayoutContent = styled.div`
  width: 100%;
  padding: 35px;
  background-color: #ffffff;
  border: 1px solid ${palette('border', 0)};
  height: 100%;
  border-radius: 6px;
  box-shadow: 0 2px 2px 0 #e5e6e8;
`;

const LayoutContentWrappers = (props) => (
  <LayoutContentWrapper
    className={
      props.className != null
        ? `${props.className} isoLayoutContentWrapper`
        : "isoLayoutContentWrapper"
    }
    {...props}
  >
    {props.children}
  </LayoutContentWrapper>
);

export { LayoutContent, LayoutContentWrappers, FormField};