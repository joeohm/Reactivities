import {
  Divider,
  Grid,
  Header,
  Item,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";

interface Props {
  profile: Profile;
  isCurrentUser?: boolean;
}

export default observer(function ProfileHeader({
  profile,
  isCurrentUser,
}: Props) {
  //   const {
  //     profileStore: { updateFollowing, loading },
  //   } = useStore();

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                circular
                src={profile?.image ?? "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header
                  size="large"
                  content={profile?.displayName ?? "displayName"}
                />
                {/* <p>
                  Date Joined:{" "}
                  <strong>{format(profile.dateJoined!, "dd MMM yyyy")}</strong>
                </p> */}
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value={profile.followersCount} />
            <Statistic label="Following" value={profile.followingCount} />
          </Statistic.Group>
          <Divider />
          <FollowButton profile={profile} />
          {/* {isCurrentUser ? (
            <Button
              as={Link}
              to="/settings"
              color="teal"
              fluid
              basic
              content="Edit Profile"
            />
          ) : (
            <Button
              onClick={() => updateFollowing(profile.username)}
              loading={loading}
              color={profile.following ? "red" : "green"}
              fluid
              content={profile.following ? "Unfollow" : "Follow"}
            />
          )} */}
        </Grid.Column>
      </Grid>
    </Segment>
  );
});
