import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Title } from '../shared/enums';
import React from 'react';
import { CenteredHeader } from '../components/styled/typography';
import { CenteredContainer } from '../components/styled/containers';
import { ADMIN_BUTTONS } from '../shared/constants';
import { ButtonConfiguraton } from '../abstractions/interfaces';
import { OutlinedButton } from '../components/styled/buttons';
import { RouteLink } from '../components/styled/common';
import { useAuth } from '../hooks';
import { DefaultStack } from '../components/styled/stacks';

const Admin: NextPage = () => {
  useAuth();

  return (
    <Layout title={Title.ADMIN}>
      <CenteredContainer>
        <CenteredHeader>Admin panel</CenteredHeader>
        {/*<Spoiler title="Users">*/}
        {/*  <Box sx={{ py: 1, display: 'flex', justifyContent: 'center' }}>*/}
        {/*    <DatePicker onChange={(value) => setSortDate(value || new Date())} />*/}
        {/*  </Box>*/}
        {/*  {basket.baskets.map((currentBasket) => (*/}
        {/*    <BasketCard*/}
        {/*      key={currentBasket._id}*/}
        {/*      basket={currentBasket}*/}
        {/*      sortDate={sortDate}*/}
        {/*      onChangeRole={(currentUser: User) => userClient.changeRole(currentUser, user)}*/}
        {/*      onDelete={deleteHandler}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</Spoiler>*/}
        <DefaultStack>
          {ADMIN_BUTTONS.map((config: ButtonConfiguraton) => (
            <RouteLink href={config.path} key={config.path}>
              <OutlinedButton fullWidth primary>
                {config.title}
              </OutlinedButton>
            </RouteLink>
          ))}
        </DefaultStack>
      </CenteredContainer>
    </Layout>
  );
};

export default Admin;
