

import * as React from "react";
import "./copilot.scss";
import { showRootComponent } from "../../common";
import { Images } from '../../shared/components/Images';
import { Header, TitleSize } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { ChatResponse, ChatMessageContainer } from "./uicomponents";
import CopilotService from "./services/backend";
import FeedbackDialog from "./components/FeedbackDialog";


export default class MainPage extends React.Component<any, any> {
  private copilotService = new CopilotService();

  private copilotUser = {
    displayName: "Atlas Copilot",
    imageUrl: (new Images()).getCopilotIcon()
  };

  constructor(props: any) {
    super(props);
    this.state = {
      userPromptText: '',
      user: null,
      feedbackDialog: {
        open: false,
        exchangeId : "",
        sentiment: false        
      },
      conversation: {
        conversationId: '',
        chatExchanges: []
      }
    }
  }
  
  private async onKeyUp(e: any) {
    var COMPONENT = this;
    if (e.keyCode === 13 && !e.shiftKey) {
      var userPromptText = COMPONENT.state.userPromptText;
      var coversation = this.state.conversation;
      var conversationId = coversation.conversationId;

      COMPONENT.setState({ userPromptText: '' });
      coversation.chatExchanges.push({
        from: "User",
        displayName: COMPONENT.state.user.displayName,
        imageUrl: COMPONENT.state.user.imageUrl,
        when: (new Date()),
        text: userPromptText
      });
      const busyResponse = {
        from: "Copilot",
        displayName: COMPONENT.copilotUser.displayName,
        imageUrl: COMPONENT.copilotUser.imageUrl,
        when: (new Date()),
        isBusy: true
      };
      coversation.chatExchanges.push(busyResponse);
      COMPONENT.setState({        
        conversation: coversation
      }, async () => {

        var response = await COMPONENT.copilotService.getCopilotResponse(conversationId, userPromptText);
        var coversation = COMPONENT.state.conversation;

        Object.assign(coversation, {
          conversationId: response.conversationId
        });
        coversation.chatExchanges.splice(coversation.chatExchanges.indexOf(busyResponse), 1);
        coversation.chatExchanges.push({
          from: "Copilot",
          when: (new Date()),
          displayName: COMPONENT.copilotUser.displayName,
          imageUrl: COMPONENT.copilotUser.imageUrl,
          citationUrls: response.citationUrls,
          id: response.aiResponseId,
          text: response.aiResponseText
        });
        COMPONENT.setState({ coversation: coversation });
      });
    }
  }

  public async componentDidMount() {
    await this.copilotService.initializeSdk();
    const user = this.copilotService.getCurrentUser();
    this.setState({
      user: user
    });
  }



  public render() {
    var COMPONENT = this;

    return (
      <Page className="flex-grow">
        <Header
          title={"Atlas Copilot"}
          titleSize={TitleSize.Medium}
          titleIconProps={{ iconName: "People" }}
          titleAriaLevel={3}
        />

        {
           COMPONENT.state.feedbackDialog.open === true && 
            <FeedbackDialog              
              sentiment={COMPONENT.state.feedbackDialog.sentiment}
              conversationId={COMPONENT.state.conversation.conversationId}
              exchangeId={COMPONENT.state.feedbackDialog.exchangeId}
              onDismiss={()=> {
                COMPONENT.setState({
                  feedbackDialog: {
                    open: false
                  }
                });

              }} />
        }

        {
          COMPONENT.state.user != null && <>
            <div className="page-container">
              <ChatMessageContainer>
                {
                  COMPONENT.state.conversation.chatExchanges.map((turn: any, index: any) => {
                    return (
                      <ChatResponse 
                        key={index} 
                        onClickHandler={(positiveSentiment: boolean) => {
                          COMPONENT.setState({
                            feedbackDialog: {
                              open: true,
                              exchangeId: turn.id,
                              sentiment: positiveSentiment
                            }
                          });
                        }}
                        conversation={turn} />
                    );
                  })
                }
              </ChatMessageContainer>
              <div className="user-prompt-container">
                <textarea
                  rows={3}
                  cols={120}
                  value={COMPONENT.state.userPromptText}
                  className="styled-input"
                  placeholder="Type here and press 'Enter'"
                  onKeyUp={COMPONENT.onKeyUp.bind(COMPONENT)}
                  onChange={(event) => {
                    COMPONENT.setState({
                      userPromptText: event.target.value
                    });
                  }}>
                </textarea>
              </div>
            </div>
          </>
        }
      </Page>
    );
  }
}

showRootComponent(<MainPage />);