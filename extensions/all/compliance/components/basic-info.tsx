
import * as React from "react";
import { IFolder } from "../../../shared/schemas/schemas";
import { VssPersona } from "azure-devops-ui/VssPersona";
import { TableFrame, TableRow, TableCell, TimeAgo, HorizontalChildContainer } from "../../../shared/components/htmlFragments";
import { RENDER } from "../../../shared/schemas/commonTypes";
import { IRoleDescriptor, IRoleDefinition } from "../../../shared/schemas/schemas";
import Backend from "../../../shared/services/backend";
import RoleConfigPanel from "../../../shared/components/role-config-panel";

const labelColumnStyle = {
    width: 120,
    borderBottom: "1px solid #ccc"//,
    //backgroundColor: "#f5f5f5"
};
const valueColumnStyle = {
    verticalAlign: "top",
    borderBottom: "1px solid #ccc",
    padding: "5px 0px 5px 0px"
};

const BasicInfoCard = (
    props: {
        style?: React.CSSProperties,
        folder: IFolder,
        readonly?: boolean
    }) => {

    return (
        <TableFrame className="property-table" style={{ marginLeft: -20 }} hideHeaders={true} columns={[]}>
            <>
                <TableRow>
                    <>
                        <TableCell style={labelColumnStyle}><>Name:</></TableCell>
                        <TableCell style={valueColumnStyle}>
                            <span className="text-ellipsis"><b>{props.folder.name}</b>&nbsp;{`(Path: ${props.folder.path})`}</span>
                        </TableCell>
                    </>
                </TableRow>
                <TableRow>
                    <>
                        <TableCell style={labelColumnStyle}><>Kind:</></TableCell>
                        <TableCell style={valueColumnStyle}>
                            <div className="flex-row">
                                {RENDER.getFolderRenderer(props.folder)()}
                                {props.folder.kind}
                            </div>
                        </TableCell>
                    </>
                </TableRow>
                <TableRow>
                    <>
                        <TableCell style={labelColumnStyle}><>CI Number:</></TableCell>
                        <TableCell style={valueColumnStyle}><>{props.folder.ciNumber}</></TableCell>
                    </>
                </TableRow>
                <TableRow>
                    <>
                        <TableCell style={labelColumnStyle}><>Description:</></TableCell>
                        <TableCell style={valueColumnStyle}><span className="text-ellipsis">{props.folder.description}</span></TableCell>
                    </>
                </TableRow>
                <TableRow>
                    <>
                        <TableCell style={labelColumnStyle}><>Created by:</></TableCell>
                        <TableCell style={valueColumnStyle}>
                            <HorizontalChildContainer>
                                <VssPersona
                                    size={"small"}
                                    displayName={props.folder.createdBy.displayName}
                                    imageUrl={props.folder.createdBy.imageUrl}
                                />
                                <span>&nbsp;{props.folder.createdBy.displayName} (<TimeAgo date={props.folder.createdOn} />)</span>
                            </HorizontalChildContainer>
                        </TableCell>
                    </>
                </TableRow>
                <TableRow>
                    <>
                        <TableCell style={labelColumnStyle}><>Last modified by:</></TableCell>
                        <TableCell style={valueColumnStyle}>
                            <HorizontalChildContainer>
                                <VssPersona
                                    size={"small"}
                                    displayName={props.folder.lastModifiedBy.displayName}
                                    imageUrl={props.folder.lastModifiedBy.imageUrl}
                                />
                                <span>&nbsp;{props.folder.lastModifiedBy.displayName} (<TimeAgo date={props.folder.lastModified} />)</span>
                            </HorizontalChildContainer>
                        </TableCell>
                    </>
                </TableRow>
                <TableRow className="ignore-cssnames">
                <TableCell colSpan={2}><span>&nbsp;&nbsp;</span></TableCell>
            </TableRow>                
            </>
        </TableFrame>
    );
}

export default BasicInfoCard;
