import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import { useStore } from "../../app/stores/store";
import { useParams } from "react-router-dom";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  // const { user, loading, isCurrentUser } = useStore().profileStore;
  const { profileStore } = useStore();
  const { loadingProfile, loadProfile, profile } = profileStore;

  useEffect(() => {
    if (username) loadProfile(username);
  }, [loadProfile, username]);

  if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

  if (!profile) return <h2>Profile not found</h2>;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={profile}
          // isCurrentUser={isCurrentUser}
        />
        <ProfileContent
          profile={profile}
          // isCurrentUser={isCurrentUser}
        />
      </Grid.Column>
    </Grid>
  );
});
