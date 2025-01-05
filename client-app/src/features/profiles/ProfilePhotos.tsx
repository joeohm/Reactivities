import { observer } from "mobx-react-lite";
import {
  Card,
  Header,
  Tab,
  Image,
  Grid,
  Button,
  Modal,
} from "semantic-ui-react";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/photoUploadWidget";

interface Props {
  profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      loading,
      setMainPhoto,
      deletePhoto,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [photoForDeletion, setPhotoForDeletion] = useState<Photo | null>(null);

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleSetMainPhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setPhotoForDeletion(photo);
    setConfirmOpen(true);
  }

  function confirmDeletePhoto(photo: Photo) {
    deletePhoto(photo);
    setConfirmOpen(false);
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        {addPhotoMode ? (
          <Grid.Column width={16}>
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploading}
            />
          </Grid.Column>
        ) : (
          <Card.Group itemsPerRow={5}>
            {profile.photos?.map((photo) => (
              <Card key={photo.id}>
                <Image src={photo.url} />
                {isCurrentUser && (
                  <Button.Group fluid widths={2}>
                    <Button
                      basic
                      color="green"
                      content="Main"
                      name={photo.id}
                      disabled={photo.isMain}
                      loading={target === photo.id && loading}
                      onClick={(e) => handleSetMainPhoto(photo, e)}
                    />
                    <Button
                      basic
                      color="red"
                      icon="trash"
                      name={photo.id + 1}
                      disabled={photo.isMain}
                      loading={target === photo.id + 1 && loading}
                      onClick={(e) => handleDeletePhoto(photo, e)}
                    />
                  </Button.Group>
                )}
              </Card>
            ))}
          </Card.Group>
        )}
        <Modal
          open={confirmOpen}
          size="mini"
          onClose={() => setConfirmOpen(false)}
        >
          <Modal.Content>
            <Header content="Delete photo" />
            <p>Are you sure you want to delete this photo?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => setConfirmOpen(false)}
              color="green"
              content="Cancel"
            />
            <Button
              onClick={() => confirmDeletePhoto(photoForDeletion!)}
              color="red"
              content="Delete"
            />
          </Modal.Actions>
        </Modal>
      </Grid>
    </Tab.Pane>
  );
});
