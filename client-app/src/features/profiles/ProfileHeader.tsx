import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Profile } from "../../app/models/profile";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

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
            <Statistic label="Followers" value="5" />
            <Statistic label="Following" value="42" />
          </Statistic.Group>
          <Divider />
          <Reveal animated="small fade">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button
                fluid
                color="teal"
                content={isCurrentUser ? "Edit Profile" : "Following"}
              />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: "100%" }}>
              <Button
                basic
                fluid
                color={
                  // isCurrentUser ? "red" : "green"
                  "red"
                }
                content={
                  // isCurrentUser ? "Unfollow" : "Follow"
                  "Unfollow"
                }
              />
            </Reveal.Content>
          </Reveal>
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
