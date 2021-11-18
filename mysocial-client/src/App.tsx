import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Icon, List, ListItem } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5292/api/activities',
      responseType: 'json'
    })
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      });
  }, []);
  return (
    <div>
      <Header as='h2' icon>
        <Icon name='users' circular />
        <Header.Content>MySocial</Header.Content>
      </Header>
      <List>
        {activities.map((activity: any) => (
          <ListItem key={activity.id}>
            {activity.title}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
