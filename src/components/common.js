import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import styled from '@emotion/styled';
import {mix} from 'polished';
import {withTheme} from '@material-ui/core/styles';

const sectionPadding = {
  lg: 56,
  md: 48,
  sm: 40,
  xs: 32
};

export function getSectionStyles(padding = sectionPadding) {
  const isNumber = typeof padding === 'number';
  function getPadding(key) {
    return isNumber ? padding : padding[key];
  }

  return function({theme}) {
    return {
      padding: `${getPadding('lg')}px ${sectionPadding.lg}px`,
      [theme.breakpoints.down('md')]: {
        padding: `${getPadding('md')}px ${sectionPadding.md}px`
      },
      [theme.breakpoints.down('sm')]: {
        padding: `${getPadding('sm')}px ${sectionPadding.sm}px`
      },
      [theme.breakpoints.down('xs')]: {
        padding: `${getPadding('xs')}px ${sectionPadding.xs}px`
      }
    };
  };
}

export const Section = withTheme()(
  styled.section(props => getSectionStyles(props.padding))
);

export const Hero = withTheme()(
  styled(Section)(
    getSectionStyles({
      lg: 96,
      md: 72,
      sm: 64,
      xs: 56
    })
  )
);

export const PageWrapper = styled.div(props => ({
  width: '100%',
  maxWidth: props.mini ? 900 : 1280,
  margin: '0 auto'
}));

export const EmptyPlayerCard = withTheme()(
  styled.div(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    boxShadow: `inset 0 0 0 1px ${theme.palette.text.hint}`,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default
  }))
);

export const ColoredButton = withTheme()(
  styled(Button)(({theme, hex}) => {
    const {main, dark} = theme.palette.augmentColor({main: hex});
    return {
      color: 'white',
      backgroundColor: main,
      ':hover': {
        backgroundColor: mix(0.5, main, dark)
      }
    };
  })
);

export const StyledTableCell = styled(TableCell)({
  fontWeight: 'inherit'
});
