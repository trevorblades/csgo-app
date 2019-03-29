import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import styled from '@emotion/styled';
import {formatDate, formatMoney} from '../../utils/format';

const StyledList = styled(List)({
  backgroundColor: 'white'
});

export default function TransactionList(props) {
  let lastSubheader;
  return (
    <StyledList dense disablePadding>
      {props.transactions.map(transaction => {
        let renderSubheader = false;
        const date = formatDate(transaction.date);
        if (lastSubheader !== date) {
          lastSubheader = date;
          renderSubheader = true;
        }

        const isSubtraction = transaction.amount > 0;
        return (
          <Fragment
            key={transaction.player.id + transaction.date.getTime().toString()}
          >
            {renderSubheader && (
              <ListSubheader disableGutters>{date}</ListSubheader>
            )}
            <ListItem disableGutters>
              <ListItemText
                secondary={formatMoney(Math.abs(transaction.amount))}
                primaryTypographyProps={{
                  color: isSubtraction ? 'error' : 'secondary'
                }}
              >
                {isSubtraction ? '-' : '+'}
                {transaction.player.ign}
              </ListItemText>
            </ListItem>
          </Fragment>
        );
      })}
    </StyledList>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired
};
