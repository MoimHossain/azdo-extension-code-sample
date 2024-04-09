

export class Images {

    private getBasePath() {
        const url = window.location.href;
        const baseUrl = url.substr(0, url.indexOf("/dist/"));
        return baseUrl;
    }

    public getLogoIcon(): string {
        return `${this.getBasePath()}/assets/images/logo.png`;
    }

    public getAcrIcon(): string {
        return `${this.getBasePath()}/assets/images/azure-cr-logo.png`;
    }

    public getKeyVaultIcon(): string {
        return `${this.getBasePath()}/assets/images/azure-key-vault-icon.png`;
    }

    public getFolderIcon(): string {
        return `${this.getBasePath()}/assets/images/folder.png`;
    }

    public getRepositoryIcon(): string {
        return `${this.getBasePath()}/assets/images/git.png`;
    }

    public getCopilotIcon(): string {
        return `${this.getBasePath()}/assets/images/air-traffic-controller.png`;
    }

    public getAzureDevOpsWorkItemICon(): any[] {
        return [
            { type: 'Epic', uri: `${this.getBasePath()}/assets/images/Epic.png` },
            { type: 'Feature', uri: `${this.getBasePath()}/assets/images/Feature.png` },
            { type: 'Bug', uri: `${this.getBasePath()}/assets/images/bug.png` },
            { type: 'Issue', uri: `${this.getBasePath()}/assets/images/Issue.png` },
            { type: 'Task', uri: `${this.getBasePath()}/assets/images/Task.png` },            
            { type: 'Test Case', uri: `${this.getBasePath()}/assets/images/TestPlan.png` },
            { type: 'Test Plan', uri: `${this.getBasePath()}/assets/images/TestPlan.png` },
            { type: 'Test Suite', uri: `${this.getBasePath()}/assets/images/TestPlan.png` },
            { type: 'User Story', uri: `${this.getBasePath()}/assets/images/PBI.png` },,
            { type: 'Product Backlog Item', uri: `${this.getBasePath()}/assets/images/air-traffic-controller.png` }]; 
    }
    
}