import * as React from "react";
import { TableFrame, TableRow, TableCell } from "../../shared/components/htmlFragments";
import { Ago } from "azure-devops-ui/Ago";
import { AgoFormat } from "azure-devops-ui/Utilities/Date";
import FeedbackBackend from "./../copilot/services/backend";

const feedbackService = new FeedbackBackend();
const getDateParsed = (date: any): Date => {
    try {
        const dateStr = date.replace("/Date(", "").replace(")/", "");
        const dateInt = Date.parse(date)
        return new Date(dateInt);
    }
    catch (e) { }
    return new Date();
}

const FeedbackExplorer = (props: any) => {

    const columns = [{ width: 30, name: " " }, { name: "Feedback" }, { width: 200, name: "Who" }, { width: 200, name: "When" }]
    const [feedback, setFeedback] = React.useState<any[]>([]);

    React.useEffect(() => {
        
        setTimeout(async () => {
            const feedback = await feedbackService.listFeedbackAsync();
            setFeedback(feedback);
        }, 1);          
    }, [props.feedback]);


    return (
        <TableFrame columns={columns} style={{ width: '100%', paddingBottom: 20, paddingLeft: 20 }}>
            <>
            {                        
                feedback.map((item: any, index: number) => {
                    return (
                        <TableRow style={{ height: 60}}  key={`${index}`} selected={item.checked}>
                            <>
                            <TableCell innerDivStyle={{ marginLeft: 4 }}><></></TableCell>
                            <TableCell>{item.message}</TableCell>
                            <TableCell>{item.userName}</TableCell>
                            <TableCell><Ago date={getDateParsed(item.timestamp)} format={AgoFormat.Compact} /></TableCell>
                            </>
                        </TableRow>
                    );                                
            })}            
            </>
        </TableFrame>
    );
}


export default FeedbackExplorer;