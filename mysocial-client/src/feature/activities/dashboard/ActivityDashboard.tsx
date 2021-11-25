import { Grid, GridColumn } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Prop {
    activities: Activity[];
    selectActivity: Activity | undefined;
    handelSelectActivity: (id: string) => void;
    handelCancelActivity: () => void;
    editMode: boolean;
    handelFormOpen: (id: string) => void;
    handelFormClose: () => void;
    handelEditOrCreateActivity: (activity: Activity) => void;
    handelDeleteFromList: (id: string) => void;
    HandelCancelActivity: () => void;
    submitting : boolean;
}

export default function ActivityDashboard({
    activities, selectActivity,
    handelCancelActivity, handelSelectActivity,
    editMode, handelFormClose,
    handelFormOpen, handelEditOrCreateActivity,
    handelDeleteFromList, HandelCancelActivity,
    submitting
}: Prop) {
    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityList
                    activities={activities}
                    handelActivitySelected={handelSelectActivity}
                    handelFormClose={handelFormClose}
                    handelDeleteFromList={handelDeleteFromList}
                    HandelCancelActivity={HandelCancelActivity}
                    submitting={submitting}
                />
            </GridColumn>
            <GridColumn width='6'>
                {selectActivity && !editMode &&
                    < ActivityDetails
                        activity={selectActivity}
                        handelFormOpen={handelFormOpen}
                        handelCancelActivity={handelCancelActivity}
                    />}
                {editMode &&
                    <ActivityForm
                        activity={selectActivity}
                        handelFormClose={handelFormClose}
                        handelEditOrCreateActivity={handelEditOrCreateActivity}
                        submitting={submitting}
                    />}
            </GridColumn>
        </Grid>
    );
}