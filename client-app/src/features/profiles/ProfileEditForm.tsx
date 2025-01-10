import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import TextArea from "../activities/form/TextArea";
import { Button, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { Profile, ProfileFormValues } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default observer(function ProFileEditForm({
  profile,
  setEditMode,
}: Props) {
  const {
    profileStore: { updateProfile },
    userStore: { editProfile },
  } = useStore();
  const validationSchema = Yup.object({
    displayName: Yup.string().required("The display name is required"),
    bio: Yup.string().optional(),
  });

  const handleFormSubmit = (values: ProfileFormValues) => {
    updateProfile(values).then(() => {
      setEditMode(false);
    });
    editProfile(values);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values) => handleFormSubmit(values)}
      enableReinitialize
      initialValues={{
        displayName: profile.displayName,
        bio: profile.bio,
      }}
    >
      {({ handleSubmit, isValid, isSubmitting, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <TextInput placeholder="Display Name" name="displayName" />
          <TextArea rows={3} placeholder="Bio" name="bio" />
          <Button
            loading={isSubmitting}
            floated="right"
            positive
            type="submit"
            onClick={() => handleSubmit()}
            content="Submit"
            style={{ marginTop: "10px" }}
            disabled={isSubmitting || !dirty || !isValid}
          />
        </Form>
      )}
    </Formik>
  );
});
