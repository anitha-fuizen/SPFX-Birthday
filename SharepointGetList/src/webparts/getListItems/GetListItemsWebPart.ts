import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import "./components/GetListItems.module.scss";
import * as strings from "GetListItemsWebPartStrings";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http"
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";


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
  img: string
}

export default class GetListItemsWebPart extends BaseClientSideWebPart<IGetListItemsWebPartProps> {

  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient
      .get(
        this.context.pageContext.web.absoluteUrl +
        "/_api/web/lists/GetByTitle('Birthdaylist')/Items?$select=Name,DOB,img&$orderby= DOB asc",
        SPHttpClient.configurations.v1

      )
      .then((response: SPHttpClientResponse) => {
        //console.log(response)
        return response.json();

      });
  }

  private _renderListAsync(): void {
    if (
      Environment.type === EnvironmentType.SharePoint ||
      Environment.type === EnvironmentType.ClassicSharePoint
    ) {
      this._getListData()
        .then((response) => {
          this._renderList(response.value);
          console.log(response.value)
        }).catch((err) => {
          console.log(err)
        }
        )
    }
  }

  private _renderList(items: ISPList[]): void {
    let count = 0
    let html: string =
      '<ul>';
    // html += '<h2>Birthday Remainders..</h2>';


    //console.log(items);
    html += '<h3 class="birthday-wish" >Happy birthday</h3>'

    items.forEach((item: ISPList) => {
      let currentDay = new Date().getDate();
      let currentMonth = new Date().getMonth();

      let str = "https://ty4qm.sharepoint.com"
      let object = (item.img)
      console.log(object)
      let jobj = JSON.parse(object)
      // console.log(jobj.serverRelativeUrl)
      let aurl = str + jobj.serverRelativeUrl
      console.log(aurl)

      let day = new Date(item.DOB).getDate();
      let month = new Date(item.DOB).getMonth();
      // console.log(day,month,currentDay,currentMonth)

      if (currentDay == day && currentMonth == month) {
        html += `
      <li>                      
      <p>${item.Name}</p>
      <p>${item.DOB}</p>
     
      
      
      
   </li>
   <img src=${aurl} height="200" width="200"/>
       `;
      }

      else {
        count++;
        if (count == items.length) {
          //console.log("iam counted",count)
          html += `<h4> no bdays!!!</h4>`
        }
      }

    });


    html += "</ul>";
    const listContainer: Element =
      this.domElement.querySelector("#BindspListItems");
    listContainer.innerHTML = html;
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div >
     <div id="BindspListItems"></div>
          </div>`;
    this._renderListAsync();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}


