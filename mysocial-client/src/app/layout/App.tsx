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
  const [loading, setloading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setEditMode(false);
        setSelectActivity(activity);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectActivity(activity);
        setSubmitting(false);
      });
    }
  }
  function handelDeleteFromList(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)]);
      setloading(false);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content='Loading app' />;

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
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
