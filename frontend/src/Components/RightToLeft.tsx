import { StylesProvider } from '@material-ui/styles';
import React, { ReactNode } from 'react';
import { create } from 'jss';
import { jssPreset, Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import rtl from 'jss-rtl';



export const rightToLeft = create({ plugins: [...jssPreset().plugins, rtl()] });

const RightToLeft = (props: { children: ReactNode }) => {
  return (
      <StylesProvider jss={rightToLeft}>{props.children}</StylesProvider>
  );
}

export default RightToLeft;