import Grid from '@material-ui/core/Grid';
import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import headset from '../assets/images/headset.png';
import mousepad from '../assets/images/mousepad.png';
import stickers from '../assets/images/stickers.png';
import styled from '@emotion/styled';
import {Link} from 'gatsby';
import {PageWrapper, Section} from './common';
import {epic, legendary, rare} from '../utils/scale';
import {withTheme} from '@material-ui/core/styles';

const StyledImage = styled.img({
  display: 'block',
  width: 200,
  margin: `${16}px auto`
});

const GridWrapper = styled(PageWrapper)({
  padding: `${16}px 0`
});

const PrizeWrapper = withTheme()(
  styled.div(({theme}) => ({
    height: '100%',
    padding: 32,
    borderWidth: 1,
    borderStyle: 'solid',
    textAlign: 'center',
    backgroundColor: theme.palette.grey[100]
  }))
);

const Footnote = styled(Typography)({
  display: 'list-item'
});

const prizes = {
  20: {
    name: 'Superteam',
    type: 'sticker pack',
    image: stickers,
    footnote: '5 stickers, est. value USD $5',
    color: rare
  },
  10: {
    name: 'SteelSeries QcK Edge',
    type: 'mousepad',
    image: mousepad,
    footnote: 'Large size, est. value USD $20',
    color: epic
  },
  5: {
    name: 'HyperX Cloud Stinger',
    type: 'headset',
    image: headset,
    footnote: 'Est. value USD $60',
    color: legendary
  }
};

const prizeKeys = Object.keys(prizes).sort((a, b) => b - a);

export default function Prizes() {
  return (
    <Fragment>
      <a name="prizes" />
      <Section>
        <PageWrapper mini>
          <Typography variant="h3" gutterBottom>
            Earn prizes
          </Typography>
          <Typography variant="body1" paragraph>
            At the end of each quarter, the 20 players who have seen the highest
            gains in their team&apos;s value will be rewared with awesome
            prizes. You can check on the current status of the top 20 and your
            place within it <Link to="/standings">here</Link>. Take a look at
            this quarter&apos;s prizes! 👀
          </Typography>
        </PageWrapper>
        <GridWrapper>
          <Grid container justify="center" spacing={32}>
            {prizeKeys.map((key, index, array) => {
              const prize = prizes[key];
              return (
                <Grid item key={key} xs={12} sm={6} md={4}>
                  <PrizeWrapper style={{borderColor: prize.color}}>
                    <Typography variant="h5" gutterBottom>
                      Top {key}
                    </Typography>
                    <Typography paragraph>
                      {prize.name} {prize.type}
                      <sup>{index + 1}</sup>
                    </Typography>
                    <StyledImage src={prize.image} />
                    {index > 0 && (
                      <Typography variant="overline">
                        +{' '}
                        {array
                          .slice(0, index)
                          .map(key => prizes[key].type)
                          .join(' & ')}
                      </Typography>
                    )}
                  </PrizeWrapper>
                </Grid>
              );
            })}
          </Grid>
        </GridWrapper>
        <PageWrapper mini>
          <ol>
            {prizeKeys.map(key => (
              <Footnote
                key={key}
                component="li"
                variant="caption"
                color="textSecondary"
              >
                {prizes[key].footnote}
              </Footnote>
            ))}
          </ol>
        </PageWrapper>
      </Section>
    </Fragment>
  );
}