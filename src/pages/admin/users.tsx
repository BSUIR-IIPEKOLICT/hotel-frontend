import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { observer } from 'mobx-react-lite';
import Layout from '../../components/Layout';
import { Title } from '../../shared/enums';
import { userRepository } from '../../repositories';
import { UsersPageProps } from '../../abstractions/props';
import { useAuth } from '../../hooks';
import { DefaultStack } from '../../components/styled/stacks';
import { UserPopulated } from '../../abstractions/models';
import UserCard from '../../components/cards/UserCard';
import { CenteredContainer } from '../../components/styled/containers';
import { CenteredHeader } from '../../components/styled/typography';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const users = await userRepository.getAll();
  return { props: { users } };
};

const Users: NextPage<UsersPageProps> = ({ users }) => {
  useAuth();

  return (
    <Layout title={Title.USERS}>
      <CenteredContainer>
        <CenteredHeader>Users</CenteredHeader>
        <DefaultStack>
          {users.map((user: UserPopulated) => (
            <UserCard
              key={user.id}
              user={user}
              // sortDate={}
              // onChangeRole={}
              // onChangeCredentials={}
              // onDelete={}
            />
          ))}
        </DefaultStack>
      </CenteredContainer>
    </Layout>
  );
};

export default observer(Users);
