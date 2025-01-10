import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/profile";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "../../app/stores/store";

import ProfileEditForm from "./ProfileEditForm";

interface Props {
  profile: Profile;
}

export default observer(function ProfileAbout({ profile }: Props) {
  const [editMode, setEditMode] = useState(false);
  const {
    profileStore: { isCurrentUser },
  } = useStore();

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile?.displayName}`}
          />

          {isCurrentUser && (
            <Button
              floated="right"
              primary={!editMode}
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        {editMode ? (
          <Grid.Column width={16}>
            <ProfileEditForm profile={profile} setEditMode={setEditMode} />
          </Grid.Column>
        ) : (
          <Grid.Column width={16}>
            <span style={{ whiteSpace: "pre-wrap" }}>{profile.bio}</span>
          </Grid.Column>
        )}
      </Grid>
    </Tab.Pane>
  );
});
