import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid, Header, Tab, Card, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface Props {
  profile: Profile;
}

export default observer(function ProfileActivities({ profile }: Props) {
  const { profileStore } = useStore();
  const { loadUserActivities, userActivities, loadingActivities } =
    profileStore;

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    switch (activeTab) {
      case 1:
        loadUserActivities(profile.username, "past");
        break;
      case 2:
        loadUserActivities(profile.username, "hosting");
        break;
      default:
        loadUserActivities(profile.username);
        break;
    }
  }, [loadUserActivities, profile.username, activeTab]);

  const panes = [
    { menuItem: "Future Events", predicate: undefined },
    { menuItem: "Past Events", predicate: "past" },
    { menuItem: "Hosting", predicate: "hosting" },
  ];

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={`Activities`} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            onTabChange={(_, data) => setActiveTab(data.activeIndex as number)}
            panes={panes.map((pane, index) => ({
              menuItem: pane.menuItem,
              render: () => (
                <Tab.Pane key={index}>
                  <Card.Group itemsPerRow={4}>
                    {userActivities.map((activity) => (
                      <Card
                        key={activity.id}
                        as={Link}
                        to={`/activities/${activity.id}`}
                      >
                        <Image
                          src={`/assets/categoryImages/${activity.category}.jpg`}
                          style={{ height: "100px", objectFit: "cover" }}
                        />
                        <Card.Content textAlign="center">
                          <Card.Header>{activity.title}</Card.Header>
                          <Card.Meta>
                            {format(activity.date, "do MMM")}
                          </Card.Meta>
                          <Card.Meta>
                            {format(activity.date, "h:mm a")}
                          </Card.Meta>
                        </Card.Content>
                      </Card>
                    ))}
                  </Card.Group>
                </Tab.Pane>
              ),
            }))}
          />
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
