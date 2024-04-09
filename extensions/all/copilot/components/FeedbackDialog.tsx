
import * as React from "react";
import { Panel } from "azure-devops-ui/Panel";
import { ContentSize } from "azure-devops-ui/Callout";
import { RadioButton, RadioButtonGroup } from "azure-devops-ui/RadioButton";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import { FormItem } from "azure-devops-ui/FormItem";
import CopilotService from "./../services/backend";

const FeedbackDialog = (
    props: {
        style?: React.CSSProperties,
        sentiment: boolean,
        conversationId: string,
        exchangeId: string,
        onDismiss: () => void
    }) => {
    const copilotService = new CopilotService();

    const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
    const [canCancel, setCancel] = React.useState<boolean>(true);
    const [message, setMessage] = React.useState<string>("");
    const [kindId, setKindId] = React.useState<string>("0");

    const getDialogButtons = (): any[] => {
        const items = [];
        items.push({ disabled: canCancel === false, text: "Cancel", onClick: props.onDismiss });
        items.push({
            primary: true,
            disabled: canSubmit === false,
            text: "Submit", onClick: async () => {

                setCanSubmit(false);
                setCancel(false);
                const payload = {
                    message: message,
                    kind: props.sentiment === true ? 2: parseInt(kindId),
                    conversationId: props.conversationId,
                    exchangeId: props.exchangeId
                };

                await copilotService.submitFeedback(payload);
                props.onDismiss();
            }
        });
        return items;
    }

    return (
        <Panel
            onDismiss={props.onDismiss}
            size={ContentSize.Large}
            footerButtonProps={getDialogButtons()}
            description={`Please share your feedback`}
            titleProps={{ text: `Feedback` }} >
            <div style={{ width: 800 }}>
            
                {
                    props.sentiment === false && <div style={{
                        marginBottom: 20
                    }}>
                        <RadioButtonGroup
                            onSelect={selectedId => {
                                setKindId(selectedId);                                
                            }}
                            selectedButtonId={kindId}
                            text={"The content is"}
                        >
                            <RadioButton id="0" text="Inaccurate" key="0" />
                            <RadioButton id="1" text="Offensive or inappropriate" key="1" />
                            <RadioButton id="2" text="Other" key="2" />
                        </RadioButtonGroup>
                    </div>
                }

                <FormItem label={props.sentiment === true ? "What did you like?" :"What went wrong?"}>
                    <TextField
                        placeholder="Please do not include any personal information."
                        value={message}
                        onChange={(e, newValue) => {
                            setMessage( newValue);
                            setCanSubmit(newValue.length > 0);
                        }}
                        multiline
                        rows={4}
                        width={TextFieldWidth.auto}
                    />  
                </FormItem>
               
          
            </div>
        </Panel>
    );
}

export default FeedbackDialog;