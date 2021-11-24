import React from "react";
import { Button, Label, Segment } from "semantic-ui-react";
import Item from "semantic-ui-react/dist/commonjs/views/Item";
import { Activity } from "../../../app/models/activity";

interface Props {
    activities: Activity[];
    handelActivitySelected: (id: string) => void;
    handelFormClose: () => void;
    handelDeleteFromList: (id: string) => void
    HandelCancelActivity: () => void;
}

export default function ActivityList({
    activities, handelActivitySelected,
    handelFormClose, handelDeleteFromList,
    HandelCancelActivity
}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => { handelActivitySelected(activity.id); handelFormClose() }} floated='right' content='View' color='blue' />
                                <Button onClick={() => { handelDeleteFromList(activity.id); HandelCancelActivity(); handelFormClose() }} floated='right' content='Delete' color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}