import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import "./components/GetListItems.module.scss";
export interface IGetListItemsWebPartProps {
    description: string;
}
export interface ISPLists {
    value: ISPList[];
}
export interface ISPList {
    Title: string;
    Name: string;
    DOB: number;
    img: string;
}
export default class GetListItemsWebPart extends BaseClientSideWebPart<IGetListItemsWebPartProps> {
    private _getListData;
    private _renderListAsync;
    private _renderList;
    render(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=GetListItemsWebPart.d.ts.map