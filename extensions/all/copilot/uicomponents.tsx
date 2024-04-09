import * as React from "react";
import { ReactNode } from 'react';
import { VssPersona } from "azure-devops-ui/VssPersona";
import { Ago } from "azure-devops-ui/Ago";
import { AgoFormat } from "azure-devops-ui/Utilities/Date";
import { Animation } from '../../shared/components/Animation';
import { WorkItemViewer } from "./components/WorkItemViewer";
import UserRequestKind from "./components/userRequestKind";
import { Button } from "azure-devops-ui/Button";


const IconPaths = {
    Shield: "M23.1349 4.84751C23.6184 4.38416 24.3811 4.38416 24.8646 4.84751C27.6233 7.49126 31.5494 8.92541 34.9019 9.68733C36.5609 10.0644 38.0409 10.2683 39.1044 10.3777C39.6354 10.4323 40.0606 10.4631 40.3501 10.4802C40.4948 10.4888 40.6054 10.4939 40.6782 10.4968C40.7146 10.4983 40.7415 10.4992 40.7585 10.4997L40.7764 10.5003H40.7791C41.4577 10.5164 42 11.0711 42 11.75V21.5C42 22.4818 41.9459 23.4638 41.8351 24.4398C41.0825 23.9737 40.2789 23.5823 39.4344 23.2759C39.4784 22.6852 39.5 22.0926 39.5 21.5V12.9253C39.3031 12.9089 39.0853 12.8889 38.8487 12.8645C37.709 12.7473 36.1264 12.5294 34.3479 12.1252C31.1293 11.3937 27.1373 10.0233 23.9998 7.42285C20.8623 10.0233 16.8704 11.3937 13.6519 12.1252C11.8734 12.5294 10.2909 12.7473 9.15128 12.8645C8.91472 12.8889 8.6969 12.9089 8.50002 12.9253L8.5 21.25C8.50001 25.6629 9.6322 29.9668 12.152 33.6001C14.5567 37.0674 18.2722 39.9929 23.6349 41.8163C24.1008 42.6528 24.6564 43.4325 25.2886 44.1425C24.9878 44.246 24.6825 44.3463 24.3726 44.4431C24.1298 44.519 23.8697 44.519 23.6269 44.4431C17.3886 42.4936 12.9592 39.1508 10.0977 35.0249C7.24269 30.9082 6 26.087 6 21.25V11.7501C5.99999 11.0713 6.54169 10.5165 7.2202 10.5004L7.2236 10.5003L7.24154 10.4997C7.25851 10.4992 7.28543 10.4983 7.32181 10.4968C7.39459 10.4939 7.50519 10.4888 7.64987 10.4802C7.93932 10.4631 8.36453 10.4323 8.89553 10.3777C9.95899 10.2683 11.4389 10.0644 13.0979 9.68734C16.4502 8.92541 20.3762 7.49127 23.1349 4.84751ZM46 35.5C46 29.4249 41.0751 24.5 35 24.5C28.9249 24.5 24 29.4249 24 35.5C24 41.5751 28.9249 46.5 35 46.5C41.0751 46.5 46 41.5751 46 35.5ZM41.7071 30.7929C42.0976 31.1834 42.0976 31.8166 41.7071 32.2071L33.7071 40.2071C33.3166 40.5976 32.6834 40.5976 32.2929 40.2071L28.2929 36.2071C27.9024 35.8166 27.9024 35.1834 28.2929 34.7929C28.6834 34.4024 29.3166 34.4024 29.7071 34.7929L33 38.0858L40.2929 30.7929C40.6834 30.4024 41.3166 30.4024 41.7071 30.7929Z",
    ThumbUp: "M16.4996 5.20235C16.4996 2.76041 15.3595 1.00366 13.4932 1.00366C12.467 1.00366 12.1149 1.60503 11.747 3.00324C11.6719 3.29209 11.635 3.43272 11.596 3.57133C11.495 3.93007 11.3192 4.54082 11.069 5.40234C11.0623 5.42542 11.0524 5.44717 11.0396 5.46724L8.17281 9.95291C7.49476 11.0139 6.49429 11.8294 5.31841 12.2796L4.84513 12.4608C3.5984 12.9381 2.87457 14.2419 3.1287 15.5525L3.53319 17.6385C3.77462 18.8836 4.71828 19.8745 5.9501 20.1764L13.5778 22.046C16.109 22.6664 18.6674 21.1314 19.3113 18.6061L20.7262 13.057C21.1697 11.3177 20.1192 9.5482 18.3799 9.10473C18.1175 9.03782 17.8478 9.00398 17.5769 9.00398H15.7536C16.2497 7.37109 16.4996 6.1113 16.4996 5.20235ZM4.60127 15.2669C4.48576 14.6712 4.81477 14.0786 5.38147 13.8616L5.85475 13.6804C7.33036 13.1154 8.58585 12.0921 9.43674 10.7607L12.3035 6.27501C12.3935 6.13412 12.4629 5.98107 12.5095 5.8205C12.7608 4.95549 12.9375 4.3415 13.0399 3.97761C13.083 3.82436 13.1239 3.66891 13.1976 3.38494C13.3875 2.66324 13.4809 2.50366 13.4932 2.50366C14.3609 2.50366 14.9996 3.48773 14.9996 5.20235C14.9996 6.08683 14.6738 7.53779 14.0158 9.51741C13.8544 10.0029 14.2158 10.504 14.7275 10.504H17.5769C17.7228 10.504 17.868 10.5222 18.0093 10.5582C18.9459 10.797 19.5115 11.7498 19.2727 12.6863L17.8578 18.2355C17.4172 19.9634 15.6668 21.0136 13.9349 20.5891L6.30718 18.7196C5.64389 18.557 5.13577 18.0234 5.00577 17.353L4.60127 15.2669Z",
    ThumbDown: "M16.4996 17.9849C16.4996 20.4269 15.3595 22.1836 13.4932 22.1836C12.5183 22.1836 12.1518 21.6409 11.8021 20.3878L11.596 19.6159C11.495 19.2572 11.3192 18.6464 11.069 17.7849C11.0623 17.7618 11.0524 17.7401 11.0396 17.72L8.17281 13.2344C7.49476 12.1734 6.49429 11.3579 5.31841 10.9077L4.84513 10.7265C3.5984 10.2492 2.87457 8.94538 3.1287 7.63481L3.53319 5.54873C3.77462 4.30364 4.71828 3.31273 5.9501 3.01082L13.5778 1.14129C16.109 0.520894 18.6674 2.05583 19.3113 4.58116L20.7262 10.1303C21.1697 11.8696 20.1192 13.6391 18.3799 14.0825C18.1175 14.1494 17.8478 14.1833 17.5769 14.1833H15.7536C16.2497 15.8162 16.4996 17.076 16.4996 17.9849ZM4.60127 7.92034C4.48576 8.51606 4.81477 9.10868 5.38147 9.32565L5.85475 9.50686C7.33036 10.0718 8.58585 11.0952 9.43674 12.4266L12.3035 16.9123C12.3935 17.0531 12.4629 17.2062 12.5095 17.3668L13.0614 19.287L13.2731 20.0784C13.4125 20.5664 13.4827 20.6836 13.4932 20.6836C14.3609 20.6836 14.9996 19.6995 14.9996 17.9849C14.9996 17.1004 14.6738 15.6495 14.0158 13.6698C13.8544 13.1843 14.2158 12.6833 14.7275 12.6833H17.5769C17.7228 12.6833 17.868 12.6651 18.0093 12.629C18.9459 12.3902 19.5115 11.4375 19.2727 10.5009L17.8578 4.95176C17.4172 3.2239 15.6668 2.17369 13.9349 2.59816L6.30718 4.46769C5.64389 4.63026 5.13577 5.16383 5.00577 5.83426L4.60127 7.92034Z"
};

interface IChaTFrameProps {
    children: ReactNode;
    style?: any;
}

interface IPersonaProps {
    isLeft: boolean;
    displayName: string;
    imageUrl: string;
    kind: string;
}

const ResponseTimeStamp = (props: any) => {
    return (
        <div className="ai-response-footer-timestamp">
            <Ago date={props.when} format={AgoFormat.Compact} />
        </div>
    );
}

const IconButton = (props: any) => {
    return (
        <a href="#" className="flat-button" onClick={props.onClickHandler}>
            <svg className="svg-icon-button" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d={props.icon}></path>
            </svg>
        </a>        
    );
}

const ButtonGroupContainer = (props: any) => {
    return (
        <div className="button-group-container">{props.children}</div>        
    );
}

const AiResponseHeader = (props: any) => {
    return (
        <div className="ai-response-container-header">
        <div className="icon">
            <svg viewBox="0 0 48 49" xmlns="http://www.w3.org/2000/svg">
                <path d={IconPaths.Shield}></path>
            </svg>
        </div>
        <div className="header-text">Your personal and company data are protected in this chat</div>
    </div>        
    );
}

const RenderHtmlFragment = (props: any) => {
    return <div className="ai-response-content" dangerouslySetInnerHTML={{ __html: props.html }} />;
}

const AiResponse = (props: any) => {
    console.log("Before >>>", props.conversation.text);
    const html = (window as any).marked.parse((props.conversation.text || ''));
    console.log("After >>>", html);

    return (
        <div className="ai-response-container">
            <AiResponseHeader />
            {
                props.conversation.isBusy === true && <>
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <span>Thinking...please wait...</span>
                    </div>
                </>
            }
            {
                props.conversation.isBusy !== true && <>
                    {
                        <RenderHtmlFragment html={html} />
                    }
                </>
            }
            <div className="vertical-seperator"></div>
            <ButtonGroupContainer>
                <IconButton icon={IconPaths.ThumbUp} onClickHandler={()=> props.onClickHandler(true)} />
                <IconButton icon={IconPaths.ThumbDown} onClickHandler={()=> props.onClickHandler(false)} />
            </ButtonGroupContainer>
            <ResponseTimeStamp when={props.conversation.when}/>
        </div>
    );
}

const UserResponse = (props: any) => {
    console.log("UserResponse", props.text);
    return (
        <div className="user-request-container">
            <span>{props.text}</span>
        </div>
    );
}

export class ChatResponse extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    public render(): JSX.Element {
        var COMPONENT = this;
        console.log(COMPONENT.props.conversation);
        return (
            <>
                {
                    COMPONENT.props.conversation.from === "User" &&
                    <UserResponse text={COMPONENT.props.conversation.text} />
                }
                {

                    COMPONENT.props.conversation.from === "Copilot" &&
                    <AiResponse onClickHandler={this.props.onClickHandler} conversation={COMPONENT.props.conversation} />
                }
            </>
        );
    }
}

export class ChatMessageContainer extends React.Component<IChaTFrameProps, any> {

    constructor(props: any) {
        super(props);
    }

    scrollDown(): void {
        var COMPONENT = this;
        var container = document.getElementsByClassName("scrollable-chat-message-container")[0];
        if (container !== undefined && container !== null) {
            container.scrollTop = container.scrollHeight;
        }    
    }

    componentDidMount(): void {
        this.scrollDown();

    }

    componentDidUpdate(): void {
        this.scrollDown();
    }
    public render(): JSX.Element {
        return (
            <div className="chat-message-container">
                <div className="scrollable-chat-message-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}


export class ChatContainer extends React.Component<IChaTFrameProps, any> {
    constructor(props: any) {
        super(props);
    }
    public render(): JSX.Element {
        return (
            <table style={
                {
                    width: "100%",
                    verticalAlign: 'top',
                    border: '#f5f5f5 none 0px'
                }
            }>
                <tbody>{this.props.children}</tbody>
            </table>
        );
    }
}

interface IChatConversationProps {
    kind: string;
}


export class ChatConversation extends React.Component<IChatConversationProps, any> {
    public render(): JSX.Element {
        var COMPONENT = this;
        return (<tr style={{ backgroundColor: (COMPONENT.props.kind === "User" ? "#ffffff" : "#f5f5f5") }}>{this.props.children}</tr>);
    }
}

export class ChatUser extends React.Component<IPersonaProps, any> {
    constructor(props: any) {
        super(props);
    }
    public render(): JSX.Element {
        var COMPONENT = this;
        var width = 0;
        if (COMPONENT.props.isLeft === true && COMPONENT.props.kind === "User") {
            width = 32;
        }
        if (COMPONENT.props.isLeft === false && COMPONENT.props.kind === "Copilot") {
            width = 32;
        }

        return (

            <td style={{ width: width, verticalAlign: 'top' }}>
                {
                    width > 0 && <VssPersona identityDetailsProvider={{
                        getDisplayName() {
                            return COMPONENT.props.displayName;
                        },
                        getIdentityImageUrl(size: number) {
                            return COMPONENT.props.imageUrl;
                        }
                    }}
                        size={"medium"}
                    />
                }
            </td>

        );
    }
}

interface IChatContentProps {
    kind: string;
    when: Date;
    displayName: string;
    isBusy?: boolean;
    textContent: string;
    userRequest?: any;
    onActionButtonClick?: any;
}



export class ChatContent extends React.Component<IChatContentProps, any> {
    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        var COMPONENT = this;
        var parts = (COMPONENT.props.textContent || '').split("```");
        var lines = [];
        for (var i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
                lines.push(<span>{parts[i]}</span>);
            } else {
                lines.push(<pre style={{ textAlign: 'left', backgroundColor: "rgb(222 222 222)", padding: 8, borderRadius: 4, border: "rgb(222 222 222) solid 1px" }}>{parts[i]}</pre>);
            }
        }

        return (
            <td style={{
                width: "98%",
                verticalAlign: 'top',
                textAlign: ((COMPONENT.props.kind === "Copilot") ? 'right' : 'left')
            }}>
                {
                    COMPONENT.props.isBusy === true && <Animation />
                }
                {
                    COMPONENT.props.isBusy !== true && <React.Fragment>
                        <div className="comment-header">
                            <div className="comment-header-main">
                                <span style={{ fontSize: "0.675rem" }} className="user-display-name">
                                    <b>{COMPONENT.props.displayName}</b>
                                </span>
                            </div>
                            <span style={{ fontSize: "0.575rem", marginTop: -4 }} className="comment-date">
                                <Ago date={COMPONENT.props.when} format={AgoFormat.Compact} />
                            </span>
                        </div>
                        <div style={{ paddingTop: 4, paddingBottom: 4 }}>
                            {lines}
                            {
                                COMPONENT.props.userRequest !== undefined
                                && COMPONENT.props.userRequest != null
                                && COMPONENT.props.userRequest.kind === UserRequestKind.WorkItemQueryRequest
                                && COMPONENT.props.userRequest.concreteRequest !== undefined
                                && COMPONENT.props.userRequest.concreteRequest != null
                                && COMPONENT.props.userRequest.concreteRequest.workItems !== null
                                && <WorkItemViewer workItems={COMPONENT.props.userRequest.concreteRequest.workItems} />
                            }
                            {
                                COMPONENT.props.userRequest !== undefined
                                && COMPONENT.props.onActionButtonClick !== undefined
                                && COMPONENT.props.userRequest != null
                                && COMPONENT.props.userRequest.kind === UserRequestKind.GenerateYAMLPipelineRequest
                                && COMPONENT.props.userRequest.concreteRequest !== undefined
                                && COMPONENT.props.userRequest.concreteRequest != null
                                && COMPONENT.props.userRequest.concreteRequest.yamlPipeline !== null
                                && COMPONENT.props.userRequest.concreteRequest.yamlPipeline.length > 0
                                && <Button text="Pull Request" primary={true} onClick={() => {
                                    if (COMPONENT.props.onActionButtonClick !== undefined) {
                                        COMPONENT.props.onActionButtonClick(COMPONENT.props.userRequest);
                                    }
                                }} />
                            }
                        </div>
                    </React.Fragment>
                }
            </td>
        );
    }
}