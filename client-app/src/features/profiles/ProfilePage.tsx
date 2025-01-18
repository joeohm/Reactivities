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
  const { profileStore } = useStore();
  const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;

  useEffect(() => {
    if (username) loadProfile(username);
    return () => setActiveTab(0);
  }, [loadProfile, username, setActiveTab]);

  if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

  if (!profile) return <h2>Profile not found</h2>;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} />
      </Grid.Column>
    </Grid>
  );
});
