var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from "@microsoft/sp-core-library";
import { PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import "./components/GetListItems.module.scss";
import * as strings from "GetListItemsWebPartStrings";
import { SPHttpClient } from "@microsoft/sp-http";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
var GetListItemsWebPart = /** @class */ (function (_super) {
    __extends(GetListItemsWebPart, _super);
    function GetListItemsWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetListItemsWebPart.prototype._getListData = function () {
        return this.context.spHttpClient
            .get(this.context.pageContext.web.absoluteUrl +
            "/_api/web/lists/GetByTitle('Birthdaylist')/Items?$select=Name,DOB,img&$orderby= DOB asc", SPHttpClient.configurations.v1)
            .then(function (response) {
            //console.log(response)
            return response.json();
        });
    };
    GetListItemsWebPart.prototype._renderListAsync = function () {
        var _this = this;
        if (Environment.type === EnvironmentType.SharePoint ||
            Environment.type === EnvironmentType.ClassicSharePoint) {
            this._getListData()
                .then(function (response) {
                _this._renderList(response.value);
                console.log(response.value);
            }).catch(function (err) {
                console.log(err);
            });
        }
    };
    GetListItemsWebPart.prototype._renderList = function (items) {
        var count = 0;
        var html = '<ul>';
        // html += '<h2>Birthday Remainders..</h2>';
        //console.log(items);
        html += '<h3 class="birthday-wish" >Happy birthday</h3>';
        items.forEach(function (item) {
            var currentDay = new Date().getDate();
            var currentMonth = new Date().getMonth();
            var str = "https://ty4qm.sharepoint.com";
            var object = (item.img);
            console.log(object);
            var jobj = JSON.parse(object);
            // console.log(jobj.serverRelativeUrl)
            var aurl = str + jobj.serverRelativeUrl;
            console.log(aurl);
            var day = new Date(item.DOB).getDate();
            var month = new Date(item.DOB).getMonth();
            // console.log(day,month,currentDay,currentMonth)
            if (currentDay == day && currentMonth == month) {
                html += "\n      <li>                      \n      <p>".concat(item.Name, "</p>\n      <p>").concat(item.DOB, "</p>\n     \n      \n      \n      \n   </li>\n   <img src=").concat(aurl, " height=\"200\" width=\"200\"/>\n       ");
            }
            else {
                count++;
                if (count == items.length) {
                    //console.log("iam counted",count)
                    html += "<h4> no bdays!!!</h4>";
                }
            }
        });
        html += "</ul>";
        var listContainer = this.domElement.querySelector("#BindspListItems");
        listContainer.innerHTML = html;
    };
    GetListItemsWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n      <div >\n     <div id=\"BindspListItems\"></div>\n          </div>";
        this._renderListAsync();
    };
    Object.defineProperty(GetListItemsWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    GetListItemsWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return GetListItemsWebPart;
}(BaseClientSideWebPart));
export default GetListItemsWebPart;
//# sourceMappingURL=GetListItemsWebPart.js.map