import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

interface Props {
  profile: Profile;
}

export default observer(function ProfileCard({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>
          {profile.bio && profile.bio.length > 40
            ? profile.bio.slice(0, 40) + "..."
            : profile.bio}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {`${profile.followersCount} ${
          profile.followersCount === 1 ? "Follower" : "Followers"
        }`}
        {/* <Button
          as={Link}
          to={`/profiles/${profile.username}`}
          floated="right"
          color="teal"
          content="View Profile"
        /> */}
      </Card.Content>
      <FollowButton profile={profile} />
    </Card>
  );
});
