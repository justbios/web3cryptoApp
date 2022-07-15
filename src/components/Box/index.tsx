import { View } from 'react-native'
import styled from 'styled-components/native'
import {
  space,
  flexbox,
  color,
  position,
  layout,
  overflow,
  compose,
  border,
  shadow,
  ColorProps,
  SpaceProps,
  BorderProps,
  PositionProps,
  LayoutProps,
  FlexboxProps,
  OverflowProps,
  ShadowProps,
} from 'styled-system'

export type BoxTypes = FlexboxProps &
  ColorProps &
  SpaceProps &
  BorderProps &
  PositionProps &
  LayoutProps &
  ShadowProps &
  OverflowProps

export const Box = styled(View)<BoxTypes>(
  {},
  compose(space, flexbox, color, layout, position, border, overflow, shadow)
)
