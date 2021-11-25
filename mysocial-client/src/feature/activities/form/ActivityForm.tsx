import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Prop {
    activity: Activity | undefined;
    handelFormClose: () => void;
    handelEditOrCreateActivity: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({
    activity: selectedActivity
    , handelFormClose, handelEditOrCreateActivity,
    submitting
}: Prop) {
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }
    const [activity, setActivity] = useState(initialState);
    function HandelSubmit() {
        handelEditOrCreateActivity(activity);
    }
    function HandelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }
    return (
        <Segment clearing>
            <Form onSubmit={HandelSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} name='title' onChange={HandelInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={HandelInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={HandelInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={HandelInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={HandelInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={HandelInputChange} />
                <Button onclik={submitting} floated='right' positive type="submit" content='Submit' />
                <Button onClick={handelFormClose} floated='right' content='Cancel' />
            </Form>
        </Segment>
    );
}