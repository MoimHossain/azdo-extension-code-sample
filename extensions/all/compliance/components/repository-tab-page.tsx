
import * as React from "react";
import { IFolder } from "../../../shared/schemas/schemas";
import RepoLinksCard from "./repository-links";


const RepositoryTabPage = (
    props: {
        style?: React.CSSProperties,
        folder: IFolder,
        readonly?: boolean
    }) => {
    

    return (
        <RepoLinksCard folder={props.folder} readonly={props.readonly} />
    );
}

export default RepositoryTabPage;