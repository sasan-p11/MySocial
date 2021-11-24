import { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading , setloading] = useState(true);
  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
       response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
      });
      setActivities(activities);
      setloading(false);
    });
  }, []);

  function HandelSelectActivity(id: string) {
    setSelectActivity(activities.find(x => x.id === id));
  }
  function HandelCancelActivity() {
    setSelectActivity(undefined);
  }
  function handelFormOpen(id?: string) {
    id ? HandelSelectActivity(id) : HandelCancelActivity();
    setEditMode(true);
  }
  function handelFormClose() {
    setEditMode(false);
  }
  function handelEditOrCreateActivity(activity: Activity) {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectActivity(activity);
  }
  function handelDeleteFromList(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  if(loading) return <LoadingComponent content='Loading app'/>;

  return (
    <Fragment>
      <NavBar
        handelFormOpen={handelFormOpen}
      />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={selectedActivity}
          handelSelectActivity={HandelSelectActivity}
          handelCancelActivity={HandelCancelActivity}
          editMode={editMode}
          handelFormOpen={handelFormOpen}
          handelFormClose={handelFormClose}
          handelEditOrCreateActivity={handelEditOrCreateActivity}
          handelDeleteFromList={handelDeleteFromList}
          HandelCancelActivity={HandelCancelActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
